/**
 * Created by xiaoqi on 2015/11/1.
 */
const React=require('react');
const ReactBootstrap=require('react-bootstrap');
const Tabs=ReactBootstrap.Tabs;
const Tab=ReactBootstrap.Tab;
const FollowTable=require('./../table.js');
const Pager=require('./../PageNumber/pagination.js');
const ButtonToolbar=ReactBootstrap.ButtonToolbar;
const Button=ReactBootstrap.Button;
const Glyphicon=ReactBootstrap.Glyphicon;
const AccountList=require('./../Account/accountList.js');
const RoleList=require('./../Role/roleList.js');
const NavHeader=require('./../Nav/nav.js');
const RolePanelGroup=require('./../Role/rolePanelGroup.js');
const AccountForm=require('./../Account/accountForm.js');
const Home=require('./../Home/home.js');
const CompanyList=require('./../Company/companyList.js');
const CompanyForm=require('./../Company/companyForm.js');
const BoxList=require('../Box/boxList.js');
const $=require('jquery');
const LeftTab=React.createClass({
    getInitialState(){
        return{
            key: 'main',
            content1:"Home",
            content2:"AccountList",
            accountId:'',
            roleId:'',
            companyId:'',
            content3:"RoleList",
            content4:"CompanyList",
            boxContent:"BoxList",
            content6:"DoctorList",
            functionPointListData:[],
            roleFunctionList:[]
        }
    },
    componentWillMount(){
        var activeKey = localStorage.getItem('activeKey');
        if(!activeKey ){
            return;
        }
      /*  console.log(typeof activeKey);*/
        this.setState({
            key:activeKey
        });

       /* this.getRoleFunctionPoint(this.state.roleId);*/
    },
    componentDidMount(){
      /*  this.loadAccountList(1);*/
        /*this.loadRoleList(1);*/
       /* this.loadCompanyList(1);*/
        this.loadFunctionPointGroupList();
    },
   /* loadCompanyList(page){
        let requestObj= this.props.requestApi("公司分页列表接口");
        console.log(requestObj);
        let that = this;
        if(!requestObj.url){
            return;
        }
        $.ajax({
            headers:{
                token:requestObj.token
            },
            data:{
                'page':page ,
                'limit':10
            },
            url:requestObj.url,
            type:requestObj.method,
            dataType:'json',
            contentType: "application/json",
            cache:true,
            success(resObj){
                console.log(resObj);
                //列表的渲染状态 根据 CompanyListData 决定 leftTab 只负责传传数据 渲染结果由 accountList 内部进行
                that.setState({
                    CompanyListData:resObj.data
                })
            },
            error(){

            }
        })
    },*/
  /*  loadAccountList(page){
        let requestObj= this.props.requestApi("账号信息分页接口");
        console.log(requestObj);
        let that = this;
        if(!requestObj.url){
            return;
        }
        $.ajax({
            headers:{
                token:requestObj.token
            },
            data:{
              'page':page ,
               'limit':10
            },
            url:requestObj.url,
            type:requestObj.method,
            dataType:'json',
            contentType: "application/json",
            cache:true,
            success(resObj){
                console.log(resObj);
                //列表的渲染状态 根据 accountListData 决定 leftTab 只负责传传数据 渲染结果由 accountList 内部进行
                that.setState({
                    accountListData:resObj.data
                })
            },
            error(){

            }
        })
    },
    loadRoleList(page){
        let that = this;
        YCenterRunTime.ApiCall("角色信息分页接口",{"page":page,"limit":10},function(obj){
            that.setState({
                roleListData:obj.data
            })
        },function(obj){});
      /!*  let requestObj= this.props.requestApi("角色信息分页接口");
        console.log(requestObj);
        let that = this;
        if(!requestObj.url){
            return;
        }
        $.ajax({
            headers:{
               // token:requestObj.token
                token:YCenterRunTime.getToken()
            },
            data:{
                'page':page ,
                'limit':10
            },
            url:requestObj.url,
            type:requestObj.method,
            dataType:'json',
            contentType: "application/json",
            cache:true,
            success(resObj){
                console.log(resObj);
                //列表的渲染状态 根据 accountListData 决定 leftTab 只负责传传数据 渲染结果由 accountList 内部进行
                that.setState({
                    roleListData:resObj.data
                })
            },
            error(){

            }
        })*!/
    },*/
    getRoleFunctionPoint(id){
      /*  const requestObj=this.props.requestApi('获取角色具有权限的功能点');
        const that=this;
        console.log('url is '+requestObj.url);
        $.ajax({
            url:requestObj.url,
            header:{
            //    token:requestObj.token
                token:YCenterRunTime.getToken()
            },
            method:requestObj.method,
            data:{sysRoleId:id},
            cache:false,
            success(obj){
                if(obj.isError){
                    console.log(obj.errorDesc);
                }else{
                    that.setState({
                        roleFunctionList:obj.data
                    })
                }
            },
            error(){

            }
        })*/
    },
    //侧边浪切换触发事件
    handleSelect(key){
      /*  console.log(key);*/
        localStorage.activeKey=key;
        switch (key){
            case 'account':
                this.setState({
                   content2:"AccountList"
                });
               // this.loadAccountList(1);
                break;
            case 'role':
                this.setState({
                    content3:"RoleList"
                });
                //this.loadRoleList(1);
                //this.loadFunctionPointGroupList();
                break;
            case 'company':
                this.setState({
                    content4:"CompanyList"
                });
               // this.loadCompanyList(1);
                break;

        }
        this.setState({key});
    },
    home(){
        switch (this.state.content1){
            case "Home":
                return <Home></Home>;
                break;
        }
    },
    loadFunctionPointGroupList(){
        const that=this;
        YCenterRunTime.ApiCall("以分组获取所有功能点",{"page":1,"limit":10000},function(obj){
            that.setState({
                functionPointListData:obj.data
            })
        },function(obj){});
      /*  const requestObj=this.props.requestApi('以分组获取所有功能点');
        console.log(YCenterRunTime.getToken());
        $.ajax({
            url:requestObj.url,
            header:{
               // token:requestObj.token
                token:requestObj.token
            },
            method:requestObj.method,
            data:{
                page:1,
                limit:100000
            },
            success(listdata){
                //console.log(listdata);
                if(listdata.isError){
                    that.props.openMessageModal(listdata.errorDesc,'danger');
                }else{
                    that.setState({
                        functionPointListData:listdata.data
                    })
                }

            },
            error(e){
                that.props.openMessageModal(e,'danger');
            }
        })*/
    },
    role(){
        switch (this.state.content3){
            case "RoleList":
                return <RoleList roleEdit={this.roleEdit} ></RoleList>;
            case "RolePanelGroup":
                return <RolePanelGroup /*roleFunctionList={this.state.roleFunctionList}*/ functionPointListData={this.state.functionPointListData} toList={this.roleToList} roleId={this.state.roleId}  openMessageModal={this.props.openMessageModal}></RolePanelGroup>;
                break;
        }
    },
    roleEdit(e){
        console.log("role edit");
        this.setState({
            content3:"RolePanelGroup",
            roleId:e.target.id
        });
        console.log('roleId is '+e.target.id);
        this.getRoleFunctionPoint(e.target.id);
    },
    roleToList(){
        this.setState({
            content3:"RoleList"
        });
       // this.loadRoleList(1);
    },
    account(){
    switch (this.state.content2){
        case"AccountList":
            return  <AccountList edit={this.accountEdit}></AccountList>;
        break;
        case "AccountForm":
            return <AccountForm toList={this.accountToList} accountId={this.state.accountId}></AccountForm>;
            break;

    }
},
    accountEdit(e){
        e.preventDefault();
        let id = e.target.id;
       /* console.log(e.target.id);*/
        this.setState({
            accountId:id,
            content2:"AccountForm"
        });
    },
    accountToList(){
        this.setState({
            content2:"AccountList"
        });
        //this.loadAccountList(1);
    },
    company(){
        switch (this.state.content4){
            case "CompanyList":
                return <CompanyList edit={this.companyEdit} ></CompanyList>;
                break;
            case "CompanyForm":
                return <CompanyForm toList={this.companyToList} companyId={this.state.companyId}></CompanyForm>;
            break;
        }
    },
    companyEdit(e){
        e.preventDefault();
        let id = e.target.id;
        this.setState({
            content4:'CompanyForm',
            companyId:id
        })
    },
    companyToList(){
        this.setState({
            content4:'CompanyList'
        })
    },
    box(){
       switch (this.state.boxContent){
           case 'BoxList':
               return <BoxList edit={this.boxEdit}></BoxList>;
               break;
       }
    },
    boxEdit(){},
    getMenu(name){
        const that=this;
        let UserPermissions=YCenterRunTime.getUserPermissions();
        let isShow=false;
      //  console.log(UserPermissions);
        var menuList=UserPermissions.menuGroup;
        let userData=YCenterRunTime.getUserData(),
            accountId=userData.accountId,
            roles=userData.roles;

        //console.log(userData);

        $.each(menuList,function(index,content){
           if(content.key==name){
               //寻找相同的key
             //  console.log(content.property.denyUser);
               if(content.property.denyUser.length>0){
                   $.each(content.property.denyUser,function(i,c){
                       //遍历被禁止的管理员
                       if(c==accountId){
                           isShow=false;
                           return false;
                       }
                   });
               }
               if(content.property.allowUser.length>0){
                   $.each(content.property.allowUser,function(i,c){
                       //遍历非管理员
                       if(c==accountId){
                           isShow=true;
                           return true;
                       }
                   });
               }
               if(content.property.requireRole.length>0){

                   $.each(content.property.requireRole,function(i,c){
                       //遍历
                       $.each(roles,function(ind,con){
                           if(c==con){
                               isShow =true;
                               return true;
                           }
                       })
                   })
               }


           }
        });
       // console.log(accountId);
        //console.log(roles);
        return isShow;
    },
   render(){
       let UserPermissions=YCenterRunTime.getUserPermissions();
       let that=this;
       return (
         <div>
             <Tabs activeKey={this.state.key} onSelect={this.handleSelect} position="left" tabWidth={2}>
                 {this.getMenu('home')?  <Tab eventKey={'home'} title="主页">{this.home()}</Tab>:''}
                 {this.getMenu('account')? <Tab eventKey={'account'} title="账号管理">{this.account()}</Tab>:''}
                 {this.getMenu('role')?  <Tab eventKey={'role'} title="角色管理">{this.role()}</Tab>:''}
                 {this.getMenu('company')?   <Tab eventKey={'company'} title="公司管理" >{this.company()}</Tab>:''}
                 {this.getMenu('box')?  <Tab eventKey={'box'} title="盒子管理" >{this.box()}</Tab>:''}
             </Tabs>
         </div>
       )
   }
});
export default  LeftTab;