/**
 * Created by xiaoqi on 2015/11/5.
 */
const React =require('react');
const ReactBootstrap=require('react-bootstrap');
const RoleList=require('./roleList.js');
/*const ButtonToolbar=ReactBootstrap.ButtonToolbar;
const Button=ReactBootstrap.Button;
const Glyphicon=ReactBootstrap.Glyphicon;
const Table=ReactBootstrap.Table;*/
const Role=React.createClass({
   render(){
       return (
         <div>
             <RoleList></RoleList>
         </div>
       )
   }
});
export default  RoleList;