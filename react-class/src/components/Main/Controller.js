import React, { Component } from 'react';
import './Controller.scss';
import PropTypes from 'prop-types';
import * as ExcelJS from 'exceljs';
import html2canvas from 'html2canvas';

class Controller extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageNum: this.props.CUR_PAGE_NUM,
      isChecked: false,
    };
  }

  toggleBtn() {
    return new Promise((resolve) => {
      this.setState(
        (state) => ({
          isChecked: !state.isChecked,
        }),
        resolve,
      );
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.CUR_PAGE_NUM !== prevProps.CUR_PAGE_NUM) {
      this.setState({
        pageNum: this.props.CUR_PAGE_NUM,
      });
    }
  }

  async downloadSupplement(TITLE, SUP_TABLE) {
    if (SUP_TABLE === null) {
      return;
    }

    document.body.appendChild(SUP_TABLE);

    const EL = document.querySelector('.supplement-facts-container');
    const CANVAS_SUP = await html2canvas(EL);
    const A = document.createElement('a');
    A.href = CANVAS_SUP.toDataURL();
    A.download = `${TITLE}-성분.jpg`;

    A.click();

    EL.remove();
  }

  async downloadImages(TITLE, IMG_LINKS) {
    const CANVAS = document.createElement('canvas');
    const LENGTH = 800;
    CANVAS.width = LENGTH;
    CANVAS.height = LENGTH;

    const CONTEXT = CANVAS.getContext('2d');
    const IMG = new Image();
    const A = document.createElement('a');

    let count = 1;

    for (const LINK of IMG_LINKS) {
      IMG.src = LINK;

      await IMG.decode();

      CONTEXT.clearRect(0, 0, 800, 800);
      CONTEXT.drawImage(IMG, 0, 0);

      A.href = CANVAS.toDataURL();
      A.download = `${TITLE}${count}.jpg`;
      A.click();

      count += 1;
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    let result = false;

    if (
      this.state.pageNum !== nextState.pageNum ||
      this.props.CUR_PAGE_NUM !== nextProps.CUR_PAGE_NUM ||
      this.isChecked !== nextState.isChecked
    ) {
      result = true;
    }

    return result;
  }

  render() {
    console.log('Controller rendering');
    const { CUR_PAGE_NUM, LAST_PAGE_NUM, KEYWORD, handleEvent, PAGE } =
      this.props;
    const [handleOnClickNext, onClickAllProductsCheck] = handleEvent;

    return (
      <article className="controller">
        <h3 className="controller__title">리모컨</h3>
        <div className="controller__content-wrap">
          <p className="controller__keyword" title={KEYWORD}>
            {KEYWORD}
          </p>
          <div className="controller__content">
            <button
              onClick={() => handleOnClickNext(1)}
              className="controller__button controller__button--first-row controller__button--toFirst"
            ></button>
            <button
              onClick={() => handleOnClickNext(CUR_PAGE_NUM - 1)}
              className="controller__button controller__button--first-row controller__button--toPrev"
            ></button>
            <button
              onClick={() => handleOnClickNext(CUR_PAGE_NUM + 1)}
              className="controller__button controller__button--first-row controller__button--toNext"
            ></button>
            <button
              onClick={() => handleOnClickNext(LAST_PAGE_NUM)}
              className="controller__button controller__button--first-row controller__button--toLast"
            ></button>
          </div>
          <div className="controller__content">
            <div className="controller__page-info">
              <input
                type="number"
                value={this.state.pageNum}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleOnClickNext(this.state.pageNum);
                  }
                }}
                onChange={(e) => {
                  this.setState({ pageNum: e.target.value * 1 });
                }}
                className="controller__input"
              ></input>
              <span className="controller__last-page">/{LAST_PAGE_NUM}</span>
            </div>
            <button
              onClick={() => handleOnClickNext(this.state.pageNum)}
              className="controller__button controller__button--flex-1"
            >
              이동
            </button>
          </div>
          <div className="controller__content">
            <button
              onClick={() => {
                window.scroll(0, 100);
              }}
              className="controller__button controller__button--flex-1"
            >
              TOP
            </button>
            <button
              onClick={() => {
                const Y = document.body.scrollHeight - window.innerHeight;

                window.scroll(0, Y);
              }}
              className="controller__button  controller__button--flex-1 controller__button--margin-left"
            >
              BOTTOM
            </button>
          </div>
          <div className="controller__content">
            <button
              onClick={async () => {
                await this.toggleBtn();

                onClickAllProductsCheck(this.state.isChecked);
              }}
              className="controller__button controller__button--flex-1 "
            >
              {this.state.isChecked ? '전체 선택 해제' : '전체 선택'}
            </button>
          </div>
          <div className="controller__content">
            <button
              onClick={async () => {
                const WORK_BOOK = new ExcelJS.Workbook();
                const WORK_SHEET = WORK_BOOK.addWorksheet('My Products');

                WORK_SHEET.columns = [
                  { header: '이미지 파일 이름', key: 'imgFileName' },
                  { header: '제목', key: 'title' },
                  { header: '링크', key: 'url' },
                  { header: '가격', key: 'price' },
                  { header: '배송비', key: 'shippingPrice' },
                  { header: '평점', key: 'rate' },
                  { header: '리뷰 수', key: 'reviewCount' },
                  { header: '재고 상태', key: 'stockState' },
                  { header: '사용 방법', key: 'suggestedUse' },
                ];

                for (const PRODUCT of PAGE[CUR_PAGE_NUM]) {
                  if (PRODUCT.isChecked) {
                    await this.downloadImages(PRODUCT.TITLE, PRODUCT.IMG_LINKS);
                    await this.downloadSupplement(
                      PRODUCT.TITLE,
                      PRODUCT.SUP_TABLE,
                    );

                    const PRICE =
                      PRODUCT.REDUCED_PRICE === '0'
                        ? PRODUCT.ORIGINAL_PRICE.slice(1) * 1
                        : PRODUCT.REDUCED_PRICE.slice(1) * 1;

                    const IMG_FILE_NAME = PRODUCT.IMG_LINKS.map((val, idx) => {
                      return `${PRODUCT.TITLE}${idx + 1}.jpg`;
                    }).join(', ');

                    console.log(IMG_FILE_NAME);

                    WORK_SHEET.addRow({
                      imgFileName: IMG_FILE_NAME,
                      title: PRODUCT.TITLE,
                      url: PRODUCT.URL,
                      price: '$' + PRICE,
                      shippingPrice: PRICE >= 20 ? '$5' : '',
                      rate: PRODUCT.STAR,
                      reviewCount: PRODUCT.REVIEW,
                      stockState: PRODUCT.STOCK_STATE,
                      suggestedUse: PRODUCT.SUGGESTED_USE,
                    });
                  }
                }

                const MIME_TYPE = {
                  type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                };
                const BUFFER = await WORK_BOOK.xlsx.writeBuffer();
                const BLOB = new Blob([BUFFER], MIME_TYPE);
                const MY_URL = window.URL.createObjectURL(BLOB);
                const A = document.createElement('a');
                A.href = MY_URL;
                A.download = 'Products.xlsx';

                A.click();
                A.remove();
                window.URL.revokeObjectURL(MY_URL);
              }}
              className="controller__button controller__button--flex-1 "
            >
              Excel 출력
            </button>
          </div>
        </div>
      </article>
    );
  }
}

Controller.propTypes = {
  CUR_PAGE_NUM: PropTypes.number,
  LAST_PAGE_NUM: PropTypes.number,
  KEYWORD: PropTypes.string,
  handleEvent: PropTypes.arrayOf(PropTypes.func),
  PAGE: PropTypes.object,
};

export default Controller;
