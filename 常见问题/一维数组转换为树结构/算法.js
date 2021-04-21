var nodes = [
  {"id":1,"parentId":'',"name":"父节点1 - 展开","open":true},
  {"id":99,"parentId":'',"name":"父节点11 - 折叠"},
  {"id":11,"parentId":1,"name":"父节点11 - 折叠"},
  {"id":12,"parentId":1,"name":"父节点12 - 折叠"},
  {"id":13,"parentId":1,"name":"父节点13 - 没有子节点"},
  {"id":2,"parentId":0,"name":"父节点2 - 折叠"},
  {"id":21,"parentId":2,"name":"父节点21 - 展开","open":true},
  {"id":22,"parentId":2,"name":"父节点22 - 折叠"},
  {"id":23,"parentId":2,"name":"父节点23 - 折叠"},
  {"id":3,"parentId":0,"name":"父节点3 - 没有子节点"}
];

function translateDataToTree1(data, parentId = '',count=0) {
  debugger
  let tree = [];
  let temp;
  count++;
  data.forEach((item, index) => {
    //控制其递归次数 防止无限递归
    // if (count < 3) {
      if (data[index].parentId === parentId) {
        let obj = data[index];
        temp = translateDataToTree1(data, data[index].id,count);
        if (temp.length > 0) {
          obj.children = temp;
        }
        tree.push(obj);
      }
      // }
    })
  console.log(count);
  return tree;
}

console.log(translateDataToTree1(nodes),'---')
