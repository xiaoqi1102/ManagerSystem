/**
 * Created by xiaoqi on 2015/11/17.
 */
const React = require('react');
const  ReactDOM=require('react-dom');
const ReactBootstrap = require('react-bootstrap');
const ButtonToolbar = ReactBootstrap.ButtonToolbar;
const Button = ReactBootstrap.Button;
const Glyphicon = ReactBootstrap.Glyphicon;
const Input = ReactBootstrap.Input;
const ButtonInput = ReactBootstrap.ButtonInput;
const Row = ReactBootstrap.Row;
const Col = ReactBootstrap.Col;
const Breadcrumb = ReactBootstrap.Breadcrumb;
const BreadcrumbItem = ReactBootstrap.BreadcrumbItem;
const $=require('jquery');
/*let requestApi=function(key){
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
        // console.log(loginCollection.data);
        roles=loginCollection.data[0].roles;
        token=loginCollection.data[0].token;
        meta= loginCollection.data[0].meta;
        accountId=loginCollection.data[0].accountId;
        apiObj.token=token;
        /!* console.log(roles);
         console.log(token);
         console.log(meta);
         console.log(accountId);*!/
    });
    //加载接口列表
    db.loadDatabase({},function(){
        let baseUrl='http://192.168.1.100:1236';
        let ApiCollection=db.getCollection('ApiCollection');
        // console.log(ApiCollection.data);
        $.each(ApiCollection.data,function(index,content) {
            /!*  console.log(content.key);*!/
            if (content.key ==key) {
                /!* console.log(content);*!/
                apiObj.method=content.method;
                //如果不需要登录就能获取权限
                if(content.isNeedAuth){
                    apiObj.url =baseUrl+ content.url;
                    return apiObj;
                }
                //如果存在无权限账号,则进行遍历
                if(content.refuesd.length!=0){
                    $.each(content.refuesd,function(index,refueser){
                        /!*console.log(refueser);*!/
                        if(refueser==accountId){
                            return "";
                        }
                    });
                }
                //如果有权限的账号列表存在
                if(content.allowed.length!=0){
                    $.each(content.allowed,function(index,allower){
                        /!*  console.log(content);*!/
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
};
let requestObj=requestApi("角色信息分页接口");*/
let roleList={};
/*$.ajax({
    header:{token:requestObj.token},
    url:requestObj.url,
    data:{
        page:1,
        limit:100
    },
    success(obj){
        roleList=obj.data;
    }
});*/
const AccountSetRoleForm=React.createClass({
    getInitialState(){
        let roleChecked={};

        const that=this;

       // let roleList=[{roleId:'121313'}];
        $.each(roleList,function(i,c){
            roleChecked[c.sysRoleId]=false;
        });
        return roleChecked;
    },
    componentWillMount(){
        /*this.getRoleList();*/
        const that=this;
        if(that.props.accountRole.length==0){
            setTimeout(function(){
                // console.log(that.props.accountRole);
                let newChecked={};
                $.each(that.props.accountRole,function(index,content){
                    //   console.log(content);
                    newChecked[content]=true;
                });
                that.setState(newChecked);
            },1000);
        }else{
            let newChecked={};
            $.each(that.props.accountRole,function(index,content){
                //   console.log(content);
                newChecked[content]=true;
            });
            that.setState(newChecked);
        }

    },
    componentDidMount(){
    },
    handleSubmit(e){
        e.preventDefault();
        let newState={};
        let checkedLength=0;
        const that=this;
        $.each(that.props.roleList,function(i,c){
            if(that.state[c.sysRoleId]==true){
                checkedLength++;
            }
        });
        if(checkedLength==0){
            alert("请至少选择一个角色");
            return;
        }
        this.postRoleEdit();
    },
    postRoleEdit(){
      /*  const requestObj=this.props.requestApi("设置账号的角色");*/
        const that=this;
        let obj={};
        obj.accountId=this.props.accountId;
        obj.roleIds=[];
        //遍历已经已选的角色checkbox
        $.each(that.props.roleList,function(index,content){
           //console.log(React.findDOMNode(that.refs[content.sysRoleId]));
            if(ReactDOM.findDOMNode(that.refs[content.sysRoleId]).checked){
                obj.roleIds.push(content.sysRoleId);
            }
        });
        console.log(obj);
        YCenterRunTime.ApiCall('设置账号的角色',JSON.stringify(obj),function(obj){
            YCenterRunTime.permissionsReload();
            that.props.saveRoleEditSuccess();
        },function(obj){});
      /*  $.ajax({
            header:{token:requestObj.token},
            url:requestObj.url,
            data:JSON.stringify(obj),
            method:requestObj.method,
            success(obj){
                if(obj.isError){

                }else{
                    //alert("保存账号角色成功");
                    that.props.saveRoleEditSuccess();
                }
            },
            error(){

            }
        })*/
    },
    isChecked(value){
        const that=this;
        let isChecked=false;
        $.each(that.props.accountRole,function(index,content){
            if(value==content){
                isChecked=true;
            }
        });
        return isChecked;
    },

    handleChange(e){
        let newState={};
        let isChecked=this.state[e.target.value];
        newState[e.target.value]=!isChecked;
        this.setState(newState);

    },
    handleClick(e){

    },
    render(){
        const that=this;
        function isChecked(value){
            let isChecked=false;
            $.each(that.props.accountRole,function(index,content){
                if(value==content){
                    isChecked=true;
                }
            });
            return isChecked;
        }
        return(
            <form onSubmit={this.handleSubmit} >
                <fieldset>
                <legend>选择账号角色</legend>
                  <Input wrapper>
                      <Row>
                          <Col xs={1} xsOffset={1}>
                              <label htmlFor="password" className="control-label">
                                  角色
                              </label>
                          </Col>
                          <Col xs={10}>
                              {
                                  that.props.roleList.map(function(role,index){
                                     // console.log(that.state[role.sysRoleId]);
                                      return(
                                          <label htmlFor="" className="checkbox-inline" key={index}>
                                              <input type="checkbox" name="roles" ref={role.sysRoleId} id={role.sysRoleId}  checked={that.state[role.sysRoleId]}  value={role.sysRoleId} onChange={that.handleChange}   />
                                              {role.roleName}
                                          </label>
                                      )
                                  })
                                }
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
        )
    }
});
export default  AccountSetRoleForm;