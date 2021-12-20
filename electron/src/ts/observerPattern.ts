interface 문자열_프로퍼티_객체 {
  readonly [키: string]: any;
}

interface 프로퍼티_객체 {
  [키: string]: {
    get(): any;
  };
}

interface 상태 {
  a: number;
  b: number;
}

type 발행기관_상태 = 상태 & 발행기관;

class 발행기관 {
  private readonly 옵저버_배열: Set<Function> = new Set();

  constructor(private 상태: 문자열_프로퍼티_객체) {
    const 프로퍼티_객체 = Object.entries(this.상태).reduce((객체: 프로퍼티_객체, [키, 값]) => {
      객체[키] = {get: () => 값};

      return 객체;
    }, {});

    Object.defineProperties(this, 프로퍼티_객체);
  }

  내부에_변화가_생김(새_상태: 문자열_프로퍼티_객체) {
    this.상태 = {...this.상태, ...새_상태};

    this.구독자에게_알림();
  }

  구독자_등록(구독자: Function) {
    this.옵저버_배열.add(구독자);
  }

  구독자에게_알림() {
    this.옵저버_배열.forEach((함수) => 함수());
  }
}

class 구독자 {
  constructor(private readonly 발행기관에_변화가_생길_때_하는_일: Function) {}

  구독(새_발행기관: 발행기관) {
    새_발행기관.구독자_등록(this.발행기관에_변화가_생길_때_하는_일);
  }
}

const 상태 = new 발행기관({
  a: 10,
  b: 20
}) as 발행기관_상태;

const 덧셈 = new 구독자(() => console.log(`a + b = ${상태.a + 상태.b}`));
const 곱셈 = new 구독자(() => console.log(`a * b = ${상태.a * 상태.b}`));

덧셈.구독(상태);
곱셈.구독(상태);

상태.구독자에게_알림();

상태.내부에_변화가_생김({a: 100, b: 200});
