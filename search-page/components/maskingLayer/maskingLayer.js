function maskingLayerRemove() {
  const mask = document.querySelector('.maskingLayer')
  const child = mask.children[0]
  mask.style.transform = 'translateY(-2rem)'
  child.style.transform = 'scale(0.8)'
  setTimeout(() => {
    mask.remove()
  }, 150)
}

/**
 * @description 渲染蒙层，将 `child` 键入蒙层，按下为延迟 150ms 移除蒙层事件
 * @param {Element} child - 子元素
 */
function maskingLayerRender(child) {
  child.style.margin = 'auto'
  child.style.transform = 'translateY(-2rem)'
  child.onclick = e => {
    e.stopPropagation()
  }

  const mask = document.createElement('div')
  mask.className = 'maskingLayer'
  mask.oncontextmenu = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }
  mask.onclick = () => {
    child.classList.add('hidden')
    maskingLayerRemove(mask)
  }
  mask.appendChild(child)
  main_dom.appendChild(mask)
}
