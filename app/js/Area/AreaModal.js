/**
 * Created by xiaoqi on 2015/11/8.
 */
const React=require('react');
const  ReactBootstrap=require('react-bootstrap');
const Button=ReactBootstrap.Button;
const Modal=ReactBootstrap.Modal;
const  ProvincePanel=require('./provincePanel.js');
const CityPanel=require('./cityPanel.js');
const DistrictPanel=require('./districtPanel.js');
const AreaModal=React.createClass({
    render(){
        return(
            <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">选择地区</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProvincePanel></ProvincePanel>
                    <CityPanel></CityPanel>
                    <DistrictPanel></DistrictPanel>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>关闭</Button>
                </Modal.Footer>
            </Modal>
        )
    }
});
export default  AreaModal;