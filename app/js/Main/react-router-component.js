/**
 * Created by xiaoqi on 2015/11/30.
 */
const React=require('react');
const Router=require('react-router-component');
const  ReactBootstrap=require('react-bootstrap');
const Row = ReactBootstrap.Row;
const Col = ReactBootstrap.Col;
const  Locations=Router.Locations;
const Location=Router.Location;
const Link=Router.Link;
const  NotFound = Router.NotFound;
const AccountList=require('./../Account/accountList.js');
const CompanyList=require('./../Company/companyList.js');
const AccountForm=require('./../Account/accountForm.js');
const Home=require('./../Home/home.js');
const NotFoundPage=require('./../NotFound/notFound.js');
const CompanyFrom=require('./../Company/companyForm');
const RoleList=require('./../Role/roleList.js');
const RoleEdit=require('./../Role/RoleEdit');
const BoxList=require('./../Box/boxList.js');
const BoxEdit=require('./../Box/boxForm.js');
import AllCompanyList from './../Eap/allEapList.js';
import CompanyEapList from './../Eap/companyEapList.js'
require('../../css/menu.scss');

const Menu=React.createClass({
    handleClick(){
        console.log(window.location.href);
    },
    //权限控制
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
            let isEnd=false;
            if(content.key==name){
                //寻找相同的key
                //  console.log(content.property.denyUser);
                if(content.property.denyUser.length>0){
                    $.each(content.property.denyUser,function(i,c){
                        //遍历被禁止的管理员
                        if(c==accountId){
                            isShow=false;
                            isEnd=true;
                        }
                    });
                }
                if(isEnd){
                    return isShow;
                }
                if(content.property.allowUser.length>0){
                    $.each(content.property.allowUser,function(i,c){
                        //遍历非管理员
                        if(c==accountId){
                            isShow=true;
                            isEnd=true;
                        }
                    });
                }
                if(isEnd){
                    return isShow;
                }
                if(content.property.requireRole.length>0){

                    $.each(content.property.requireRole,function(i,c){
                        //遍历
                        $.each(roles,function(ind,con){
                            if(c==con){
                                isShow =true;
                                isEnd =true;
                            }
                        })
                    })
                }
                if(isEnd){
                    return isShow;
                }
            }
        });
        // console.log(accountId);
        //console.log(roles);
        return isShow;
    },
   render(){
       return(
           <div className="container-fluid">
               <Row >
                   <Col lg={2}>
                       <ul className="leftMenu">
                           {this.getMenu('home')? <li><Link activeClassName="active"  globalHash={true} href="/" >主页</Link></li>:''}
                           {this.getMenu('account')?<li><Link  globalHash={true} href="/AccountList" >账号列表</Link></li>:''}
                           {this.getMenu('role')? <li><Link  globalHash={true} href="/RoleList" >角色管理</Link></li>:''}
                           {this.getMenu('company')?<li><Link  globalHash={true} href="/CompanyList" >公司管理</Link></li>:''}
                           {this.getMenu('box')?<li><Link  globalHash={true} href="/BoxList" >盒子管理</Link></li>:''}
                       </ul>
                   </Col>
                   <Col lg={10}>
                       <Locations hash>
                           {this.getMenu('home')?<Location path="/" handler={Home} />:''}
                           {this.getMenu('company')?<Location path="/CompanyList" handler={CompanyList}></Location>:''}
                           {this.getMenu('account')? <Location path="/AccountList" handler={AccountList} />:''}
                           {this.getMenu('role')?<Location path="/RoleList" handler={RoleList} />:''}
                           {this.getMenu('role')?<Location path="/RoleEdit/:roleId" handler={RoleEdit} />:''}
                           {this.getMenu('account')? <Location path="/AccountEdit/:accountId" handler={AccountForm} />:''}
                           {this.getMenu('company')?<Location path="/CompanyEdit/:comID" handler={CompanyFrom} />:''}
                           {this.getMenu('box')?<Location path="/BoxList" handler={BoxList} />:''}
                           {this.getMenu('eap')?<Location path="/CompanyEapList/:anBoxId/:comID" handler={CompanyEapList} />:''}
                           {this.getMenu('eap')?<Location path="/AllEapList/:anBoxId/:comID" handler={AllCompanyList} />:''}
                           <NotFound handler={NotFoundPage} />
                       </Locations>
                   </Col>
               </Row>
           </div>
       )
   }
});
export default  Menu;