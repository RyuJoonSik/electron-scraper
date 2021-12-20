import { observe, test } from '../../ts/observer/observer';
export default class 컴포넌트 {
    _부모;
    속성;
    _상태 = {};
    constructor(_부모, 속성) {
        this._부모 = _부모;
        this.속성 = 속성;
        this.상태_초기화();
    }
    // protected 상태_변경(새_상태: 문자열_프로퍼티_객체): void {
    //   this._상태 = {...this.상태, ...새_상태};
    //   this.부모_컴포넌트에_HTML_추가();
    // }
    상태_초기화() {
        // const 새_상태 = this.상태_생성();
        const 렌더 = this.렌더.bind(this);
        // this.상태 = observable(새_상태);
        test['a'] = false;
        observe(() => {
            // console.log(this);
            console.log('hello store');
            this.렌더();
        });
    }
    상태_생성() {
        return {};
    }
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
        this._상태 = 새_상태;
    }
    get 부모() {
        return this._부모;
    }
}
