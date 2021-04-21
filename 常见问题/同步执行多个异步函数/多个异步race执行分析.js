
// 重点。。。。。。。。。
//无论是race还是any，所有的异步都会被执行；必须发起多个异步请求，
// 服务返回第一个成功或者失败

// 区别....
 //race 返回第一个成功或者失败
 //any 只返回第一个成功的

let count = 0;
let result = [];
let test1 = new Promise((reslove) => {
  setTimeout(() => {
    result.push(3);
    console.log('send...',result)
    reslove(3);
  },3000)
})

let test2 = new Promise((reslove) => {
  setTimeout(() => {
    result.push(2);
    reslove(2);
  },2000)
})

let test3 = new Promise((reslove) => {
  setTimeout(() => {
    result.push(1);
    reslove(1);
  },1000)
})


arr = [test1, test2, test3];

Promise.race(arr).then((value) => {
  console.log(value,'value...')
})