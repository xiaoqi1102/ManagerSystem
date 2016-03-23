/**
 * Created by xiaoqi on 2015/12/3.
 */
import React from 'react';
const ReactBootstrap = require('react-bootstrap');
const Table = ReactBootstrap.Table;
const ButtonToolbar=ReactBootstrap.ButtonToolbar;
const Glyphicon=ReactBootstrap.Glyphicon;
const Button = ReactBootstrap.Button;
const Alert=ReactBootstrap.Alert;
const PagerHeader=ReactBootstrap.PageHeader;
const Breadcrumb = ReactBootstrap.Breadcrumb;
const BreadcrumbItem = ReactBootstrap.BreadcrumbItem;
import Pager from '../PageNumber/pagination.js';
import {Link} from 'react-router-component'
const  EapList= React.createClass({
    getInitialState(){
        return{
            eapListData:[],
            pageInfo:{}
        }
    },
    componentWillMount(){
        this.getListData(1);
    },
    getListData(page){
        let comID=this.props.comID;
        let anBoxId=this.props.anBoxId;
        const that=this;
        YCenterRunTime.ApiCall("EAP实体表分页列表接口",{'page':page,'limit':10},function(obj){
            console.log(obj);
            that.setState({
                eapListData:obj.data
            })
        });
    },
    buyEap(e){
        console.log('buy');
        let obj={};
        obj.comID=this.props.comID;
        obj.anBoxId=this.props.anBoxId;
        obj.eapId=e.target.id;
        YCenterRunTime.ApiCall('购买EAP接口',JSON.stringify(obj),function(obj){console.log(obj)})
    },
    getList(){
        var that=this;
        if(this.state.eapListData.length==0){
            //console.log("getList,eapListData==\"\"");
            //当数据为空时显示暂无数据
            // console.log('data is null');
            return(
                <div>
                    <PagerHeader>Eap购买</PagerHeader>
                    <Alert bsStyle="info">
                        暂无数据
                    </Alert>
                </div>

            );
        }else{
            // console.log("getList,eapListData=",this.state.eapListData);
            return (

                <div>
                    <PagerHeader>Eap购买</PagerHeader>
                    <Table responsive>
                        <thead>
                        <tr>
                            <th>Eap名称</th>
                            <th>所属系列</th>
                            <th>创建时间</th>
                            <th>下载次数</th>
                            <th>定价</th>
                            <th>购买</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.eapListData.map(function(eapData,index){
                            // console.log(index);
                            return(
                                <tr key={index}>
                                    <td>{eapData.eAPName}</td>
                                    <td>{eapData.eAPSeriesID}</td>
                                    <td>{eapData.createTime}</td>
                                    <td>{eapData.downCount}</td>
                                    <td>{eapData.eAPPrice}</td>
                                    <td><Button bsStyle="info"  id={eapData.eAPID} onClick={that.buyEap}>购买</Button></td>
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
        return(
            <div>
                <Breadcrumb>
                    <BreadcrumbItem href='#'>
                        主页
                    </BreadcrumbItem>
                    <BreadcrumbItem href="/#/BoxList" >
                        公司盒子管理
                    </BreadcrumbItem>
                    <BreadcrumbItem href={'/#/CompanyEapList/'+this.props.anBoxId+'/'+this.props.comID} >
                        盒子Eap管理
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        购买Eap
                    </BreadcrumbItem>
                </Breadcrumb>
                {this.getList()}
            </div>
        )
    }
});
export default  EapList;
