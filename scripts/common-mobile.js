var toast = (function (layer) {

    /*加载中*/
    function loading() {
        return layer.open({
            type: 2,
            shadeClose: false,
            shade: 'background-color: rgba(0,0,0,.3)',
        });
    }

    /*关闭弹出层*/
    function close(idx) {
        layer.close(idx);
    }

    /*错误提示*/
    function error(msg) {
        msgFactory(msg, 0);
    }

    /*成功提示*/
    function success(msg) {
        msgFactory(msg, 1);
    }

    /*警告提示*/
    function warning(msg) {
        msgFactory(msg, 2);
    }
    //message 消息生成工厂
    function msgFactory(msg, msgType) {

        var iconClass = "layui-icon layui-icon-close-fill danger";

        switch (msgType) {
            case 0: //错误
                iconClass = "layui-icon layui-icon-close-fill danger";
                break
            case 1: //成功
                iconClass = "layui-icon layui-icon-ok-circle success";
                break;
            case 2: //警告
                iconClass = "layui-icon layui-icon-about warning";
                break
            default: //默认错误
                iconClass = "layui-icon layui-icon-close-fill danger";
        }

        layer.open({
            content: '<div class="flex-row"><span class="' + iconClass + ' font14"></span> <span style="vertical-align:top;padding-left:15px">' + msg + '</span></div>',
            time: 1.5,
            skin: 'msg',
            anim: 'scale',
            style: "background:#fff;color:#333;box-shadow:0 0 10px rgba(0,0,0,.3);min-width:200px;text-align:left;height:40px;top:0",
        });
    }

    /*页面层modal弹窗*/
    function modal(obj) {
        var _obj = {
            domid: obj.domid || 'modal',
            content: obj.content || "",
            showOperateBar: obj.showOperateBar || false,
            dateContainer: obj.dateContainer || false
        }
        var operateBar = '<div class="flex-row space-between padding-between btm-wired">' +
            '<span class="danger height40" style="line-height:0.4rem" id="cancel">取消</span>' +
            '<span class="info height40 align-item-center" style="line-height:0.4rem" id="confirm">确定</span>' +
            '</div>';
         var idx  = layer.open({
            type: 1,
            content: '<div id="' + _obj.domid + '" class="modal">' + (_obj.showOperateBar ? operateBar : '') +
                _obj.content +
                '<div class="hide" id="dateContainer"></div>' +
                '<div class="hide" id="priceContainer"></div>',
            anim: 'up',
            style: 'position:fixed; bottom:0; left:0; width: 100%;max-height:5rem;border:none;overflow-y:scroll;min-height:3rem',
            shade: true,
            success: function (elem) {
                var _$eleCancel = $(elem).find('#cancel');
                var _$eleConfirm = $(elem).find('#confirm');
                _$eleCancel.on('click', function () {
                    layer.close(idx);
                });

                _$eleConfirm.on('click', function () {

                    if (_obj.dateContainer) { //获取隐藏的日期,价格
                        var price = $('#priceContainer').text();
                        var date = $('#dateContainer').text();
                        if ($.trim(date) != '') {
                            var html = "<span>" + date + "</span>" +
                                "<span>" + price + "</span>";

                            $('#' + _obj.dateContainer).html(html);
                        }

                    }
                   layer.close(idx);
                });
            }
        });
    }

    /*页面层底部对话框*/

    function dialog(domid, data) {
        //底部对话
        var elems = "";
        $.each(data, function (i, item) {
            elems += '<div class="dialog-item btm-wired" id="' + item.id + '" style="border-radius:5px">' + item.name + '</div>';
            console.log(i);
        });
        var html = ['<div class="flex-column dialog">',
            elems,
            '</div>'
        ].join(' ');

        var idx = layer.open({
            content: html,
            btn: ['取消'],
            skin: 'footer',
            success: function (elem) {
                var arr = $(elem).find('.dialog-item');

                arr.each(function (i) {
                    $(this).on('click', function () {
                        $('#' + domid).val($(this).text());
                        layer.close(idx);
                    });
                });
            }
        });
    }

    /**
     * 全屏页面
     * @param(string) html字符串
     */
    function page(html){

        var idx  = layer.open({
            type: 1
            ,content: '<span class="layui-icon layui-icon-left" onclick="layer.closeAll()"></span>'
            ,anim: 'up'
            ,style: 'position:fixed; left:0; top:0; width:100%; height:100%; border: none; -webkit-animation-duration: .5s; animation-duration: .5s;'
          });
    }
    //to do get data
    function modalFloat(data){
        var tempalte = '<div class="flex-column">'+'<span class="layui-icon layui-icon-close" style="position:absolute;right:0.1rem" onclick="layer.closeAll()"></span>'
                        +'<div><h4 class="txt-align-center">这是标题</h4></div>'
                        +'<div style="overflow-y: scroll;position: absolute;top: 0.4rem;bottom: 0.1rem;left:0;right:0">'
                        +'<div class="carousel">'+
                        '<div class="swiper-container carousel-container">'
                        +'<div class="swiper-wrapper"><div class="swiper-slide">slider1</div><div class="swiper-slide">slider2</div><div class="swiper-slide">slider3</div>'
                        +'</div>'+'<div class="swiper-button-prev carousel-pre"></div><div class="swiper-button-next carousel-next"></div></div>'
                        +'</div>'
                        +'<div class="margin-top" style="overflow-y:scroll;margin-bottom:0.1rem;padding:0.1rem">Layui 是一款采用自身模块规Layui 是一款采用自身模块规范编写的情怀型前端UI框架,遵循原生HTML/CSS/JS的书写与组织形式,门槛极低,拿来即用。其外在极简,却又不失饱满的内在,体积轻盈,组件Layui 是一款采用自身模块规范编写的情怀型前端UI框架,遵循原生HTML/CSS/JS的书写与组织形式,门槛极低,拿来即用。其外在极简,却又不失饱满的内在,体积轻盈,组件Layui 是一款采用自身模块规范编写的情怀型前端UI框架,遵循原生HTML/CSS/JS的书写与组织形式,门槛极低,拿来即用。其外在极简,却又不失饱满的内在,体积轻盈,组件Layui 是一款采用自身模块规范编写的情怀型前端UI框架,遵循原生HTML/CSS/JS的书写与组织形式,门槛极低,拿来即用。其外在极简,却又不失饱满的内在,体积轻盈,组件Layui 是一款采用自身模块规范编写的情怀型前端UI框架,遵循原生HTML/CSS/JS的书写与组织形式,门槛极低,拿来即用。其外在极简,却又不失饱满的内在,体积轻盈,组件Layui 是一款采用自身模块规范编写的情怀型前端UI框架,遵循原生HTML/CSS/JS的书写与组织形式,门槛极低,拿来即用。其外在极简,却又不失饱满的内在,体积轻盈,组件范编写的情怀型前端UI框架,遵循原生HTML/CSS/JS的书写与组织形式,门槛极低,拿来即用。其外在极简,却又不失饱满的内在,体积轻盈,组件</div>'
                        +'</div>'
                        +'</div>';

        var idx  = layer.open({
            type: 1
            ,content: tempalte
            ,anim: 'up'
            ,style: 'position:fixed; left:.2rem; top:1rem;bottom:1rem;right:.2rem;border: none; -webkit-animation-duration: .5s; animation-duration: .5s;border-radius:5px',
            success :function(elem){
                var mySwiper = new Swiper('.carousel-container', {
                    loop:true,
                    navigation: {
                      nextEl: '.carousel-pre',
                      prevEl: '.carousel-next',
                    },
                  });
            }
          });
    }
    return {
        loading: loading,
        close: close,
        error: error,
        success: success,
        warning: warning,
        modal: modal,
        dialog: dialog,
        page:page,
        modalFloat:modalFloat
    }
})(layer);

//defer模块包装request
var defer = (function (toast) {
    var d = $.Deferred();

    function _createDefer(fn) {
        //标记loading弹窗,用于关闭
        var index = "";
        return function (obj) {

            obj.success = function (res) {
                if (res.code == '200') {
                    toast.success(res.message);
                    d.resolve(res)
                } else {
                    toast.error(res.message)
                    d.reject(res.message)
                }
            }

            obj.error = function (error) {
                toast.error("网络请求错误" + error.status);
                d.reject(error)
            }

            obj.beforeSend = function () {
                index = toast.loading();
            }

            obj.complete = function () {
                toast.close(index);
            }


            fn(obj);
            return d.promise()
        }
    }

    return {
        newDefer: _createDefer
    }
})(toast);


//http请求
var http = (function (defer) {
    /**
     * url:请求地址
     * data:请求数据,
     * method:请求方式,
     * dataType:处理跨域的方式,
     * async:异步还是同步
     */
    function _request(obj) {
        var params = {
            url: obj.url,
            data: obj.data || null,
            method: obj.method || 'get',
            //dataType:obj.dataType||'',
            async: obj.async || true
        }
        var request = defer.newDefer($.ajax);
        return request(params)
    }

    return {
        request: _request
    }
})(defer);


//格式化日期
var formatDate = (function () {
    /*
     * date:被格式的日期
     * fmtType: int 类型的值 0：yyyy-MM-dd，1：yyyy-MM-dd hh:mm:ss
     * 可以不传 fmtType 不传则为默认 yyyy-MM-dd
     * **/
    function newDate(date, fmtType) {
        if (date) {
            var formtType = fmtType || 0;
            var fmt = '';
            switch (formtType) {
                case 0:
                    fmt = 'yyyy-MM-dd'
                    break
                case 1:
                    fmt = 'yyyy-MM-dd hh:mm:ss'
                    break
                case 2:
                    fmt = 'hh:mm:ss'
                    break
                default:
                    fmt = 'yyyy-MM-dd'
            }
            Date.prototype.Format = function (fmt) {
                var o = {
                    "M+": this.getMonth() + 1, //月份
                    "d+": this.getDate(), //日
                    "h+": this.getHours(), //小时
                    "m+": this.getMinutes(), //分
                    "s+": this.getSeconds(), //秒
                    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                    "S": this.getMilliseconds() //毫秒
                };
                if (/(y+)/.test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                }
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt))
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            }
            return new Date(date).Format(fmt);
        } else
            return ""
    }

    /*
     *@param dateType string '0':今天；'1':昨天；'2':本周 '3'：上周 '4':本月; '5'：上月
     *@param formatType number 0:'yyyy-MM-dd' ; 1:'yyyy-MM-dd hh:mm:ss' ; 2:'hh:mm:ss'
     * */
    function getDurationTime(dateType, formatType) {
        var now = new Date();
        var nowDayOfWeek = now.getDay() + 1; //今天本周的第几天
        var nowDay = now.getDate(); //当前日
        var nowMonth = now.getMonth(); //当前月

        var nowYear = now.getYear(); //当前年

        nowYear += (nowYear < 2000) ? 1900 : 0; //

        var lastMonthDate = new Date(); //上月日期

        lastMonthDate.setDate(1);
        lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
        var lastYear = lastMonthDate.getYear();
        var lastMonth = lastMonthDate.getMonth();

        var format = formatType || 0;

        //获得某月的天数
        var getMonthDays = function (myMonth) {
            var monthStartDate = new Date(nowYear, myMonth, 1);
            var monthEndDate = new Date(nowYear, myMonth + 1, 1);
            var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
            return days;
        }

        var duration = null;

        switch (dateType) {
            case '0': //今天
                duration = newDate(now, format);
                break
            case '1': //昨天
                now.setDate(now.getDate() - 1);
                duration = newDate(now, format);
                break
            case '2': //本周
                var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
                var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek));
                duration = [newDate(weekStartDate, format), newDate(weekEndDate, format)];
                break
            case '3': //上周
                var lastWeekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 7);
                var lastWeekEndDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 1);
                duration = [newDate(lastWeekStartDate, format), newDate(lastWeekEndDate, format)];
                break;
            case '4': //本月
                var monthStartDate = new Date(nowYear, nowMonth, 1);
                var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
                duration = [newDate(monthStartDate, format), newDate(monthEndDate, format)];
                break;
            case '5': //上月
                var lastMonthStartDate = new Date(nowYear, lastMonth, 1);
                var lastMonthEndDate = new Date(nowYear, lastMonth, getMonthDays(lastMonth));
                duration = [newDate(lastMonthStartDate, format), newDate(lastMonthEndDate, format)];
                break;
            default:
                duration = newDate(now); //默认今天
        }
        return duration;
    }

    function getWeekDay(date){
        var weekDay =["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        return weekDay[new Date(Date.parse(date)).getDay()]
    }

    return {
        newDate: newDate,
        getDurationTime: getDurationTime,
        getWeekDay:getWeekDay
    }
})();
//日期选择

var datePicker = (function (layui,toast,formatDate) {

    /**
     * @param {string} domid (可不传)
     * @param {string} targetid （必传）
     * @param {string} minDate
     * @param {string} maxDate
     */
    function init(obj) {
        var _obj = {
            targetid:obj.targetid,
            type:obj.type||'0',
            isPrice:obj.isPrice||false
        }
        //生成弹窗
        var _domid = 'modal';
        try {
            toast.modal({
                domid: _domid,
                showOperateBar: true,
                dateContainer: _obj.targetid
            });
        } catch (e) {
            console.error('引用文件错误，请先引入toast');
        }

        try {
            //生成日期选择
            layui.use('laydate', function () {
                var laydate = layui.laydate;
                laydate.render({
                    elem: '#' + _domid,
                    position: 'static',
                    showBottom: false,
                    format: 'yyyy-MM-dd',
                    min: '2018-09-28',
                    max: '2018-10-07',
                    done: function (value, date) {
                        var _val = '';
                        var arr = value.split('-');
                        switch(_obj.type)
                        {
                            case '0':
                            _val  = arr[1]+'月'+arr[2]+"日";
                            break;
                            case '1':
                           try{ _val = arr[1]+'月'+arr[2]+"日"+" "+formatDate.getWeekDay(value);}catch(e){console.error("未正确引入formatDate")}
                            break;
                        }
                        $('#dateContainer').text(_val); //将日期放入自定义的隐藏div中
                    },
                    ready: function (date) {
                        reloadHtml(_domid);
                    },
                    change: function () {
                        reloadHtml(_domid);
                        if(_obj.isPrice)
                        {
                            var price = $('.layui-this').find('#ticketprice').text();
                            $('#priceContainer').text(price);//将价格放入自定义隐藏div中)
                        }
                    }
                });
            });
        } catch (e) {
            console.error('未引入layui.js');
        }
    }

    //创建重写内容
    function createHtml(nowday) {

        return "<div style='line-height:1.1;' class='flex-column'>" +
            "<span class='saleDay'>" + nowday + "</span>" +
            "<span class='disabled font10' id='ticketprice'>$123.8</span>" +
            "<span class='ticket-left info font10'>余200</span>" +
            "</div>";
    }
    //重写日历插件的内容
    function reloadHtml(domid) {
        var $tr = $('table tbody tr', '#' + domid);

        $tr.each(function (i, _tr) {
            var _$td = $(_tr).find('td');
            _$td.each(function (j, item) {
                if (!$(item).hasClass('laydate-disabled') && !$(item).hasClass('laydate-day-next')) {
                    $(item).html(createHtml($(item).text()));
                }
            });
        });
    }

    return {
        init: init
    }

})(layui, toast,formatDate);


//定义事件处理程序
var eventHandler = (function () {

    //添加事件处理程序
    function addHandler(elem, type, handler) {
        if (elem.addEventListener)
            elem.addEventListener(type, handler, false);
        else if (elem.attachEvent)
            elem.attachEvent('on' + type, handler);
        else
            elem['on' + type] = handler;
    }

    //移除事件处理程序
    function removeHandler(elem, type, handler) {
        if (elem.removeEventListener)
            elem.removeEventListener(type, handler, false);
        else if (elem.detachEvent)
            elem.detachEvent('on' + type, handler);
        else {
            elem['on' + type] = null;
        }
    }

    return {
        addHandler: addHandler,
        removeHandler: removeHandler
    }
})();

//滑动组件
var slider = (function () {

    var startPos = {},
        endPos = {},
        isScrolling = 0,
        slideLeft,
        slideRight;

    function handleEvent(event) {
        switch (event.type) {
            case 'touchstart':
                start()
                break;
            case 'touchmove':
                move();
                break;
            case 'touchend':
                end();
                break;
        }
    }

    function start() { //触屏开始
        var touch = event.targetTouches[0];
        startPos = {
            x: touch.pageX,
            y: touch.pageY,
            time: +new Date
        };
        isScrolling = 0;
    }

    function move() { //触屏移动
        if (event.targetTouches.length > 1 || event.scale && event.scale !== 1) return;
        var touch = event.targetTouches[0];
        endPos = {
                x: touch.pageX - startPos.x,
                y: touch.pageY - startPos.y
            },
            isScrolling = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1 : 0;
        if (isScrolling === 0) {
            event.preventDefault();
            console.log('横向滚动');
        }
    }

    function end() { //触屏结束
        var duration = +new Date - startPos.time;
        if (isScrolling === 0) {
            if (Number(duration) > 10) {
                if (endPos.x > 10) {
                    if (typeof (slideRight) == 'function')
                        slideRight();
                } else if (endPos.x < -10) {
                    if (typeof (slideLeft) == 'function')
                        slideLeft();
                }
            }
        }
    }

    /**
     * @param {string} elem 需要绑定的元素
     * @param {callback} left 左滑回调事件
     * @param {callback} right 右滑回调事件
     */
    function init(elem, left, right) {
        slideLeft = left; //定义左滑时的回调函数
        slideRight = right; //定义右滑时的回调函数

        var _elem = document.getElementsByClassName(elem)[0];

        eventHandler.addHandler(_elem, 'touchstart', handleEvent);
        eventHandler.addHandler(_elem, 'touchend', handleEvent);
        eventHandler.addHandler(_elem, 'touchmove', handleEvent);
    }

    return {
        init: init
    }
})(eventHandler, layui);


/*后退*/
function back() {
    history.back()
}
