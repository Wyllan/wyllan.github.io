// import React from 'react';
// import logo from './logo.svg';
// import './App.css';
// import * as THREE from 'three';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <Shape/>
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Hi, I'm Wyll! :)
//         </p>
//         <p>
//           <b>About Me:</b> I'm currently looking for a job after having gradutated
//           with a software engineering degree from the University of
//           Victoria.
//         </p>
//         <p>
//           <b>About You:</b> Want to pay someone money to 
//           do engineering things like<br/>
//           <ul>
//             <li>Operations</li>
//             <li>Back-End</li>
//             <li>DevOps</li>
//             <li>Infrastructure</li>
//           </ul>
//         </p>
//         <p>
//           <p>Contact me at: _</p>
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }


import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const App = () => {
  const { useRef, useEffect, useState } = React
  const mount = useRef(null)
  const [isAnimating, setAnimating] = useState(true)
  const controls = useRef(null)

  useEffect(() => {
    let width = mount.current.clientWidth
    let height = mount.current.clientHeight
    let frameId

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0xff00ff })
    const cube = new THREE.Mesh(geometry, material)

    camera.position.z = 4
    scene.add(cube)
    renderer.setClearColor('#000000')
    renderer.setSize(width, height)

    const renderScene = () => {
      renderer.render(scene, camera)
    }

    const handleResize = () => {
      width = mount.current.clientWidth
      height = mount.current.clientHeight
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderScene()
    }

    const animate = () => {
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01

      renderScene()
      frameId = window.requestAnimationFrame(animate)
    }

    const start = () => {
      if (!frameId) {
        frameId = requestAnimationFrame(animate)
      }
    }

    const stop = () => {
      cancelAnimationFrame(frameId)
      frameId = null
    }

    mount.current.appendChild(renderer.domElement)
    window.addEventListener('resize', handleResize)
    start()

    controls.current = { start, stop }

    return () => {
      stop()
      window.removeEventListener('resize', handleResize)
      mount.current.removeChild(renderer.domElement)

      scene.remove(cube)
      geometry.dispose()
      material.dispose()
    }
  }, [])

  useEffect(() => {
    if (isAnimating) {
      controls.current.start()
    } else {
      controls.current.stop()
    }
  }, [isAnimating])

  return <div className="vis" ref={mount} onClick={() => setAnimating(!isAnimating)} />
}

ReactDOM.render(<App />, document.getElementById('root'))

export default App;
