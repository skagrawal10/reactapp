import React, { PropTypes, Component } from 'react';
import {PageHeader,Panel,Table,Button,Input} from 'react-bootstrap';
import { Link } from 'react-router';

var GitUserList = React.createClass({
    getInitialState: function(){
      return { 
        items: [],
        keyword: "", 
      };
    },
  componentDidMount: function() {
    
  },
  fetchResults: function(){
    self = this;
    if(self.state.keyword.length>=3)
    {
      fetch('https://api.github.com/search/users?q='+self.state.keyword)
        .then(function(response) {
          return response.json()
        }).then(function(json) {
            if(json){
              self.setState({
                items:json.items
              });  
            }
          console.log('parsed json', json)
        }).catch(function(ex) {
          self.setState({
                items:[]
              });
          console.log('parsing failed', ex)
        }); 
    }
    else
    {
        self.setState({
          items : []
        });
    }
  },
  search : function(){
    this.fetchResults();
  },
  getDetails : function(user_object){
    window.current_user_obj = user_object;
    window.location.href = "#/git-user-details";
  },
  updateKeyword : function(event)
  {
    // var keyword = event.target.value;
    // alert(keyword);
    this.setState({
      keyword:event.target.value,
    });
    
  },
  render() {
    var self = this;
    if(this.state.items && this.state.items.length>0 ){
      var user_table = this.state.items.map(function(user,index){
          return <tr><td>{index+1}</td><td><img style={{height:"50px",width:"50px",borderRadius:"5px"}} src={user.avatar_url} /></td><td>{user.login}</td><td><Button bsStyle="primary" className="btn-outline" onClick={self.getDetails.bind(this,user)}>Show Details</Button></td></tr>;
      });  
    }
    
    return (
    	<div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <PageHeader>Git User List</PageHeader>
              <div className="row">
                  <div className="col-lg-12">
                    <div className="input-group custom-search-form">
                      <Input style={{height:"50px",fontSize:"x-large"}} type="text" placeholder="Search..." value={this.state.keyword}  onChange={this.updateKeyword} />
                      <span className="input-group-btn">
                        <button style={{height:"50px",fontSize:"x-large"}} onClick={this.search} className="btn btn-default" type="button">
                          <i className="fa fa-search"></i>
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              <Panel style={{marginTop:"15px"}}>
                <div className="row">
                  <div className="col-lg-12">
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>User Avatar</th>
                          <th>Username</th>
                        </tr>
                      </thead>
                      <tbody>
                        {user_table}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </Panel>
            </div>
          </div>
        </div>
    	</div>
      
    );
  }

});

export default GitUserList;