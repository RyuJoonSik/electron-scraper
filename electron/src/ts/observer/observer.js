export let test = { a: true, b: true };
let currentObserver = null;
export const observe = (fn) => {
    console.log(test);
    // console.log('observe');
    // console.log('ho');
    currentObserver = fn;
    fn();
    currentObserver = null;
};
export const observable = (obj) => {
    console.log(test);
    // console.log('observable의 상태', obj);
    Object.keys(obj).forEach((key) => {
        let _value = obj[key];
        const observers = new Set();
        Object.defineProperty(obj, key, {
            get() {
                // console.log(_value);
                if (currentObserver)
                    observers.add(currentObserver);
                // console.log(Array.from(observers));
                return _value;
            },
            set(value) {
                // console.log(value);
                _value = value;
                // console.log(Array.from(observers));
                observers.forEach((fn) => {
                    // console.log('렌더 호출');
                    fn();
                });
            }
        });
    });
    return obj;
};
