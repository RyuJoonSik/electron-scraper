import * as ExcelJS from 'exceljs';
import 성분_배열 from '../data/ingredients';
import { writeFileSync } from 'fs';
const 스크랩 = {
    async 페이지_요청(URL) {
        const 응답 = await fetch(URL);
        // if (!응답.ok) {
        //   throw new Error();
        // }
        return await 응답.text();
    },
    DOM_변환(HTML_텍스트) {
        const DOM_파서 = new DOMParser();
        return DOM_파서.parseFromString(HTML_텍스트, 'text/html');
    },
    마지막_페이지_번호_질의(검색_페이지) {
        const 페이지_번호_배열 = 검색_페이지.querySelectorAll('.pagination-link');
        const 마지막_페이지_번호 = 페이지_번호_배열[페이지_번호_배열.length - 1];
        return 마지막_페이지_번호 ? Number(마지막_페이지_번호.textContent) : 1;
    },
    제품_URL_질의(검색_페이지) {
        const 링크_배열 = [...검색_페이지.querySelectorAll('.absolute-link.product-link')];
        return 링크_배열.map(({ href }) => href);
    },
    제품_이름_질의(제품_페이지) {
        const 제품_이름 = 제품_페이지.querySelector('#name');
        return 제품_이름.textContent?.trim();
    },
    제품_이미지_URL_질의(제품_페이지) {
        const 이미지_배열 = [...제품_페이지.querySelectorAll('.lazy.img-responsive')];
        return 이미지_배열.map(({ dataset: { lazyload } }) => lazyload);
    },
    제품_후기_질의(제품_페이지) {
        const rate = 제품_페이지.querySelector('#product-summary-header .stars');
        return rate
            ? rate.title
                .split('-')
                .map((항목) => 항목.trim())
                .reduce((배열, 값) => {
                const [새_값] = 값.split(/(\/|\s)/);
                배열.push(새_값);
                return 배열;
            }, [])
            : [null, null];
    },
    제품_상태_질의(제품_페이지) {
        const 상태 = 제품_페이지.querySelector('#stock-status > *:first-child');
        return 상태.textContent?.trim();
    },
    제품_가격_질의(제품_페이지) {
        const 가격 = 제품_페이지.querySelector('#price');
        return 가격 ? 가격.textContent?.trim() : '제품의 새 버전이 있습니다.';
    },
    제품_할인가_질의(제품_페이지) {
        const 가격 = 제품_페이지.querySelector('#pricing b');
        return 가격 ? 가격.textContent?.trim() : null;
    },
    제품_사용법_질의(제품_페이지) {
        return 제품_페이지.querySelectorAll('.prodOverviewDetail')[0].textContent?.trim();
    },
    제품_설명_질의(제품_페이지) {
        return 제품_페이지.querySelectorAll('.product-overview')[0].textContent?.trim().toLowerCase();
    },
    제품_성분표_질의(제품_페이지) {
        return 제품_페이지.querySelector('.supplement-facts-container');
    },
    금지_성분_유무(성분_배열, 내용) {
        const 소문자_내용 = 내용.toLowerCase();
        let 결과 = false;
        for (const 성분 of 성분_배열) {
            const 정규식 = new RegExp('\\b' + 성분 + '\\b');
            if (정규식.test(소문자_내용)) {
                결과 = true;
                break;
            }
        }
        return 결과;
    },
    async 범위_페이지_검색(검색_URL, 시작_페이지_번호, 끝_페이지_번호) {
        const 페이지_번호_배열 = Array.from({ length: 끝_페이지_번호 - 시작_페이지_번호 + 1 }, (_, i) => i + Number(시작_페이지_번호));
        const 페이지_제품_URL_배열 = [];
        for await (const 페이지_번호 of 페이지_번호_배열) {
            const HTML_텍스트 = await this.페이지_요청(검색_URL + 페이지_번호);
            const 검색_페이지 = this.DOM_변환(HTML_텍스트);
            페이지_제품_URL_배열.push(this.제품_URL_질의(검색_페이지));
            // console.log(`${페이지_번호}번 페이지 검색 완료`);
        }
        return 페이지_제품_URL_배열;
    },
    async 제품_배열_생성(페이지_제품_URL_배열) {
        const 제품_배열 = [];
        let cnt = 0;
        for await (const 제품_URL_배열 of 페이지_제품_URL_배열) {
            // console.log(`${++cnt}번째 페이지 제품 필터 시작`);
            let productCnt = 0;
            for await (const 제품_URL of 제품_URL_배열) {
                ++productCnt;
                const HTML_텍스트 = await this.페이지_요청(제품_URL);
                const 제품_페이지 = this.DOM_변환(HTML_텍스트);
                const 이름 = this.제품_이름_질의(제품_페이지);
                const 설명 = this.제품_설명_질의(제품_페이지);
                if (!this.금지_성분_유무(성분_배열, 이름 + 설명)) {
                    // console.log(`${++cnt}번째 페이지 ${productCnt}번 제품 통과`);
                    const [별점, 후기_수] = this.제품_후기_질의(제품_페이지);
                    const 가격 = this.제품_가격_질의(제품_페이지);
                    제품_배열.push({
                        이름,
                        별점,
                        후기_수,
                        가격,
                        상태: this.제품_상태_질의(제품_페이지),
                        사용법: this.제품_사용법_질의(제품_페이지),
                        이미지_URL_배열: this.제품_이미지_URL_질의(제품_페이지),
                        이미지_파일_이름_배열: [],
                        배송비: Number(가격.slice(1)) < 20 ? '$5' : null,
                        URL: 제품_URL,
                        브랜드: 이름.split(',')[0],
                    });
                }
            }
            // console.log(`${cnt}번째 페이지 제품 필터 완료`);
        }
        return 제품_배열;
    },
    캔버스_생성(높이, 넓이) {
        const canvas = document.createElement('canvas');
        canvas.height = 높이;
        canvas.width = 넓이;
        return { 캔버스: canvas, ctx: canvas.getContext('2d') };
    },
    async 이미지_저장(이미지_URL, 파일_경로) {
        const 이미지 = document.createElement('img');
        이미지.src = 이미지_URL;
        await 이미지.decode();
        const 길이 = 1000;
        const { 캔버스, ctx } = this.캔버스_생성(길이, 길이);
        ctx.clearRect(0, 0, 길이, 길이);
        ctx.drawImage(이미지, 0, 0, 길이, 길이);
        const 데이터_URI = 캔버스.toDataURL();
        const 데이터 = 데이터_URI.replace(/^data:image\/\w+;base64,/, '');
        const 버퍼 = Buffer.from(데이터, 'base64');
        writeFileSync(파일_경로, 버퍼);
    },
    async 엑셀_저장(제품_배열, 파일_경로) {
        const 워크_북 = new ExcelJS.Workbook();
        const 워크_시트 = 워크_북.addWorksheet('My Products');
        워크_시트.columns = [
            { header: '대표 이미지 파일명', key: '대표_이미지_파일_이름' },
            { header: '나머지 이미지 파일명', key: '후보_이미지_파일_이름' },
            { header: '브랜드', key: '브랜드' },
            { header: '이름', key: '이름' },
            { header: '링크', key: 'URL' },
            { header: '가격', key: '가격' },
            { header: '배송비', key: '배송비' },
            { header: '사용법', key: '사용법' },
            { header: '별점', key: '별점' },
            { header: '리뷰 수', key: '후기_수' },
            { header: '재고 상태', key: '상태' },
        ];
        for await (const 제품 of 제품_배열) {
            const { 이미지_URL_배열 } = 제품;
            const 행 = {
                ...제품,
                대표_이미지_파일_이름: 이미지_URL_배열[0],
                후보_이미지_파일_이름: 이미지_URL_배열.slice(1).join(),
            };
            워크_시트.addRow(행);
        }
        // 제품_배열.forEach((제품) => {
        //   const { 이미지_파일_이름_배열 } = 제품;
        //   const 행 = {
        //     ...제품,
        //     대표_이미지_파일_이름: 이미지_파일_이름_배열[0],
        //     후보_이미지_파일_이름: 이미지_파일_이름_배열.slice(1).join(),
        //   };
        //   워크_시트.addRow(행);
        // });
        await 워크_북.xlsx.writeFile(파일_경로);
    },
};
export default 스크랩;
