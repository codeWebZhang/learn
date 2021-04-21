
let next4 = {
  val: 4,
  next:null,
}

let next3 = {
  val: 3,
  next: next4,
}

  let next2 = {
  val: 2,
  next:next3,
}

let next1 = {
  val: 2,
  next:next2,
}

let fib = {
  val: 1,
  next:next1
}

// let fib1 = {
//   val: 1,
//   next: {
//     val: 2,
//     next: {
//       val: 3,
//       next: {
//         val: 4,
//         next:null
//       }
//     }
//   }
// }

var reverseList = function (head) {
  let currentNode = null;
  let headNode = head;
  while (head && head.next) {
    currentNode = head.next;
    head.next = currentNode.next;
    currentNode.next = headNode;
    headNode = currentNode;
  }
  return headNode;
}


console.log(reverseList(fib))
