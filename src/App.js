import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AuthRoute from './util/AuthRoute';
import jwtDecode from 'jwt-decode';

import './App.css';
import "./styles/app.scss";

import NavBar from './components/Navbar';

import { MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import green from '@material-ui/core/colors/green';

//pages
import { Home } from './pages/home';
import Login from './pages/login';
import signup from './pages/signup';

import axios from 'axios';

//redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';

//tema para la pagina entera
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#2E6B33',
      main: green[900],
      dark: green[800],
      contrastText: '#fff',

    },
    secondary: {
      light: '#2E6B33',
      main: '#1b5e20',
      dark: green[800],
      contrastText: '#fff'
    },
    typography: {
      useNextVariants: true,
    } 
  }

});


    const token= localStorage.FBIdToken;

    console.log(token);

    if(token) {
      const decodedToken = jwtDecode(token);

      if(decodedToken.exp * 1000 < Date.now()) {
        window.location.href = '/login';
        store.dispatch(logoutUser())
      } else {
        store.dispatch({ type: SET_AUTHENTICATED });
        axios.defaults.headers.common['Authorization'] = token;
        store.dispatch(getUserData());
      }

    }


class App extends React.Component {

  render() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
          <Router>
            <NavBar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <AuthRoute exact path="/login" component={Login} />
                <AuthRoute exact path="/signup" component={signup} />
              </Switch>
            </div>
          </Router>
      </Provider>
    </MuiThemeProvider>
  );
  }
}

export default App;
