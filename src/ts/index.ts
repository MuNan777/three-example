import gsap from 'gsap'
import * as THREE from 'three'
import threeBufferGeometry from './part/threeBufferGeometry'
import threePoint from './part/threePoint'
import threeRaycaster from './part/threeRaycaster'
import useScene from './scene'

const {
  scene,
  camera,
  renderer,
  animateArr
} = useScene()

// THREE.Raycaster
threeRaycaster(scene, camera, animateArr)

// THREE.BufferGeometry
const { triangleGroup } = threeBufferGeometry(scene, camera, animateArr)

// THREE.Point
threePoint(scene, renderer, animateArr)

// 设置当前页
let currentPage = 0;
// 监听滚动事件
window.addEventListener("scroll", () => {
  //   console.log(window.scrollY);
  const newPage = Math.round(window.scrollY / window.innerHeight);
  if (newPage != currentPage) {
    currentPage = newPage;
    console.log("改变页面，当前是：" + currentPage);
    if (currentPage === 1) {
      gsap.to(triangleGroup.rotation, {
        z: "+=" + Math.PI * 2,
        x: "+=" + Math.PI * 2,
        duration: 2,
      });
    }
    // gsap.from(`.page${currentPage} h1`, {
    //   duration: 2, scaleX: 1.4, scaleY: 0.6,
    // })
    // gsap.to(`.page${currentPage} h1`, {
    //   duration: 2, ease: "myBounce-squash", transformOrigin: "center bottom"
    // })
  }
});

const mouse = new THREE.Vector2()

// 监听鼠标的位置
window.addEventListener("mousemove", (event) => {
  mouse.x = event.clientX / window.innerWidth - 0.5;
  mouse.y = event.clientY / window.innerHeight - 0.5;
});

animateArr.push(() => {
  if (currentPage === 1) {
    camera.position.x += (mouse.x * 10 - camera.position.x);
  }
})

