/**
 * Created by xiaoqi on 2015/11/8.
 */
const React=require('react');
const ReactDom=require('react-dom');
const ReactBootstrap=require('react-bootstrap');
const Row=ReactBootstrap.Row;
const Col=ReactBootstrap.Col;
const NavHeader=require('./Nav/nav.js');
const Input=ReactBootstrap.Input;
const ButtonInput=ReactBootstrap.ButtonInput;
const MessageModal=require('./messageModal.js');
const $=require('jquery');

const Login=React.createClass({

    getInitialState(){
        return{
            disabled:true,
            style:null,
            lgShow:false,
            messageShow:false,
            errorMessage:"",
            messageStyle:"success"
        }
    },

    handleSubmit(e){
     /*   let requestObj=this.props.requestApi("登陆接口");
        console.log(requestObj);*/
        e.preventDefault();
        let username=this.refs.userName.getValue();
        let password=this.refs.password.getValue();
        let obj={};
        obj.loginName=username;
        obj.pwd=password;
        /* console.log(obj);*/
        let Storage=window.sessionStorage;
        let that=this;
      /*  let success=function(obj){
            console.log(obj);
            YCenterRunTime.afterLogin(obj);
        };
        let error=function(obj){

        };*/
        YCenterRunTime.ApiCall("登陆接口",JSON.stringify(obj),function(obj){
           // console.log(obj);
            YCenterRunTime.afterLogin(obj);
         /*   var db=new loki('login.json');
            var  loginCollection =db.addCollection('loginData');
            loginCollection.insert(obj.data);
            db.save();
            //写入token
            Storage.token=obj.data.token;*/
            that.props.login();
        },function(obj){});
/*        $.ajax({
            // header:{token:requestObj.token},
            type: 'post',
            url:"http://192.168.1.100:1236/account/login",
            cache: false,
            processData: false,
            contentType: "application/json",
            dataType: "json",
            data:JSON.stringify(obj),
            beforeSend(){
                that.setState({
                    disabled:true
                })
            },
            success:function(resObj){
                console.log(resObj);
                if(resObj.isError){
                    that.setState({
                        messageShow:true,
                        errorMessage:resObj.errorDesc,
                        messageStyle:"warning",
                        disabled:false
                    })
                }else{
                    //使用loki.js 写入登录信息
                    var db=new loki('login.json');
                    var  loginCollection =db.addCollection('loginData');
                    loginCollection.insert(resObj.data);
                    db.save();
                    that.props.login();
                    //写入token
                    Storage.token=resObj.data.token;
                    YCenterRunTime.afterLogin(resObj);
                }

                /!*  return;*!/

            },
            error:function(){

            }
        });*/

        /*  ReactDom.render(
         Main,document.getElementById('app')
         );*/
    },
    validationState(){
        let length = this.refs.userName.getValue().length;
        let style = 'danger';
        let username=this.refs.userName.getValue();
        let password=this.refs.password.getValue();
        /* console.log(username);
         console.log(password);*/
        if(username!=""&&password!=""){
            /* console.log("right");*/
            style="success";
        }
        /* if (length > 10) style = 'success';
         else if (length > 5) style = 'warning';

         let disabled = style !== 'success';*/
        let disabled = style !== 'success';
        return { style, disabled };
    },
    handleChange(){
        this.setState(
            this.validationState()
        )
    },
    render(){
        let lgClose = () => this.setState({ messageShow: false });
        return(
            <div>
                <MessageModal show={this.state.messageShow}  onHide={lgClose} message={this.state.errorMessage} messageStyle={this.state.messageStyle}>
                </MessageModal>
                <Row>
                    <Col xs={3} sm={3} lg={6}>

                    </Col>
                    <Col xs={9} sm={9} lg={6}>
                        <form  className="form-horizontal" onSubmit={this.handleSubmit}>
                            <Input type="text" ref="userName" onChange={this.handleChange} label="用户名" labelClassName="col-xs-2" wrapperClassName="col-xs-4"/>
                            <Input type="password" ref="password" onChange={this.handleChange} label="密码" labelClassName="col-xs-2" wrapperClassName="col-xs-4"/>
                            <ButtonInput  wrapperClassName="col-xs-offset-2 col-xs-4" block  type="submit" value="登录" bsStyle={this.state.style} disabled={this.state.disabled}/>
                        </form>
                    </Col>
                </Row>
            </div>
        )
    }
});
export default Login;