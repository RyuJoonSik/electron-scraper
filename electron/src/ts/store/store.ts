import {observable, test} from '../observer/observer';

interface 문자열_프로퍼티_객체 {
  [키: string]: any;
}
test.b = false;
test.observable = true;
export const store = {
  state: observable({
    a: 10
    // b: 20
  }),

  setState(newState: 문자열_프로퍼티_객체) {
    for (const [key, value] of Object.entries(newState)) {
      if (this.state[key]) {
        this.state[key] = value;
      }
    }
  }
};
