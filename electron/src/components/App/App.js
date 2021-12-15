import 컴포넌트 from '../Component/Component.js';
import 헤더 from '../Header/Header.js';
// import 스크랩 from '../../js/scrap';
import { mkdirSync, writeFileSync } from 'fs';
// import 성분_배열 from '../../data/ingredients';
import { 요소_찾기, DOM_생성, 마지막_페이지_번호_탐색, 엑셀_파일_경로_생성, 제품_정보_배열_생성, 워크시트_생성, 워크시트_설정, 제품_이미지_URL_배열_탐색, 워크북_생성, 읽은_엑셀_파일_워크북_생성, 워크_시트_추출, 이미지_생성, 캔버스_생성 } from '../../js/domUtility/domUtility';
export default class 앱 extends 컴포넌트 {
    상태 = {
        URL: '',
        검색_유형: 'keyword',
        검색어: '',
        마지막_페이지_번호: 0
    };
    HTML_추가() {
        const { 부모 } = this;
        부모.innerHTML = `
      <div data-component="app">
        <div data-testid="header-container"></div>
      </div>
    `;
    }
    자식_렌더() {
        this.헤더_생성();
        this.자식_배열.forEach((자식) => {
            자식.렌더();
        });
    }
    헤더_생성() {
        const { 부모 } = this;
        const { 검색_유형, 검색어, 마지막_페이지_번호 } = this.상태;
        const 속성 = {
            검색_유형,
            검색어,
            마지막_페이지_번호,
            검색_유형_변경: this.검색_유형_변경.bind(this),
            검색: this.검색.bind(this),
            엑셀_다운로드: this.엑셀_다운로드.bind(this),
            이미지_다운로드: this.이미지_다운로드.bind(this)
        };
        const 컨테이너_선택자 = '[data-testid="header-container"]';
        const 컴포넌트_컨테이너 = 요소_찾기(부모, 컨테이너_선택자);
        const 컴포넌트 = new 헤더(컴포넌트_컨테이너, 속성);
        this.자식_배열.push(컴포넌트);
    }
    검색_유형_변경(검색_유형) {
        this.상태_변경({
            검색_유형: 검색_유형
        });
    }
    async 검색(URL_접두사, 검색어) {
        const URL = URL_접두사 + 검색어;
        const DOM = await DOM_생성(URL);
        const 마지막_페이지_번호 = 마지막_페이지_번호_탐색(DOM);
        this.상태_변경({
            URL,
            마지막_페이지_번호,
            검색어
        });
    }
    async 엑셀_다운로드(시작_페이지_번호, 끝_페이지_번호) {
        const { URL: 기본_URL } = this.상태;
        const 제품_정보_배열 = await 제품_정보_배열_생성(기본_URL, { 시작_페이지_번호, 끝_페이지_번호 });
        const 워크북 = 워크북_생성();
        const 워크시트 = 워크시트_생성(워크북);
        워크시트_설정(워크시트, 제품_정보_배열);
        const 엑셀_파일_경로 = 엑셀_파일_경로_생성();
        await 워크북.xlsx.writeFile(엑셀_파일_경로);
    }
    async 이미지_다운로드() {
        const 엑셀_파일_경로 = 엑셀_파일_경로_생성();
        const 워크북 = 워크북_생성();
        const 제품_워크북 = await 읽은_엑셀_파일_워크북_생성(워크북, 엑셀_파일_경로);
        const 제품_워크시트 = 워크_시트_추출(제품_워크북);
        const 제품_행_배열 = 제품_워크시트.getRows(2, 제품_워크시트.rowCount - 1);
        for await (const 제품_행 of 제품_행_배열) {
            const 제품_이름 = 제품_행.getCell(1).value;
            const 제품_URL = 제품_행.getCell(2).value;
            const 제품_DOM = await DOM_생성(제품_URL);
            const 제품_이미지_URL_배열 = 제품_이미지_URL_배열_탐색(제품_DOM);
            console.log(제품_이미지_URL_배열);
            const 폴더_경로 = `${__dirname}/products/${제품_이름}/`;
            mkdirSync(폴더_경로);
            let 사진_번호 = 1;
            for await (let 제품_이미지_URL of 제품_이미지_URL_배열) {
                const 파일_이름 = 제품_이름 + 사진_번호++ + '.jpg';
                const 이미지 = await 이미지_생성(제품_이미지_URL);
                const 캔버스 = 캔버스_생성();
                const ctx = 캔버스.getContext('2d');
                ctx.clearRect(0, 0, 1000, 1000);
                ctx.drawImage(이미지, 0, 0, 1000, 1000);
                const 데이터_URI = 캔버스.toDataURL();
                const 데이터 = 데이터_URI.replace(/^data:image\/\w+;base64,/, '');
                const 버퍼 = Buffer.from(데이터, 'base64');
                writeFileSync(폴더_경로 + 파일_이름, 버퍼);
                console.log(파일_이름);
            }
        }
        // const 제품_이미지_URL_객체 = 제품_이름_배열.reduce((객체: {[key: string]: any[]}, 제품_이름, 인덱스) => {
        //   객체[제품_이름] = 제품_이미지_URL_배열[인덱스];
        //   return 객체;
        // }, {});
        // const 제품_이름_이미지_URL_배열 = Object.entries(제품_이미지_URL_객체);
        // for await (let [제품_이름, 제품_이미지_URL_배열] of 제품_이름_이미지_URL_배열) {
        //   // console.log(제품_이름);
        //   const 폴더_경로 = `${__dirname}/products/${제품_이름}/`;
        //   mkdirSync(폴더_경로);
        //   let 사진_개수 = 1;
        //   for await (let 제품_이미지_URL of 제품_이미지_URL_배열) {
        //     const 파일_이름 = 제품_이름 + 사진_개수++ + '.jpg';
        //     const 이미지 = document.createElement('img');
        //     이미지.src = 제품_이미지_URL;
        //     await 이미지.decode();
        //     const 캔버스 = document.createElement('canvas');
        //     const 길이 = 1000;
        //     캔버스.height = 길이;
        //     캔버스.width = 길이;
        //     const ctx = 캔버스.getContext('2d') as CanvasRenderingContext2D;
        //     ctx.clearRect(0, 0, 길이, 길이);
        //     ctx.drawImage(이미지, 0, 0, 길이, 길이);
        //     const 데이터_URI = 캔버스.toDataURL();
        //     const 데이터 = 데이터_URI.replace(/^data:image\/\w+;base64,/, '');
        //     const 버퍼 = Buffer.from(데이터, 'base64');
        //     writeFileSync(폴더_경로 + 파일_이름, 버퍼);
        //   }
        // }
    }
}
