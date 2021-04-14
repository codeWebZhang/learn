function format(num){
num = num + '';//数字转字符串
var str="";//字符串累加
for(var i=num.length- 1,j=1;i>=0;i--,j++){
if(j%3==0 && i!=0){//每隔三位加逗号，过滤正好在第一个数字的情况
str+=num[i]+",";//加千分位逗号
continue;
}
str+=num[i];//倒着累加数字
}
return str.split('').reverse().join("");//字符串=>数组=>反转=>字符串
}
console.log(format(34432434))

function format1(num) {
  var str = num+'';
  // ["8", "7", "6", "5", "4", "3", "2", "1"]
  return str.split("").reverse().reduce((prev, next, index) => {
  return ((index % 3) ? next : (next + ',')) + prev;
  })
}
console.log(format1(34432434))