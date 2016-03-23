/**
 * Created by xiaoqi on 2015/11/30.
 */
const React = require('react');
const ReactBootstrap = require('react-bootstrap');
const Row = ReactBootstrap.Row;
const Col = ReactBootstrap.Col;
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const Link=ReactRouter.Link;
require('./../../css/menu.scss');
const active={
    color:'#fff',backgroundColor:'#337ab7'
};
const Menu = React.createClass({
    render(){
        return (
            <div className="container-fluid">
                <Row >
                    <Col lg={2}>
                        <ul className="leftMenu">
                            <li><Link to="Home" hash='#hash' activeClassName='active'>主页</Link></li>
                         <li><Link to="Account"  activeClassName='active'>账号管理</Link></li>
                        </ul>
                    </Col>
                    <Col lg={10}>
                        {this.props.children}
                    </Col>
                </Row>
            </div>
        )
    }
});
export default  Menu;