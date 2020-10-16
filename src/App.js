import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <NavBar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={signup} />
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
