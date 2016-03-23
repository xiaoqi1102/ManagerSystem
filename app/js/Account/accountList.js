/**
 * Created by xiaoqi on 2015/11/5.
 */
const React = require('react');
const ReactBootstrap = require('react-bootstrap');
const Table = ReactBootstrap.Table;
const ButtonToolbar=ReactBootstrap.ButtonToolbar;
const Glyphicon=ReactBootstrap.Glyphicon;
const Button = ReactBootstrap.Button;
const Alert=ReactBootstrap.Alert;
const PagerHeader=ReactBootstrap.PageHeader;
const Pager=require('../PageNumber/pagination.js');
const Router=require('react-router-component');
/*const  Locations=Router.Locations;
const Location=Router.Location;*/
const Link=Router.Link;
const AccountTable = React.createClass({
    getInitialState(){
        //console.log("getInitialState");
        return{
            accountListData:[],
            pageInfo:{}
        }
    },
    getDefaultProps(){
        //console.log("getDefaultProps");
    },
    componentWillMount(){
        //console.log("componentWillMount");
        this.loadAccountList(1);
    },
    componentDidMount(){
       // console.log("compnentDidMount");
    },
    componentWillReceiveProps(){
        //console.log("componentWillReceiveProps");
    },
    loadAccountList(page){
        let that = this;
        YCenterRunTime.ApiCall("账号信息分页接口",{'page':page,'limit':10},function(obj){
            that.setState({
                accountListData:obj.data,
                pageInfo:obj.pageInfo
            })
        },function(obj){});
      /*  let requestObj= this.props.requestApi("账号信息分页接口");
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
        })*/
    },
    getList(){
        var that=this;
        if(this.state.accountListData.length==0){
            //console.log("getList,accountListData==\"\"");
            //当数据为空时显示暂无数据
           // console.log('data is null');
            return(
                <div>
                    <ButtonToolbar>
                        <Button bsStyle="info" href="/#/AccountEdit/null">
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
           // console.log("getList,accountListData=",this.state.accountListData);
            return (

                <div>
                    <PagerHeader>账号管理</PagerHeader>
                    <ButtonToolbar>
                        <Button bsStyle="info" href="/#/AccountEdit/null">
                            <span>新增 </span>
                            <Glyphicon glyph="plus"></Glyphicon>
                        </Button>
                    </ButtonToolbar>
                    <Table responsive>
                        <thead>
                        <tr>
                            <th>登录名</th>
                            <th>昵称</th>
                            <th>是否可用</th>
                            <th>编辑</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.accountListData.map(function(accountData,index){
                           // console.log(index);
                            return(
                                <tr key={index}>
                                    <td>{accountData.loginName}</td>
                                    <td>{accountData.title}</td>
                                    <td>{accountData.isEnable==true?"是":"否"}</td>
                                    <td><Link globalHash={true} href={"/AccountEdit/"+accountData.accountId} className="btn btn-info">编辑</Link></td>
                                  {/*
                                   <td><Button bsStyle="info"  id={accountData.accountId} onClick={that.props.edit}>编辑</Button></td>
                                  */}
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                    <Pager pageInfo={this.state.pageInfo} loadList={this.loadAccountList}></Pager>
                </div>
            )
        }
    },
    render(){
       // console.log("render");
        return (
           <div>
               {this.getList()}
           </div>
        )
    }
});
export default  AccountTable;