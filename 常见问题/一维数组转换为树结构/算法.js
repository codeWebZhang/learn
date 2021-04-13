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


function translateDataToTree(array) {
  //第一层数据
  let parents = array.filter(item => item.parentId === "");
  //有父节点的数据
  let childrens = array.filter(item => item.parentId !== "");
  function translator(parents, childrens) {
    parents.forEach( parent => {
      childrens.forEach( (children, index) => {
        //找到子层的父层
        if (children.parentId === parent.id) {
          //temp 这步不是必须
          //对子节点数据进行深复制
          let temp = JSON.parse(JSON.stringify(childrens));
          //让当前子节点从temp中移除，temp作为新的子节点数据，这里是为了让递归时，子节点的遍历次数更少，如果父子关系的层级越多，越有利
          temp.splice(index, 1);
          //判断是否有children属性 有就直接push 没有就增加children属性
          parent.children ? parent.children.push(children) : parent.children = [children];
          //不用temp 传childrens也可
          translator([children], temp);
        }
      })
    })
  }
  translator(parents, childrens);
  //返回最终结果
  // console.log(parents,'parents')
  return parents;
}
// console.log(translateDataToTree(nodes),'00')


function translateDataToTree1(data, parentId = '') {
  let tree = [];
  let temp;
  data.forEach((item, index) => {
    if (data[index].parentId == parentId) {
      let obj = data[index];
      temp = translateDataToTree1(data, data[index].id);
      if (temp.length > 0) {
        obj.children = temp;
      }
      tree.push(obj);
    }
  })
  return tree;
}

console.log(translateDataToTree1(nodes),'---')
