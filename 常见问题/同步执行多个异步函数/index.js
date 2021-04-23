let count = 0;
function test1(r,reject) {
  setTimeout(() => {
    count++;
    console.log('1', 'count==', count);
    // r(count);
    reject('err...1')
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

// let p = Promise.resolve();
 // 两个p 完全相等
let p = new Promise((resolve) => {
  return resolve();
})

arr = [test1, test2, test3];

function fn() {
  let error = false;
  for (let i = 0; i < arr.length; i++) {
    p = p.then(() => {
      if (error) { return null }
      console.log(error,'88888')
      return new Promise((resolve,reject) => {
        arr[i](resolve,reject);
      }).catch(err => { console.log(err, 'inner..er..'); error = true;})
    })
  }
}
fn();