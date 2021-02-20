import React, { Component } from "react";
import * as THREE from "three";
import s from "./Cone.module.css"

class Cone extends Component{
    constructor(props){
        super(props)
        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color("#2e393b")
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.camera.position.z = 30
        this.renderer = new THREE.WebGL1Renderer()
        this.renderer.setSize(window.innerWidth * 0.5, window.innerHeight * 0.4)
        this.geometry = new THREE.ConeBufferGeometry(this.props.h, this.props.r1, this.props.r2)
        this.material = new THREE.MeshPhongMaterial({color: '#4ca0ff'})
        this.cone = new THREE.Mesh( this.geometry, this.material)
        this.light = new THREE.DirectionalLight('#ffffff', 1);
        this.light.position.set(-1, 2, 4)
        this.coneRef = React.createRef()
    }
    animate = () => {
        requestAnimationFrame(this.animate)
        this.cone.rotation.y += 0.005
        this.renderer.render(this.scene, this.camera)
    }
    componentDidMount() {
        document.body.appendChild( this.renderer.domElement )
        this.scene.add(this.light)
        this.scene.add(this.cone)
        this.animate()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (JSON.stringify(this.props) !== JSON.stringify(prevProps)) {
            this.scene.remove(this.cone)
            this.cone = new THREE.Mesh(
                this.geometry = new THREE.ConeBufferGeometry(this.props.h, this.props.r1, this.props.r2),
                this.material
            )
            this.scene.add(this.cone)
            this.animate()
        }
    }

    render(){
        return <div>
            <div id='cone' ref={this.coneRef}>

            </div>
        </div>
    }
}

export default Cone