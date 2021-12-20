let currentObserver = null;

const observe = (fn) => {
  currentObserver = fn;
  fn();
  currentObserver = null;
};

const observable = (obj) => {
  Object.keys(obj).forEach((key) => {
    let _value = obj[key];
    const observers = new Set();

    Object.defineProperty(obj, key, {
      get() {
        currentObserver && observers.add(currentObserver);
        return _value;
      },

      set(value) {
        _value = value;
        observers.forEach((fn) => fn());
      }
    });
  });
  return obj;
};

const 상태 = observable({a: 10, b: 20});
observe(() => console.log(`a = ${상태.a}`));
observe(() => console.log(`b = ${상태.b}`));
observe(() => console.log(`a + b = ${상태.a} + ${상태.b}`));
observe(() => console.log(`a * b = ${상태.a} + ${상태.b}`));
observe(() => console.log(`a - b = ${상태.a} + ${상태.b}`));

상태.a = 100;
// 상태.b = 200;
// 상태.a = 300;
