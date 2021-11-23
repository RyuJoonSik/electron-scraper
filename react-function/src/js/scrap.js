import html2canvas from 'html2canvas';
import * as ExcelJS from 'exceljs';

export async function getPage(URL) {
  try {
    const response = await fetch(URL);
    const HTML = await response.text();
    const parser = new DOMParser();
    const page = parser.parseFromString(HTML.trim(), 'text/html');

    return page;
  } catch (err) {
    console.error(err);
  }
}

export function hasResult(page) {
  return page.getElementById('FilteredProducts') ? true : false;
}

export function getLastPageNum(page) {
  try {
    const paginationLinks = page.getElementsByClassName('pagination-link');
    const lastPageNum = paginationLinks[paginationLinks.length - 1];

    return lastPageNum ? lastPageNum.textContent.trim() * 1 : 1;
  } catch (err) {
    console.error(err);
  }
}

export function getProductURLs(page) {
  try {
    return [...page.getElementsByClassName('absolute-link product-link')].map((val) => val.href);
  } catch (err) {
    console.error(err);
  }
}

export async function getPageResult(URL) {
  try {
    const page = await getPage(URL);

    return [getLastPageNum(page), getProductURLs(page)];
  } catch (err) {
    console.error(err);
  }
}

export function getProductTitle(page) {
  try {
    return page.getElementById('name').textContent.trim();
  } catch (err) {
    console.error(err);
  }
}

export function getProductImageURLs(page) {
  try {
    return [...page.getElementsByClassName('lazy img-responsive')].map((val) => val.dataset.lazyload);
  } catch (err) {
    console.error(err);
  }
}

export function getProductStarAndReview(page) {
  try {
    const rate = page.querySelector('#product-summary-header .stars');
    let result = [null, null];

    if (rate) {
      result = rate.title
        .split('-')
        .map((val) => val.trim())
        .reduce((acc, val) => {
          const [newVal] = val.split(/(\/|\s)/);

          acc.push(newVal);

          return acc;
        }, []);
    }

    return result;
  } catch (err) {
    console.error(err);
  }
}

export function getProductStockState(page) {
  try {
    return page.querySelector('#stock-status > *:first-child').textContent.trim();
  } catch (err) {
    console.error(err);
  }
}

export function getProductOriginalPrice(page) {
  try {
    const price = page.getElementById('price');

    return price ? price.textContent.trim() : '제품의 새 버전이 있습니다.';
  } catch (err) {
    console.error(err);
  }
}

export function getProductSpeciallPrice(page) {
  try {
    return page.querySelector('#pricing b') ? page.querySelector('#pricing b').textContent.trim() : null;
  } catch (err) {
    console.error(err);
  }
}

export function getProductSuggestedUse(page) {
  try {
    return page.getElementsByClassName('prodOverviewDetail')[0].textContent.trim();
  } catch (err) {
    console.error(err);
  }
}

export function getProductOverview(page) {
  try {
    return page.getElementsByClassName('product-overview')[0].textContent.toLowerCase();
  } catch (err) {
    console.error(err);
  }
}

export function getProductSupTable(page) {
  try {
    return page.querySelector('.supplement-facts-container');
  } catch (err) {
    console.error(err);
  }
}

export async function getProductInfo(URL) {
  try {
    const page = await getPage(URL);
    const [star, review] = getProductStarAndReview(page);

    return {
      title: getProductTitle(page),
      imgURLs: getProductImageURLs(page),
      URL,
      star,
      review,
      state: getProductStockState(page),
      originalPrice: getProductOriginalPrice(page),
      specialPrice: getProductSpeciallPrice(page),
      suggestedUse: getProductSuggestedUse(page),
      supplementTable: getProductSupTable(page),
      overview: getProductOverview(page),
      isChecked: false,
      id: URL,
    };
  } catch (err) {
    console.log(err);
  }
}

export function hasProhibitedIngredients(ingredients, content) {
  try {
    let result = false;

    for (const ingredient of ingredients) {
      const str = '\\b' + ingredient + '\\b';
      const regex = new RegExp(str);

      if (regex.test(content)) {
        result = true;
        break;
      }
    }

    return result;
  } catch (err) {
    console.error(err);
  }
}

export function getCanvas(size) {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;

    return canvas;
  } catch (err) {
    console.error(err);
  }
}

export async function getIMG(src) {
  try {
    const img = new Image();
    img.src = src;
    await img.decode();

    return img;
  } catch (err) {
    console.error(err);
  }
}

export function downloadFile(dataURL, title, extension) {
  try {
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = `${title}.${extension}`;
    a.click();

    return a;
  } catch (err) {
    console.error(err);
  }
}

export function addElementToBody(element) {
  try {
    document.body.appendChild(element);
  } catch (err) {
    console.error(err);
  }
}

export function removeElementFromBody(element) {
  try {
    element.remove();
  } catch (err) {
    console.error(err);
  }
}

export async function translate(content) {
  try {
    const res = await fetch('https://openapi.naver.com/v1/papago/n2mt', {
      body: `source=en&target=ko&text=${content}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Naver-Client-Id': 'VNWzkooX8BDyW9KamVeq',
        'X-Naver-Client-Secret': 'bdvwzoBvEZ',
      },
      method: 'POST',
    });
    const papago = await res.json();

    return papago.message.result.translatedText;
  } catch (err) {
    console.error(err);
  }
}

export async function downloadIMGs(title, imgURLs, size, isAlert = true) {
  try {
    const canvas = getCanvas(size);
    const ctx = canvas.getContext('2d');
    let count = 1;

    for (const imgURL of imgURLs) {
      const img = await getIMG(imgURL);

      ctx.clearRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);

      const extension = 'jpg';

      downloadFile(canvas.toDataURL(), `${title}-${count}`, extension);

      count += 1;
    }

    if (isAlert) {
      alert(`${title} '${imgURLs.length}장' 다운 완료`);
    }
  } catch (err) {
    console.error(err);
  }
}

export async function downloadSupplement(title, supplementTable, isAlert = true) {
  try {
    addElementToBody(supplementTable);

    const canvas = await html2canvas(supplementTable);
    const extension = 'jpg';

    downloadFile(canvas.toDataURL(), `${title}-sup`, extension);
    removeElementFromBody(supplementTable);

    if (isAlert) {
      alert('영양 성분 정보 다운 완료');
    }
  } catch (err) {
    console.error(err);
  }
}

export function getObjectURL(buffer, mime) {
  return window.URL.createObjectURL(new Blob([buffer], mime));
}

export async function downloadExcel(products, isAlert = true) {
  try {
    const WORK_BOOK = new ExcelJS.Workbook();
    const WORK_SHEET = WORK_BOOK.addWorksheet('My Products');

    WORK_SHEET.columns = [
      { header: '이미지 대표 파일명', key: 'centerImgFileName' },
      { header: '이미지 나머지 파일명', key: 'restImgFileName' },
      { header: '브랜드명', key: 'brand' },
      { header: '제목', key: 'title' },
      { header: '링크', key: 'url' },
      { header: '가격', key: 'price' },
      { header: '배송비', key: 'shippingPrice' },
      { header: '사용 방법', key: 'suggestedUse' },
      { header: '평점', key: 'rate' },
      { header: '리뷰 수', key: 'reviewCount' },
      { header: '재고 상태', key: 'stockState' },
      { header: '사용 방법 번역', key: 'suggestedUseKR' },
    ];

    const extension = 'jpg';
    let cnt = 1;

    for (const product of products) {
      const { title, imgURLs, URL, originalPrice, star, review, state, suggestedUse } = product;

      if (product.isChecked) {
        const fileName = `0${cnt}-${title}`;
        const [centerImgFileName, ...restImgFileName] = imgURLs.map((_, idx) => `${fileName}-${idx + 1}.${extension}`);
        // const suggestedUseKR = await translate(suggestedUse);

        WORK_SHEET.addRow({
          centerImgFileName: centerImgFileName,
          restImgFileName: restImgFileName.join(),
          brand: title.split(',')[0],
          title: title,
          url: URL,
          price: originalPrice,
          shippingPrice: originalPrice.slice(1) * 1 < 20 ? '$5' : '',
          rate: star,
          reviewCount: review,
          stockState: state,
          suggestedUse: suggestedUse,
          // suggestedUseKR: suggestedUseKR,
        });

        cnt += 1;
      }
    }

    const MIME_TYPE = {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    };
    const BUFFER = await WORK_BOOK.xlsx.writeBuffer();
    const MY_URL = getObjectURL(BUFFER, MIME_TYPE);

    downloadFile(MY_URL, 'Products', 'xlsx');
    window.URL.revokeObjectURL(MY_URL);

    if (isAlert) {
      alert('엑셀 출력 완료');
    }
  } catch (err) {
    console.error(err);
  }
}
