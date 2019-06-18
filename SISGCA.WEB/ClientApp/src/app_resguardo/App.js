import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import '../app.css';
// import HeaderProduce from './components/_layout/header-produce';
import Grid from '@material-ui/core/Grid';
//import UserInfo from "./constants/user-info";
import PageLoader from './components/_common/page-loader';
// import { GetUser } from '../api/common';
// import CertificacionContainer from './components/certificacion-ambiental/certificacion-container';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
