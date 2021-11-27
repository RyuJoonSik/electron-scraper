import 컴포넌트 from '../Component/Component';
export default class 헤더 extends 컴포넌트 {
    템플릿() {
        return `
    <header data-testid="header">
      <a href="https://www.iherb.com" target="_blank">사이트 이동</a>
      <div data-testid="search-type-container"></div>
      <div data-testid="search-bar-container"></div>
      <div data-testid="search-result-container"></div>
      <div data-testid="download-bar-container"></div>
    </header>
    `;
    }
    검색_유형_컴포넌트_생성() { }
    자식_렌더() { }
}
