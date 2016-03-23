/**
 * Created by xiaoqi on 2015/11/8.
 */
const React=require('react');
const  ReactBootstrap=require('react-bootstrap');
const Button=ReactBootstrap.Button;
const Modal=ReactBootstrap.Modal;
const  Alert=ReactBootstrap.Alert;
const messageModal=React.createClass({

    render(){
        return(
            <Modal {...this.props}  aria-labelledby="contained-modal-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">提示</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Alert bsStyle={this.props.messageStyle}>
                        {this.props.message}
                    </Alert>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>关闭</Button>
                </Modal.Footer>
            </Modal>
        )
    }
});
export default  messageModal;