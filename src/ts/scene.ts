import * as THREE from 'three'

export type animateFn = (time: number, clock: THREE.Clock) => void

const useScene = () => {
  // 创建场景
  const scene = new THREE.Scene()

  // 创建相机
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    300
  )

  // 设置相机位置 xyz
  camera.position.set(0, 0, 18)

  // 初始化渲染器，{ alpha: true } 渲染器透明
  const renderer = new THREE.WebGLRenderer({ alpha: true })

  // 设置渲染尺寸大小
  renderer.setSize(window.innerWidth, window.innerHeight)

  // 将 webgl 的内容添加到 body
  document.body.appendChild(renderer.domElement)

  scene.add(camera)

  // 使用渲染器，通过相机将场景渲染进来
  renderer.render(scene, camera)

  // 动画回调函数数组
  const animateArr: animateFn[] = []

  const clock = new THREE.Clock()

  function animate () {
    // 执行动画回调
    const time = clock.getElapsedTime()
    animateArr.forEach(fn => {
      fn(time, clock)
    })
    // 根据当前滚动的 scroll，去设置相机移动的位置
    camera.position.y = -(window.scrollY / window.innerHeight) * 30;
    // 帧回调函数
    requestAnimationFrame(animate);
    // 重新渲染
    renderer.render(scene, camera);
  }

  // 初始化
  animate()

  // 窗口改变自适应
  window.addEventListener('resize', () => {
    // 更新摄像头
    camera.aspect = window.innerWidth / window.innerHeight;
    // 更新摄像机投影矩阵
    camera.updateProjectionMatrix();
    // 更新渲染器
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 设置渲染器的像素比
    renderer.setPixelRatio(window.devicePixelRatio)
  })

  return {
    scene,
    camera,
    renderer,
    animateArr
  }
}

export default useScene