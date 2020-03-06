import React, { Component } from 'react';
import { Card, Avatar } from 'antd';
import { CheckCircleOutlined, CheckCircleFilled, 
        WarningOutlined, WarningFilled,
        CloseCircleOutlined, CloseCircleFilled } from '@ant-design/icons';
import './DetailCar.css';

import { Truck } from '../../entities/truck.entity'
import { ImgService } from "../../common/img.service";

const imgService = new ImgService();
let truck: Truck = {};

const getData = async (id) =>
  await fetch('/api/trucks/' + id)
    .then(res => (res.ok ? Promise.resolve(res) : Promise.reject(res)))
    .then(res => res.json())

const getTruck = async id => {
  const data = await getData(id);
  if (data) {
      console.log(data);
      truck = data;
    }
}

const { Meta } = Card;

class DetailCar extends Component{
  constructor(props){
    super(props);
    this.state = {
      dataLoaded: false
    }
  }

  componentWillMount(){
    getTruck(this.props.match.params.idcar).then(() => {
      this.setState({
        dataLoaded: true
      })
    });
  }
  // componentDidMount(){}
  // componentWillUnmount(){}

  // componentWillReceiveProps(){}
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  // componentDidUpdate(){}

  changeStatus(statusId) {
    this.setState({
      dataLoaded: false
    });
    console.log(statusId)
    truck.status = statusId;
    this.updateTruck();
  }

  checkErrorIcon() {
    if (truck.status === 0) {
      return <CloseCircleFilled key="ok" className="action-disabled" />
    } else {
      return <CloseCircleOutlined key="ok" className="action-enabled" onClick={() => this.changeStatus(0)}/>
    }
  }
  
  checkWarningIcon() {
    if (truck.status === 1) {
      return <WarningFilled key="ok" className="action-disabled" />
    } else {
      return <WarningOutlined key="ok" className="action-enabled" onClick={() => this.changeStatus(1)}/>
    }
  }
  
  checkOkIcon() {
    if (truck.status === 2) {
      return <CheckCircleFilled key="ok" className="action-disabled" />
    } else {
      return <CheckCircleOutlined key="ok" className="action-enabled" onClick={() => this.changeStatus(2)}/>
    }
  }

  async updateTruck() {
    const truckToSend = {
      id: truck.id,
      title: truck.title,
      description: truck.description,
      status: truck.status.toString(),
      __v: 0
    };
    fetch('/api/trucks', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(truckToSend)
    })
    .then((response) => response.json())
    .then((result) => {
      console.log('Success:', result);
      this.setState({
        dataLoaded: true
      });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  render() {
    return ( this.state.dataLoaded &&
      <Card
        style={{ width: "auto", margin: "50px" }}
        /*cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }*/
        actions={[
          this.checkOkIcon(),
          this.checkWarningIcon(),
          this.checkErrorIcon()
        ]}
      >
        <Meta
          avatar={<Avatar src={`./icons/${imgService.getImgName(truck.status)}.png`} />}
          title={truck.title}
          description={truck.description}
        />
      </Card>
    );
  }
}

// <div>Detalle de coche id: {match.params.idcar}</div>

export default DetailCar;
