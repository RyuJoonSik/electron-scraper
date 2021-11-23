import 컴포넌트 from '../Component/Component';
export default class 다운로드_바 extends 컴포넌트 {
    템플릿() {
        return `
      <div data-testid="download-bar">
        <input data-testid="download-bar-start-page" name="startPageNum" type="text" placeholder="시작 페이지 번호">
        <input data-testid="download-bar-end-page" name="endPageNum" type="text" placeholder="끝 페이지 번호">
        <button data-testid="download-bar-button" type="button">다운로드</button>
      </div>
    `;
    }
    설정() {
        const 다운로드_버튼 = this.부모_컴포넌트.querySelector('[data-testid="download-bar-button"]');
        다운로드_버튼.addEventListener('click', this.클릭_이벤트.bind(this));
    }
    async 클릭_이벤트() {
        const { 다운로드 } = this.속성;
        const { value: 시작_페이지_번호 } = this.부모_컴포넌트.querySelector('[data-testid="download-bar-start-page"]');
        const { value: 끝_페이지_번호 } = this.부모_컴포넌트.querySelector('[data-testid="download-bar-end-page"]');
        await 다운로드(시작_페이지_번호, 끝_페이지_번호);
    }
}
