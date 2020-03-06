import React, { Component } from 'react';
import { List, Avatar } from "antd";
import { Link } from "react-router-dom"
import './ListCars.css';

import { ImgService } from "../../common/img.service";

const imgService = new ImgService();

class ListCars extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  // componentWillMount(){}
  // componentDidMount(){}
  // componentWillUnmount(){}

  // componentWillReceiveProps(){}
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  // componentDidUpdate(){}

  render() {
    return (
      <List
      style={{marginLeft: "50px"}}
      itemLayout="horizontal"
      dataSource={this.props.listOfCars}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={`./icons/${imgService.getImgName(item.status)}.png`} />}
            title={<Link to={`/${item.id}`}>{item.title}</Link>}
            description={item.description}
          />
        </List.Item>
      )}
    />
    );
  }
}

export default ListCars;
