/**
 * ITCAST WEB
 * Created by zhousg on 2016/8/16.
 */
window.onload = function(){
    /*左侧栏滑动*/
    leftSwipe();
    /*右侧栏的滑动*/
    rightSwipe();
}
/*左侧栏滑动*/
function leftSwipe(){
    /*
    * 1.滑动Y轴方向的滑动   touch事件y手方向的坐标轴的改变
    * 2.在滑动区间范围内  移动     确定滑动区间
    * 3.在定位区间范围内  定位     确定定位区间
    * 4.点击分类的时候  要求改变当前样式    tap 事件来（封装）
    * 5.点击过后 要判断是否有滑动的位子  当前被点击的盒子要求  滑动到和顶部对齐的位子   transition
    * 6.点击的时候  要判断是否有滑动的位子  没有滑动的位子保持不动
    * */

    /*获取dom元素*/
    /*父盒子*/
    var parentBox = document.querySelector('.category_left');
    /*子盒子*/
    var childBox = parentBox.querySelector('ul');
    /*父盒子高度*/
    var parentHeight = parentBox.offsetHeight;
    /*子盒子高度*/
    var childHeight = childBox.offsetHeight;
    /*所有的li*/
    var lis = childBox.querySelectorAll('li');

    /*计算滑动和定位区间*/
    /*缓冲的距离*/
    var distance = 150;
    /*定位区间*/
    var maxPosition = 0;
    var minPosition = parentHeight - childHeight;
    /*滑动区间*/
    var maxSwipe = maxPosition + distance;
    var minSwipe = minPosition - distance;

    /*★★当前定位 整个程序的核心★★*/
    var currentY = 0;/*默认的当前定位是0*/


    /*公用方法*/
    /*加过渡*/
    var addTransition = function(){
        childBox.style.transition = "all 0.3s";
        childBox.style.webkitTransition = "all 0.3s";/*做兼容*/
    };
    /*清除过渡*/
    var removeTransition = function(){
        childBox.style.transition = "none";
        childBox.style.webkitTransition = "none";
    }
    /*定位*/
    var setTranslateY = function(translateY){
        childBox.style.transform = "translateY("+translateY+"px)";
        childBox.style.webkitTransform = "translateY("+translateY+"px)";
    }



    /*1.滑动Y轴方向的滑动*/

    var startY = 0;
    var moveY = 0;
    var distanceY = 0;
    var isMove = false;

    childBox.addEventListener('touchstart',function(e){
        startY = e.touches[0].clientY;
    });
    childBox.addEventListener('touchmove',function(e){
        moveY = e.touches[0].clientY;
        distanceY = moveY - startY;
        //console.log(distanceY);
        /*滑动*/
        /*清除过渡*/
        removeTransition();
        /*定位*/
        /*将要去做定位的位置怎么计算？*/
        /*上一次定位的位子和滑动距离的和   currentY+distanceY */

        /*2.在滑动区间范围内  移动*/
        if((currentY+distanceY)  < maxSwipe && (currentY + distanceY) > minSwipe){
            setTranslateY(currentY + distanceY);
        }
        isMove = true;
    });
    window.addEventListener('touchend',function(e){
        /*3.在定位区间范围内  定位*/
        if((currentY + distanceY ) > maxPosition){
            currentY = maxPosition;
            /*吸附效果  过渡的形式定位回去*/
            /*加过渡*/
            addTransition();
            /*做定位*/
            setTranslateY(currentY);
        }else if((currentY + distanceY) < minPosition){
            currentY = minPosition;
            /*吸附效果  过渡的形式定位回去*/
            /*加过渡*/
            addTransition();
            /*做定位*/
            setTranslateY(currentY);
        }else{
            /*正常情况*/
            currentY = currentY + distanceY;
        }
        /*重置参数*/
        startY = 0;
        moveY= 0;
        distanceY = 0;
        isMove = false;
    });

    /*
    * 在移动端一般不是使用click？为什么？在移动端click会有300ms延时
    * tap 怎么来的？
    * 为了响应速度更快 tap 事件
    * */
    itcast.tap(childBox,function(e){
        /*4.点击分类的时候  要求改变当前样式    tap 事件来（封装）*/
        //console.log(this);
        /*target  触发事件的目标源  元素*/
        //console.log(e.target);
        var tapLi = e.target.parentNode;

        /*清除当前样式*/
        for(var i = 0 ; i < lis.length ; i++){
            lis[i].className = " ";
            /*加索引*/
            lis[i].index = i;
        }
        tapLi.className = "now";
        console.log(tapLi);
        console.log(tapLi.index);
        /*
         5.点击过后 要判断是否有滑动的位子  当前被点击的盒子要求  滑动到和顶部对齐的位子   transition
         6.点击的时候  要判断是否有滑动的位子  没有滑动的位子保持不动
        */

        /*计算将要去做定位的位置*/
        var translateY = - tapLi.index * 50;

        /*5.点击过后 要判断是否有滑动的位子*/
        if(translateY > minPosition){
            /*为了衔接滑动*/
            currentY = translateY;
            /*加过渡*/
            addTransition();
            /*做定位*/
            setTranslateY(currentY);
        }
        /* 6.点击的时候  要判断是否有滑动的位子  没有滑动的位子保持不动*/
        else{
            currentY = minPosition;
            /*加过渡*/
            addTransition();
            /*做定位*/
            setTranslateY(currentY);
        }

    });
};
/*右侧栏的滑动*/
function rightSwipe(){
    /*插件的掉*/
    itcast.iScroll({
        swipeDom:document.querySelector('.category_right'),
        swipeType:'y',
        swipeDistance:100
    });
};
