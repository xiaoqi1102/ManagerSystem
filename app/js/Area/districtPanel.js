/**
 * Created by xiaoqi on 2015/11/8.
 */
const React=require('react');
const  ReactBootstrap=require('react-bootstrap');
const Panel=ReactBootstrap.Panel;
const  DistrictPanel=React.createClass({
    render(){
        return(
            <Panel header="选择区/县" bsStyle="primary">
            Hello I am district
            </Panel>
        )
    }
});
export default  DistrictPanel;