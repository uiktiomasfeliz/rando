import React, {Component} from 'react';
import { useAsync } from 'react-async';
import ListCars from './Components/ListCars';
import DetailCar from "./Components/DetailCar";
import './App.css';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const getData = async () =>
  await fetch('/api/trucks')
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json())

function App() {
  // const { data } = this.state;
  const { data, error, isLoading } = useAsync({ promiseFn: getData })
  if (isLoading) return "Loading..."
  if (error) return `Something went wrong: ${error.message}`
  if (data)
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

export default App;
