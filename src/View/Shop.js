import React, { Component } from 'react';
import { Router, browserHistory } from 'react-router';
import request from 'superagent';
import { ApiPath, ImgPath } from '../Config';

// Materia UI
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

// Index component
class Shop extends Component {

  constructor(){
    super();
    this.state = {
      items: []
    }
  }

  componentDidMount(){
    var allItemsArray = [];
    this.downloadItems((d)=>{
      for(var key in d){
        allItemsArray.push(d[key]);
      }
      this.setState({
        items: allItemsArray
      })
    });
  }

  downloadItems(callback){
    request
      .get(ApiPath+'item/')
      .end(function(err, res){
        callback(JSON.parse(res.text).data);
      });
  }

  render(){
    return (
      <div>
        <List>
            <Subheader>All item</Subheader>
            {console.log(this.state.items==null)}
            {
               this.state.items.map((i) => {
                 return (
                   <ListItem
                    key={i._id}
                    primaryText={i.display_name}
                    leftAvatar={<Avatar src={ImgPath+i.thumb} />}
                   />
                 )
               })
            }
          </List>
      </div>
    )
  }
}

export default Shop
