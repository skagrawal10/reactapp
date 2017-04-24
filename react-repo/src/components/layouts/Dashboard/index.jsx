import React from "react";
import Router, { Link, RouteHandler } from "react-router";

import {Navbar, Nav, NavItem, NavDropdown, MenuItem, ProgressBar} from "react-bootstrap";
import $ from "jQuery";
import classNames from "classnames";

var HomePage = React.createClass({
    
  componentWillMount: function() {
    this.setState({Height: $(window).height()});
  },

  componentDidMount: function() {

  },

  componentWillUnmount: function(){
    
    $(window).unbind('resize',this.adjustResize);

  },

  getInitialState: function(){
    
    return {
      uiElementsCollapsed: true,
      chartsElementsCollapsed: true,
      multiLevelDropdownCollapsed: true,
      thirdLevelDropdownCollapsed: true,
      samplePagesCollapsed: true
    };

  },

  render: function() {

    return (
        <div id="wrapper" className="content">

          <Navbar brand={<span><img src={require('../../../common/img/logo.png')} alt="Git Users" title="Git User List" />
            <a href="http://github.com/" title="Git User Info" rel="home">github.com</a></span>} fluid={true}  style={ {margin: 0} }>
          
            
                
            <div className="navbar-default sidebar" style={ { 'marginLeft': '-20px' } } role="navigation">
              <div className="sidebar-nav navbar-collapse">
                
                <ul className="nav in" id="side-menu">
              
                  <li>
                    <Link to="dashboard.git-user-list"><i className="fa fa-dashboard fa-fw"></i> &nbsp;Home</Link>
                  </li>
                      
                </ul>

              </div>
            </div>

          </Navbar>

          <div id="page-wrapper" className="page-wrapper" ref="pageWrapper" style={{minHeight: this.state.Height}}>
            <RouteHandler {...this.props} />
          </div>

        </div>

    );
  },

  statics: {
    fetchData: function(params) {
      }
  }
  
});

export default HomePage;
