/**
 * Created by xiaoqi on 2015/11/1.
 */
const React =require('react');
const ReactBootstrap=require('react-bootstrap');
const Pagination=ReactBootstrap.Pagination;
const Pager=React.createClass({
    getInitialState(){
      return{
          activePage:1
      }
    },
    handleSelect(event,selectedEvent){
        this.setState({
            activePage:selectedEvent.eventKey
        });
        this.props.loadList(selectedEvent.eventKey);
    },
    render(){
        const  that=this;
        function setPage(){
            if(that.props.pageInfo.PageCount>1){
                return(
                    <Pagination
                        prev
                        next
                        first
                        last
                        ellipsis
                        items={that.props.pageInfo.PageCount}
                        maxButtons={5}
                        activePage={that.state.activePage}
                        onSelect={that.handleSelect}
                        >
                    </Pagination>
                )
            }else{
                return '';
            }
        }
   return(
       <div>
           {setPage()}
       </div>

   )
    }
});
export default Pager;