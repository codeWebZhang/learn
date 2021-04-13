var arr = [-1, 23, 4, 6, 3, 343, 56];
function t(arr) {
  let min;
  min = arr.reduce((cur, next) => {
    let m = Math.min(cur, next);
    if (cur < 0 && next < 0) {
      return 0
    } else if (cur < 0 && next > 0 || cur > 0 && next < 0) {
      return Math.max(cur,next)
    } else {
      return m;
    }
  })
  console.log(min)
}

function f(arr) {
  let min;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < 0 || arr[i - 1]<0) {
      continue;
    } else {
      let cur = Math.min(arr[i], arr[i - 1]);
      if (!min) { min = cur };
      if (cur < min) { min = cur;}
    }
  }
  console.log(min)
 }
t(arr);
f(arr);