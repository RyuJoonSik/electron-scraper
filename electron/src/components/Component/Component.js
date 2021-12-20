export default class 컴포넌트 {
    _부모;
    속성;
    _상태 = {};
    constructor(_부모, 속성) {
        this._부모 = _부모;
        this.속성 = 속성;
        this.상태_초기화();
    }
    상태_변경(새_상태) {
        this._상태 = { ...this.상태, ...새_상태 };
        this.렌더();
    }
    // protected 상태_초기화(): void {
    //   this._상태 = observable(this.상태_생성());
    //   observe(() => {
    //     console.log('옵저버 등록');
    //     this.렌더();
    //   });
    // }
    상태_초기화() { }
    렌더() {
        this.부모_컴포넌트에_HTML_추가();
        this.태그_속성_초기화();
        this.이벤트_설정();
        this.자식_생성();
    }
    태그_속성_초기화() { }
    이벤트_설정() { }
    자식_생성() { }
    get 상태() {
        return this._상태;
    }
    set 상태(새_상태) {
        this._상태 = { ...this.상태, ...새_상태 };
    }
    get 부모() {
        return this._부모;
    }
}
