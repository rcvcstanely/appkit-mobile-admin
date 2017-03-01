import React, { Component } from 'react';
import { Router, browserHistory } from 'react-router';
import request from 'superagent';
import { ApiPath, ImgPath } from '../Config';

// Material UI Component
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

// Upload photo
import Dropzone from 'react-dropzone';

// Index component
class Item extends Component {

  constructor(){
    super();
    this.state = {
      item_img: [],
      uploadText: 'Click to upload photo.'
    }
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(files) {
    this.setState({uploadText: "uploading... please wait"});

    console.log('Received files: ', files);
    var req = request.post(ApiPath+'photoupload');
    files.forEach((file)=> {
        req.attach(file.name, file);
    });
    req.end(function(err, res){

      var allPhoto = [];
      var uploadData = JSON.parse(res.text).data;
      var counter = 0;
      for(var key in uploadData){
        var thisPhoto = {
          "src":uploadData[key],
          "size":"sm",
          "type":counter==0?'thumb':'inner'
        }
        allPhoto.push(thisPhoto);
        counter++;
      }
      this.setState({
        item_img: allPhoto
      })

      this.setState({uploadText: "upload finished"});

    }.bind(this));
  }

  addItems(callback){
    /*
    {
      "category":"test",
      "display_name":"test",
      "sku":"test",
      "item_per_box":"100",
      "price_per_item":"100",
      "quantity_per_item":"10",
      "unit_per_item":"200",
      "min_order":"300",
      "item_details": [
      	{
      		"type":"a",
      		"type_chi":"b",
      		"content":"c",
      		"remark":"d"
      	}
      ],
      "item_img": [
      	 {
      		"src":"a",
      		"size":"b",
      		"type":"c"
      	 }
      ]
    }
    */
    let category = document.getElementById('category').value;
    let display_name = document.getElementById('display_name').value;
    let sku = document.getElementById('sku').value;
    let item_per_box = document.getElementById('item_per_box').value;
    let price_per_item = document.getElementById('price_per_item').value;
    let quantity_per_item = document.getElementById('quantity_per_item').value;
    let unit_per_item = document.getElementById('unit_per_item').value;
    let min_order = document.getElementById('min_order').value;

    if(
      category !== '' &&
      display_name !== '' &&
      sku !== '' &&
      item_per_box !== '' &&
      price_per_item !== '' &&
      quantity_per_item !== '' &&
      unit_per_item !== '' &&
      min_order !== ''
    ){

      let json = {
        "category":category,
        "display_name":display_name,
        "sku":sku,
        "item_per_box":item_per_box,
        "price_per_item":price_per_item,
        "quantity_per_item":quantity_per_item,
        "unit_per_item":unit_per_item,
        "min_order":min_order,
        "item_details": [
          {
            "type":"DEMO",
            "type_chi":"DEMO",
            "content":"DEMO",
            "remark":"DEMO"
          }
        ],
        "item_img": this.state.item_img
      }

      console.log(json);

      request
        .post(ApiPath+'item')
        .send(json)
        .end(function(err, res){
          if(JSON.parse(res.text).status === "success" ||
             JSON.parse(res.text).status === "warning"
          ){
            document.getElementById('category').value = '';
            document.getElementById('display_name').value = '';
            document.getElementById('sku').value = '';
            document.getElementById('item_per_box').value = '';
            document.getElementById('price_per_item').value = '';
            document.getElementById('quantity_per_item').value = '';
            document.getElementById('unit_per_item').value = '';
            document.getElementById('min_order').value = '';
            alert('upload successed');
          }else{
            alert('upload error, please try again later');
          }
        });

    }else{

      alert('missing item details');

    }



  }


  render(){
    return (
      <div style={{padding: 10}}>
        <h2>New item</h2>
        <TextField
          id="category"
          hintText="Category"
          floatingLabelText="Category"
          fullWidth={true}
        /><br />
        <TextField
          id="display_name"
          hintText="Display name"
          floatingLabelText="Display name"
          fullWidth={true}
        /><br />
        <TextField
          id="sku"
          hintText="SKU"
          floatingLabelText="SKU"
          fullWidth={true}
        /><br />
        <TextField
          id="item_per_box"
          hintText="Item per box"
          floatingLabelText="Item per box"
          fullWidth={true}
        /><br />
        <TextField
          id="price_per_item"
          hintText="Price per item"
          floatingLabelText="Price per item"
          fullWidth={true}
        /><br />
        <TextField
          id="quantity_per_item"
          hintText="Quantity per item"
          floatingLabelText="Quantity per item"
          fullWidth={true}
        /><br />
        <TextField
          id="unit_per_item"
          hintText="Unit per item"
          floatingLabelText="Unit per item"
          fullWidth={true}
        /><br />
        <TextField
          id="min_order"
          hintText="Min order"
          floatingLabelText="Min order"
          fullWidth={true}
        /><br />
        <Dropzone onDrop={this.onDrop}
          style={{
            width: "100%",
            height: 100,
            background: '#e6e6e6',
            borderRadius: 10,
            padding: 10,
            marginBottom: 10,
            textAlign: "center"
          }}>
          <div>
            <p style={{color: 'red'}}>{this.state.uploadText}</p>
            <h4>You've uploaded {this.state.item_img.length} photos</h4>
          </div>
        </Dropzone>
      <RaisedButton label="Submit" primary={true} fullWidth={true} onTouchTap={() => {this.addItems()}}/>
      </div>
    )
  }
}

export default Item
