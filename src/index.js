// React Main
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Router
import RouterSetting from './Router';

// Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import appStore from './Reducers'

// UI Component (Material-ui)
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin' /* Prevent onTouchTap error*/
injectTapEventPlugin(); /* Prevent onTouchTap error*/

// Reduce
let store = createStore(appStore);
store.subscribe(
  () => console.log("STORE LOG", store.getState()))

// Index component
class Index extends Component {

  constructor() {
    super();
  }

  onRouteUpdate(){
    console.log("route update");
  }

  render() {

    var nowRoute = (location.pathname);

    return (
        <Provider store={store}>
          <MuiThemeProvider>
            <RouterSetting onRouteUpdate={this.onRouteUpdate}/>
          </MuiThemeProvider>
        </Provider>
    );
  }

}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);
