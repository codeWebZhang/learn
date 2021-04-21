function random(minNum, maxNum) {
  let num = Math.random() * (maxNum - minNum) + minNum;
  console.log(num);
}

random(1, 8);