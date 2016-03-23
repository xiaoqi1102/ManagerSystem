/**
 * Created by xiaoqi on 2015/12/3.
 */
const React = require('react');
const ReactBootstrap = require('react-bootstrap');
const Table = ReactBootstrap.Table;
const ButtonToolbar = ReactBootstrap.ButtonToolbar;
const Glyphicon = ReactBootstrap.Glyphicon;
const Button = ReactBootstrap.Button;
const Alert = ReactBootstrap.Alert;
const PagerHeader = ReactBootstrap.PageHeader;
const Breadcrumb = ReactBootstrap.Breadcrumb;
const BreadcrumbItem = ReactBootstrap.BreadcrumbItem;
import Pager from '../PageNumber/pagination.js';
import {Link} from 'react-router-component'
const EapList = React.createClass({
    getInitialState(){
        return {
            eapListData: [],
            pageInfo: {}
        }
    },
    componentWillMount(){
        this.getListData(1);
    },
    getListData(page){
        let comID = this.props.comID;
        let anBoxId = this.props.anBoxId;
        const that = this;
        YCenterRunTime.ApiCall("获取盒子的EAP列表", {'comID': comID, 'anBoxId': anBoxId}, function (obj) {
            //  console.log(obj.data);
            that.setState({
                eapListData: obj.data
            })

        });
    },
    getEapStateVal(state){
       // console.log(typeof  state);
        //0 还未下载   1 已经下载  2 部署状态  3 启动状态 4 停止状态
        switch (state) {
            case 0:
                return '还未下载';
                break;
            case 1:
                return '已经下载';
                break;
            case 2:
                return '部署状态';
                break;
            case 3:
                return '启动状态';
                break;
            case 4:
                return '停止状态';
                break;
            default :
                return '未知状态';
            break;

        }
    },
    getEapName(id){
      let
          eapName='',
          eapList=this.state.eapListData.eaps;
        $.each(eapList,function(index,content){
            /*console.log(id);
            console.log(content);*/
            if(id==content.k){
                eapName=content.v;
            }
        });
        return eapName;
    },
    getList(){
        var that = this;
        let comID = YCenterRunTime.getCompanyId();
        if (this.state.eapListData.length == 0) {
            //console.log("getList,eapListData==\"\"");
            //当数据为空时显示暂无数据
            // console.log('data is null');
            return (
                <div>
                    <ButtonToolbar>
                        <Button bsStyle="info" href={"/#/AllEapList/"+that.props.anBoxId+'/'+comID}>
                            <span>购买Eap </span>
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
            // console.log("getList,eapListData=",this.state.eapListData);
            return (

                <div>
                    <PagerHeader>Eap管理</PagerHeader>
                    <ButtonToolbar>
                        <Button bsStyle="info" href={"/#/AllEapList/"+that.props.anBoxId+'/'+comID}>
                            <span>购买Eap </span>
                            <Glyphicon glyph="plus"></Glyphicon>
                        </Button>
                    </ButtonToolbar>
                    <Table responsive>
                        <thead>
                        <tr>
                            <th>Eap名称</th>
                            <th>状态</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.eapListData.boxEaps.map(function (eapData, index) {
                           // console.log(eapData);
                            return (
                                <tr key={index}>
                                    <td>{that.getEapName(eapData.eapId)}</td>
                                    <td>{that.getEapStateVal(eapData.eapState)}</td>
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
        return (
            <div>
                <Breadcrumb>
                    <BreadcrumbItem href='#'>
                        主页
                    </BreadcrumbItem>
                    <BreadcrumbItem href="/#/BoxList" >
                        公司盒子管理
                    </BreadcrumbItem>
                    <BreadcrumbItem  active>
                        盒子Eap管理
                    </BreadcrumbItem>
                </Breadcrumb>
                {this.getList()}
            </div>
        )
    }
});
export default  EapList;
