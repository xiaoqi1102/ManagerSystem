/**
 * Created by xiaoqi on 2015/11/20.
 */
const React = require('react');
const ReactBootstrap = require('react-bootstrap');
const Table = ReactBootstrap.Table;
const ButtonToolbar = ReactBootstrap.ButtonToolbar;
const Glyphicon = ReactBootstrap.Glyphicon;
const Button = ReactBootstrap.Button;
const Alert = ReactBootstrap.Alert;
const PagerHeader = ReactBootstrap.PageHeader;
const Pager=require('../PageNumber/pagination.js');
const Router=require('react-router-component');
const Link=Router.Link;
const CompanyTable = React.createClass({
    getInitialState(){
        return {
            CompanyListData: [],
            pageInfo:{}
        }
    },
    componentWillMount(){
        this.loadCompanyList(1);
    },
    loadCompanyList(page){
        const that = this;
        YCenterRunTime.ApiCall('公司分页列表接口', {'page': page, 'limit': 10}, function (obj) {
            that.setState({
                CompanyListData: obj.data,
                pageInfo:obj.pageInfo
            })
        }, function (obj) {
        });
        /*   let requestObj= this.props.requestApi("公司分页列表接口");
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
         })*/
    },
    getList(){
        /*0 私企 1 国企 2 事业单位 3 政府  4 外企 5 公益组织 6 其他*/
        function getCompanyKind(i) {
            switch (i) {
                case 0:
                    return "私企";
                    break;
                case  1:
                    return "国企";
                    break;
                case 2:
                    return "事业单位";
                    break;
                case 3:
                    return "政府";
                    break;
                case 4:
                    return "外企";
                    break;
                case 5:
                    return "公益组织";
                    break;
                case 6:
                    return "其他";
                    break;
            }
        }
        var that = this;
        if (this.state.CompanyListData.length == 0) {
            //当数据为空时显示暂无数据
            // console.log('data is null');
            return (
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
        } else {
            return (
                <div>
                    <PagerHeader>公司管理</PagerHeader>
                    <ButtonToolbar>
                        <Button bsStyle="info" onClick={that.props.edit}>
                            <span>新增 </span>
                            <Glyphicon glyph="plus"></Glyphicon>
                        </Button>
                    </ButtonToolbar>
                    <Table responsive>
                        <thead>
                        <tr>
                            <th>公司名</th>
                            <th>公司性质</th>
                            <th>公司电话</th>
                            <th>编辑</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.CompanyListData.map(function (company, index) {
                            return (
                                <tr key={index}>
                                    <td>{company.companyName}</td>
                                    <td>{getCompanyKind(company.companyKind)}</td>
                                    <td>{company.companyPhone}</td>
                                    <td><Link className="btn btn-info" href={'/CompanyEdit/'+company.comID}>编辑</Link> </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                    <Pager pageInfo={this.state.pageInfo} loadList={this.loadCompanyList}></Pager>
                </div>
            )
        }
    },
    render(){
        return (
            <div>
                {this.getList()}
            </div>
        )
    }
});
export default  CompanyTable;