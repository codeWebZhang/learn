function resverse(arr) {
  if (typeof arr != 'object') {return } ;
  let result = [];
  for (let i of arr) {
    result.unshift(i);
  }
  console.log(result)
  return result;
}

function resverse1(arr) {
 return arr.reduceRight((cur, next) => {
    cur.push(next);
    return cur;
  },[])
}

function resverse2(arr) {
  return arr.reduceRight((cur, next) => {
    return [ ...cur,next];
  },[])
}

resverse([1, 2, 3, 4, 5])
console.log(resverse1([1,2,3,4,5]))
console.log(resverse2([1,2,3,4,5]))