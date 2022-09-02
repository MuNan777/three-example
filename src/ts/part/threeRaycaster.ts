import * as THREE from 'three'
import { animateFn } from "../scene"

// THREE.Raycaster
const threeRaycaster = (scene: THREE.Scene, camera: THREE.Camera, animateArr: animateFn[]) => {
  const material = new THREE.MeshBasicMaterial({
    wireframe: true
  })

  const goldMaterial = new THREE.MeshBasicMaterial({
    color: 0xFFD700
  })

  type CubeType = THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>

  const cubeArr: CubeType[] = []
  // 使用原型组整体控制
  const cubeGroup = new THREE.Group()
  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 5; y++) {
      for (let z = 0; z < 5; z++) {
        const geometry = new THREE.BoxGeometry(2, 2, 2)
        const cube = new THREE.Mesh(geometry, material)
        cube.position.x = x * 2 - 4
        cube.position.y = y * 2 - 4
        cube.position.z = z * 2 - 4
        cubeArr.push(cube)
        cubeGroup.add(cube)
      }
    }
  }

  scene.add(cubeGroup)

  animateArr.push((time: number) => {
    cubeGroup.rotation.x = time * 0.4;
    cubeGroup.rotation.y = time * -0.4;
  })

  // 光线投射 Raycaster
  const raycaster = new THREE.Raycaster();
  // 鼠标
  const pointer = new THREE.Vector2();

  window.addEventListener('click', (event) => {
    // 设置位置
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = - ((event.clientY / window.innerHeight) * 2 - 1);
    // 通过摄像机和鼠标位置更新射线
    raycaster.setFromCamera(pointer, camera);
    const result = raycaster.intersectObjects(cubeArr)
    if (result[0]) {
      (result[0].object as CubeType).material = goldMaterial
    }
  })
  return {
    cubeGroup
  }
}

export default threeRaycaster