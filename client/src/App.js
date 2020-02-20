import React, {Component} from 'react';
import ListCars from './Components/ListCars';
import DetailCar from "./Components/DetailCar";
import './App.css';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
  // Initialize state
  state = { data: [] };

  // Fetch passwords after first mount
  async componentDidMount() {
    await this.getData();
  }

  getData = async () => {
    try {
      let response = await fetch('/api/trucks');
      const data = await response.json();
      this.setState({ data })
    } catch (error) {
      console.log(error);
    }
  }

  render() {

    const { data } = this.state;
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <ListCars listOfCars={data} />
          </Route>
          <Route name="detail" path="/:idcar">
            <DetailCar />
          </Route>
        </Switch>
      </Router>
    );
  }
}
export default App;
