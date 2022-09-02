import * as THREE from 'three'
import { animateFn } from "../scene"

const threeBufferGeometry = (scene: THREE.Scene, camera: THREE.Camera, animateArr: animateFn[]) => {
  const triangleGroup = new THREE.Group()
  // 循环添加三角形碎片
  for (let i = 0; i < 70; i++) {
    const geometry = new THREE.BufferGeometry();
    // 三角形，三个数确定一个顶点
    const vertices = new Float32Array(9);
    for (let j = 0; j < 9; j++) {
      // * 10 - 5 => -5 ~ 5
      vertices[j] = Math.random() * 10 - 5
    }
    // itemSize = 3 因为每个顶点都是一个三元组。
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    // color 0 ~ 1
    const color = new THREE.Color(Math.random(), Math.random(), Math.random());
    // 创建材质，设置透明度需要 transparent: true
    const material = new THREE.MeshBasicMaterial({
      color, transparent: true,
      opacity: Math.random(),
      side: THREE.DoubleSide
    });
    // 添加材质创建物体
    const mesh = new THREE.Mesh(geometry, material);
    // 添加到场景
    triangleGroup.add(mesh);
  }
  triangleGroup.position.set(0, -30, 0)

  animateArr.push((time: number) => {
    triangleGroup.rotation.x = time * -0.4;
    triangleGroup.rotation.y = time * 0.4;
  })

  scene.add(triangleGroup)
  return {
    triangleGroup
  }
}

export default threeBufferGeometry