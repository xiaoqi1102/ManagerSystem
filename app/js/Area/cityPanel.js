/**
 * Created by xiaoqi on 2015/11/8.
 */
const React=require('react');
const  ReactBootstrap=require('react-bootstrap');
const Panel=ReactBootstrap.Panel;
const  CityPanel=React.createClass({
    render(){
        return(
            <Panel header="选择城市" bsStyle="info">
            Hello I am city
            </Panel>
        )
    }
});
export default  CityPanel;