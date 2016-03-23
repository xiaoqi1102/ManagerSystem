/**
 * Created by frank on 2015/11/20.
 * YCenter 系统 运行时对象
 */
var YCenterRunTime = (function(){
    //private code
    var token = "";                                          //当前的token
    var apiDefine = [];                                      //系统的api定义
    var currentAccountId = "";                               //当前的用户Id
    var currentRoles = [];                                   //当前用户的角色集合
    var apiHostUrl = "http://192.168.1.100:1236";            //api 的 主机Url
    var Storage=window.sessionStorage;
    var LocalStorage=window.localStorage;
    var CookieName='accountCookie';
    var userPermissions=[];
    var userData={};
    //加载系统所有的功能点
    var getApiList=function(){
        $.ajax({
            url : apiHostUrl + "/api",
            async:false,
            success : function(res){
                apiDefine = res;
            }
        });
    };
    //加载用户权限配置json
    var getPageList=function(){
        $.ajax({
            url : apiHostUrl + "/page",
            async:false,
            success : function(res){
                userPermissions = res;
            }
        });
    };
    var permissionsReload=function(){
      getApiList();
        getPageList();
    };
    var eventList=function(){
        getApiList();
        getPageList();
    };
    var initModel=function(){
        eventList();
    };
    var getUserData=function(){
        var loginDb;
        loginDb=new loki('login.json');
        //加载登录者的信息
        loginDb.loadDatabase({},function(){
            var loginCollection= loginDb.getCollection('loginData');
            if(loginCollection==null){
                return;
            }
            // console.log(loginCollection.data);
            userData.roles=loginCollection.data[0].roles;
            userData.token=loginCollection.data[0].token;
            userData.meta= loginCollection.data[0].meta;
            userData.accountId=loginCollection.data[0].accountId;
            userData.companyId=loginCollection.data[0].companyId;
        });
        return userData;
    };
    var getCompanyId=function(){
        var userData=getUserData();
        return userData.companyId;
    };
    //获取菜单栏目权限
    var getUserPermissions=function(){
        return userPermissions;
    };
    var requestArea=function(){
        var db2=new loki('areaList.json');
        var isHaveArea=false;
        //加载本地存储的数据库 判断地区信息是否存在
        db2.loadDatabase({},function(){
            var collection=db2.getCollection('areaCode');

            if(collection==null){
                console.log(collection);
            }else{
                isHaveArea=true;
            }
        });
        if(isHaveArea){
            //如果地区信息存在  则不再发送ajax请求
            return;
        }
        ApiCall("全国区位表分页列表接口",{'page':1,limit:100000},function(obj){
            var db=new loki('areaList.json');
            var collection=db.addCollection('areaCode');
            console.log(obj);
            //return;
            $.each(obj.data,function(i,c){
                 i=collection.insert(c);
            });

            db.save();
          //  LocalStorage.areaList=obj;

        })
    };
    //获取省份地区信息
    var getProvince=function(){
        var areaList=null;
        areaList=getArea('0000000000000000');
        return areaList;
    };
    //获取地区的通用函数
    var getArea=function(id){
        var result=null;
        var db=new loki('areaList.json');
        db.loadDatabase({},function(){
           var areaCode=db.getCollection('areaCode');
            if(areaCode==null){
                return;
            }
            result=areaCode.find({'pAreaId':id});
          /*  var Province=areaCode.find({'pAreaId':'0000000000000000'});
            console.log(Province);*/
        });
        return result;
    };
    //获取所有功能点
    var getAllFunctionPoint = function(){
        return apiDefine;
    };

    ///获取当前用户Id
    var getAccountId = function(){
        return currentAccountId;
    };

    //获取当前用户的角色
    var getAccountRole = function(){
        return currentRoles;
    };

    //获取api 的hostUrl
    var getHostUrl = function(){
        return apiHostUrl;
    };

    //返回指定功能点的 Url，
    var getRequestObj = function(key){
        if(!key){
            console.log("key 为空。");
            return "";
        }

        var current;
        var obj={};
        for(var i = 0 ; i <= apiDefine.length;i++){
            current = apiDefine[i];
            if(current.key == key){
                obj.url= apiHostUrl + current.url;
                obj.method=current.method;
                return obj;
            }
        }
        console.log("key:"+key + "未找到对应的功能点。请检查。");
        return "";
    };
   //返回用户token
    var getToken=function(){
        var token=window.sessionStorage.getItem('token');
        return token;
    };
    ////设置当前Token。
    //var setToken = function(newToken) {
    //    token = newToken;
    //};

    //设置运行时的一些基本信息。在登陆事件发生后调用
    var afterLogin = function(loginRes){
        console.log(loginRes);
        if(!loginRes.isError){
            token = loginRes.data.token;
           /* var Storage=window.sessionStorage;*/
            Storage.token=loginRes.data.token;
            document.cookie=CookieName+'='+loginRes.data.token;
            console.log(loginRes);
            //
            var db=new loki('login.json');
            var  loginCollection =db.addCollection('loginData');
            loginCollection.insert(loginRes.data);
            db.save();
            currentAccountId = loginRes.data.accountId;
            currentRoles = loginRes.data.roles;
        }
    };

    //封装系统的api请求方法
    var ApiCall = function (key, data , success, err){

        var obj = getRequestObj(key);
         var token=getToken();
       // console.log(   token);
        //var type=getMethod(key);
        if(obj.url == ""){
            console.log("未找到 key 对应功能点的Url。请检查是否 key错误。");
            return;
        }
       // var that=this;
        $.ajax({
            url : obj.url,
            type : obj.method,
            data : data,
         /*   header:{ "token":token },*/
            beforeSend: function(xhr) {
                //  xhr.setRequestHeader("My-First-Header", "first value");
                //  xhr.setRequestHeader("My-Second-Header", "second value");
                xhr.setRequestHeader("token", token);
                },
            success : function(res){
                if(res.isError){
                    console.log(res.errorDesc);
                    //todo: MessageModel 组件应该独立。
                    $("#messageContent").html(res.errorDesc);
                    $("#messageModal").modal();
                    if(err){
                        err(res);
                    }
                }
                else{
                    success(res);
                }
            },
            error : function (req , status , err) {
                console.log(req);
                console.log(req.status);
               // console.log(token);
                if(req.status == '403'){
                    //todo: Login 组件应该独立。
                    //重新登录
                    $("#loginModal").modal({
                        keyboard:false,
                        backdrop:false
                    });
                    Storage.removeItem('token');
                  //  $("#loginName,#password").val("");
                    console.log(err);
                }
                else {
                    //if(status.indexOf("5") == 0)
                    console.log("接口程序错误。",err);
                }
            }

        });
    };
    var login=function(e){
       // e.preventDefault();
        console.log('login ');
        var obj={};
        obj.loginName=$("#loginName").val();
        obj.pwd=$("#password").val();
        ApiCall("登陆接口",JSON.stringify(obj),function(obj){
            //alert("登录成功");
            afterLogin(obj);
            $("#loginModal").modal('hide');
        },function(obj){})
    };

    return {
        //"setToken": setToken ,
        "login":login,
        "getToken":getToken,
        "getAllFunctionPoint": getAllFunctionPoint ,
        "afterLogin" : afterLogin ,
        "getAccountId":getAccountId ,
        "getAccountRole":getAccountRole ,
        "getRequestObj":getRequestObj,
        "getHostUrl":getHostUrl ,
        "ApiCall": ApiCall,
        "initModel":initModel,
        "requestArea":requestArea,
        "getArea":getArea,
        "getProvince":getProvince,
        "getUserPermissions":getUserPermissions,
        "getUserData":getUserData,
        "permissionsReload":permissionsReload,
        "getCompanyId":getCompanyId
    }
})();
YCenterRunTime.initModel();

/*
window.YCenterRunTime = YCenterRunTime;*/
