import React, { Component } from 'react';
import { Router, browserHistory } from 'react-router';

// Page import
import Shop from '../View/Shop.js';
import Item from '../View/Item.js';
import NewItem from '../View/NewItem.js';

// Router setting
const routes =
  [
    { path: '/', component: NewItem },
    { path: '/item/:id', component: Item },
    { path: '/newitem', component: NewItem }
  ];

// Index component
class RouterSetting extends Component {

  render(){
    return (
        <Router
          history={browserHistory}
          routes={routes}
          onUpdate={this.props.onRouteUpdate}>
        </Router>
    )
  }
}

export default RouterSetting
