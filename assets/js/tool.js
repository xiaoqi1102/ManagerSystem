/**
 * Created by xiaoqi on 2015/11/25.
 */
var Tool=(function($){
    var successMessage,
        dangerMessage,
        openPage,
        GetRequest,
        getParamVal,
        messageModalClose;
    GetRequest= function() {
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    },
        //获取search中某一个参数的值
    getParamVal=function(paramName) {
            var list = GetRequest();
            return list[paramName];
        };
    successMessage=function(message){
        var html='<div class="alert alert-success" role="alert">'+
            '  <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>'+
                /*'  <span class="sr-only">'+message+'</span>'+*/
            message+
            '</div>';
        $("#messageContent").html(html);
        $("#messageModal").modal('show');
    };
    dangerMessage=function(message){
        var html='<div class="alert alert-danger" role="alert">'+
            '  <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>'+
            '  <span class="sr-only">Error:</span>'+
            message+
            '</div>';
        $("#messageContent").html(html);
        $("#messageModal").modal('show');
    };
    messageModalClose=function(time){
        var t=1000;
        if(time){
          t=time;
        }
        setTimeout(function(){
            $("#messageModal").modal('hide');
        },t)
    };
    openPage= function(url, parameterName, parameter) {
        if (parameter && parameterName) {
            if(url.indexOf('http://')>=0){
                window.location.href = url + "?" + parameterName + "=" + parameter;
            }else{
                window.location.href = 'http;//'+url + "?" + parameterName + "=" + parameter;
            }
        } else {
            if(url.indexOf('http://')>=0){
                window.location.href = url;
            }else{
                window.location.href = 'http://'+url;

            }
        }
    };
    return{
        successMessage:successMessage,
        dangerMessage:dangerMessage,
        openPage:openPage,
        getParamVal:getParamVal,
        messageModalClose:messageModalClose
    }
})(jQuery);