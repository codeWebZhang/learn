var a = 20;
    var obj = {
      a: 10,
      b1: this.a,
      c: {
        a: 50,
        fn: function () {
          return this.a;
        },
      },
      d: () => {
        console.log(this.a);
      },
      e: function () {
        return () => {
          console.log(this.a);
        };
      },
    };
    var f = obj.c.fn;

    // console.log(obj.b1, '---', obj.a);
    // console.log(obj.c.fn(), '---', obj.a);
    // console.log(obj.d());
console.log(obj.e()());
    


Function.prototype.a = 1;
Object.prototype.b = 1;
A.prototype.c = 5;
function A() { }
let n = new A();
console.log(A.__proto__ == Function.prototype, n.c);

function Parent() {
  
}
Parent.prototype.x = 1;
let s1 = new Parent();
Parent.prototype = { x: 2, y: 3 };
let s2 = new Parent();
console.log(s1.x)
console.log(s1.y)
console.log(s2.x)
console.log(s2.y);

//不改变顺序的情况下 把num插入到数组中
let arr = [1, 3, 4, 10, 20];
let num = 9;
function f(arr, num) {
  let len = arr.length;
  for (let i = len - 1; i > 0; i--) {
    if (arr[i] > num) {
      arr[i + 1] = arr[i];
    } else {
      arr[i + 1] = num;
      console.log(arr)
      return arr;
    }
  }
}

f(arr, 9);