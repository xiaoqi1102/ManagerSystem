/**
 * Created by xiaoqi on 2015/10/16.
 */
/**
 * Created by xiaoqi on 2015/11/9.
 */
const React=require('react');
const  ReactDom=require('react-dom');
const NavHeader=require('./js/Nav/nav.js');
const Login=require('./js/login.js');
const MessageModal=require('./js/messageModal.js');
const $=require('jquery');
const Menu=require('./js/Main/react-router-component.js');
let Storage=window.sessionStorage;
//const Menu=require('./js/Main/menu.js');
/*const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute=ReactRouter.IndexRoute;
const createBrowserHistory = require('history/lib/createBrowserHistory')
const history = createBrowserHistory();
const AccountList=require('./js/Account/accountList.js');
const Home=require('./js/Home/home.js');
const router=(
    <Router history={history}>
        <Route path='/' component={Menu}>
            <IndexRoute  component={Home} ></IndexRoute>
            <Route path='Home' component={Home}></Route>
            <Route path='Account' component={AccountList}></Route>
        </Route>
    </Router>
);*/
/*const routes=(
    <Route path='/' handler={Menu}>
        <Route path='/Account' component={AccountList}></Route>
    </Route>
);
ReactRouter.run(routes,ReactRouter.HistoryLocation,function(Handler, state){
 ReactDom.render(<Handle />, document.getElementById('app'));
 });*/
const MainPage=React.createClass({
    getInitialState(){
        return{
            content:"",
            messageShow:false,
            errorMessage:'',
            messageStyle:'success',
            username:''
        }
    },
    requestApi(key){
        let
            db,
            loginDb,
            roles,
            token,
            meta,
            url,
            apiObj,
            accountId;
        apiObj={};
        loginDb=new loki('login.json');
        db=new loki('Api.json');
        //加载登录者的信息
        loginDb.loadDatabase({},function(){
            let loginCollection= loginDb.getCollection('loginData');
            if(loginCollection==null){
                return;
            }
            // console.log(loginCollection.data);
            roles=loginCollection.data[0].roles;
            token=loginCollection.data[0].token;
            meta= loginCollection.data[0].meta;
            accountId=loginCollection.data[0].accountId;
            apiObj.token=token;
            /* console.log(roles);
             console.log(token);
             console.log(meta);
             console.log(accountId);*/
        });
        //加载接口列表
        db.loadDatabase({},function(){
            let baseUrl='http://192.168.1.100:1236';
            let ApiCollection=db.getCollection('ApiCollection');
            // console.log(ApiCollection.data);
            $.each(ApiCollection.data,function(index,content) {
                /*  console.log(content.key);*/
                if (content.key ==key) {
                    /* console.log(content);*/
                    apiObj.method=content.method;
                    //如果不需要登录就能获取权限
                    if(content.isNeedAuth){
                        apiObj.url =baseUrl+ content.url;
                        return apiObj;
                    }
                    //如果存在无权限账号,则进行遍历
                    if(content.refuesd.length!=0){
                        $.each(content.refuesd,function(index,refueser){
                            /*console.log(refueser);*/
                            if(refueser==accountId){
                                return "";
                            }
                        });
                    }
                    //如果有权限的账号列表存在
                    if(content.allowed.length!=0){
                        $.each(content.allowed,function(index,allower){
                            /*  console.log(content);*/
                            if(allower==accountId){
                                apiObj.url=baseUrl+content.url;
                                return apiObj;
                            }
                        })
                    }
                    //如果合法的角色存在的话
                    if(content.roles.length!=0){
                        $.each(contnet.roles,function(index,roler){
                            if(roler==accountId){
                                apiObj.url=baseUrl+content.url;
                                return apiObj;
                            }
                        })
                    }

                }else{//如果未找到接口 则f返回空
                    return "";
                }
            })
        });
        return apiObj;
    },
    logout(){
        console.log("logout");
        /* let Storage=window.sessionStorage;
         Storage.removeItem('token');*/
        const  that=this;
        that.setState({
            content:"login"
        });
        YCenterRunTime.ApiCall('退出登录接口',{},function(obj){
            let Storage=window.sessionStorage;
            Storage.removeItem('token');

        },function(obj){});

        /* let requestObj=this.requestApi("退出登录接口");
         $.ajax({
         type:requestObj.method,
         url:requestObj.url,
         header:{token:requestObj.token},
         success(obj){
         console.log(obj);
         },
         error(){

         }
         });*/

    },
    login(){
        this.setState({
            content:"leftTab"
        });
        let userData=YCenterRunTime.getUserData(),
            that=this;
        let username=YCenterRunTime.ApiCall('获取账号信息',{'accountId':userData.accountId},function(obj){
            console.log(obj);
            Storage.username=obj.data.loginName;
            that.setState({
                username:obj.data.loginName
            })
        });
    },
    openMessageModal(message,style,close){
        const that=this;
        this.setState({
            messageShow:true,
            errorMessage:message,
            messageStyle:style
        });
        if(close){
            setTimeout(function(){
                that.setState({
                    messageShow:false
                })
            },800)
        }
    },
    componentWillMount(){
        /* let  db=new loki('Api.json');
         let  ApiCollection = db.addCollection('ApiCollection');
         let that=this;
         $.ajax({
         url:"http://192.168.1.100:1236/api",
         type:"get",
         dataType: 'json',
         cache: false,
         success(data){
         that.setState({
         ApiList:data
         });
         ApiCollection.insert(data);
         db.save();
         let token=that.getStorageToken();
         if(token){
         that.setState({
         content:'leftTab'
         })
         }else{
         that.setState({
         content:'login'
         })
         }
         },
         error(){

         }
         });*/
        let that=this;
        let userData=YCenterRunTime.getUserData();
       // let Storage=window.sessionStorage;
        if(Storage.token){
            that.setState({
                content:'leftTab'
            })
        }else{
            that.setState({
                content:'login'
            })
        }
        let username=Storage.getItem('username');
        if(username){
            this.setState({
                username:username
            })
        }
        /*   var username= localStorage.getItem('username');
         var password=localStorage.getItem('password');
         var obj={};
         obj.loginName=username;
         obj.password=password;
         var that=this;
         $.ajax({
         type: 'POST',
         url:"http://192.168.1.100:1236/account/login",
         cache: false,
         processData: false,
         contentType: "application/json",
         dataType: "json",
         data:JSON.stringify(obj),
         success:function(resObj){
         console.log(resObj);
         if(resObj.isError){
         that.setState({
         content:"login"
         })
         }else{
         that.setState({
         content:"leftTab"
         })
         }

         },
         error:function(){

         }
         });*/
    },
    //获取存储于sessionStorage中的token信息
    getStorageToken(){
        let Storage=window.sessionStorage;
        /*        var username = Storage.getItem('usernam')*/
        let token=Storage.getItem('token');
        return token;
    },
    setContent(){
        switch (this.state.content){
            case "login":
                return <Login login={this.login} openMessageModal={this.openMessageModal}></Login>;
                break;
            case "leftTab":
                return <Menu></Menu>;
                break;
        }
    },

    componentDidMount(){
        /* var that=this;
         $.ajax({
         type:"get",
         url:"http://192.168.1.107:1236/api",
         dataType: 'json',
         cache: false,
         success(resObj){
         if(resObj.isError){

         }else{
         that.setState({
         ApiList:resObj
         })
         }
         },
         error(){

         }
         })*/
    },
    render(){
        let messageClose = () => this.setState({ messageShow: false });
        return(
            <div>
                <NavHeader logout={this.logout} isLogin={this.state.content} username={this.state.username}></NavHeader>
                <MessageModal  show={this.state.messageShow}   onHide={messageClose} message={this.state.errorMessage} messageStyle={this.state.messageStyle} ></MessageModal>
                {this.setContent()}
            </div>
        )
    }
});
ReactDom.render(
    <MainPage></MainPage>,document.getElementById('app')
);
