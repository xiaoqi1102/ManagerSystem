/**
 * Created by xiaoqi on 2015/11/11.
 */
const React=require('react');
const  ReactBootstrap=require('react-bootstrap');
const PagerHeader=ReactBootstrap.PageHeader;
const  Home =React.createClass({
    render(){
        return(
            <div>
                <PagerHeader>
                Y-Center后台主页
                </PagerHeader>
            </div>
        )
    }
});
export default  Home;