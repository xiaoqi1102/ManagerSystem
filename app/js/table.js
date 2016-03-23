/**
 * Created by xiaoqi on 2015/11/1.
 */
const React=require('react');
const ReactBootstrap=require('react-bootstrap');
const Table=ReactBootstrap.Table;
const Button=ReactBootstrap.Button;
const FollowUpTable=React.createClass({
    render(){
        return(
            <Table responsive >
                <thead>
                <tr>
                    <th>#</th>
                    <th>病人姓名</th>
                    <th>医生</th>
                    <th>创建时间</th>
                    <th>编辑</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>小明</td>
                    <td>小红</td>
                    <td>2015-3-4</td>
                    <td>
                        <Button bsStyle="primary">编辑</Button>
                    </td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>小明</td>
                    <td>小红</td>
                    <td>2015-3-4</td>
                    <td>
                        <Button bsStyle="primary">编辑</Button>
                    </td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>小明</td>
                    <td>小红</td>
                    <td>2015-3-4</td>
                    <td>
                        <Button bsStyle="primary">编辑</Button>
                    </td>
                </tr>
                </tbody>
            </Table>
        )
    }
});
export default FollowUpTable;