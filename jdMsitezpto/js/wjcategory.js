/**
 * Created by webwj on 2016/8/18.
 */
window.onload = function () {
    leftSide();
}
//左侧栏
var leftSide = function () {
    var parentBox = document.querySelector(".main-left");
    var childBox = parentBox.querySelector('ul');
    var parentHeight = parentBox.offsetHeight;
    var childHeight = childBox.offsetHeight;
    var lis = childBox.querySelector("li");

    // 定位区间
    var distance = 150;
    var maxPosition = 0;
    var minPosition = parentHeight - childHeight;

    var maxSwipe = maxPosition + distance;
    var minSwipe = minPosition = -distance;
    var currentY = 0; //当前子盒子的定位;
    //公共
    //家过度
    var addTransition = function () {
        childBox.style.transition = "all 0.3s";
        childBox.style.webkitTransition = "all 0.3s";
    }
    var removeTransition = function () {
        childBox.style.transition = "none";
        childBox.style.webkitTransition = "none";
    }
    var setTranslateY = function (translateY) {
        childBox.style.transform = "translateY(" + translateY + "px)";
        childBox.style.webkitTransform = "translateY(" + translateY + "px)"
    }

    var startY = 0;
    var moveY = 0;
    var distanceY = 0;
    var isMove = false;
    childBox.addEventListener("touchstart", function (e) {
        startY = e.touches[0].clientY;
    });
    childBox.addEventListener('touchmove', function (e) {
        moveY = e.touches[0].clientY;
        distanceY = moveY - startY;
        removeTransition();
        if ((currentY + distanceY) < maxSwipe && (currentY + distanceY) > minSwipe) {
            setTranslateY(currentY + distanceY);
        }
        isMove = true;
    });
    window.addEventListener("touchend", function (e) {
        if ((currentY + distanceY) > maxPosition) {
            currentY = maxPosition;
            addTransition();
            setTranslateY(currentY);
        } else if ((currentY + distanceY) < minPosition) {
            currentY = minPosition;
            addTransition();
            setTranslateY(currentY);
        } else {
            currentY = currentY + distanceY;
        }
        startY = 0;
        moveY = 0;
        distanceY = 0;
        isMove = false;
    })

    itcast.tap(childBox, function (e) {
        var tapLi = e.target.parentNode;
        for (var i = 0; i < lis.length; i++) {
            lis[i].className = " ";
            lis[i].index = i;
        }
        tapLi.className = "now";
        console.log(tapLi);
        var translateY = -tapLi.index * 50;
        if (translateY > minPosition) {
            currentY = translateY;
            addTransition();
            setTranslateY(currentY);
        }
        else {
            currentY = minPosition;
            addTransition();
            setTranslateY(currentY);
        }
    })

}
/*
 * 1.滑动Y轴方向的滑动   touch事件y手方向的坐标轴的改变
 * 2.在滑动区间范围内  移动     确定滑动区间
 * 3.在定位区间范围内  定位     确定定位区间
 * 4.点击分类的时候  要求改变当前样式    tap 事件来（封装）
 * 5.点击过后 要判断是否有滑动的位子  当前被点击的盒子要求  滑动到和顶部对齐的位子   transition
 * 6.点击的时候  要判断是否有滑动的位子  没有滑动的位子保持不动
 * */

/*右侧栏的滑动*/

/* //缓冲距离
 var distance = 150;
 //定位区间
 var maxPosition = 0;
 var minPosition = parentHeight - childHeight;
 //缓冲区间
 var maxSwipe = maxPosition + distance;
 var minSwipe = minPosition - distance;
 //当前定位
 var currentY = 0;

 //公用方法
 var addTransition = function () {
 childBox.style.transition = "all 0.3s";
 childBox.style.webkitTransition = "all 0.3s";
 }
 var removeTransition = function () {
 childBox.style.transition = "none";
 childBox.style.webkitTransition = "none";
 }
 //定位
 var setTranslateY = function (translateY) {
 childBox.style.transform = "translateY("+translateY+"px)";
 childBox.style.webkitTransform = "translateY("+translateY+"px)";
 }

 var startY = 0;
 var moveY =0;
 var distanceY = 0; //滑动距离
 var isMove = false;
 childBox.addEventListener('touchstart',function (e) {
 startY = e.touches[0].clientY;
 });
 childBox.addEventListener('touchmove',function (e) {
 moveY = e.touches[0].clientY;
 distanceY = moveY - startY;
 console.log(distanceY);
 removeTransition();
 if((currentY + distanceY)<maxSwipe && (currentY + distanceY) > minSwipe){
 setTranslateY(currentY + distanceY)
 }
 isMove = true;

 });

 window.addEventListener('touched',function (e) {
 if((currentY + distanceY)>maxPosition){
 currentY = maxPosition;
 addTransition();
 setTranslateY(currentY);
 }else if ((currentY + distanceY)<minPosition){
 currentY = minPosition;
 addTransition();
 setTranslateY(currentY);
 }else  {
 currentY = currentY + distanceY;
 }
 startY = 0;
 moveY= 0;
 distanceY = 0;
 isMove = false;
 })
 itcast.tap(childBox,function (e) {
 var tapLi = e.target.parentNode;
 for(var i = 0; i< lis.length;i++){
 lis[i].className =" ";
 lis[i].index = i;
 }
 tapLi.className = "now";
 var translateY = -tapLi.index*50;
 if(translateY > minPosition){
 currentY = translateY;
 addTransition();
 setTranslateY(currentY);
 }else{
 currentY = minPosition;
 addTransition();
 setTranslateY(currentY);
 }
 })





 }

 function  rightSide() {

 }*/


