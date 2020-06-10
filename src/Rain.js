import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from 'three';
import cloudTexture from './img/smoke.png';

const Rain = () => {
  const { useRef, useEffect, useState } = React
  const mount = useRef(null)
  const [isAnimating, setAnimating] = useState(true)
  const controls = useRef(null)

  useEffect(() => {
    let width = mount.current.clientWidth
    let height = mount.current.clientHeight
    let frameId

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, width / height, 50, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true }) //edge smoothing
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0x123456 })
    const cube = new THREE.Mesh(geometry, material)

    scene.fog = new THREE.FogExp2(0x11111f, 0.0022);
    renderer.setClearColor(scene.fog.color);


    camera.position.z = 4;
    camera.rotation.x = 1.16;
    camera.rotation.y = -0.12;
    camera.rotation.z = 0.27;

    const ambient = new THREE.AmbientLight(0x555555);
    const directionalLight = new THREE.DirectionalLight(0xffeedd);
    const flash = new THREE.PointLight(0x062d89, 30, 500, 1.7);

    directionalLight.position.set(0, 0, 1);
    flash.position.set(200, 300, 100);

    scene.add(ambient);
    scene.add(directionalLight);
    scene.add(flash);

    // camera.position.z = 4
    // scene.add(cube)

    let texture = new THREE.TextureLoader().load(cloudTexture);
    const cloudMaterial = new THREE.MeshLambertMaterial({ map: texture, transparent: true });
    // const cloudMaterial = new THREE.MeshBasicMaterial({ color: 0xabcdef, transparent: true })
    const cloudGeo = new THREE.PlaneBufferGeometry(500, 500);
    // const cloud = new THREE.Mesh(cloudGeo, cloudMaterial);

    let cloudParticles = []
    for (let p = 0; p < 1000; p++) {
      let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
      cloud.position.set(
        Math.random() * 900 - 500,
        450,
        Math.random() * 800 - 300
      );
      cloud.rotation.x = 1.16;
      cloud.rotation.y = -0.12;
      cloud.rotation.z = Math.random() * 360;
      cloud.material.opacity = 0.6;
      cloudParticles.push(cloud);
      scene.add(cloud);
    }

    // renderer.setClearColor('#000000')
    renderer.setSize(width, height)

    let rainGeo, rainDrop, rainMaterial, rain;

    rainGeo = new THREE.Geometry();
    for (let i = 0; i < 15000; i++) {
      rainDrop = new THREE.Vector3(
        Math.random() * 400 - 200,
        Math.random() * 500 - 250,
        Math.random() * 400 - 200
      );
      rainDrop.velocity = {};
      rainDrop.velocity = 1;
      rainGeo.vertices.push(rainDrop);
    }
    rainMaterial = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 0.1,
      transparent: true
    });
    rain = new THREE.Points(rainGeo, rainMaterial);
    scene.add(rain);




    // let cloudGeo, cloudMaterial, cloudParticles = [];


    // let loader = new THREE.TextureLoader();
    // loader.load(cloudTexture,
    //   function (texture) {
    //     cloudGeo = new THREE.PlaneBufferGeometry(500, 500);
    //     cloudMaterial = new THREE.MeshLambertMaterial({
    //       map: texture,
    //       transparent: true
    //     });
    //     for (let p = 0; p < 25; p++) {
    //       let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
    //       cloud.position.set(
    //         Math.random() * 800 - 400,
    //         500,
    //         Math.random() * 500 - 450
    //       );
    //       cloud.rotation.x = 1.16;
    //       cloud.rotation.y = -0.12;
    //       cloud.rotation.z = Math.random() * 360;
    //       cloud.material.opacity = 0.6;
    //       cloudParticles.push(cloud);
    //       scene.add(cloud);
    //     }
    //   }
    // );


    const renderScene = () => {
      renderer.render(scene, camera)
    }

    const handleResize = () => {
      width = (mount.current.clientWidth)
      height = mount.current.clientHeight
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderScene()
    }

    const animate = () => {
      // cube.rotation.x += 0.01
      // cube.rotation.y += 0.004


      cloudParticles.forEach(p => {
        p.rotation.z -= 0.002;
      });
      rainGeo.vertices.forEach(p => {
        p.velocity -= 0.1 + Math.random() * 0.1;
        p.y += p.velocity;
        if (p.y < -200) {
          p.y = 200;
          p.velocity = 0;
        }
      });
      rainGeo.verticesNeedUpdate = true;
      // rain.rotation.y += 0.002;
      if (Math.random() > 0.99 || flash.power > 100) {
        if (flash.power < 100)
          flash.position.set(
            Math.random() * 400,
            300 + Math.random() * 200,
            100
          );
        flash.power = 0 + Math.random() * 500;
      }
      renderer.render(scene, camera);

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

ReactDOM.render(<Rain />, document.getElementById('root'))

export default Rain;
