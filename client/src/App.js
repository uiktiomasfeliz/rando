import React, {Component} from 'react';
import ListCars from './Components/ListCars';
import DetailCar from "./Components/DetailCar";
import './App.css';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
  // Initialize state
  state = { data: [] };

  // Fetch passwords after first mount
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    // Get the passwords and store them in state
    fetch('/api/gsm')
      .then(res => res.json())
      .then(data => this.setState({ data }));
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
