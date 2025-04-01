/**
 * @description: 背景图片切换框显示
 */
function bgSwitchBoxRender() {
  // 暴露样式，以便储存
  let bgSwitchImgStyle = {
    x: 0,
    y: 0,
    zoom: 1
  }
  // 图片是否加载成功
  let isImgLoad = false

  /**
   * @description: 清除函数
   */  
  const bgSwitchClean = () => {
    const event = new Event('input', {
      bubbles: true,
      cancelable: true
    })
  
    input.value = ''
    input.dispatchEvent(event)
    p.dataset.text = ''
    // console.clear()
  
    bgSwitchImgStyle = {
      x: 0,
      y: 0,
      zoom: 1
    }
  }

  /**
 * @description: 背景切换框 - 图片拖拽缩放事件
 */
const bgSwitchImgStyleHandle = img => {
  let StartPosition
  let transformX = 0
  let transformY = 0

  const move = () => {
    const { x, y } = StartPosition
    const { zoom } = bgSwitchImgStyle
    transformX = event.pageX - x + bgSwitchImgStyle.x
    transformY = event.pageY - y + bgSwitchImgStyle.y
    img.style.transform = `translate(${transformX}px,${transformY}px) scale(${zoom})`
  }

  const end = () => {
    bgSwitchImgStyle = {
      ...bgSwitchImgStyle,
      x: transformX,
      y: transformY
    }
    window.removeEventListener('mousemove', move)
    window.removeEventListener('mouseup', end)
  }

  return {
    transformEvent() {
      StartPosition = {
        x: event.pageX,
        y: event.pageY
      }
      window.addEventListener('mousemove', move)
      window.addEventListener('mouseup', end)
    },
    wheelEvent() {
      const { zoom } = bgSwitchImgStyle
      const scale = event.deltaY / 1000

      if (zoom + scale < 0.1) {
        return
      }

      const origin = StartPosition?.x != undefined ? `${StartPosition.x}px ${StartPosition.y}px` : 'center'

      img.style.transformOrigin = origin
      img.style.transform = `translate(${transformX}px,${transformY}px) scale(${(zoom + scale).toFixed(1)})`
      img.style.transformOrigin = `center`
      bgSwitchImgStyle.zoom += scale
    }
  }
}

  const lable = document.createElement('label')
  lable.textContent = '输入背景图片地址: '
  const br = document.createElement('br')
  const input = document.createElement('input')
  input.id = 'bgSwitchInput'
  lable.htmlFor = input.id
  input.name = 'src'
  input.type = 'text'
  input.placeholder = 'Url...'
  input.spellcheck = false
  input.addEventListener('input', e => {
    if (!e.target.value) {
      button.setAttribute('disabled', true)
      div.children[0]?.remove()
      return
    }

    button.removeAttribute('disabled')

    //图片加载函数
    if (div.children[0]) {
      div.children[0].src = input.value
      return
    }

    const img = new Image()
    img.onerror = e => {
      isImgLoad = false
      e.target.src = '../../img/fail.png'
      e.target.className = 'error'
      p.dataset.text = '加载失败，请重新输入'
      e.target.removeEventListener('mousedown', transformEvent)
      e.target.removeEventListener('wheel', wheelEvent)
    }

    img.onload = e => {
      if (e.target.src == location_origin + '/img/fail.png' && e.target.classList.contains('error')) {
        return
      }

      isImgLoad = true
      e.target.className = 'success'
      p.dataset.text = '加载成功，可以拖动图片以选择最佳的位置'
      e.target.addEventListener('mousedown', transformEvent)
      e.target.addEventListener('wheel', wheelEvent)
    }

    const { transformEvent, wheelEvent } = bgSwitchImgStyleHandle(img)
    img.src = input.value
    div.appendChild(img)
  })

  const button = document.createElement('button')
  button.type = 'button'
  button.textContent = '清除'
  button.disabled = true
  button.addEventListener('click', bgSwitchClean)

  const p = document.createElement('p')
  p.textContent = '图片详情：'

  const div = document.createElement('div')
  div.className = 'bgSwitchBox_imgCover'

  const button_cancal = document.createElement('button')
  button_cancal.type = 'button'
  button_cancal.textContent = '取消'
  button_cancal.addEventListener('click', () => {
    bgSwitchClean()
    maskingLayerRemove()
  })

  const button_submit = document.createElement('button')
  button_submit.type = 'submit'
  button_submit.textContent = '确认'

  const footer = document.createElement('footer')
  footer.appendChild(button_cancal)
  footer.appendChild(button_submit)

  const form = document.createElement('form')
  form.appendChild(lable)
  form.appendChild(br)
  form.appendChild(input)
  form.appendChild(button)
  form.appendChild(p)
  form.appendChild(div)
  form.appendChild(footer)
  form.addEventListener('submit', () => {
    event.preventDefault()

    if (!input.value && !isImgLoad) {
      return
    }

    const { x, y, zoom } = bgSwitchImgStyle
    backgroundImg.src = input.value
    backgroundImg.style = `--x: ${x}px; --y: ${y}px; --scale: ${zoom}`

    setLocalStorage(
      'backgroundImg',
      {
        src: input.value,
        style: `--x: ${x}px; --y: ${y}px; --scale: ${zoom}`
      },
      true
    )

    bgSwitchClean()
    maskingLayerRemove()
  })

  const Dom = document.createElement('div')
  Dom.className = 'bgSwitchBox'
  Dom.appendChild(form)

  maskingLayerRender(Dom)
}
