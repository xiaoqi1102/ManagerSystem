/**
 * Created by xiaoqi on 2015/11/11.
 */
const React = require('react');
const ReactBootstrap = require('react-bootstrap');
const {
    ButtonToolbar,
    Button,
    Glyphicon,
    Input,
    ButtonInput,
    Row,
    Col,
    Breadcrumb,
    BreadcrumbItem} =require('react-bootstrap');
const $=require('jquery');
const MessageModal=require('./../messageModal.js');
const AccountSetRoleForm=require('./accountSetRole.js');
const AccountForm = React.createClass({
    componentWillMount(){
        //渲染组件之前先加载 角色列表和 账号角色
    },
    getInitialState(){
        return{
            title:'',
            mobile:'',
            password:'',
            loginName:'',
            accountState:'1',
            isEnable:'true',
            affirmPassword:'',
            messageShow:false,
            messageStyle:'success',
            errorMessage:'',
            isValidateError:false,
            roleList:[],
            accountRole:[],
            roleChecked:{},
            isNewAccount:false,
        }
    },
    componentDidMount(){
        this.loadData(this.props.accountId);
        this.getRoleList();
        this.loadAccountRole(this.props.accountId);

    },
    getRoleList(){
        const that=this;
        YCenterRunTime.ApiCall("角色信息分页接口",{'page':1,'limit':100},function(obj){
            let checkedList={};

            $.each(obj.data,function(i,c){
                checkedList[c.sysRoleId]=true;
            });
            that.setState({
                roleList:obj.data,
                roleChecked:{hello:true}
            });
        },function(obj){});
       /* let requestObj=this.props.requestApi("角色信息分页接口");
        const that=this;
        $.ajax({
            url:requestObj.url,
            header:{
                token:requestObj.token
            },
            type:requestObj.type,
            data:{
                page:1,
                limit:100
            },
            success(obj){
                let checkedList={};

                $.each(obj.data,function(i,c){
                    checkedList[c.sysRoleId]=true;
                });
                that.setState({
                    roleList:obj.data,
                    roleChecked:{hello:true}
                });
            }
        })*/
    },
    saveRoleEditSuccess(){
        const that=this;
        this.setState({
            errorMessage:'保存账号角色成功',
            messageShow:true,
            messageStyle:'success'

        });
        setTimeout(function(){
            that.setState({
                errorMessage:'',
                messageShow:false
            })
        },1000)
    },
    validateError(){
        this.setState({
            messageStyle:'danger',
            messageShow:true
        });
        console.log('validate error');
        return;
    },
    validateRight(){
        console.log('validate right');
        this.dataPost();
    },
    dataPost(){
        let that=this;
      /*  let requestObj=this.props.requestApi("账号信息更新");*/
        let updateObj={};
        if(this.props.accountId=='null'){
            updateObj.accountId='';
        }else{
            updateObj.accountId=this.props.accountId;
        }
        updateObj.title=this.state.title;
        updateObj.mobile=this.state.mobile;
        updateObj.pwd=this.state.password;
        updateObj.loginName=this.state.loginName;
        updateObj.isEnable=this.state.isEnable;
        YCenterRunTime.ApiCall('账号信息更新',JSON.stringify(updateObj),function(obj){
            //that.props.toList();
            const host=window.location.host;
            let url;
            if(host.indexOf('http://')>=0){
                url=host+'/#/AccountList';
            }else{
                url='http://'+host+'/#/AccountList';

            }
            //console.log(url);
            window.location.href=url;
        },function(obj){});
    },
    //提交表单操作
    handleSubmit(e){
        e.preventDefault();
        console.log("account form save");
        this.state.isValidateError?this.validateError():this.validateRight();
    },
    writeData(obj){
        console.log(obj);
    },
    handleChange(event){
        this.setState({
            errorMessage:''
        });

        let newState={};
        newState[event.target.name]=event.target.value;
        this.setState(newState);
        this.validate(event);
       /* setTimeout(() => {

        }, 10);*/

    },
    //表单验证操作

    validate(event){
       /* let
            title=this.refs.title.getDOMNode().value,
            mobile=this.refs.mobile.getDOMNode().value,
            password=this.refs.password.getDOMNode().value,
            affirmPassword=this.refs.affirmPassword.getDOMNode().value,
            loginName=this.refs.loginName.getDOMNode().value,
            passwordIsNull=false;*/
        let
            title=$("#title").val(),
            mobile=$("#mobile").val(),
            password=$("#password").val(),
            affirmPassword=$("#affirmPassword").val(),
            loginName=$("#loginName").val(),
            passwordIsNull=false;
        if(this.state.isNewAccount&&password==''){
            passwordIsNull=true;
            this.setState({errorMessage:'请输入密码',isValidateError:true});
        }else{
            passwordIsNull=false
        }
        if( password!=affirmPassword){
            this.setState({errorMessage:'两次输入的密码不一致',isValidateError:true});
        }
        if(mobile==''){
            this.setState({errorMessage:'请输入手机号码',isValidateError:true});
        }
        if(title==''){
            this.setState({errorMessage:'请输入昵称',isValidateError:true});
        }
        if(loginName==''){
            this.setState({errorMessage:'请输入登陆名',isValidateError:true});
        }
        if(loginName!=''&&mobile!=''&&title!=''&&password==affirmPassword&&passwordIsNull==false){
            this.setState({isValidateError:false});
        }

      /*  title==''?this.setState({errorMessage:'请输入昵称',isValidateError:true}):this.right();*/
       /* title!==''&&mobile!==''?this.setState({isValidateError:false}):this.right();*/
    },
    right(){
        console.log('right')
    },
    //加载账号信息
    loadData(id){
        console.log(typeof id);

        const that=this;
        if(id=='null'){
            this.setState({
                isNewAccount:true
            });
            that.validate();
            return;
        }else{
            this.setState({
                isNewAccount:false
            })
        }
        YCenterRunTime.ApiCall('获取账号信息',{'accountId':id},function(obj){
            that.setState({
                title:obj.data.title,
                mobile:obj.data.mobile,
                loginName:obj.data.loginName

            });
            if(obj.data.isEnable){
                that.setState({
                    isEnable:'true'
                })
            }else{
                that.setState({
                    isEnable:'false'
                })
            }
        },function(obj){});
      /*  let requestObj=this.props.requestApi("获取账号信息");
        console.log(requestObj);
        let that=this;
        if(!id){
            this.setState({
                isNewAccount:true
            });
            that.validate();
        }else{
            this.setState({
                isNewAccount:false
            })
        }
        if(!requestObj.url||!id){
            return;
        }

        $.ajax({
            header:{
                'token':requestObj.token
            },
            url:requestObj.url,
            type:requestObj.method,
            data:{
              accountId:id
            },
            success(obj){
                if(obj.isError){
                    alert(obj.errorDeac);
                }else{
                    that.writeData(obj);
                    that.setState({
                        title:obj.data.title,
                        mobile:obj.data.mobile,
                        loginName:obj.data.loginName

                    });
                    if(obj.data.isEnable){
                        that.setState({
                            isEnable:'true'
                        })
                    }else{
                        that.setState({
                            isEnable:'false'
                        })
                    }

                }
            },
            error(){

            }
        })*/
    },
    loadAccountRole(id){
        const that =this;
        if(id=='null'){
            return;
        }
        YCenterRunTime.ApiCall('获取账号的角色Id集合',{ 'accountId':id},function(obj){
            that.setState({
                accountRole:obj.data
            })
        },function(obj){});
      /*  let requestObj=this.props.requestApi("获取账号的角色Id集合");
        /!*if(!requestObj.url)*!/
        const that =this;
        $.ajax({
            url:requestObj.url,
            header:{
                token:requestObj.token
            },
            type:requestObj.method,
            data:{
                accountId:id
            },
            cache:false,

            success(obj){
                /!*console.log(obj);*!/
                that.setState({
                    accountRole:obj.data
                })
            },
            error(){

            }

        });
        console.log('accountSetRole:'+id);*/
    },
    render(){
        let messageClose = () => this.setState({ messageShow: false });
        return (
            <div>
               <MessageModal  show={this.state.messageShow}   onHide={messageClose} message={this.state.errorMessage} messageStyle={this.state.messageStyle} ></MessageModal>
                <Breadcrumb>
                    <BreadcrumbItem>
                        主页
                    </BreadcrumbItem>
                    <BreadcrumbItem href="/#/AccountList" >
                        账号列表
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                    编辑账号
                    </BreadcrumbItem>
                </Breadcrumb>

                <form onSubmit={this.handleSubmit} >
                    <fieldset>
                        <legend>编辑基本资料 <small bsStyle="info">密码不填则不修改</small></legend>
                        <Input wrapper>
                            <Row>
                            <Col xs={1} xsOffset={1}>
                                <label htmlFor="" className="control-label">登陆名</label>
                            </Col>
                             <Col xs={3}>
                                 <input disabled={!this.state.isNewAccount} value={this.state.loginName} type="text" id="loginName" name="loginName" ref="loginName" onChange={this.handleChange} className="form-control"/>
                             </Col>
                              <Col xs={1} xsOffset={1}>
                                  <label htmlFor="" className="control-label">是否启用</label>
                              </Col>
                                <Col xs={3}>
                                    <label htmlFor="" className="radio-inline" >
                                        <input type="radio" name="isEnable" checked={this.state.isEnable=="true"} onChange={this.handleChange} ref="accountState" value="true"/>
                                        是
                                    </label>
                                    <label htmlFor="" className="radio-inline">
                                        <input type="radio" name="isEnable" checked={this.state.isEnable=="false"}  onChange={this.handleChange} ref="accountState" value="false"/>
                                        否
                                    </label>
                                </Col>
                            </Row>
                        </Input>
                        <Input wrapper>
                            <Row>
                                <Col xs={1} xsOffset={1}>
                                    <label htmlFor="title" className="control-label">
                                        昵称
                                    </label>
                                </Col>
                                <Col xs={3}>
                                    <input type="text"value={this.state.title} onChange={this.handleChange}  ref="title" id="title" name="title" className="form-control"/>
                                </Col>
                                <Col xs={1} xsOffset={1}>
                                    <label htmlFor="mobile" className="control-label">
                                        手机号码
                                    </label>
                                </Col>
                                <Col xs={3}>
                                    <input type="text" id="mobile" name="mobile" ref="mobile" value={this.state.mobile} onChange={this.handleChange}  className="form-control"/>
                                </Col>

                            </Row>
                        </Input>
                        <Input wrapper>
                            <Row>
                                <Col xs={1} xsOffset={1}>
                                    <label htmlFor="password" className="control-label">
                                        密码
                                    </label>
                                </Col>
                                <Col xs={3}>
                                    <input type="text" name="password" id="password" ref="password" value={this.state.password} onChange={this.handleChange} className="form-control"/>
                                </Col>
                                <Col xs={1} xsOffset={1}>
                                    <label htmlFor="affirmPassword" className="control-label">
                                        确认密码
                                    </label>
                                </Col>
                                <Col xs={3}>
                                    <input type="text" name="affirmPassword" id="affirmPassword" ref="affirmPassword" value={this.state.affirmPassword} onChange={this.handleChange} className="form-control"/>
                                </Col>
                            </Row>
                        </Input>
                        <Input wrapper>
                            <Row>

                                <Col xs={3} xsOffset={2}>
                                    <ButtonInput block type="submit"  bsStyle="info" value="保存"/>
                                </Col>
                            </Row>
                        </Input>
                    </fieldset>
                </form>
                <AccountSetRoleForm saveRoleEditSuccess={this.saveRoleEditSuccess} accountId={this.props.accountId} roleChecked={this.state.roleChecked} roleList={this.state.roleList} accountRole={this.state.accountRole} requestApi={this.props.requestApi} ></AccountSetRoleForm>
            </div>
        )
    }
});
export default  AccountForm;