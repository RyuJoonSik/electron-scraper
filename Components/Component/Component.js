export default class 컴포넌트 {
    부모;
    속성;
    상태 = {};
    constructor(부모, 속성 = {}) {
        this.부모 = 부모;
        this.속성 = 속성;
    }
    렌더() {
        this.부모.innerHTML = this.템플릿();
        this.이벤트_설정();
        this.자식_렌더();
    }
    템플릿() {
        return '';
    }
    이벤트_설정() { }
    자식_렌더() { }
    상태_설정(새_상태) {
        this.상태 = { ...this.상태, ...새_상태 };
        this.렌더();
    }
}
