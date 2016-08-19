/**
 * ITCAST WEB
 * Created by zhousg on 2016/8/14.
 */
window.onload = function(){
    /*搜索*/
    search();
    /*轮播图*/
    banner();
    /*倒计时*/
    downTime();
};
/*搜索*/
function search(){
    /*
    * 1.页面初始化的时候要求是透明的背景   css  rgba
    * 2.页面滑动的时候要求背景  逐渐的加深  （在一定范围内  轮播图的高度） onscroll
    * 3.页面滑动到一定的距离不需要做改变
    * */

    /*获取dom元素*/
    /*搜索栏*/
    var search = document.querySelector('.jd_header_box');
    /*轮播图*/
    var banner = document.querySelector('.jd_banner');
    /*获取高度*/
    var height = banner.offsetHeight;

    /*2.页面滑动的时候要求背景  逐渐的加深*/
    /*3.页面滑动到一定的距离不需要做改变*/
    /*监听页面滚动事件*/
    window.onscroll = function () {
        //console.log(0);
        /*页面滚动的时候距离文档顶部的高度*/
        var top = document.body.scrollTop;/*IE document.documentElement.scrollTop*/
        /*拿到它的目的是  和轮播图的高度在比较*/
        /*不停的改变透明度*/
        var opacity = 0;
        if(top < height){
            /*计算透明度*/
            opacity = 0.85*(top/height);
        }
        else{
            opacity = 0.85;
        }
        /*操作dom*/
        search.style.background = ' rgba(201,21,35,'+opacity+')';
    }
}
/*轮播图*/
function banner(){
    /*
    * 1.自动轮播  定时器  无缝衔接  动画结束瞬间定位
    * 2.点需要随着轮播的滚动改变对应的点  改变当前样式  当前图片的索引
    * 3.手指滑动的时候让轮播图滑动   touch事件  记录坐标轴的改变 改变轮播图的定位（位移css3）
    * 4.当滑动的距离不超过一定的距离的时候  需要吸附回去  过渡的形式去做
    * 5.当滑动超过了一定的距离  需要 跳到 下一张或者上一张  （滑动的方向） 一定的距离（屏幕的三分之一）
    * */

    /*获取dom元素*/
    /*轮播图大盒子*/
    var banner = document.querySelector('.jd_banner');
    /*图片的宽度*/
    var width = banner.offsetWidth;
    /*图片盒子*/
    var imageBox = banner.querySelector('ul:first-child');
    /*点盒子*/
    var pointBox = banner.querySelector('ul:last-child');
    /*所有的点*/
    var points = pointBox.querySelectorAll('li');

    /*公用方法*/
    /*加过渡*/
    var addTransition = function(){
        imageBox.style.transition = "all 0.3s";
        imageBox.style.webkitTransition = "all 0.3s";/*做兼容*/
    };
    /*清除过渡*/
    var removeTransition = function(){
        imageBox.style.transition = "none";
        imageBox.style.webkitTransition = "none";
    }
    /*定位*/
    var setTranslateX = function(translateX){
        imageBox.style.transform = "translateX("+translateX+"px)";
        imageBox.style.webkitTransform = "translateX("+translateX+"px)";
    }

    /*功能实现*/
    /*1.自动轮播  定时器  无缝衔接  动画结束瞬间定位*/
    var index = 1;/*贯穿整个程序*/
    var timer = setInterval(function(){
        /*自动轮播到下一张*/
        index ++ ;
        /*改变定位  动画的形式去改变  transition transform translate*/
        /*加过渡*/
        addTransition()
        /*定位   -index*width*/
        setTranslateX(-index*width);
    },4000);

    /*等过渡结束之后来做无缝衔接*/
    itcast.transitionEnd(imageBox,function(){
        /*处理事件结束后的业务逻辑*/
        if(index >= 9 ){
            index = 1;
            /*清除过渡*/
            removeTransition();
            /*定位过去*/
            setTranslateX(-index*width);
        }else if(index <= 0){
            index = 8;
            /*清除过渡*/
            removeTransition();
            /*定位过去*/
            setTranslateX(-index*width);
        }
        /*在这代码的地方 index 取值范围？ 1-8*/
        /*2.点需要随着轮播的滚动改变对应的点*/
        setPoint();
    });

    /*改变当前样式  当前图片的索引*/
    var setPoint = function(){
        /*index 1-8*/
        /*清除上一次的now*/
        for(var i = 0 ; i < points.length ; i++){
            points[i].className = " ";
        }
        /*给图片对应的点加上样式*/
        points[index-1].className = "now";
    }

    /*imageBox.addEventListener('transitionEnd',function(){
        console.log('transitionEnd');
        /!*相同的业务逻辑*!/
        if(index >= 9 ){
            index = 1;
            /!*清除过渡*!/
            removeTransition();
            /!*定位过去*!/
            setTranslateX(-index*width);
        }else if(index <= 0){
            index = 8;
            /!*清除过渡*!/
            removeTransition();
            /!*定位过去*!/
            setTranslateX(-index*width);
        }
    });
    imageBox.addEventListener('webkitTransitionEnd',function(){
        console.log('webkitTransitionEnd');
        /!*相同的业务逻辑*!/
        console.log(index);
        if(index >= 9 ){
            index = 1;
            /!*清除过渡*!/
            removeTransition();
            /!*定位过去*!/
            setTranslateX(-index*width);
        }else if(index <= 0){
            index = 8;
            /!*清除过渡*!/
            removeTransition();
            /!*定位过去*!/
            setTranslateX(-index*width);
        }
    });*/


    /*
     3.手指滑动的时候让轮播图滑动   touch事件  记录坐标轴的改变 改变轮播图的定位（位移css3）
     4.当滑动的距离不超过一定的距离的时候  需要吸附回去  过渡的形式去做
     5.当滑动超过了一定的距离  需要 跳到 下一张或者上一张  （滑动的方向） 一定的距离（屏幕的三分之一）
   */

    /*touch事件*/
    var startX = 0;/*记录起始  刚刚触摸的点的位置  x的坐标*/
    var moveX = 0;/*滑动的时候x的位置*/
    var distanceX = 0;/*滑动的距离*/
    var isMove = false;/*是否滑动过*/

    imageBox.addEventListener('touchstart',function(e){
        /*清除定时器*/
        clearInterval(timer);
        /*记录起始X*/
        startX = e.touches[0].clientX;
    });
    imageBox.addEventListener('touchmove',function(e){
        /*滑动时候的X*/
        moveX = e.touches[0].clientX;
        /*计算移动的距离*/
        distanceX = moveX - startX;
        console.log(distanceX);
        /*计算当前定位  -index*width+distanceX */
        /*滑动*/
        /*清除过渡*/
        removeTransition();
        /*实时的定位*/
        setTranslateX(-index*width+distanceX);
        /*证明滑动过*/
        isMove = true;
    });
    /*在模拟器上模拟的滑动会有问题 丢失的情况  最后在模拟器的时候用  window*/
    window.addEventListener('touchend',function(e){
        /*1.滑动超过 1/3 2.滑动过的*/
        if(isMove && Math.abs(distanceX) > width/3){
            /*5.当滑动超过了一定的距离  需要 跳到 下一张或者上一张  （滑动的方向）*/
            /*上一张*/
            if(distanceX > 0){
                index --;
            }
            /*下一张*/
            else{
               index ++;
            }
            /*加过渡*/
            addTransition();
            /*定位*/
            setTranslateX(-index*width);
        }else {
            /*4.当滑动的距离不超过一定的距离的时候  需要吸附回去 */
            /*加过渡*/
            addTransition();
            /*定位*/
            setTranslateX(-index*width);
        }

        /*1.重置参数*/
        startX = 0;
        moveX = 0;
        distanceX = 0;
        isMove = false;
        /*2.加定时器*/
        /*严谨 再清除一次定时器*/
        clearInterval(timer);
        timer= setInterval(function(){
            /*自动轮播到下一张*/
            index ++ ;
            /*改变定位  动画的形式去改变  transition transform translate*/
            /*加过渡*/
            addTransition()
            /*定位   -index*width*/
            setTranslateX(-index*width);
        },1000);
    });
}
/*倒计时*/
function downTime(){
    /*
    * 1.需要倒计时的时间
    * 2.没一秒钟来刷新 事件dom的内容
    * */

    var time = 4 ;
    var timer = null;

    /*获取dom*/
    var skTime = document.querySelector('.sk_time');
    /*所有的span*/
    var spans = skTime.querySelectorAll('span');

    timer = setInterval(function(){
        time --;

        /*不足与去倒计时的时候*/
        if(time < 0){
            clearInterval(timer);
            return false;
        }

        /*时间格式的转化*/
        /* h  m  s */
        var h = Math.floor(time/3600);/*floor向下取整  ceil向上取整 */
        var m = Math.floor(time%3600/60);
        var s = time%60;

        /*改变dom的内容*/
        spans[0].innerHTML = Math.floor(h/10);
        spans[1].innerHTML = h%10;

        spans[3].innerHTML = Math.floor(m/10);
        spans[4].innerHTML = m%10;

        spans[6].innerHTML = Math.floor(s/10);
        spans[7].innerHTML = s%10;

    },1000);
}

