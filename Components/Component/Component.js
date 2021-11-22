export default class 컴포넌트 {
    부모;
    상태 = {};
    속성 = {};
    constructor(부모) {
        this.부모 = 부모;
    }
    렌더() {
        this.HTML_추가();
        this.이벤트_설정();
        this.자식_렌더();
    }
    HTML_추가() { }
    이벤트_설정() { }
    자식_렌더() { }
    상태_변경(새_상태) {
        this.상태 = { ...this.상태, ...새_상태 };
        this.렌더();
    }
}
