var tocken = ""; // 请求认真
var contextPath = getContextPath();
//DES加密
function encryptByDESLogin(message) {
    var key = "^75$gh@`0dfx";
    var keyHex = CryptoJS.enc.Utf8.parse(key);
    var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
}
/**
 * 判断是否有权限操作
 * @param actionNo
 * 0:代码没有权限 1:代表有权限
 */
function hasAuth(actionNo) {
    var loginUserStr = sessionStorage.getItem("loginUser");
        var loginUser = JSON.parse(loginUserStr)||{};
        if (loginUser.hasOwnProperty('actionList'))
        {
            var actionList = loginUser.actionList;
            for (var i = 0; i < actionList.length; i++) {
                var action = actionList[i];
                if (action.actionNo != null && actionNo == action.actionNo) {
                    return "1";
                }
            }
        }
    return "0";
}
/**
 * 获取contextPath
 * @returns
 */
function getContextPath() {
    var pathName = document.location.pathname;
    var index = pathName.substr(1).indexOf("/");
    var result = pathName.substr(0,index+1);
    return "";
}

//返回上一级
function back() {
    var backUrl =  window.parent.$('#backUrl').attr("href");
    window.parent.$("#mainframe").attr("src",backUrl);
    window.parent.scroll(0,0);
}


var loadObj = null;
//---------------------------------------请不要再用这里的方法了，即将被废弃-----------------------------------------
/**
 * 锁定界面(带默认文本)
 */
function lockPage2() {
    loadObj = layer.load("正在提交…"); //需关闭加载层时，执行layer.close(loadi)即可
}
/**
 * 锁定界面(带默认文本)
 */
function lockPage4() {
    loadObj = layer.load("正在加载中…"); //需关闭加载层时，执行layer.close(loadi)即可
}
/**
 * 锁定界面
 */
function lockPage() {
    loadObj = layer.load(); //需关闭加载层时，执行layer.close(loadi)即可
}
/**
 * 锁定界面
 * @param str 显示文本
 */
function lockPage3(str) {
    loadObj = layer.load(str); //需关闭加载层时，执行layer.close(loadi)即可
}
/**
 * 关闭锁定界面
 */
function unLockPage() {
    layer.close(loadObj);
}
/**
 * 关闭锁定界面
 */
function unLockPage2() {
    layer.close(loadObj);
}
/**
 * 弹出提示消息
 * @param str
 */
function showMessage(str) {
    layer.msg(str,{icon: 12});
}
/**
 * 弹出提示消息并自动关闭
 * @param mes 消息内容
 * @param index 关闭窗口索引
 * @param type 1：消息 2：错误
 */
function showMessage(mes,index,type) {
    layer.msg(mes, {
        icon: type,
        time: 2300 //2秒关闭（如果不配置，默认是3秒）
    }, function(){
        layer.close(index);
    });
}
//----------------------------------------------end-------------------------------------
/**
 * 删除数据
 * @param ids 删除数据id字符串
 * @param formId form表单id
 * @param grid grid列表名字
 * @param url 删除地址
 */
function deleteObj(ids,formId,grid,url){
    var url = contextPath+url;
        parent.layer.confirm('您确定要删除该条纪录吗?', {
        icon: 0,
        title:'提示',
        skin: 'layer-ext-myskin'
    }, function(index){
        // $('.layui-layer-btn0').unbind('click');
        $.post(url,{ids:ids},function(result){
            var obj = result;
            var mes = obj.message;
            if(200 == obj.code) {
                if (grid != null && grid != '') {
                    reloadGrid(formId,grid);
                }
                parent.layer.closeAll();
                showMessage(mes,index,1);
            } else {
                parent.layer.closeAll();
                showMessage(mes,index,2);
            }
        })
    });
}

/**
 * 操作数据
 * @param ids 操作数据id字符串
 * @param formId form表单id
 * @param grid grid列表名字
 * @param url 请求地址
 * @param msg 提示消息
 */
function operateObj(ids,formId,grid,url,msg){
    var url = contextPath+url;
    parent.layer.confirm(msg, {
        icon: 0,
        title:'提示',
        skin: 'layer-ext-myskin'
    }, function(index){
        // $('.layui-layer-btn0').unbind('click');
        $.post(url,{ids:ids},function(result){
            var obj = result;
            var mes = obj.message;
            if(200 == obj.code) {
                if (grid != null && grid != '') {
                    reloadGrid(formId,grid);
                }
                parent.layer.closeAll();
                showMessage(mes,index,1);
            } else {
                parent.layer.closeAll();
                showMessage(mes,index,2);
            }
        })
    });
}

/**
 * 用于查询
 * @param id  查询表单id
 * @param grid 数据表格名字
 */
function search(id, grid) {
    //$("#Pagination").pagination(0);
    //$('#page').val(1);
    var query = $('#' + id).serializeArray();
    var page = grid.get('page');
    grid.set({
        parms : query
    });
    if (page == 1) {
        grid.loadData();
    } else {
        grid.changePage('first');
    }
}
//查询
function resetSearch() {
    search('queryForm',g);
}

/**
 * 刷新grid列表数据
 * @param formId form表单id
 * @param grid grid列表名字
 */
function reloadGrid(formId,grid){
    var query = $('#'+formId).serializeArray();
    grid.set({parms : query});
    grid.loadData();
}

/*------------------表单验证start----------------------------------*/
/**
 * 验证邮件是否合法
 * @param emailStr 需要验证的邮件
 * @returns {Boolean} true为合法 false为不合法
 */
function checkEmail(emailStr) {
    var objReg = new RegExp("[A-Za-z0-9-_]+@[A-Za-z0-9-_]+[\.][A-Za-z0-9-_]");
    var IsRightFmt = objReg.test(emailStr);
    var objRegErrChar = new RegExp("[^a-z0-9-._@]","ig");
    var IsRightChar = (emailStr.search(objRegErrChar)==-1);
    var IsRightLength = emailStr.length <= 60;
    var IsRightPos = (emailStr.indexOf("@",0) != 0 && emailStr.indexOf(".",0) != 0 && emailStr.lastIndexOf("@")+1 != emailStr.length && emailStr.lastIndexOf(".")+1 != emailStr.length);
    var IsNoDupChar = (emailStr.indexOf("@",0) == emailStr.lastIndexOf("@"));
    if(IsRightFmt && IsRightChar && IsRightLength && IsRightPos && IsNoDupChar)  {
        return true;
    } else {
        return false;
    }
}

/**
 * 验证身份证号码是否合法
 * @param idNo 身份证号码
 * @returns {Boolean} true为合法 false为不合法
 */
function checkIdNo(idNo) {
    var regex = '';
    if (idNo.length == 0) {
        return false;
    }
    //var errors = new Array("","身份证号码位数不对!","身份证号码出生日期超出范围或含有非法字符!","身份证号码校验错误!","身份证地区非法!");
    var area = {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
    var Y,JYM;
    var S,M;
    if (!/^\d{17}(\d|x)$/i.test(idNo)) {
        return false;
    }
    var idcard_array = new Array();
    idcard_array = idNo.split("");
    if (area[parseInt(idNo.substr(0,2))] == null) {
        return false;
    }
    switch(idNo.length) {
        case 15:
            if ((parseInt(idNo.substr(6,2))+1900) % 4 == 0 || ((parseInt(idNo.substr(6,2))+1900) % 100 == 0 && (parseInt(idNo.substr(6,2))+1900) % 4 == 0 )) {
                regex = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;//测试出生日期的合法性
            } else {
                regex = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;//测试出生日期的合法性
            }
            if (regex.test(idNo)) {
                return true;
            }  else {
                return false;
            }
            break;
        case 18:
            if ( parseInt(idNo.substr(6,4)) % 4 == 0 || (parseInt(idNo.substr(6,4)) % 100 == 0 && parseInt(idNo.substr(6,4))%4 == 0 )) {
                regex = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;//闰年出生日期的合法性正则表达式
            } else {
                regex = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;//平年出生日期的合法性正则表达式
            }
            if(regex.test(idNo)) {
                S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 + parseInt(idcard_array[7]) * 1 + parseInt(idcard_array[8]) * 6 + parseInt(idcard_array[9]) * 3 ;
                Y = S % 11;
                M = "F";
                JYM = "10X98765432";
                M = JYM.substr(Y,1);
                if(M == idcard_array[17]) {
                    return true ;
                } else {
                    return false;
                }
            } else {planCalendar
                return false;
            }
            break;
        default:
            return false;
            break;
    }
}

/**
 * 验证电话是否合法
 * @param telePhonestr 电话号码
 * @returns true为合法 false为不合法
 */
function checkTelePhone(telePhonestr) {
    //电话号码
    var pattern = /^((\(\d{3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}$/;
    return pattern.test(telePhonestr);
}
/**
 * 验证手机号码是否合法
 * @param mobilephoneStr 手机号码
 * @returns true为合法 false为不合法
 */
function checkMobilephone(mobilephoneStr) {
    //手机号码
    var pattern = /^1\d{10}$/;
    return pattern.test(mobilephoneStr);
}
/**
 * 验证QQ是否合法
 * @param qqStr QQ号码
 * @returns true为合法 false为不合法
 */
function checkQQ(qqStr) {
    //腾讯QQ
    var pattern = /^[1-9][0-9]{4,}$/;
    return pattern.test(qqStr);
}

/**
 * 验证密钥是否合法
 * @param key 密钥
 * @returns true为合法 false为不合法
 */
function checkKey(key) {
    var pattern = /^[0-9]{1,3}$/;
    return pattern.test(key);
}

/**
 * 验证用户名是否合法
 * @param userName 用户名
 * @returns true为合法 false为不合法
 */
function checkUserName(userName) {
    //用户名
    var pattern =  /^[a-zA-Z0-9_]{1,20}$/;
    return pattern.test(userName);
}
/**
 * 验证个人网站是否合法
 * @param str_url URL
 * @returns {Boolean} true为合法 false为不合法
 */
function checkURL(str_url) {
    var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
        + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
        + "(([0-9]{1,3}.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
        + "|" // 允许IP和DOMAIN（域名）
        + "([0-9a-z_!~*'()-]+.)*" // 域名- www.
        + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]." // 二级域名
        + "[a-z]{2,6})" // first level domain- .com or .museum
        + "(:[0-9]{1,4})?" // 端口- :80
        + "((/?)|" // a slash isn't required if there is no file name
        + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
    var re=new RegExp(strRegex);
    if (re.test(str_url)) {
        return (true);
    } else {
        return (false);
    }
}
/**
 * 验证邮编是否合法
 * @param postCodeStr 邮编号码
 * @returns true为合法 false为不合法
 */
function checkpostCode(postCodeStr) {
    //邮编
    var pattern = /^[1-9]\d{5}$/;
    return pattern.test(postCodeStr);
}
/**
 * 检测图片类型是否支持
 * @param picType 图片类型 如：".jpg"
 * @returns {Boolean} true为合法 false为不合法
 */
function checkPicType(picType) {
    var picTypeArray = new Array(".jpg",".jpeg",".png",".bmp",".gif");
    for (var i = 0;i<picTypeArray.length;i++) {
        if (picTypeArray[i] == picType) {
            return true;
        }
    }
    return false;
}
/**
 * 判断字符串是否为空
 * @param str 字符串
 * @returns {Boolean}
 */
function isEmpty(str){
    if(str == null)
        return true;
    if(str == "")
        return true;
    // if(str.Trim() == "")
    //  	return true;
    if (str == "null") {
        return true;
    }
    return false;
}

/**
 * 判断对象是否为空
 * @param obj
 * @returns {boolean}
 */
function isEmptyObj(obj) {
    if ( obj == null || obj == undefined || obj == "undefined" || obj.trim() == ""){
        return true;
    }
    return false;
}

/**
 * 判断价格是否合法
 * @param str
 * @returns
 */
function checkPrice(str){
    var patrn=/^\d+(\.[0-9]{0,2})?$/;
    var result = patrn.exec(str);
    if (result == null) {
        return false;
    }
    return result;
}
/**
 * 判断是否为整形
 * @param str
 * @returns
 */
function checkInteger(str){
    var patrn=/^\d{1,11}$/;
    return patrn.exec(str);
}

/**
 * 验证是否为正整数
 * @param str
 * @returns {RegExpExecArray}
 */
function checkRightInteger(str) {
    var patrn = /^[0-9]*[1-9][0-9]*$/;
    return patrn.exec(str);
}
/**
 * 判断日期格式是否正确：yyyy-MM-dd HH:mm (没有秒)
 * @param str
 * @returns
 */
function checkDate(str) {
    var patrn=/^((\d{2}(([02468][048])|([13579][26]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|([1-2][0-9])))))|(\d{2}(([02468][1235679])|([13579][01345789]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|(1[0-9])|(2[0-8]))))))(\s((([0-1][0-9])|(2?[0-3]))\:([0-5]?[0-9])))?$/;
    return patrn.exec(str);
}
/**
 * 判断日期格式是否正确：yyyy-MM-dd
 * @param str
 * @returns {Boolean}
 */
function checkDateYYYYMMDD(str){
    if (!/^19\d\d-[0-1]\d-[0-3]\d+$/.test(str) && !/^20\d\d-[0-1]\d-[0-3]\d+$/.test(str)) {
        return false;
    } else {
        return true;
    }
}

/**
 * 验证只能输入数字，输入其他内容时，替换为空字符串
 * @param obj
 * @returns {*|void|string}
 */
function verifyNumber(obj){
    if(isNaN($(obj).val()))
    {
        $(obj).val('');
    }
    // else if ( 0 == parseInt($(obj).val()) ){
    //     $(obj).val('');
    // }

}

/**
 * 只能输入字母和数字
 * @param obj
 */
function onlyLetterNumber(obj) {
    var patten = /^[0-9a-zA-Z]+$/;
    if(!patten.test($(obj).val())){
        $(obj).val("");
    }
}

/*------------------表单验证end----------------------------------*/

/*-------------------code 相关操作start------------------------------*/
/**
 * code格式化
 */
var CodeUtils = {
    "formatCode":function (codeName,codeKey) {
        var codeData = queryCodeData(codeName);
        for (var index in codeData)  {
            if(codeKey == codeData[index].codeKey) {
                return codeData[index].codeValue;
            }
        }
        return "";
    }
};

/**
 * 初始化radio
 * @type {{initRadio: RadioUtils.initRadio, initRadioHtml: (function(*, *): string)}}
 */
var RadioUtils = {
    "init":function (obj,params) {
        var paramJson = {
            domId:obj.domId,
            codeName:obj.codeName,
            codeKey:obj.codeKey||"",
            style:obj.style||"line",    //line放在一行 block放在一列
            domName:obj.domName||"defaultName"
        };
        var codeData ;
        var _params = params||"";
        if($('#'+paramJson.domId).data('url'))
            codeData = queryCodeData(null,$('#'+paramJson.domId).data('url')+_params);
        else
            codeData = queryCodeData(paramJson.codeName);

        var html =  this.initRadioHtml(codeData,paramJson);
        $("#"+obj.domId).html(html);
    },
    "initRadioHtml":function (codeData,paramJson) {
        var html = "";
        var codeKey = paramJson.codeKey;
        var styleClass = "radio radio-primary radio-inline";
        if(paramJson.style == "block") {
            styleClass = "radio radio-primary";
        }
        if(codeKey != null && codeKey  != '' && codeKey  != "undefined ") {
            for (var index in codeData) {
                html += "<div class=\"" + styleClass + "\">";
                if(codeKey == codeData[index].codeKey) {
                    html += "<input type=\"radio\" id=\"" + paramJson.domId + index + "\" value=\"" + codeData[index].codeKey + "\" name=\"" + paramJson.domName + "\" checked>"
                } else {
                    html += "<input type=\"radio\" id=\"" + paramJson.domId + index + "\" value=\"" + codeData[index].codeKey + "\" name=\"" + paramJson.domName + "\">"
                }
                html += "<label for=\"" + paramJson.domId + index + "\">" + codeData[index].codeValue + "</label>";
                html += "</div>";
            }
        } else {
            for (var index in codeData) {
                html += "<div class=\"" + styleClass + "\">";
                if(index == 0) {
                    html += "<input type=\"radio\" id=\"" + paramJson.domId + index + "\" value=\"" + codeData[index].codeKey + "\" name=\"" + paramJson.domName + "\" checked>"
                } else {
                    html += "<input type=\"radio\" id=\"" + paramJson.domId  + index + "\" value=\"" + codeData[index].codeKey + "\" name=\"" + paramJson.domName + "\">"
                }
                html += "<label for=\"" + paramJson.domId + index + "\">" + codeData[index].codeValue + "</label>";
                html += "</div>";
            }
        }
        return html;
    }
};

/**
 * 初始化check
 * @type {{initRadio: checkBoxUtils.initRadio, initRadioHtml: (function(*, *): string)}}
 */
var checkBoxUtils = {
    "init":function (obj,params) {
        var paramJson = {
            domId:obj.domId,
            codeName:obj.codeName,
            codeKeyStrs:obj.codeKeyStrs||"",
            style:obj.style||"line",    //line放在一行 block放在一列
            domName:obj.domName||""
        };
        var codeData ;
        var _params = params||"";
        if($('#'+paramJson.domId).data('url'))
            codeData = queryCodeData(null,$('#'+paramJson.domId).data('url'),_params)
        else
            codeData = queryCodeData(paramJson.codeName);

        var html =  this.initCheckBoxHtml(codeData,paramJson);
        $("#"+paramJson.domId).html(html);
    },
    "initCheckBoxHtml":function (codeData,paramJson) {
        var html = "";
        var codeKeyStrs = paramJson.codeKeyStrs;
        var codeKeyArray = null;
        if(codeKeyStrs != null && codeKeyStrs  != '' && codeKeyStrs  != "undefined") {
            codeKeyStrs = codeKeyStrs.charAt(codeKeyStrs.length - 1) == "," ? codeKeyStrs.substring(0,codeKeyStrs.length - 1) : codeKeyStrs;
            codeKeyArray = codeKeyStrs.split(",");
        }

        var styleClass = "checkbox checkbox-inline checkbox-primary";
        if(paramJson.style == "block") {
            styleClass = "checkbox checkbox-primary";
        }
        if(codeKeyArray != null && codeKeyArray.length > 0) {
            for (var index in codeData) {
                html += "<div class=\"" + styleClass + "\">";
                var checkFlag = false;
                for(var i = 0; i < codeKeyArray.length; i++) {
                    if(codeKeyArray[i] == codeData[index].codeKey) {
                        checkFlag = true;
                        break;
                    }
                }
                //var name = paramJson.domName + "[" + index + "]";
                var name = paramJson.domName;
                if(checkFlag) {
                    html += "<input id=\"" + paramJson.domId + index + "\" class=\"styled\" type=\"checkbox\" name=\"" + name + "\" value=\"" + codeData[index].codeKey + "\" checked>";
                } else {
                    html += "<input id=\"" + paramJson.domId + index + "\" class=\"styled\" type=\"checkbox\" name=\"" + name + "\" value=\"" + codeData[index].codeKey + "\">";
                }
                html += "<label for=\"" + paramJson.domId + index + "\">" + codeData[index].codeValue + "</label>";
                html += "</div>"
            }
        } else {
            for (var index in codeData) {
                //var name = paramJson.domName + "[" + index + "]";
                var name = paramJson.domName;
                html += "<div class=\"" + styleClass + "\">";
                html += "<input id=\"" + paramJson.domId + index + "\" class=\"styled\" type=\"checkbox\" name=\"" + name + "\" value=\"" + codeData[index].codeKey + "\">";
                html += "<label for=\"" + paramJson.domId + index + "\">" + codeData[index].codeValue + "</label>";
                html += "</div>"
            }
        }
        return html;
    }
};

/**
 * 根据code名称查询code
 * @param codeName
 */
function queryCodeData(codeName,url,para) {
    var codeData = codeName?sessionStorage.getItem(codeName):null;
    if(codeData != null && codeData  != '' && codeData  != "undefined ") {
        return JSON.parse(codeData);
    } else {
        $.ajax({
            type:'GET',
            async:false,
            url: url?url:"/login/privateAuthority/cacheAction/findCacheCodeByCodeName",
            data:codeName?{codeName:codeName}:para,
            dataType:"json",
            success: function (resultData) {
                if(resultData.code == 200) {
                    codeData = resultData.data;
                    sessionStorage.setItem(codeName,JSON.stringify(codeData));	//加入浏览器缓存
                } else {
                    console.log("code格式化失败,Code:" + resultData.code + ",message:" + resultData.message);
                }
            }
        });
    }
    return codeData;
}


/**
 * 下拉框插件公共方法(有code值 ，传值方式参考 非code下拉框 vat select = )
 * https://select2.org/programmatic-control/add-select-clear-items
 */

var SelectUtils = (function(){

    //参数配置
    function getParams(para){
        var _para = para||{};
        return {
            placeholder:'请选择',
            width:'220',
            language:'zh-CN',
            allowClear:true,
            multiple:_para.multiple||false,
            theme:'bootstrap',
            debug:true,
            allowClear:true
        }
    }
    //数据格式转换
    function _convertData(data,key,value,selectedKey,type){
        var newData = [];
        var flag = false;
        var selectedArr = [];
        if(selectedKey != '' && selectedKey != null && selectedKey!=undefined) {
            selectedArr = selectedKey.split(',');
            flag = true;        }
        if(data != null && data.length>0)
        {
            if ("1" == type) {
                newData.push({id:" ",text:"请选择"});
            } else if ("2" == type) {
                newData.push({id:" ",text:"全部"});
            } else if ("0" == type){

            }
            for(var i=0;i<data.length;i++)
            {
                var obj = {};
                obj['id'] = data[i][key];
                obj['text'] = data[i][value];
                if(flag) {
                    for (var j = 0; j < selectedArr.length; j++) {
                        if (data[i][key] == selectedArr[j]) {
                            obj['selected'] = true;
                            break;
                        }
                    }
                }
                newData.push(obj);
            }
        }
        return newData
    }

    //初始化下拉框
    function _init(obj){

        var _obj = {
            url:obj.url||'/login/privateAuthority/cacheAction/findCacheCodeByCodeName',
            codeName:obj.codeName,
            ele:obj.domId,
            para:obj.para,
            id:obj.codeKey,
            text:obj.codeValue,
            data:obj.data,
            type:obj.type||"1",
            selectedKey:obj.selectedKey //回显值id
        };
        if($('#'+_obj.ele).find('option').length>2)
        {
            _reload(_obj);
            return;
        }

        // if(_obj.url)
        //     $.getJSON(_obj.url+'?codeName='+_obj.codeName,function(res){
        //         var _data = res.data;
        var _data =  queryCodeData(_obj.codeName);
        var newData = _convertData(_data,_obj.id,_obj.text,_obj.selectedKey,_obj.type);
        var config = getParams(_obj.para);
        config.data = newData;
        $('#'+_obj.ele).select2(config);
        //     })
        // else
        // {
        //     var newData = _convertData(_obj.data,_obj.id,_obj.text);
        //     var config = getParams(_obj.para);
        //     config.data = newData;
        //     $('#'+_obj.ele).select2(config);
        // }
    }


    //刷新下拉列表
    function _reload(obj){
        var _obj = {
            url:obj.url||'/login/privateAuthority/cacheAction/findCacheCodeByCodeName',
            codeName:obj.codeName,
            ele:obj.ele,
            para:obj.para,
            id:obj.id,
            text:obj.text,
            data:obj.data,
            type:obj.type||"1",
            selectedKey:obj.selectedKey
        };
        var _ele =  $('#'+_obj.ele);
        var _data =  queryCodeData(_obj.codeName);
        var newData = _convertData(_data,_obj.id,_obj.text,_obj.selectedKey,_obj.type);
        _clear(newData,_ele);
        /*if(_obj.data)
        {
            $.getJSON(url,function(res){
                var _data = _convertData(res.data)
                _clear(_data,_ele,_obj.selectedKey);
            })
        }
        else
        {
            var _data = _convertData(_obj.data,_obj.selectedKey);
            _clear(_data,_ele);
        }*/
    }
    //重新生成列表项
    function _clear(data,ele){
        ele.empty();
        // var flag = false;
        // var selectedArr = [];
        // $.each(data,function(i,item){
        //     if(item.selected)
        //     {
        //         ele.append("<option value='"+item.id+"' selected>"+item.text+"</option>");
        //     }
        //     else
        //     {
        //         ele.append("<option value='"+item.id+"'>"+item.text+"</option>");
        //     }
        //     console.log(item)
        // });
        var config = getParams();
        config.data = data;
        ele.select2(config);
    }

    //监听选中值
    function onSelect(ele){
        var _ele =  $('#'+ele);
        _ele.on('select2:selecting',function (e) {
            var val = e.params.args.data.id;
            if ($.trim(val)=="")
                e.preventDefault();
        });
    }

    return {
        init:_init,
        reload:_reload,
        onSelect:onSelect
    }
})();
/*-------------------code 相关操作start------------------------------*/






/*************************************************************************/
/*---------------------------华丽的分割线----------------------------------*/
/*以下模块为基于jquery，layui的各种UI组件封装模块。如非特殊情况，请使用以下模块做开发以便于程序的扩展和维护*/
/**
 *包含模块说明
 * 1.通知模块：依赖layer.js
 * 2. defer 一种异步promise的替代方案，依赖1.5以上版本的jquery，很好用，很强大的功能
 * 3. http模块 只提供get/post请求
 * 4. form表单提交 需要依赖validationEngine 虽然用起来很方便，但是不够轻量
 * 5. boxUtil 用于生成checkbox和radiobox的公共方法，功能单一等待扩展
 * 6. calender 价格日历，依赖layui的日历模块和bootstrap的提示tooltip
 * 7. formatDate 可扩展的日期格式化方法，new Date()在IE11及以下有 对 YYYY-MM-DD 无法识别
 * 8. formatDate 价格表格方法，待完善
 * 9. FileInput 需要依赖bootstrap fileupload插件，很强大的插件，跟据需求配置，有写配置有相关性
 * 10. table ligerui 表格生成方法
 * 11. select 需要依赖select2 插件， 功能强大，拓展性强，可以满足大部分需求，使用时建议把原来的select控件隐藏了，这样就不会出现闪动的情况了
 * 12. comboselect 需要用到select模块。详情见模块说明
 * */

//强制360浏览器使不适用兼容模式<meta name="renderer" content="webkit">
var meta = document.createElement('meta');
meta.name = "renderer";
meta.content = "webkit";
document.getElementsByTagName('head')[0].appendChild(meta);

//通知提示模块
var toast = (function(layer){

    //错误提示
    function error(msg){
        parent.layer.msg(msg, {icon: 2});
    }

    //成功提示
    function success(msg){
        parent.layer.msg(msg, {icon: 1});
    }

    //警告提示
    function warning(msg){
        parent.layer.msg(msg, {icon: 7,anim:6,time:1000});
    }

    //加载提示
    function loading(){
        return parent.layer.load(1,{shade:0.3,scrollbar:false});
    }

    //关闭加载提示
    function closeLoad(index){
        parent.layer.close(index);
    }

    //弹出层
    function modal(url){
        parent.layer.open({
            type: 2,
            content: url,
            area:['600px','500px'],
            scrollbar:false,
            shadeClose:true,
            btn:['确定']
        });
    }

    //提示tip
    function tip(data,ele){
        layer.tips('hi',ele);
    }

    return {
        error:error,
        success:success,
        warning:warning,
        loading:loading,
        closeLoad:closeLoad,
        modal:modal,
        tip:tip
    }

})(layer);

//defer模块包装request
var defer = (function(toast){
    function _createDefer(fn){
        //标记loading弹窗,用于关闭
        var index ="";
        var _d = $.Deferred();
        return function(obj){

            obj.success = function(res)
            {
                if(res.code=='200')
                {
                    toast.success(res.message);
                    _d.resolve(res);
                }
                else if(res.code=='51009'){
                    top.location.href = "/index";
                }
                else if(res.code=='51004'){
                    top.location.href = "/noAuth";
                }
                else
                {
                    toast.error(res.message);
                    _d.reject(res.message);
                }
            }

            obj.error = function(error)
            {
                toast.error("网络请求错误"+error.status);
                _d.reject(error)
            }

            obj.beforeSend = function(){
                index = toast.loading();
            }

            obj.complete = function(){
                toast.closeLoad(index);
            }


            fn(obj);
            return _d.promise();
        }
    }

    return {
        newDefer:_createDefer
    }
})(toast);

//http请求模块
var http = (function(defer){
    /**
     * url:请求地址
     * data:请求数据,
     * method:请求方式,
     * dataType:处理跨域的方式,
     * async:异步还是同步
     */
    function _request(obj){
        var params =  {
            url:obj.url,
            data:obj.data||null,
            method:obj.method||'get',
            //dataType:obj.dataType||'',
            async:obj.async||true
        }
        var request = defer.newDefer($.ajax);

        return request(params)
    }

    return {
        request:_request
    }
})(defer);


/**
 *表单提交模块
 * 需要http模块，需要引入validationEngine
 * */
var form = (function(http){
    function _formSubmit(formId, elem, tableEle){
        var _elem =  $('#'+formId);
        //配置表单验证插件
        _elem.validationEngine('attach',{
            autoPositionUpdate:false,
            promptPosition:'bottomRight',
            autoHidePrompt:true,
            autoHideDelay:1500,
            addPromptClass:'formError-small formError-white',
        });

        var isPassed =_elem.validationEngine('validate');

        if(isPassed)
        {

            var actionUrl = _elem.attr('action');
            //表单数组序列化
            var formVal = _elem.serializeArray();
           // console.log(formVal)
            var obj = {};
            $.each(formVal,function(i,item){
                if((i-1)>=0&&item.name==formVal[i-1].name)
                {
                    obj[item.name] +=","+item.value;
                }
                else  obj[item.name] = item.value;
            })
           // console.log(obj);
            if (tableEle)
            {
                var productStrategyValue = $('#'+tableEle).data('name');
                var column = $('.price-column','#'+tableEle).find('td')
                var total = [],TOTAL=1;
                $.each(column,function(i,item){
                    var _obj = {};
                    var temp = $(item).find('input');
                  if(!(temp.attr('readonly')=="readonly")){
                      _obj.weekValue = TOTAL;
                      _obj.totalPrice = temp.val();
                      total.push(_obj);
                      TOTAL++;
                  }
                })
                obj[productStrategyValue] = JSON.stringify({weekList:total});
            }
            //禁用按钮
            elem.attr('disabled', true);
            //http 请求
            http.request({
                url:actionUrl,
                data:JSON.parse(JSON.stringify(obj)),
                method:"POST"
            })
                .done(function(res){
                    elem.attr('disabled',false);
                    //关闭iframe弹窗
                    var index = parent.layer.getFrameIndex(window.name);
                    parent.layer.close(index);
                    back();
                })
                .fail(function(error){
                    elem.attr('disabled',false);
                });
        }
        return isPassed
    }
    return{
        formSubmit:_formSubmit
    }
})(http);


/**
 * 序列化表单成json对象
 * @param formId form表单id
 * @returns json对象
 */
function serializeObject(formId, tableEle){
    if (formId == null || formId == ""){
        return null
    }
    var Arr = $("#" + formId).serializeArray();
    var o = {};
    $.each(Arr, function () {
        if(o[this.name]){
            if (!o[this.name].push){
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    })
    if (tableEle){
        var productStrategyValue = $('#'+tableEle).data('name');
        var column = $('.price-column','#'+tableEle).find('td')
        var total = [],TOTAL=1;
        $.each(column,function(i,item){
            var _obj = {};
            var temp = $(item).find('input');
            if(!(temp.attr('readonly')=="readonly")){
                _obj.weekValue = TOTAL;
                _obj.totalPrice = temp.val();
                total.push(_obj);
                TOTAL++;
            }
        })
        o[productStrategyValue] = JSON.stringify({weekList:total});
    }
    return JSON.parse(JSON.stringify(o))
}

/**
 * 获取 字符串拼接分隔符 "#DEMO#"
 * @returns {string}
 */
function getStringReplaceParam() {
    return "#DEMO#";
}

/**
 *生成checkbox和radiobox
 * */
var boxUtil= (function(){
    /*
    * @param boxType:string (radio/checkbox);
    * @param styleType:string (inline/"");控件排列方式 （横向/纵向）
    * @param domid:string dom attribute:id; 必填
    * @param key:string; 必填
    * @param text:string; 必填
    * */
    function createBox(obj,params){
        var _obj = {
            boxType:obj.boxType||"checkbox",
            styleType:obj.styleType||"inline",
            domid:obj.domId,
            key:obj.key,
            text:obj.text,
            name:obj.name,
            checkKey:obj.checkKey,
            isDisabled:obj.isDisabled||false
        }
        var _params = params||""
        initBox(_obj,_params);
    }

    function createHtml(para,data){

        var _params = {
            boxType:para.boxType,
            styleType:para.styleType,
            domid:para.domid,
            key:para.key,
            text:para.text,
            name:para.name,
            checkKey:para.checkKey||"",
            isDisabled:para.isDisabled||false
        }
        var _boxType = _params.boxType? _params.boxType:"checkbox";

        var boxClass = _boxType+" "+( _boxType+(_params.styleType=='inline'?"-inline ":""))+" "+(_boxType+"-primary");
        var html = "";
        var keyArr = []

        if($.trim(_params.checkKey)!=""&&_params.checkKey!=null&&_params.checkKey!=undefined)
        {
            keyArr = _params.checkKey.split(',');
        }
        //生成需要用到的html字符串
        $.each(data,function(i,item){
            html+=[
                '<div class="'+boxClass+'">',
                '<input type="'+_boxType+'" class="styled" id="'+item[_params.key]+"["+i+"]"+'" value="'+item[_params.key]+'" name="'+_params.name+'"',
               (keyArr.indexOf(item[_params.key].toString())!=-1?"checked":""),_params.isDisabled?' disabled':'','>',
                '<label for="'+item[_params.key]+"["+i+"]"+'">'+item[_params.text]+'</label>',
                '</div>'
            ].join(' ');
        })

        $('#'+_params.domid).html(html);
    }

   function initBox(para,urlParas){
        var url = $('#'+para.domid).data('url');
        $.getJSON(url,urlParas,function (res) {
            if('200'==res.code)
            {
                createHtml(para,res.data);
            }
            console.error('error! 网络请求错误');
        })
   }
    return {
        createBox:createBox
    }
})();

/**
 *价格日历生成方式
 * */
var calender = (function () {
    /**
     *@param(string) ele 目标元素
     * @param(JSON) data  数据类型
     * */
    function init(ele,data){
        try{
            var today = formatDate.newDate(new Date()).toString();
        }catch(e){
            console.error('formatDate方法未定义，需要引入datePicker.js');
        }
        var obj = {};
        obj[today] = "今日";
        var minDate = data[0].date;
        var maxDate = data[data.length-1].date;
        laydate.render({
            elem:'#'+ele,
            position:'static',
            showBottom:false,
            theme: 'grid',
           // mark:obj,
            min:minDate,
            max:maxDate,
            value:minDate,
            ready:function (date) {
                reloadHtml('dateTest',date);
            },
            change:function (value, date) {
                reloadHtml('dateTest',date);
            },
            done:function (value,date) {
                console.log(value)
            }

        })

        //创建重写内容
        function createHtml(nowday,date,type,settlementPrice,rackRatePrice,salePrice) {
            var tit = "<div style=\"padding: 10px;width: 200px\" class=\"text-left\">"
                +"<p>产品名称："+type+"</p>"
                +"<p>售价：￥"+salePrice+"</p>"+"<p>定价："+rackRatePrice+"</p><p>结算价："+settlementPrice+"</p>"+"<p>日期："+date+"</p>"
                +"</div>";

            return "<div data-toggle=\"tooltip\" data-placement=\"top\" title='"+tit+"'>" +
                "<p class='saleDay'>" + nowday + "</p>" +
                "<p id='ticketprice' style='padding-top: 10px;color: #fbb03b'>￥"+settlementPrice+"</p>"
                +"</div>";
        }
        //重写日历插件的内容
        function reloadHtml(domid,date) {
            var $td = $('table tbody td', '#' + domid);
            //var _arr = getDuration(date,data);
            var count= 0;
            $td.each(function (i,_td) {
                if (!$(_td).hasClass('laydate-disabled') && !$(_td).hasClass('laydate-day-next')&&!$(_td).hasClass('laydate-day-prev')){
                         var _day = $(_td).text();
                       $(_td).html(createHtml(_day,data[count].date,data[count].productName,data[count].settlementPrice,data[count].rackRatePrice,data[count].salePrice));
                    count++;
                }
            });

            //bootstrap tooltip控件
            $('[data-toggle="tooltip"]').tooltip({
                html:true
            })
        }
        //获取本年本月有效时间间隔
        function getDuration(arr){
            var month = date.month.toString();
            var year = date.year.toString();
            var dateArr = [];
            $.each(arr,function (i,item) {
                if(item['date'].split("-")[1]==month&&(item['date'].split("-")[0]==year))
                {
                    dateArr.push(arr[i]);
                }
            });

            return dateArr
        }

    }

    return {
        init:init
    }
})();
/**
 *时段计划价格日历生成方式
 * */
/**
 *@param(string) ele 目标元素
 * @param(JSON) data  数据类型
 * */
var planCalendar = (function(){
    var globalData = [];
    function init(ele,data,style){
        try{
            var today = formatDate.newDate(new Date()).toString();
        }catch(e){
            console.error('formatDate方法未定义，需要引入datePicker.js');
        }
        var obj = {};
        globalData = data;
        obj[today] = "今日";
        if(Array.isArray(data)&& data.length>0)
        {
            var minDate = data[0].date;
            var maxDate = data[data.length-1].date;
        }
        else
        {
            var minDate = "";
            var maxDate = "";
        }
        laydate.render({
            elem:'#'+ele,
            position:'static',
            showBottom:false,
            theme: 'grid',
            // mark:obj,
             min:minDate,
             max:maxDate,
            //value:minDate,
            ready:function (date) {
                reloadHtml(ele,date,style);
            },
            change:function (value, date) {
                reloadHtml(ele,date,style);
            },
            done:function (value,date) {
                //console.log(value)
            }
        })
        return $("#"+ele)
    }

    //重写日历插件的内容
    function reloadHtml(ele,date,style) {
        var $td = $('table tbody td', '#' + ele);
        //var _arr = getDuration(date,data);
        var btnAdd = "<button class='btn btn-success' onclick='btnAdd()'>添加时段</button>";
        var btnDel = "<button class='btn btn-success' onclick='btnDel()'>批量添加时段</button>";
        var divPeratte = "<div class='btn-bar'>"+btnAdd+btnDel+"</div>"
        $('.layui-laydate-main','#' + ele).append(divPeratte)
        var count= 0,arr = [];
        globalData.forEach(function(item,index){
            if (item.year == date.year && item.month == date.month && date.date == item.date)
                arr.push(item)
        });
        $td.each(function (i,_td) {
            if (!$(_td).hasClass('laydate-disabled') && !$(_td).hasClass('laydate-day-next')&&!$(_td).hasClass('laydate-day-prev')){
                var _day = $(_td).text();
                $(_td).data("id",arr[count].id)
                $(_td).html(createHtml(style,$(_td),_day,arr[count].plan,arr[count].book,arr[count].left,arr[count].id));
                if (style=='point')
                {
                    var str = "<p class='text-right'><i class='fa fa-circle pink'></i></p>";
                    $("#"+ele).addClass('point');
                    $(_td).append(str);
                }
                else
                {
                    $(_td).css('background',"#fdedf0");
                }
                count++;
            }
        });
    }

    //创建重写内容
    function createHtml(style,$td,nowday,plan,book,left,id) {
        var tit = "";
        if (style=="point")
        {
            var tit = "<p>"+nowday+"</p>"
                +"<p class='hide'>计划："+plan+"人</p>"
                +"<p class='hide'>预定："+book+"人</p>"+"<p class='hide'>剩余："+left+"人</p><p class='operate-bar point'><span class='fa fa-eye green' onclick='check("+id+")'></span><span class='fa fa-edit blue' onclick='edit("+id+")'></span><span class='fa fa-trash pink' onclick='del("+id+")'></span></p>";
        }
        else
        {
            tit = "<p>"+nowday+"</p>"
                +"<p>计划："+plan+"人</p>"
                +"<p>预定："+book+"人</p>"+"<p>剩余："+left+"人</p><p class='operate-bar'><span class='fa fa-eye' onclick='check("+id+")'></span><span class='fa fa-edit' onclick='edit("+id+")'></span><span class='fa fa-trash' onclick='del("+id+")'></span></p>";
        }

        return  tit
    }

 return {
        init:init
 }
})()

//时间日期格式化
var formatDate = (function(){
    /*
     * date:被格式的日期
     * fmtType: int 类型的值 0：yyyy-MM-dd，1：yyyy-MM-dd hh:mm:ss
     * 可以不传 fmtType 不传则为默认 yyyy-MM-dd
     * **/
    function newDate(d,fmtType){
        if(d)
        {
            if (!(typeof(d)=='object')) {
                d = d.replace(new RegExp('-','ig'),"/");//IE 不识别 '-' 的日期格式
            }
            var formtType = fmtType||0;
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
                {
                    if (new RegExp("(" + k + ")").test(fmt))
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
                return fmt;
            }
            return new Date(d).Format(fmt);
        }
        else
            return ""
    }

    /*
    *@param dateType string '0':今天；'1':昨天；'2':本周 '3'：上周 '4':本月; '5'：上月;'6'：明天;'7'：后天
    *@param formatType number 0:'yyyy-MM-dd' ; 1:'yyyy-MM-dd hh:mm:ss' ; 2:'hh:mm:ss'
    * */
    function getDurationTime(dateType,formatType){
        var now = new Date();
        var nowDayOfWeek = now.getDay()+1; //今天本周的第几天
        var nowDay = now.getDate(); //当前日
        var nowMonth = now.getMonth(); //当前月

        var nowYear = now.getYear(); //当前年

        nowYear += (nowYear < 2000) ? 1900 : 0; //

        var lastMonthDate = new Date(); //上月日期

        lastMonthDate.setDate(1);
        lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
        var lastYear = lastMonthDate.getYear();
        var lastMonth = lastMonthDate.getMonth();

        var format = formatType||0;

        //获得某月的天数
        var getMonthDays  = function (myMonth) {
            var monthStartDate = new Date(nowYear, myMonth, 1);
            var monthEndDate = new Date(nowYear, myMonth + 1, 1);
            var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
            return days;
        }

        var duration = null;

        switch (dateType) {
            case '0'://今天
                duration = newDate(now,format);
                break
            case '1'://昨天
                now.setDate(now.getDate() - 1);
                duration = newDate(now,format);
                break
            case '2'://本周
                var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek+2);
                var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek+2));
                duration = [newDate(weekStartDate,format),newDate(weekEndDate,format)];
                break
            case '3'://上周
                var lastWeekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 7+2);
                var lastWeekEndDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 1+2);
                duration = [newDate(lastWeekStartDate,format),newDate(lastWeekEndDate,format)];
                break;
            case '4'://本月
                var monthStartDate = new Date(nowYear, nowMonth, 1);
                var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
                duration = [newDate(monthStartDate,format),newDate(monthEndDate,format)];
                break;
            case '5'://上月
                var lastMonthStartDate = new Date(nowYear, lastMonth, 1);
               var lastMonthEndDate = new Date(nowYear, lastMonth, getMonthDays(lastMonth));
                duration = [newDate(lastMonthStartDate,format),newDate(lastMonthEndDate,format)];
                break;
            case '6'://明天
                now.setDate(now.getDate() + 1);
                duration = newDate(now,format);
                break;
            case '7'://后天
                now.setDate(now.getDate() + 2);
                duration = newDate(now,format);
                break;
            default:
                duration = newDate(now);//默认今天
        }
        return duration;
    }

    return {
        newDate:newDate,
        getDurationTime:getDurationTime
    }
})();
/**
 *价格表c
 * */
var priceTable = (function(){

    /**
     *@param(string) ele 元素
     *@param(obj) data 元素
     * */
    function init(ele,data){
        var head = "",title="",price="";
        $.each(data.weekList,function(i,item){
            //去掉成本价的展示方式
            head+="<td colspan=\"1\" class=\"text-center\">"+convertWeek(item.weekValue)+"</td>";
            title+="<td style=\"display:none\">门市价(元)</td><td style=\"display:none\">结算价(元)</td>";
            price+="<td style=\"display:none\"><input type=\"text\" class=\"form-control\" value='"+item.rackRatePrice+"' readonly></td>"
                +"<td><input type=\"text\" class=\"form-control sale-price\" onkeyup=\"verifyNumber(this)\" value='"+item.totalPrice+"'></td>";

        })

        var table = "<table class=\"table table-bordered text-center\"><thead><tr class=\"bg-light-gray\">"+head+"</tr></thead><tbody><tr class=\"bg-light-gray\">"+title+"</tr><tr class='price-column'>"+price+"</tr></tbody></table>";
        var elem = document.getElementById(ele);
        elem.innerHTML = table;
    }
    //日期转换
    function convertWeek(day){
        var _day = "";
        switch (day) {
            case 1:
                _day = "星期一";
                break;
            case 2:
                _day = "星期二";
                break;
            case 3:
                _day = "星期三";
                break;
            case 4:
                _day = "星期四";
                break;
            case 5:
                _day = "星期五";
                break;
            case 6:
                _day = "星期六";
                break;
            case 7:
                _day = "星期日";
                break;
        }
        return _day;
    }

    //获取价格
    function getPrice(data,ele){
        var arr = [];
        $('.'+ele).each(function(i,item){
            var obj = {};
            obj.oriPrice = $(item).parent().prev().find('input').val();
            obj.salePrice = $(item).val();
            arr.push(obj);
        })
    }
    return {
        init:init,
        getPrice:getPrice
    }
})()


/**
 * 文件上传模块，依赖bootstrap.fileupload模块
 * 配置详情查看 fileupload.js--> $.fn.fileupload.defaults
 * 初始化fileinput  http://plugins.krajee.com/file-basic-usage-demo#basic-example-1
 */
var FileInput = (function () {
    var oFile = {};
    //初始化fileinput控件

    var control = '';
    /**
     * @param(string)  ctrlName 目标元素id 必填
     * @param(string) domid 存放url元素地址
     * @param(string) initPreviewUrl 初始化显示url
     * @param(number) fileCount允许上传的最大数量
     * */
    oFile.Init = function(ctrlName,domid,initPreviewUrl,fileCount) {
        var uploadUrl = '/login/privateAuthority/fastDFSAction/uploadFile';
        window.uploadImgURl = null;
        control = $('#' + ctrlName);
        //导入文件上传完成之后的事件
        control.on("fileuploaded", function (event, data, previewId, index) {
            //  console.log(JSON.stringify(data));
            // console.log(previewId+'~~'+index);

            if(data.jqXHR['status']=='200')
            {
                var urlArr = handleUrl(domid,data.jqXHR.responseJSON.initialPreview[0],index);
                $("#"+domid).val(urlArr);
                toast.success('上传成功');
                window.uploadImgURl = data.response.initialPreview[0];
            }
            // if(data.response['code']=='500')
            // {
            //    toast.error(data.response.message);
            // }
        });
        //监听文件移除
        control.on('fileremoved',function(event,id,index){

        });
        //监听上传失败
        control.on('fileuploaderror',function(event,data,msg){

        })
        //监听删除
        control.on('filedeleted',function(event,key,jqhr,data){

            var temp = $('#'+domid).val().split(',');
            if (jqhr.responseJSON.code == '200')
            {
                toast.success(jqhr.responseJSON.message);
                if (key!=100)
                {
                    if ($.trim(key)=='')
                    {
                        temp.splice(temp.indexOf(jqhr.responseJSON.data));
                    }

                    else
                    {
                        temp[key] = "";
                        temp.forEach(function(item,i){
                            if (item=="")
                                temp.splice(i,1)
                        })
                    }
                }
                else
                {
                    temp.splice(temp.indexOf(window.uploadImgURl),1);
                    window.uploadImgURl = null;
                }
            }

            $('#'+domid).val(temp.join(','));

        })

        control.on('filezoomshow',function (event,params) {
            //console.log('File zoom show ', params.sourceEvent, params.previewId, params.modal);
        })

        //初始化上传控件的样式
        control.fileinput({
            showPreview:true,
            language: 'zh', //设置语言
            uploadUrl: uploadUrl, //上传的地址
            //  uploadAsync:false,
            allowedFileExtensions: ['jpg', 'gif', 'png','doc','docx','xlsx','txt','xls','pdf'],//['jpg', 'gif', 'png'],//接收的文件后缀
            showUpload: false, //是否显示上传按钮,
            showRemove:false,//是否显示移除按钮
            showCaption: false,//是否显示标题,
            overwriteInitial: false,
            browseClass: "btn btn-primary", //按钮样式
            //dropZoneEnabled: false,//是否显示拖拽区域
            //minImageWidth: 50, //图片的最小宽度
            //minImageHeight: 50,//图片的最小高度
            //maxImageWidth: 200,//图片的最大宽度
            //maxImageHeight: 200,//图片的最大高度
            //maxFileSize: 0,//单位为kb，如果为0表示不限制文件大小
            //minFileCount: 0,
            maxFileCount: fileCount||5, //表示允许同时上传的最大文件个数,
            initialPreviewFileType:'image',
            // autoReplace:true,
            enctype: 'multipart/form-data',
            // validateInitialCount:true,
            previewFileIcon: "<i class='glyphicon glyphicon-file'></i>",
            msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
            msgFileRequired:'请选择需要上传的文件',
            resizeImage:false,//是否允许图片自适应,（取消自适应，否则报错）
            required:false,//是否允许不选文件上传,
            allowedPreviewTypes:['image', 'html', 'text', 'video', 'audio', 'flash','object'],//取消office，gdoc预览
            previewSettings:{
                image: {width: "auto", height: "auto", 'max-width': "100%", 'max-height': "100%"},
                html: {width: "213px", height: "160px"},
                text: {width: "213px", height: "160px"},
                video: {width: "213px", height: "160px"},
                audio: {width: "100%", height: "30px"},
                flash: {width: "213px", height: "160px"},
                object: {width: "213px", height: "160px"},
                pdf: {width: "213px", height: "160px"},
                other: {width: "213px", height: "160px"}
            },
            previewFileIconSettings: {
                'doc': '<i class="fa fa-file-word-o text-primary"></i>',
                'xls': '<i class="fa fa-file-excel-o text-success"></i>',
                'ppt': '<i class="fa fa-file-powerpoint-o text-danger"></i>',
                'jpg': '<i class="fa fa-file-photo-o text-warning"></i>',
                'pdf': '<i class="fa fa-file-pdf-o text-danger"></i>',
                'zip': '<i class="fa fa-file-archive-o text-muted"></i>',
                'docx':'<i class="fa fa-file-word-o text-primary"></i>',
                'xlsx':'<i class="fa fa-file-excel-o text-success"></i>'
            },
            previewZoomSettings:{
                image: {width: "auto", height: "auto", 'max-width': "100%",'max-height': "100%"},
                html: {width: "100%", height: "100%", 'min-height': "480px"},
                text: {width: "100%", height: "100%", 'min-height': "480px"},
                office: {'width': "200px", 'height': "250px"},
                video: {width: "auto", height: "100%", 'max-width': "100%"},
                audio: {width: "100%", height: "30px"},
                flash: {width: "auto", height: "480px"},
                object: {width: "auto", height: "200px"},
                pdf: {width: "100%", height: "100%", 'min-height': "480px"},
                other: {width: "auto", height: "100%", 'min-height': "480px"}
            },
            layoutTemplates:{
                progress: '<div class="progress">\n' +
                    '    <div class="progress-bar progress-bar-success progress-bar-striped text-center" role="progressbar" aria-valuenow="{percent}" aria-valuemin="0" aria-valuemax="100" style="width:{percent}%;line-height: 10px">\n' +
                    '        {status}\n' +
                    '     </div>\n' +
                    '</div>',
            },
            initialPreview:handlePreview(initPreviewUrl),//图片初始化显示,
            initialPreviewAsData: true,
            initialPreviewConfig:_initialPreviewConfig(initPreviewUrl),
            // deleteUrl: "/login/privateAuthority/fastDFSAction/deleteFile?filePath=",

        });
    };
    //处理返回的url
    function handleUrl(domid,url,idx){
        var $elem = $('#'+domid);
        var str  = $elem.val();
        var arr = [];
        if (str==''||str==undefined||str==null)
        {
            return url
        }
        else
        {
            arr  = str.split(',');
            if(arr.length>0)
            {
                arr.push(url);
            }
        }
        return arr.join(',');
    }

    //处理初始化图片
    function handlePreview(urlStr){
        var arr = [],imgArr = [];
        if(urlStr!=null&&urlStr!=undefined&&$.trim(urlStr)!="")
        {
            arr = urlStr.split(',');
            $.each(arr,function(i,item){
                // var img = "<img src='"+item+"' class='file-preview-image'>";

                imgArr.push(item)
            })
        }
        return imgArr
    }
    //初始化图片配置
    function _initialPreviewConfig(urlStr){
        var arr = [],imgArr = [];
        if(urlStr!=null&&urlStr!=undefined&&$.trim(urlStr)!="")
        {
            arr = urlStr.split(',');
            $.each(arr,function(i,item){
                var obj = {};
                obj.caption = "图片"+(i+1);
                obj.size = "";
                obj.width = "180px";
                obj.url = '/login/privateAuthority/fastDFSAction/deleteFile?filePath='+getUrl(item);
                obj.key = i;
                imgArr.push(obj)
            })
        }
        return imgArr;
    }

    function getUrl(url){
        var str = url.split('/').slice(3);
        return str.join('/');
    }
    return {
        oFile:oFile
    };
})();


/**
 *ligerui 表格生成模块 需要依赖 ligerui (可以考虑放弃这个控件了，样式过世，依赖性太强，不够轻量，只能提供糟糕的用户体验)
 *@param {string} -url 后台接口地址
 *@param {string}- id 目标元素id
 *@param {Array}- column 定义表格头
 *@params {Object} - params 自定义参数
 *@return {Object} - ligerui 实例
  * */
var table = (function(){

    function _initTable(url,id,column,params){

        //获取数据的键数组
        // var keyGroup = Object.keys(data.Rows[0]);
        var g = null;
        var $elem = $('#'+id);
        //表格默认参数配置
        var para ={
            url:url,
            pageSize:20,
            sortName:null,
            width:'98%',
            height:'98%',
            inWindow:true,
            rownumbers:true,
            fixedCellHeight:true,
            minColumnWidth:60,
            pageSizeOptions: [10, 15, 20, 25, 30],
            isScroll:true,
            checkbox:false,
            rowHeight:35,
            headerRowHeight:45,
            onSuccess:onSuccess,
            onAfterShowData:onAfterShowData
        };
        // debugger
        if(typeof params=='object'&&JSON.stringify(params)!="{}")
        {
            for (var key in params)
            {
                para[key] = params[key];
            }
        }
        var newCol = function(column){
            var arr = []
            $.each(column,function(i,item){
                var obj = item;
                obj['isSort'] = false;
                arr.push(obj);
            });
            return arr
        }

        var obj = {
            columns:newCol(column)
        };

        para.columns = obj.columns;

        g =  $elem.ligerGrid(para);
        //鼠标悬停显示title
        $elem.on('mouseover','.l-grid-row-cell-inner',function(){
            var currentIdx = $(this).parent().index();
            var len = $(this).parent().siblings().length;
            if(currentIdx==len) return
            var text = $(this).text();
            $(this).attr('title',text);
        })

        return g;
    }

    /**
     * 成功获取服务器数据的事件
     * @param data
     */
    function onSuccess(data, grid) {
        if(data.code == "51009") { //登录超时
            top.location.href = "/index"
        }
        if(data.code == "51004") {  //权限不足
            top.location.href = "/noAuth"
        }
    }

    function onAfterShowData(e){
        // console.log(e);
       // this.reRender();
        $("[data-toggle='tooltip']").tooltip();
    }

    return{
        initTable:_initTable
    }
})();

/**
 * 下拉框插件公共方法（用于非code的下拉框,需要传code 的 参考 selectutil）
 * https://select2.org/programmatic-control/add-select-clear-items
 */

var select = (function(){

    //参数配置
    function getParams(para){
        var _para = para||{};
        return {
            placeholder:'请选择',
            width:'220',
            language:'zh-CN',
            allowClear:false,
            multiple:_para.multiple||false,
            theme:'bootstrap',
            debug:true,
        }
    }
    //数据格式转换
    function _convertData(data,key,value,selectedKey,selectType){
        var newData = [];
        var flag = false;
        var selectedArr = [];
        var _data = data||[];
        if(selectedKey != '' && selectedKey != null && selectedKey!=undefined) {
            selectedArr = selectedKey.toString().split(',');
            flag = true;
        }
        if(_data.length>=0)
        {
            for(var i=0;i<_data.length;i++)
            {
                var obj = new Object();
                obj['id'] = _data[i][key];
                obj['text'] = _data[i][value];
                if(flag) {
                    for (var j = 0; j < selectedArr.length; j++) {
                        if (_data[i][key] == selectedArr[j]) {
                            obj['selected'] = true;
                            break;
                        }
                    }
                }
                newData.push(obj);
            }
            if(typeof(selectType)=='string'&&selectType!='')
            {
                var typeSlt = {};
                typeSlt['id'] = selectType=='0'?' ':' ';
                typeSlt['text'] = selectType=='0'?"全部":"请选择";
                typeSlt['selected'] = false;
                newData.unshift(typeSlt);
            }
        }

        return newData
    }

    //初始化下拉框
    //fn 为回调函数
    function _init(obj,fn){
        var _obj = {
            url:obj.url,//url 与data 二选一
            ele:obj.ele, //原始下拉框id
            para:obj.para,  //配置参数，已有默认配置可不传
            data:obj.data||[], // 显示值数组
            id: obj.id, //对应select value 值
            text: obj.text, // 对应select text 值
            selectedKey:obj.selectedKey, //回显值id
            selectType:obj.selectType// '0':全部 '1':请选择 不传默认选第一个
        }
        if($('#'+_obj.ele).find('option').length>0)
            _reload(_obj);
        else
        {
            if(_obj.url)
                $.getJSON(_obj.url,function(res){
                    if (res.code=='200')
                    {
                        var _data = res.data;
                        var newData = _convertData(_data,_obj.id,_obj.text,_obj.selectedKey,_obj.selectType);
                        var config = getParams(_obj.para);
                        config.data = newData;
                        if (typeof(fn)==='function')
                        {

                            $('#'+_obj.ele).select2(config);
                            if ($('#'+_obj.ele).hasClass("select2-hidden-accessible")) {
                               fn()
                            }
                        }
                        else
                            $('#'+_obj.ele).select2(config);
                    }
                })
            else
            {
                var newData = _convertData(_obj.data,_obj.id,_obj.text,_obj.selectedKey,_obj.selectType);
                var config = getParams(_obj.para);
                config.data = newData;
                $('#'+_obj.ele).select2(config);
            }
        }

        //监听下拉框值改变
        $('#'+_obj.ele).on('change',function(){
            if (typeof(fn)==='function')
                fn()
        })
    }
    //刷新下拉列表
    function _reload(obj){
        var _obj = {
            url:obj.url,
            ele:obj.ele,
            data:obj.data,
            id: obj.id,
            text: obj.text,
            selectedKey:obj.selectedKey,
            selectType:obj.selectType||null
        }
        var _ele =  $('#'+_obj.ele);
        if(_obj.url)
        {
            $.getJSON(_obj.url,function(res){
                if (res.code=='200')
                {
                    var _data = _convertData(res.data,_obj.id,_obj.text,_obj.selectedKey,_obj.selectType);
                    _clear(_data,_ele,_obj.selectedKey);
                }
            })
        }
        else
        {
            var _data = _convertData(_obj.data,_obj.id,_obj.text,_obj.selectedKey,_obj.selectType);
            _clear(_data,_ele,_obj.selectedKey);
        }
    }
    //重新生成列表项
    function _clear(data,ele){
        ele.empty();
        // ele.select2("data", null)
        var config = getParams();

        config.data = data;
        ele.select2(config);
    }

    //监听选中值
    function onSelect(ele){
        var _ele =  $('#'+ele);
        _ele.on('select2:selecting',function (e) {
            var val = e.params.args.data.id;
            if ($.trim(val)=="")
                e.preventDefault();
        });
    }
    return {
        init:_init,
        reload:_reload,
        onSelect:onSelect
    }
})();

/**
 *多级级联控件 可用于所有级联效果， 例如省市区，景区景点设施等  异步加载方式
 * 依赖select模块方法
 * */

/*var comboSelect = (function(select){

    function _createSelect(domID){
        var elem = $('#'+domID);

        var arr = elem.find('select');
        // var _$first = arr.first();

        //设置蒙层防止重复点击
        var style = [
            'color: #337ab7',
            'position: absolute',
            'z-index: 999',
            'margin-top: -3px',
            'width: 220px',
            'height: 40px',
            'vertical-align: 40px',
            'text-align: right',
            'padding-right: 50px',
            'padding-top: 12px',
            'font-size:  16px',
        ].join(';')
        //加载效果
        var loading = "<span style='"+style+"'><i class='fa fa-circle-o-notch fa-spin'></i></span>";
        var ids = [];
        var showID = [];
        //遍历下拉框
        $.each(arr,function(i,item){

            select.init({
                id:'id',//默认值
                text:'text',//默认值
                ele: $(item).attr('id'),
                data:[],
                // selectType:'1'
            });

            if ($(item).data('id'))
            {
                showID.push($(item).data('id'));
            }
            //$(item).trigger('select2-opening');
            ids.push($(item).attr('id'));

            //监听下拉框打开
            $(item).on('select2:opening',function(e){
                if(i==0&&$(item).find('option').length<2)
                {
                    $(item).before(loading);
                    // $.ajaxSettings.async = false;
                    $.getJSON($(item).data('url'),function (res) {
                        if (res.code=='200')
                        {
                            select.reload({
                                data:res.data,
                                ele:$(item).attr('id'),
                                id:$(item).data('key'),
                                text:$(item).data('value'),
                                // selectType:'1'
                            });
                            $(item).select2('open');
                            $(item).trigger('change');//触发默认选中
                        }
                        $(item).prev().remove();
                    })
                }
            })
            //监听选中值，刷新下一级下拉列表
            $(item).on('change',function(){
                var val = $(item).val();
                console.log(val);
                if(i>=(arr.length-1))
                    return
                $(arr[i+1]).before(loading);
                $.getJSON($(arr[i+1]).data('url')+val,function(res){
                    if (res.code=='200')
                    {
                        select.reload({
                            data:res.data||[],
                            ele:$(arr[i+1]).attr('id'),
                            id:$(arr[i+1]).data('key'),
                            text:$(arr[i+1]).data('value'),
                            //selectType:'1'
                        });
                        $(arr[i+1]).trigger('change');
                    }
                    //移除加载中蒙层
                    $(arr[i+1]).prev().remove();
                })
            })
        });

        if(showID.length>0) showComboDefault(arr);
    }
    //回显方法
    function showComboDefault(ele){
        var $arr = ele;
        $.each($arr,function (i,item) {
            var id = $(item).data('id');
            var name = $(item).data('name');
            // if (!id||!name)
            // {
            //     console.error('下拉菜单相关data-属性未定义');
            // }
            var newOption = new Option(name, id, false, false);
            $(item).append(newOption);
        })
    }

    return {
        createSelect:_createSelect,

    }

})(select);*/

//一次性获取所有数据（影响页面加载速度，用户体验不好）
var comboSelect = (function(select){

    function _createSelect(domID){
        var elem = $('#'+domID);
        var type = elem.data('type')=='0'?'0':'1';
        var arr = elem.find('select');

        var showID = [];
        var f_list = getSessionItem('provinceId'); // 判断缓存是否有值
        if (f_list.length == 0) {
            $.ajaxSettings.async = false;
            $.getJSON(elem.data('url'),function(res){
                if (res.code=='200')
                {
                    console.log('get success');
                    sessionStorage.setItem('AREALIST',JSON.stringify(res.data));
                }
            })
        }
        //遍历下拉框
        $.each(arr,function(i,item){
            select.init({
                id:'id',//默认值
                text:'text',//默认值
                ele: $(item).attr('id'),
                data:[],
                selectType:type
            });

            if ($(item).data('id'))
            {
                showID.push($(item).data('id'));
            }
            var f_list = getSessionItem('provinceId');
            select.reload({
                data:f_list||[],
                ele:$(item).attr('id'),
                id:$(item).data('key'),
                text:$(item).data('value'),
                selectType:type
            });
            //监听选中值，刷新下一级下拉列表
            $(item).on('change',function(){
                var val = $(item).val();
                if (!val)
                {
                    var newOption = new Option('请选择',null, false, false);
                    $(arr[i+1]).append(newOption);
                }
                else
                {
                    var s_arr = getSessionItem($(arr[i+1]).attr('id'),Number(val));

                    select.reload({
                        data:s_arr||[],
                        ele:$(arr[i+1]).attr('id'),
                        id:$(arr[i+1]).data('key'),
                        text:$(arr[i+1]).data('value'),
                        selectType:type
                    });
                }
                $(arr[i+1]).trigger('change');
            })
            $(item).on('select2:select',function () {
                var val = $(item).val();
                if (i==0)
                    return
                if (!val||$.trim(val)=="")
                {
                    $.each(arr,function (i,item) {
                        if (i==0)
                        {
                            var f_list = getSessionItem('provinceId');
                            select.reload({
                                data:f_list||[],
                                ele:$(arr[i]).attr('id'),
                                id:$(arr[i]).data('key'),
                                text:$(arr[i]).data('value'),
                                selectType:type
                            });
                        }
                        else
                        {
                            $(item).empty();
                            var newOption = new Option('请选择',null, false, false);
                            $(item).append(newOption);
                        }
                    })
                }
            });
        });
        if(showID.length>0) showComboDefault(arr);
    }
    //回显方法
    function showComboDefault(ele){
        var arr = ele;
        $.each(arr,function (i,item) {
            var id = $(item).data('id');
            $(item).val(id).trigger('change');
            $(arr[i+1]).val($(arr[i+1]).data('id')).trigger('change');
        })
    }

    function getSessionItem(para,id){

        var item = JSON.parse(sessionStorage.getItem('AREALIST')),
            result = [],
            list = [];

        if (item)
        {
            switch (para) {
                case 'provinceId':
                    list = item['province'];
                    break;
                case 'cityId':
                    result = item['city'];
                    result.forEach(function(item,i){
                        if (item['provinceId'] == id)
                        {
                            list.push(item);
                        }
                    })
                    break;
                case 'districtId':
                    result = item['district']
                    result.forEach(function(item,i){
                        if (item['cityId'] == id)
                        {
                            list.push(item)
                        }
                    })
                    break;
            }
        }
        return list

    }

    return {
        createSelect:_createSelect,
    }

})(select);

/*--------------------------------------------------------------------------------------*/
