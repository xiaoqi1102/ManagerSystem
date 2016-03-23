/**
 * Created by xiaoqi on 2015/12/3.
 */
import React from 'react';
import {
    Input,
    ButtonToolbar,
    Button,
    Glyphicon,
    ButtonInput,
    Row,
    Col,
    Breadcrumb,
    BreadcrumbItem
} from 'react-bootstrap'
const BoxForm=React.createClass({
    getInitialState(){
        return{
            deviceId:'',
            comID:'',
            activateState:'',
            activateKey:'',
            activateTime:'',
            isArchitectureBox:'',
            deviceConfig:'',
            onLineState:'',
            errorMessage:''
        }
    },
  render(){
      return(
         <div>

         </div>
      )
  }
});
export default  BoxForm;