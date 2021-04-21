let count = 0;
function test1(r) {
  setTimeout(() => {
    count++;
    console.log('1', 'count==', count);
    r(count);
  },3000)
}
function test2(r) {
  setTimeout(() => {
    count++;
    console.log('2', 'count', count);
    r(count);
  },2000)
}

function test3(r) {
  setTimeout(() => {
    count++;
    console.log('3', 'count', count++);
    r(count);
  },1000)
}

let p = Promise.resolve();

arr = [test1, test2, test3];

 function fn() {
  for (let i = 0; i < arr.length; i++) {
    p = p.then(() => {
      return new Promise((resolve) => {
        arr[i](resolve);
      })
    })
  }
}
fn();