import { observable, test } from '../observer/observer';
test.b = false;
test.observable = true;
export const store = {
    state: observable({
        a: 10
        // b: 20
    }),
    setState(newState) {
        for (const [key, value] of Object.entries(newState)) {
            if (this.state[key]) {
                this.state[key] = value;
            }
        }
    }
};
