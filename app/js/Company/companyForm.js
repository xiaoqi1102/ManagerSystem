/**
 * Created by xiaoqi on 2015/11/20.
 */
const React = require('react');
const ReactBootstrap = require('react-bootstrap');
const ButtonToolbar = ReactBootstrap.ButtonToolbar;
const Button = ReactBootstrap.Button;
const Glyphicon = ReactBootstrap.Glyphicon;
const Input = ReactBootstrap.Input;
const ButtonInput = ReactBootstrap.ButtonInput;
const Row = ReactBootstrap.Row;
const Col = ReactBootstrap.Col;
const Breadcrumb = ReactBootstrap.Breadcrumb;
const BreadcrumbItem = ReactBootstrap.BreadcrumbItem;
const $=require('jquery');

const CompanyForm=React.createClass({
    getInitialState(){
        return{
            companyName:'',
            zipCode:'',
            companyAddress:'',
            companyPhone:'',
            companyEmail:'',
            companyWebSite:'',
            companyDescription:'',
            companyKind:'0',
            companyLic:'',
            createTime:'',
            verifiyTime:'',
            isVerify:false,
            companyLogo:'',
            balance:'0',
            isEnable:false,
            homeDomain:'',
            errorMessage:'',
            province:'',
            cityList:[],
            city:'',
            town:'',
            townList:[]
        }
    },
    handleSubmit(e){
        e.preventDefault();
        console.log('save company');
        let obj={};
        const that=this;

        obj.comID=this.props.comID;
        obj.companyName=this.state.companyName;
       /* obj.companyPhone=this.state.companyPhone;*/
        obj.zipCode=this.state.zipCode;
        obj.companyAddress=this.state.companyAddress;
        obj.companyPhone=this.state.companyPhone;
        obj.companyEmail=this.state.companyEmail;
        obj.companyWebSite=this.state.companyWebSite;
        obj.companyDescription=this.state.companyDescription;
        obj.companyKind=this.state.companyKind;
        obj.companyLic=this.state.companyLic;
        //obj.createTime=this.state.createTime;
        //obj.verifiyTime=this.state.verifiyTime;
        obj.isVerify=this.state.isVerify;
        obj.companyLogo=this.state.companyLogo;
        obj.balance=this.state.balance;
        obj.isEnable=this.state.isEnable;
        obj.homeDomain=this.state.homeDomain;
        console.log(obj);
        YCenterRunTime.ApiCall('更新公司信息接口',JSON.stringify(obj),function(obj){
          that.toList();
            //that.props.toList();
        },function(obj){});
    },
    toList(){
        const host=window.location.host;
        let url=host+'/#/CompanyList';
        Tool.openPage(url);
    },
    handleChange(event){
        this.setState({
            errorMessage:''
        });

        let newState={};
        newState[event.target.name]=event.target.value;
        this.setState(newState);
        this.validate();
    },
    componentWillMount(){
        console.log(this.props.comID);
        this.loadData(this.props.comID);

    },
    componentDidMount(){

    },
    loadData(id){
        if(!id){
            return;
        }
        const that=this;
        YCenterRunTime.ApiCall("公司信息接口",{'comID':id},function(obj){
           // console.log(obj);
            that.setState({
                companyName:obj.data.companyName,
                zipCode:obj.data.zipCode,
                companyAddress:obj.data.companyAddress,
                companyPhone:obj.data.companyPhone,
                companyEmail:obj.data.companyEmail,
                companyWebSite:obj.data.companyWebSite,
                companyDescription:obj.data.companyDescription,
                companyKind:obj.data.companyKind,
                companyLic:obj.data.companyLic,
                createTime:obj.data.createTime,
                verifiyTime:obj.data.verifiyTime,
                isVerify:obj.data.isVerify,
                companyLogo:obj.data.companyLogo,
                balance:obj.data.balance,
                isEnable:obj.data.isEnable,
                homeDomain:obj.data.homeDomain,

            })
        },function(obj){});
    },
    validate(){},
    render(){
        /*0 私企 1 国企 2 事业单位 3 政府  4 外企 5 公益组织 6 其他*/
        const  that=this;
        return(
      <div>
          <Breadcrumb>
              <BreadcrumbItem>
                  主页
              </BreadcrumbItem>
              <BreadcrumbItem href="#/CompanyList" >
                  公司列表
              </BreadcrumbItem>
              <BreadcrumbItem active>
                  编辑公司
              </BreadcrumbItem>
          </Breadcrumb>
          <form onSubmit={this.handleSubmit}>
              <fieldset>
                  <legend>编辑公司资料</legend>
                  <Input wrapper>
                      <Row>
                          <Col xs={1} xsOffset={1}>
                              <label htmlFor="companyName" className="control-label">
                                  公司名
                              </label>
                          </Col>
                          <Col xs={3}>
                              <input type="text"value={this.state.companyName} onChange={this.handleChange}  ref="companyName" id="companyName" name="companyName" className="form-control"/>
                          </Col>
                          <Col xs={1} xsOffset={1}>
                              <label htmlFor="companyLic" className="control-label">
                                  公司执照
                              </label>
                          </Col>
                          <Col xs={3}>
                              <input type="text" value={this.state.companyLic} onChange={this.handleChange}  ref="companyLic" id="companyLic" name="companyLic" className="form-control"/>
                          </Col>
                      </Row>
                  </Input>
                  <Input wrapper>
                      <Row>
                          <Col xs={1} xsOffset={1}>
                              <label htmlFor="balance" className="control-label">
                                  帐户余额
                              </label>
                          </Col>
                          <Col xs={3}>
                              <input type="text"value={this.state.balance } disabled   ref="balance" id="balance" name="balance" className="form-control"/>
                          </Col>
                          <Col xs={1} xsOffset={1}>
                              <label htmlFor="homeDomain" className="control-label">
                                  公司域名
                              </label>
                          </Col>
                          <Col xs={3}>
                              <input type="text"value={this.state.homeDomain } disabled ref="homeDomain" id="homeDomain" name="homeDomain" className="form-control"/>
                          </Col>
                      </Row>
                  </Input>
                  <Input wrapper>
                      <Row>
                          <Col xs={1} xsOffset={1}>
                              <label htmlFor="companyEmail" className="control-label">
                                  Email
                              </label>
                          </Col>
                          <Col xs={3}>
                              <input type="email"value={this.state.companyEmail } onChange={this.handleChange}  ref="companyEmail" id="companyEmail" name="companyEmail" className="form-control"/>
                          </Col>
                          <Col xs={1} xsOffset={1}>
                              <label htmlFor="companyPhone" className="control-label">
                                  手机号码
                              </label>
                          </Col>
                          <Col xs={3}>
                              <input type="text" id="companyPhone" name="companyPhone" ref="companyPhone" value={this.state.companyPhone} onChange={this.handleChange}  className="form-control"/>
                          </Col>
                      </Row>
                  </Input>
                  <Input wrapper>
                      <Row>

                          <Col xs={1} xsOffset={1}>
                              <label htmlFor="companyKind" className="control-label">
                                  公司性质
                              </label>
                          </Col>
                          <Col xs={3}>
                              <select type="text"value={this.state.companyKind } onChange={this.handleChange}  ref="companyKind" id="companyKind" name="companyKind" className="form-control">
                                  <option value="0">私企</option>
                                  <option value="1">国企</option>
                                  <option value="2">事业单位</option>
                                  <option value="3">政府</option>
                                  <option value="4">外企</option>
                                  <option value="5">公益组织</option>
                                  <option value="6">其他</option>
                               </select>
                          </Col>
                          <Col xs={1} xsOffset={1}>
                              <label htmlFor="companyWebSite" className="control-label">
                                  公司网站
                              </label>
                          </Col>
                          <Col xs={3}>
                              <input type="text"value={this.state.companyWebSite } onChange={this.handleChange}  ref="companyWebSite" id="companyWebSite" name="companyWebSite" className="form-control"/>
                          </Col>
                      </Row>
                  </Input>

                  <Input wrapper>
                      <Row>
                          <Col xs={1} xsOffset={1}>
                              <label htmlFor="zipCode" className="control-label">
                                  邮编
                              </label>
                          </Col>
                          <Col xs={3}>
                              <input type="text"value={this.state.zipCode } onChange={this.handleChange}  ref="zipCode" id="zipCode" name="zipCode" className="form-control"/>
                          </Col>

                      </Row>
                  </Input>
                  <Input wrapper>
                      <Row>
                          <Col xs={1} xsOffset={1}>
                              <label htmlFor="companyAddress" className="control-label">
                                  公司地址
                              </label>
                          </Col>
                          <Col xs={3}>
                              <textarea value={this.state.companyAddress } onChange={this.handleChange}  ref="companyAddress" id="companyAddress" name="companyAddress" className="form-control"/>
                          </Col>
                          <Col xs={1} xsOffset={1}>
                              <label htmlFor="companyDescription" className="control-label">
                                  公司简介
                              </label>
                          </Col>
                          <Col xs={3}>
                              <textarea value={this.state.companyDescription } onChange={this.handleChange}  ref="companyDescription" id="companyDescription" name="companyDescription" className="form-control"/>
                          </Col>

                      </Row>
                  </Input>
                  <Input wrapper>
                      <Row>
                          <Col xs={3} xsOffset={2}>
                              <ButtonInput type="submit" block bsStyle="info"  value="保存"></ButtonInput>
                          </Col>
                      </Row>
                  </Input>
              </fieldset>
          </form>
      </div>
        )
    }
});
export default  CompanyForm;