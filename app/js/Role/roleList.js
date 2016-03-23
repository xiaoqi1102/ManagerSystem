/**
 * Created by xiaoqi on 2015/11/5.
 */
const React =require('react');
const ReactBootstrap=require('react-bootstrap');
const ButtonToolbar=ReactBootstrap.ButtonToolbar;
const Button=ReactBootstrap.Button;
const Glyphicon=ReactBootstrap.Glyphicon;
const Table=ReactBootstrap.Table;
const Alert=ReactBootstrap.Alert;
const PagerHeader=ReactBootstrap.PageHeader;
const Pager=require('../PageNumber/pagination.js');
const Router=require('react-router-component');
const Link=Router.Link;
const RoleList=React.createClass({
    getInitialState(){
      return{
          roleListData:[],
          pageInfo:{}
      }
    },
    componentWillMount(){
        this.loadRoleList(1);
    },
    loadRoleList(page){
        let that = this;
        YCenterRunTime.ApiCall("角色信息分页接口",{"page":page,"limit":10},function(obj){
            that.setState({
                roleListData:obj.data,
                pageInfo:obj.pageInfo
            })
        },function(obj){});
        /*  let requestObj= this.props.requestApi("角色信息分页接口");
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
         })*/
    },
    getList(){
        let that =this;
        if(this.state.roleListData.length==0){
            //当数据为空时显示暂无数据
            //console.log('data is null');
            return(
                <div>
                    <ButtonToolbar>
                        <Button bsStyle="info" onClick={that.props.edit}>
                            <span>新增 </span>
                            <Glyphicon glyph="plus"></Glyphicon>
                        </Button>
                    </ButtonToolbar>
                    <hr/>
                    <Alert bsStyle="info">
                        暂无数据
                    </Alert>
                </div>

            );
        }else{
            return(
                <div>
                    <PagerHeader>角色管理</PagerHeader>
                    <ButtonToolbar>
                        <Button bsStyle="info" href="/#/RoleEdit/null">
                            <span>新增 </span>
                            <Glyphicon glyph="plus"></Glyphicon>
                        </Button>
                    </ButtonToolbar>
                    <Table responsive>
                        <thead>
                        <tr>
                            <th>角色名</th>
                            <th>角色描述</th>
                            <th>编辑</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.roleListData.map(function(roleData,index){
                            return(
                                <tr key={index}>
                                    <td>{roleData.roleName}</td>
                                    <td>{roleData.roleDescription}</td>
                                    <td><Link className="btn btn-info" href={'/RoleEdit/'+roleData.sysRoleId}>编辑</Link></td>
                                    {/*<td><Button bsStyle="info" id={roleData.sysRoleId} onClick={that.props.roleEdit}>编辑</Button></td>*/}
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                    <Pager pageInfo={this.state.pageInfo} loadList={this.loadRoleList}></Pager>
                </div>
            )
        }

    },
   render(){
       let that=this;
       return (
         <div>
             {this.getList()}
         </div>
       )
   }
});
export default  RoleList;