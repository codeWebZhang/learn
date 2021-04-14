
      function change(arr) {
        let cur;
        let result = [];
        while (arr.length > 0) {
          cur = arr.pop();
          result.push(cur);
          for (let j = 0; j < arr.length; j++) {
            if (cur == arr[j]) {
              // debugger;
              result.push(cur);
              arr.splice(j, 1);
              j = j - 1;
            }
          }
        }
        return result;
      }
      let arr = [
        '一',
        '二',
        '一',
        '三',
        '一',
        '四',
        '一',
        '二',
        '一',
        '二',
        '五',
        '五',
        '五',
        '五',
      ];
      // console.log(arr.length, change(arr), '..arr.');
      function select(arr) {
        let val;
        let cur;
        let curTimes = 1;
        let max = 1;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] == arr[i + 1]) {
            curTimes++;
            if (curTimes > max) {
              max = curTimes;
              val = arr[i + 1];
            }
          } else {
            curTimes = 1;
          }
        }
        console.log(val, '--', max);
      }
      let param = change(arr);
      console.log(param, 'param');
      // select(param);
      console.log(select(param), '===');

