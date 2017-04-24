import React, { PropTypes, Component } from 'react';
import {PageHeader,Panel,Table,Button,Input,ListGroup,ListGroupItem,Label,Tabs,Tab} from 'react-bootstrap';
import { Link } from 'react-router';

var GitUserDetails = React.createClass({
    getInitialState: function(){
      return { 
        repos_list: [],
        current_user_obj : window.current_user_obj?window.current_user_obj:null, 
      };
    },
  componentDidMount: function() {
    if("repos_url" in this.state.current_user_obj)
    {
      this.fetchResults(this.state.current_user_obj.repos_url);
    }
  },
  fetchResults: function(repo_url){
    self = this;
    if(repo_url)
    {
      fetch(repo_url)
        .then(function(response) {
          return response.json()
        }).then(function(json) {
            if(json){
              self.setState({
                repos_list:json
              });  
            }
          console.log('parsed json', json)
        }).catch(function(ex) {
          self.setState({
            repos_list : []
          });
          console.log('parsing failed', ex)
        }); 
    }
  },
  render() {
    if(this.state.repos_list != undefined){
      var repos_list = this.state.repos_list.map(function(repo,index){
          return <ListGroupItem>{repo.name}</ListGroupItem>;
      });  
    }
    
    return (
    	<div>
        <div className="container-fluid">
        
          <div className="row">
            <div className="col-lg-12">
              <PageHeader>Git User Details</PageHeader>
              <Panel header={<span>User Info</span>} >
                <Tabs defaultActiveKey={1}>
                  <Tab eventKey={1} title="About">
                    <div className="row">
                      <div className="col-lg-2">
                        <h3><Label>login</Label></h3>
                      </div>
                      <div className="col-lg-4">
                        <h3>{this.state.current_user_obj.login}</h3>
                      </div>
                      <div className="col-lg-2">
                        <h3><Label>id</Label></h3>
                      </div>
                      <div className="col-lg-4">
                        <h3>{this.state.current_user_obj.id}</h3>
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-lg-2">
                        <h3><Label>Git Url</Label></h3>
                      </div>
                      <div className="col-lg-4">
                        <h3><a href={this.state.current_user_obj.url}><span style={{wordWrap:"break-word"}}>{this.state.current_user_obj.url}</span></a></h3>
                      </div>
                      <div className="col-lg-2">
                        <h3><Label>Type</Label></h3>
                      </div>
                      <div className="col-lg-4">
                        <h3>{this.state.current_user_obj.type}</h3>
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-lg-2">
                        <h3><Label>Repo Url</Label></h3>
                      </div>
                      <div className="col-lg-4">
                        <h3><a href={this.state.current_user_obj.repos_url}><span style={{wordWrap:"break-word"}}>{this.state.current_user_obj.repos_url}</span></a></h3>
                      </div>
                      <div className="col-lg-2">
                        <h3><Label>site admin</Label></h3>
                      </div>
                      <div className="col-lg-4">
                        <h3>{this.state.current_user_obj.site_admin?"yes":"no"}</h3>
                      </div>
                  </div>
                  </Tab>
                  <Tab eventKey={2} title="Repos">
                    <div className="row">
                      <div className="col-lg-4">
                          {repos_list}
                      </div>
                    </div>
                  </Tab>
                </Tabs>
              </Panel>
            </div>
          </div>
        </div>
    	</div>
      
    );
  }

});

export default GitUserDetails;