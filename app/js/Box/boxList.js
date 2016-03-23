/**
 * Created by xiaoqi on 2015/11/27.
 */
import React from 'react';
const ReactBootstrap = require('react-bootstrap');
const Table = ReactBootstrap.Table;
const ButtonToolbar=ReactBootstrap.ButtonToolbar;
const Glyphicon=ReactBootstrap.Glyphicon;
const Button = ReactBootstrap.Button;
const Alert=ReactBootstrap.Alert;
const PagerHeader=ReactBootstrap.PageHeader;
const Pager = require('../PageNumber/pagination.js');
const Breadcrumb = ReactBootstrap.Breadcrumb;
const BreadcrumbItem = ReactBootstrap.BreadcrumbItem;
import {Link} from 'react-router-component'

const BoxTable = React.createClass({
    getInitialState(){
        return{
            boxListData:[]
        }
    },
    componentWillMount(){
        this.loadBoxList(1);
    },
    loadBoxList(page){
        const that=this;
        let userData=YCenterRunTime.getUserData();
        let  companyId=userData.companyId;
       /* if(companyId=='0000000000000000'){
            return;
        }*/
        YCenterRunTime.ApiCall('获取公司的盒子列表',{'comID':companyId},function(obj){
            console.log(obj);
            that.setState({
                boxListData:obj.data
            })
        });
    },
    getContent(){
        const that=this;
        if(this.state.boxListData.length==0){
            return(
                <div>
                    <Alert bsStyle="info">
                        暂无数据
                    </Alert>
                </div>
            )
        }else{
            let comID=YCenterRunTime.getCompanyId();
            return(
                <div>
                    <PagerHeader>盒子管理</PagerHeader>
                    <Table responsive>
                        <thead>
                        <tr>
                            <th>公司</th>
                            <th>设备ID</th>
                            <th>激活时间</th>
                            <th>编辑</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.boxListData.boxs.map(function(box,index){
                            return(
                                <tr key={index}>
                                    <td>{that.getCompanyName(box.comID)}</td>
                                    <td>{box.deviceId}</td>
                                    <td>{box.activateTime}</td>
                                    <td><Link className="btn btn-info" href={'/CompanyEapList/'+box.anBoxId+'/'+comID}>盒子Eap管理</Link></td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                </div>
            )
        }
    },
    getCompanyName(id){
        let companyName=null;
        if(this.state.boxListData.length==0){
            return ''
        }
        let companyList=this.state.boxListData.coms;
        if(companyList.length==0){
            return ''
        }
        $.each(companyList,function(index,content){
           if(content.k==id){
               companyName=content.v;
           }
        });
        return companyName;
    },
    render(){
        return (
            <div>
                <Breadcrumb>
                    <BreadcrumbItem href='#'>
                        主页
                    </BreadcrumbItem>
                    <BreadcrumbItem active >
                        公司盒子管理
                    </BreadcrumbItem>
                </Breadcrumb>
                {this.getContent()}
            </div>
        )
    }
});
export default BoxTable;