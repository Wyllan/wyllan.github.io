import React from 'react';
// import logo from './logo.svg';
import './App.css';
import * as THREE from 'three';
import Rain from './Rain';
import Header from './Components/Header';
import { Button } from 'semantic-ui-react';

function App() {
  return (
    <>
      <Header />


      <body className="App-body">


        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Hi, I'm Wyll! :)
        </p>
        <p>
          <b>About Me:</b> I'm currently looking for a job after having gradutated
          with a software engineering degree from the University of
          Victoria.
        </p>
        <p>
          <b>About You:</b> Want to pay someone money to
          do engineering things like:<br />
        </p>
        <ul>
          <li>Operations</li>
          <li>Back-End</li>
          <li>DevOps</li>
          <li>Infrastructure</li>
        </ul>
        <p>
          Contact me at: _
        </p>
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </body>
      {/* <Rain /> */}
    </>
  );
}


// import React, { Component } from "react";
// import ReactDOM from "react-dom";
// import * as THREE from 'three';
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// const App = () => {
//   const { useRef, useEffect, useState } = React
//   const mount = useRef(null)
//   const [isAnimating, setAnimating] = useState(true)
//   const controls = useRef(null)

//   return <div className="vis" ref={mount} onClick={() => setAnimating(!isAnimating)} />
// }

// // ReactDOM.render(<App />, document.getElementById('root'))

export default App;
