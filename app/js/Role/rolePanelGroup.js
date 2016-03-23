/**
 * Created by xiaoqi on 2015/11/9.
 */
const React=require('react');
const RectBootstrap=require('react-bootstrap');
const PanelGroup=RectBootstrap.PanelGroup;
const Panel=RectBootstrap.Panel;
const ListGroup=RectBootstrap.ListGroup;
const  ListGroupItem=RectBootstrap.ListGroupItem;
const Input=RectBootstrap.Input;
const Row=RectBootstrap.Row;
const Col=RectBootstrap.Col;
const ButtonInput=RectBootstrap.ButtonInput;
const Alert=RectBootstrap.Alert;
const $=require('jquery');
const ResponsiveEmbed=RectBootstrap.ResponsiveEmbed;
const Breadcrumb = RectBootstrap.Breadcrumb;
const BreadcrumbItem = RectBootstrap.BreadcrumbItem;
/*const Simditor = require('simditor');*/
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
 let baseUrl='http://192.168.1.107:1236';
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
 };*/
let functionPointList={};
/*const requestObj=requestApi('功能点分页列表接口');
 $.ajax({
 url:requestObj.url,
 header:{token:requestObj.token},
 method:requestObj.method,
 data:{
 page:1,
 limit:100000
 },
 success(listdata){
 console.log(listdata);
 functionPointList=listdata.data;
 },
 error(e){
 //that.props.openMessageModal(e,'danger');
 }
 });*/
const RolePanelGroup=React.createClass({

    getInitialState(){
        let stateList={
            activeKey:-1,
            roleName:'',
            roleDescription:'',
            message:'',
            messageStyle:'',
            isValidateError:false,
            isNewRole:false,
            roleFunctionList:[]
        };
        console.log(functionPointList);
        $.each(functionPointList,function(index,content){
            stateList[content.functionPointId]=false;
        });
        console.log(stateList);
        return stateList;

    },
    getRoleFunctionPoint(id){
        const that=this;
        YCenterRunTime.ApiCall("获取角色具有权限的功能点",{sysRoleId:id},function(obj){
            let checkedList={};
            // const that=this;
            console.log(that.state.roleFunctionList);
            $.each(obj.data,function(index,content){
                // console.log(content);
                that.state[content]=true;
            });
            that.setState(checkedList);

        },function(obj){});
       /* const requestObj=this.props.requestApi('获取角色具有权限的功能点');
        const that=this;
        // console.log('url is '+requestObj.url);
        $.ajax({
            url:requestObj.url,
            header:{token:requestObj.token},
            method:requestObj.method,
            data:{sysRoleId:id},
            cache:false,
            success(obj){
                console.log(obj);
                if(obj.isError){
                    console.log(obj.errorDesc);
                }else{
                    let checkedList={};
                    // const that=this;
                    console.log(that.state.roleFunctionList);
                    $.each(obj.data,function(index,content){
                        // console.log(content);
                        that.state[content]=true;
                    });
                    that.setState(checkedList);
                    /!*that.setState({
                     roleFunctionList:obj.data
                     })*!/
                }
            },
            error(){

            }
        })*/
    },
    componentWillMount(){

        this.getRoleFunctionPoint(this.props.roleId);
        //  console.log(that.props.roleFunctionList);

        /*  const that=this;
         let checkedList={};
         if(that.props.roleFunctionList.length==0){
         setTimeout(function(){
         $.each(that.props.roleFunctionList,function(index,content){
         // console.log(content);
         that.state[content]=true;
         });
         that.setState(checkedList);
         },1000)
         }else{
         $.each(that.props.roleFunctionList,function(index,content){
         //console.log(content);
         that.state[content]=true;
         });
         this.setState(checkedList);
         }*/
    },
    componentDidMount(){
        let checkedList={};
        const that=this;
        console.log(that.state.roleFunctionList);
        $.each(that.state.roleFunctionList,function(index,content){
            // console.log(content);
            that.state[content]=true;
        });
        that.setState(checkedList);
       // var ue = UE.getEditor('editor');
        this.loadData(this.props.roleId);
    },
    componentWillUnmount(){
        UE.getEditor('editor').destroy();
    },
    handleSubmit(e){
        e.preventDefault();
        console.log("save role edit");
        if(this.state.isValidateError){
            this.props.openMessageModal(this.state.message,'danger');
            return;
        }
        this.dataPost();
    },
    handleSelect(activeKey){
        /*   console.log(activeKey);*/
        this.setState({
            activeKey
        })
    },
    loadData(id){
        const that=this;
        YCenterRunTime.ApiCall("角色信息接口",{sysRoleId:id},function(obj){
            that.setState({
                roleName:obj.data.roleName,
                roleDescription:obj.data.roleDescription
            });
            UE.getEditor('editor').ready(function(){
                UE.getEditor('editor').setContent(obj.data.roleDescription);
            })
        });
      /*  console.log('roleId is '+ id);
        const requestObj=this.props.requestApi("角色信息接口");
        const that=this;
        if(!id){
            this.setState({
                isNewRole:true
            });
            this.validate();
        }else{
            this.setState({
                isNewRole:false
            })
        }
        if(!requestObj.url||!id){
            return;
        }
        $.ajax({
            url:requestObj.url,
            header:{token:requestObj.token},
            data:{
                sysRoleId:id
            },
            method:requestObj.method,
            success(obj){
                //console.log(obj);
                if(obj.isError){
                    console.log(obj.errorDesc);
                }else{
                    that.setState({
                        roleName:obj.data.roleName,
                        roleDescription:obj.data.roleDescription
                    });
                    UE.getEditor('editor').ready(function(){
                        UE.getEditor('editor').setContent(obj.data.roleDescription);
                    })
                }
            },
            error(){

            }
        })*/
    },

    loadFunctionPoint(id){
        const requestObj=this.props.requestApi();
    },
    dataPost(){
        let obj = {};
        const that =this;
        obj.sysRoleId=this.props.roleId;
        obj.roleName=this.state.roleName;
      /*  obj.roleDescription=this.state.roleDescription;*/
        UE.getEditor('editor').ready(function(){
            obj.roleDescription=  UE.getEditor('editor').getContent();
        });

        YCenterRunTime.ApiCall("更新角色信息接口",JSON.stringify(obj),function(obj){
            that.functionPointPost();
        },function(obj){});
      /*  const requestObj=this.props.requestApi("更新角色信息接口");
        const that =this;
        $.ajax({
            url:requestObj.url,
            header:{token:requestObj.token},
            method:requestObj.method,
            data:JSON.stringify(obj),
            success(resObj){
                console.log(resObj);
                if(resObj.isError){
                    console.log(resObj.errorDesc);
                    that.props.openMessageModal(resObj.errorDesc,'error');
                }else{
                    that.functionPointPost();
                    //return;

                }
            },
            error(){

            }
        })*/
    },
    functionPointPost(){
        const that=this;
        let checkedPoint=[];
        $.each(that.props.functionPointListData,function(index,functionPointGroup){
            console.log(functionPointGroup.functionPoints);
            //let id = functionPointGroup.functionPoints.functionPointId;
            $.each(functionPointGroup.functionPoints,function(i,c){
                let id = c.functionPointId;
                if(that.state[id]){
                    checkedPoint.push(id);
                }
            });
        });
        console.log(checkedPoint);

        let obj={};
        obj.sysRoleId=this.props.roleId;
        obj.functionPointIds=checkedPoint;
        console.log(obj);
        YCenterRunTime.ApiCall('更新角色的功能点接口',JSON.stringify(obj),function(obj){
            that.props.openMessageModal("更新角色功能点成功","success",true);
            YCenterRunTime.permissionsReload();
            setTimeout(function(){
                that.props.toList();
            },1200);
        },function(obj){});
        /*   const requestObj=this.props.requestApi("更新角色的功能点接口");

        $.ajax({
            url:requestObj.url,
            header:{token:requestObj.token},
            method:requestObj.method,
            data:JSON.stringify(obj),
            success(resObj){
                if(resObj.isError){
                    that.props.openMessageModal(resObj.errorDesc,"danger");
                }else{

                }
            },
            error(e){
                console.log(e);
                that.props.openMessageModal(e,"danger");
            }
        })*/
    },
    handleChange(event){
        this.setState({
            errorMessage:''
        });
        let newState={};
        newState[event.target.name]=event.target.value;
        this.setState(newState);
        this.validate();
    },
    handleCheck(e){
        let newState={};
        let isChecked=this.state[e.target.value];
        newState[e.target.value]=!isChecked;
        this.setState(newState);
    },
    validate(){
        let roleDescription,
            roleName=$("#roleName").val();
        UE.getEditor('editor').ready(function(){
           roleDescription=UE.getEditor('editor').getContent();
        });
        if(roleDescription==''){
            this.setState({
                isValidateError:true,
                message:'请输入角色描述'
            })
        }
        if(roleName==''){
            this.setState({
                isValidateError:true,
                message:'请输入角色名称'
            })
        }
        if(roleName!=''&&roleDescription!=''){
            this.setState({
                isValidateError:false,
                message:''
            })
        }
    },
    getFunctionPointList(listdata){
        const that=this;
        return(
            listdata.map(function(functionPoint,key){
                return(
                    <Input  ref={functionPoint.functionPointId} onChange={that.handleCheck} name="functionPoint" key={key} type="checkbox" checked={that.state[functionPoint.functionPointId]} label={functionPoint.summary} value={functionPoint.functionPointId} labelClass="col-xs-2" wrapperClass="col-xs-10"/>
                    /* <Input wrapper key={key}>
                     <div className="checkbox">
                     <label htmlFor={functionPoint.functionPointId}>
                     <input type="checkbox" value={functionPoint.functionPointId} onChange={that.handleCheck} ref={functionPoint.functionPointId} id={functionPoint.functionPointId} checked={that.state[functionPoint.functionPointId]}/>
                     {functionPoint.summary}
                     </label>
                     </div>
                     </Input>*/
                )
            })
        )
    },
    getFunctionPointGroup(){
        const that=this;
        if(this.props.functionPointListData==''){
            return(
                <div>
                    <Alert bsStyle="info">
                        功能点暂无数据
                    </Alert>
                </div>
            )
        }else{
            return(
                <PanelGroup activeKey={this.state.activeKey} onSelect={this.handleSelect} accordion>
                    {this.props.functionPointListData.map(function(functionGroup,index){
                        //   console.log(index);
                        return(
                            <Panel header={functionGroup.groupName}key={index} eventKey={index+1}>
                                <ListGroup fill>
                                    <ListGroupItem>
                                        {that.getFunctionPointList(functionGroup.functionPoints)}
                                    </ListGroupItem>
                                </ListGroup>
                            </Panel>
                        )
                    })}
                </PanelGroup>
            )
        }
    },
    render(){
        /*  const that=this;
         let checkedList={};
         $.each(that.state.roleFunctionList,function(index,content){
         console.log(content);
         that.state[content]=true;
         });
         that.setState(checkedList);*/
        return(
            <div>
                <Breadcrumb>
                    <BreadcrumbItem>
                        主页
                    </BreadcrumbItem>
                    <BreadcrumbItem href="#" onClick={this.props.toList}>
                        角色列表
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        编辑角色
                    </BreadcrumbItem>
                </Breadcrumb>
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>编辑角色</legend>
                        <Input wrapper>
                            <Row>
                                <Col xs={1} >
                                    <label htmlFor="roleName">角色名称</label>
                                </Col>
                                <Col xs={3}>
                                    <input type="text" id="roleName" name="roleName" ref="roleName" value={this.state.roleName} onChange={this.handleChange} className="form-control" />
                                </Col>
                            </Row>
                        </Input>
                        <Input wrapper>
                            <Row>
                                <Col xs={1} >
                                    <label htmlFor="roleName">角色描述</label>
                                </Col>
                                <Col xs={8}>
                                    <div id="editor"></div>
                                </Col>
                            </Row>
                        </Input>
                        {this.getFunctionPointGroup()}
                        <Input wrapper>
                            <Row>
                                <Col xs={3}>
                                    <ButtonInput type="submit" block bsStyle="info"  value="保存"></ButtonInput>
                                </Col>
                            </Row>
                        </Input>
                    </fieldset>

                </form>
            </div>

        );
    }
});

export default RolePanelGroup;
