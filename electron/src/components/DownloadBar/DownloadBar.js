import 컴포넌트 from '../Component/Component.js';
import { 요소_찾기, 인풋_값_반환 } from '../../js/domUtility/domUtility.js';
export default class 다운로드_바 extends 컴포넌트 {
    constructor(부모, 속성) {
        super(부모);
        this.속성 = 속성;
    }
    HTML_추가() {
        const { 부모 } = this;
        // TODO: 컴포넌트를 더 작게 나눌 수 있을 것 같다.
        부모.innerHTML = `
      <div data-testid="download-bar">
        <input data-testid="download-bar-start-page" name="startPageNum" type="text" placeholder="시작 페이지 번호">
        <input data-testid="download-bar-end-page" name="endPageNum" type="text" placeholder="끝 페이지 번호">
        <button data-testid="download-bar-excel-button" type="button">엑셀 다운로드</button>
        <button data-testid="download-bar-image-button" type="button">이미지 다운로드</button>
      </div>
    `;
    }
    이벤트_설정() {
        const { 부모 } = this;
        const 엑셀_다운로드_버튼_선택자 = '[data-testid="download-bar-excel-button"]';
        const 엑셀_다운로드_버튼 = 요소_찾기(부모, 엑셀_다운로드_버튼_선택자);
        엑셀_다운로드_버튼.addEventListener('click', this.엑셀_다운로드_클릭_이벤트.bind(this));
        const 이미지_다운로드_버튼_선택자 = '[data-testid="download-bar-image-button"]';
        const 이미지_다운로드_버튼 = 요소_찾기(부모, 이미지_다운로드_버튼_선택자);
        이미지_다운로드_버튼.addEventListener('click', this.이미지_다운로드_클릭_이벤트.bind(this));
    }
    async 엑셀_다운로드_클릭_이벤트() {
        const { 엑셀_다운로드 } = this.속성;
        const { 부모 } = this;
        const 시작_페이지_번호_인풋_선택자 = '[data-testid="download-bar-start-page"]';
        const 시작_페이지_번호 = Number(인풋_값_반환(부모, 시작_페이지_번호_인풋_선택자));
        const 끝_페이지_번호_인풋_선택자 = '[data-testid="download-bar-end-page"]';
        const 끝_페이지_번호 = Number(인풋_값_반환(부모, 끝_페이지_번호_인풋_선택자));
        await 엑셀_다운로드(시작_페이지_번호, 끝_페이지_번호);
    }
    async 이미지_다운로드_클릭_이벤트() {
        const { 이미지_다운로드 } = this.속성;
        await 이미지_다운로드();
    }
}
