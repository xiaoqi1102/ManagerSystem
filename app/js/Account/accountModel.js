/**
 * Created by xiaoqi on 2015/11/27.
 */
const React=require('react');
const ReactBootstrap=require('react-bootstrap');
const AccountForm=require('./accountForm.js');
const AccountModel=React.createClass({
    getInitialState(){
        return{
            content2:"AccountList"
        }
    },
    account(){
        switch (this.state.content2){
            case"AccountList":
                return  <AccountList edit={this.accountEdit}></AccountList>;
                break;
            case "AccountForm":
                return <AccountForm toList={this.accountToList} accountId={this.state.accountId}></AccountForm>;
                break;

        }
    },
    accountEdit(e){
        e.preventDefault();
        let id = e.target.id;
        /* console.log(e.target.id);*/
        this.setState({
            accountId:id,
            content2:"AccountForm"
        });
    },
    accountToList(){
        this.setState({
            content2:"AccountList"
        });
        //this.loadAccountList(1);
    },
   render(){

   }
});