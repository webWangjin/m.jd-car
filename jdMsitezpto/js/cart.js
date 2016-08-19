/**
 * ITCAST WEB
 * Created by zhousg on 2016/8/17.
 */
window.onload = function(){
    /*删除功能*/
    deleteFuc();
};
function deleteFuc(){
    /*
     * 1.点击删除按钮的时候
     * 1.1显示弹出层  改变display
     * 1.2弹出框已动画的形式进入  写动画序列  动态的加上动画属性
     * 1.3动画的打开盖子 加过渡 改变属性
     * 2.点击取消按钮的时候
     * 2.1关闭弹出层 改变display
     * 2.2动画的盖上盖子  加过渡 还原属性
     * */
    /* animate.css 第三方的动画库 */


    /*获取dom元素*/
    /*所有的删除元素*/
    var deleteBtns = document.querySelectorAll(".delete_box");
    /*弹出框*/
    var jdWin = document.querySelector('.jd_win');
    /*弹出盒子*/
    var jdWinBox = jdWin.querySelector('.jd_win_box');
    /*取消按钮*/
    var cancelBtn = jdWinBox.querySelector('.cancel');
    /*删除按钮*/
    var up = null;

    /*给所有的删除按钮绑定clcik  fastclcik 提高响应速度*/
    for(var i = 0 ; i < deleteBtns.length ; i ++){
        deleteBtns[i].onclick = function(){
            /*
            * * 1.点击删除按钮的时候
             * 1.1显示弹出层  改变display
             * 1.2弹出框已动画的形式进入  写动画序列  动态的加上动画属性
             * 1.3动画的打开盖子 加过渡 改变属性
            */
            jdWin.style.display = 'block';
            jdWinBox.className = 'jd_win_box myBounceInDown';

            up = this.querySelector('.delete_box_up');

            up.style.webkitTransformOrigin = "left bottom";
            up.style.transformOrigin = "left bottom";

            up.style.webkitTransform = "rotate(-30deg) translateY(2px)";
            up.style.transform ="rotate(-30deg) translateY(2px)";
        }
    }

    cancelBtn.onclick = function(){
        /*
        *     * 2.点击取消按钮的时候
         * 2.1关闭弹出层 改变display
         * 2.2动画的盖上盖子  加过渡 还原属性
        * */

        jdWin.style.display = 'none';
        if(up){
            up.style.webkitTransform = "none";
            up.style.transform ="none";
        }
    }


}