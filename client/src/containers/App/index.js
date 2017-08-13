import React, { Component } from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';
import HomePage from '../HomePage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillUpdate(nextProps) {

  }
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={ HomePage } />
        </Switch>
      </div>
    )
  }
}

export default App;
