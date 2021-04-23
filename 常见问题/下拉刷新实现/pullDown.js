/**
 * 下拉刷新
 */


 var min_move_distance = 50; // 最小移动距离, 如果移动距离小于这个值就取消加载
 var showPullUpTextDistance = 30
 console.log(1111)
 var refreshContainerEle = document.getElementById('refreshContainer'),
     pullUpTextEle = document.getElementById('pullUpText'),
     startPos = 0,
     transitionHeight = 0;
     refreshContainerEle.addEventListener('click',function(){console.log('click')})


 refreshContainerEle.addEventListener('touchstart', function(e) {
     // console.log('初始位置：', e.touches[0].pageY);
     startPos = e.touches[0].pageY;
     refreshContainerEle.style.position = 'relative';
     refreshContainerEle.style.transition = 'transform 0s';
 }, false);
 
 
 refreshContainerEle.addEventListener('touchmove', function(e) {
     // console.log('当前位置：', e.touches[0].pageY);
     transitionHeight = e.touches[0].pageY - startPos;
  console.log('---')
     if (transitionHeight > showPullUpTextDistance) {
 
         pullUpTextEle.innerText = '下拉刷新';
 
         if (transitionHeight > min_move_distance) {
             pullUpTextEle.innerText = '释放立即更新';
         }
 
         refreshContainerEle.style.transform = 'translateY(' + transitionHeight + 'px)';
         pullUpTextEle.style.lineHeight = transitionHeight + 'px';
     }
 }, false);
 
 
 
 refreshContainerEle.addEventListener('touchend', function(e) {
     refreshContainerEle.style.transition = 'transform 0.5s linear 0.3s';
     refreshContainerEle.style.transform = 'translateY(0px)';
 
     setTimeout(() => {
         pullUpTextEle.style.lineHeight = "normal";
     }, 800)
 
     if (transitionHeight > min_move_distance) {
         pullUpTextEle.innerText = '更新中...';
 
         console.log("更新中");
 
 
         // 更新完成
         setTimeout(() => {
             refresh()
             pullUpTextEle.innerText = '';
         }, 1000)
     } else {
         pullUpTextEle.innerText = '' // 取消更新;
     }
 
 }, false);
 