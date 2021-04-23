function generateRandomDataArray(length) {
  let array = []
  for (let i = 0; i < length; i++) {
      let data = Math.random().toString().slice(2, 6)
      array.push(data)
  }
  return array;
}


let loadDataFunc = (function() {
  let id = 0;
  return function(length) {
      let array = []
      for (let i = 0; i < length; i++) {
          array.push(id++)
      }
      return array;
  }
})()