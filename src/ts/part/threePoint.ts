import * as THREE from 'three'
import { animateFn } from "../scene"

// THREE.Point
const threePoint = (scene: THREE.Scene, renderer: THREE.WebGLRenderer, animateArr: animateFn[]) => {
  const sphereGeometry = new THREE.SphereGeometry(1, 20, 20)
  const pointMaterial = new THREE.MeshStandardMaterial({
    color: '#ffffff'
  });
  const sphere = new THREE.Mesh(sphereGeometry, pointMaterial)
  sphere.position.z = 1
  const planeGeometry = new THREE.PlaneGeometry(120, 30)
  const plane = new THREE.Mesh(planeGeometry, pointMaterial)

  const createLightBall = (color: number | string = 0x0000ff, intensity: number = 6) => {
    const pointLight = new THREE.PointLight(color, intensity);
    // 设置阴影模糊度
    pointLight.shadow.radius = 20
    // 设置阴影分辨率
    pointLight.shadow.mapSize.set(4096, 4096) // 默认 512
    // 设置光照开启投射阴影
    pointLight.castShadow = true

    // 创建一个小球
    const lightBall = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 20, 20),
      new THREE.MeshBasicMaterial({
        color
      })
    )

    // 设置小球位置
    lightBall.position.set(2, 2, 2)
    // 添加点光到小球
    lightBall.add(pointLight)
    return lightBall
  }

  const blueBall = createLightBall()
  const redBall = createLightBall(0xff0000)

  const pointGroup = new THREE.Group()
  pointGroup.add(sphere)
  pointGroup.add(plane)
  pointGroup.add(blueBall)
  pointGroup.add(redBall)
  pointGroup.position.set(0, -60, 0)
  pointGroup.rotation.x = -Math.PI / 3

  // 将组加入场景
  scene.add(pointGroup)

  // 实现阴影
  // 材质满足对光有效
  // 设置渲染器开启阴影计算
  renderer.shadowMap.enabled = true
  // 设置球投射阴影
  sphere.castShadow = true
  // 设置平面接收阴影
  plane.receiveShadow = true


  // physically correct 模式
  renderer.physicallyCorrectLights = true

  animateArr.push((time: number) => {
    redBall.position.x = Math.sin(time) * 3
    redBall.position.y = Math.cos(time) * 3

    blueBall.position.x = Math.sin(time) * -3
    blueBall.position.y = Math.cos(time) * -3
    blueBall.position.z = Math.sin(time) * 6
  })
  return {
    pointGroup
  }
}

export default threePoint