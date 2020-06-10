import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Rain from './Rain';
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

class Container extends React.Component {
  state = { isMounted: true };

  render() {
    // const { isMounted = true } = this.state;
    return (
      <Rain />
      //   <>
      //     <button onClick={() => this.setState(state => ({ isMounted: !state.isMounted }))}>
      //       {isMounted ? "Unmount" : "Mount"}
      //     </button>
      //     {isMounted && <App />}
      //     {isMounted && <div>Scroll to zoom, drag to rotate</div>}
      //   </>
    )
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Container />, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
