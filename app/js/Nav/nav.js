/**
 * Created by xiaoqi on 2015/11/1.
 */
const React=require('react');
const ReactBootrap=require('react-bootstrap');
const Navbar=ReactBootrap.Navbar;
const Nav=ReactBootrap.Nav;
const NavItem=ReactBootrap.NavItem;
const NavBrand=ReactBootrap.NavBrand;
const NavDropdown=ReactBootrap.NavDropdown;
const MenuItem=ReactBootrap.MenuItem;
const Glyphicon=ReactBootrap.Glyphicon;
const NavHeader=React.createClass({
    getInitialState(){
        return{
            isShow:'hidden',
        }
    },
    handleSelect(key){
        console.log(key);
    },
    componentDidMount(){
    },
    render(){
        return(
            <Navbar inverse toggleNavKey={0}>
                <NavBrand><a href="javascript:;">Y-Center后台管理系统</a></NavBrand>
                <Nav right  eventKey={0}>
                    <NavDropdown eventKey={1} title={this.props.username} id="LoginDown" className={this.props.isLogin=='leftTab'?'':'hidden'} >
                        <MenuItem eventKey={1} onClick={this.props.logout}>
                            退出登录
                        </MenuItem>
                    </NavDropdown>
                </Nav>
            </Navbar>
        )
    }
});
export default NavHeader;