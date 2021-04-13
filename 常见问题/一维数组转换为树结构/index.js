
industry_list = [
  {
    "parent_ind": "女装",
    "name": "连衣裙"
  },
  {
    "name": "女装"
  },
  {
    "parent_ind": "女装",
    "name": "半身裙"
  },
  {
    "parent_ind": "女装",
    "name": "A字裙"
  },
  {
    "name": "数码"
  },
  {
    "parent_ind": "数码",
    "name": "电脑配件"
  },
  {
    "parent_ind": "电脑配件",
    "name": "内存"
  },
];

let result = {
  "数码": {
    "电脑配件": {
      "内存": {}
    }
  },
  "女装": {
    "连衣裙": {},
    "半身裙": {},
    "A字裙": {}
  }
};
function convert(arr,data={}) {
  if (!arr.length) return;
  arr.map((cur, index) => {
    if (!cur.parent_ind) {
      data[cur.name] = {};
    }
  })

  arr.map((cur, index) => {
    if (cur.parent_ind) {
      converData(cur,data);
    }
  })

  function converData(attr, obj) {
    let parentId = attr.parent_ind;
    for (let i in obj) {
      if (Object.keys(obj).includes(parentId)) {
        if (i == parentId) {    
          obj[i][attr.name] = {}
        }
      } else {
        let cur = obj[i];
        if (Object.keys(cur).length > 0) {
          converData(attr,cur)
        }
      }
     }

    return obj;
  }
  console.log(data,'---')
  return data;
}
convert(industry_list, {})