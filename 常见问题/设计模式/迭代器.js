
class generator{
  constructor(props) {
    this.count = 0;
    this.list = props.list;
  }

  next() {
    if (this.hasNext) {
      return this.list[this.count++];
    }
    console.log('结束')
    return null;

  }

  hasNext() {
    if (this.count >= this.list.length) {
      return false;
    }
    return true;
  }
}

class sub{
  constructor(props) {
    this.list=props
  }
  create() {
    return new generator(this)
  }
}

let a = new sub([1, 2, 3]);
console.log(a)
let b = a.create();
while (b.hasNext()) {
  console.log(b.next());
}