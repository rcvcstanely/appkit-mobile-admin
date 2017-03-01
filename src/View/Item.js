import React, { Component } from 'react';
import { Router, browserHistory } from 'react-router';
import request from 'superagent';
import { ApiPath, ImgPath } from '../Config';

// Materia UI
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationCall from 'material-ui/svg-icons/communication/call';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import {indigo500} from 'material-ui/styles/colors';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';


// Index component
class Item extends Component {

  constructor(){
    super();
    this.state = {
      item: {}
    }
  }

  componentDidMount(){
    this.downloadItems((d)=>{
      console.log(d);
      this.setState({
        item: d[this.props.params.id]
      })
    })
  }

  downloadItems(callback){
    request
      .get(ApiPath+'item/detail/'+this.props.params.id)
      .end(function(err, res){
        callback(JSON.parse(res.text).data);
      });
  }

  render(){
    return (
      <div>
        <List>
          <Subheader inset={true}>圖片</Subheader>
          <ListItem
            primaryText={this.state.item.all_img}
          />
          <Subheader inset={true}>#ID</Subheader>
          <ListItem
            primaryText={this.state.item._id}
          />
          <Subheader inset={true}>名稱</Subheader>
          <ListItem
            primaryText={this.state.item.display_name}
          />
          <Subheader inset={true}>類別</Subheader>
          <ListItem
            primaryText={this.state.item.category}
          />
          <Subheader inset={true}>其他資訊</Subheader>
          <ListItem
            primaryText={this.state.item.extradetail}
          />
          <Subheader inset={true}>每盒數量</Subheader>
          <ListItem
            primaryText={this.state.item.item_per_box}
          />
          <Subheader inset={true}>最少訂單數量</Subheader>
          <ListItem
            primaryText={this.state.item.min_order}
          />
          <Subheader inset={true}>新到貨品</Subheader>
          <ListItem
            primaryText={this.state.item.new_arrive}
          />
          <ListItem
            primaryText={this.state.item.price_per_item}
          />
          <ListItem
            primaryText={this.state.item.quantity_per_item}
          />
          <ListItem
            primaryText={this.state.item.sku}
          />
          <ListItem
            primaryText={this.state.item.thumb}
          />
          <ListItem
            primaryText={this.state.item.unit_per_item}
          />
        </List>
      </div>
    )
  }
}

export default Item
