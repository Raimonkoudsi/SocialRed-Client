import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import NavBar from './components/Navbar';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

//pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

//tema para la pagina entera
const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      light: '#33c9dc',
      main: '#1b5e20',
      dark: '#008394',
      contrastText: '#fff'
    },
    secondary: {
      // This is green.A700 as hex.
      light: '#ff6333',
      main: '#33691e',
      dark: '#b22a00',
      contrastText: '#fff'
    },
  },
})

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <NavBar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <Route path="/login" component={login} />
              <Route path="/signup" component={signup} />
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
