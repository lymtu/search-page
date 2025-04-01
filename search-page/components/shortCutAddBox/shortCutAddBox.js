function SCAddBoxRender() {
  // =========================-variable-========================= //
  let silder = {}
  let silderDom = {}
  let outer = {}
  let domrelationObj = {}
  let buttonDisabledCase = { url: true, name: true, '1x1': true, '1x2': true, '2x1': true }
  let style = {
    '1x1': {
      zoom: 1,
      transform: 'translate(-50%, -50%) scale(1);'
    },
    '1x2': {
      x: 0,
      y: 0,
      zoom: 1,
      transform: 'translate(0px, 0px) scale(1);'
    },
    '2x1': {
      x: 0,
      y: 0,
      zoom: 1,
      transform: 'translate(0px, 0px) scale(1);'
    }
  }
  let InputDisableSet = new Set()

  // =========================-function-========================= //
  /**
   * @description: 遍历传入的 dom 元素的数组，触发其 `input` 事件
   * @param {Element[]} domArr - 传入的 Dom 对象
   * @param {string[] | string} valueArr - 对各个 dom 设置的字符串构成的数组，为 string 类型时 dom 全部设置为该值
   */
  function SCAddBoxInputEvent(domArr, valueArr) {
    const event = new Event('input', {
      bubbles: true,
      cancelabel: true
    })

    domArr.map((dom, index) => {
      dom.value = Array.isArray(valueArr) ? valueArr[index] : valueArr
      dom.dispatchEvent(event)
    })
  }

  /**
   * @description: 清除按钮的点击事件
   * @param {*} e
   */
  const cleanButtonHandler = e => {
    const key = e.target.getAttribute('data-for')
    const dom = domrelationObj[key].input
    SCAddBoxInputEvent([dom], '')
  }

  /**
   * @description: 清除快捷方式添加框数据
   */
  const shortCutAddBoxClean = () => {
    let inputArr = []
    for (let key in buttonDisabledCase) {
      // 禁用时跳出循环
      if (buttonDisabledCase[key]) continue
      inputArr.push(domrelationObj[key].input)
    }

    // 输入框清空，并触发 input 事件
    SCAddBoxInputEvent(inputArr, '')
  }

  /**
   * @description: 根据传入的 id 及 button 的自定义属性来选择该按钮的 dom ，通过 enable 控制该按钮的使用
   * @param {string} key - 输入框的 id
   * @param {boolean} enable - `true` - 启用，`false` - 禁用
   */
  const cleanButtonEnable = (key, enable) => {
    domrelationObj[key].button.disabled = enable

    buttonDisabledCase[key] = enable

    let state = true
    for (let key in buttonDisabledCase) {
      if (buttonDisabledCase[key] == false) {
        state = false
        break
      }
    }

    if (state) {
      button_clearAll.disabled = true
    } else {
      button_clearAll.disabled = false
    }
  }

  /**
   * @description: 输入框函数
   * @param {*} e
   */
  const inputHandle = e => {
    // * 输入框值为空时
    if (e.target.value === '') {
      cleanButtonEnable(e.target.name, true)

      // 添加不合规范项
      if (['url', 'name', '1x1'].includes(e.target.name)) {
        InputDisableSet.add(e.target)
      }

      // 图片渲染
      if (['1x1', '2x1', '1x2'].includes(e.target.name)) {
        const dom = outer[e.target.name]
        dom?.classList.remove('show')
      }
      return
    }

    // * 输入框值不为空时
    cleanButtonEnable(e.target.name, false)

    // 不合规范项
    if (['url', 'name', '1x1'].includes(e.target.name)) {
      InputDisableSet.delete(e.target)
    }

    // 图片渲染
    if (['1x1', '2x1', '1x2'].includes(e.target.name)) {
      const dom = outer[e.target.name]
      dom.classList.add('show')

      const imgContainer = domrelationObj[e.target.name].imgContainer
      if (imgContainer.children[0]) {
        imgContainer.children[0].src = e.target.value
        return
      }

      const img = document.createElement('img')
      const silderArr = silder[e.target.name]

      img.onerror = () => {
        img.src = location_origin + '/img/fail.png'
        img.style.transform = ''
        silderArr.map(item => {
          item[1].clear()
        })
      }
      img.onload = () => {
        if (img.src == location_origin + '/img/fail.png') {
          img.classList = 'error'
          InputDisableSet.add(e.target)
          return
        }
        img.classList = 'success'
        InputDisableSet.delete(e.target)
        silderArr.map(item => {
          item[1].add()
        })
      }

      img.src = e.target.value
      imgContainer.appendChild(img)
    }
  }

  /**
   * @description 快捷方式添加框表单的提交函数
   */
  const Submit = () => {
    // 阻止默认提交事件
    event.preventDefault()
    if (InputDisableSet.size) {
      InputDisableSet.forEach(item => {
        item.style.color = 'red'
        item.value == '' ? (item.value = '请填写数据！') : null
        item.onfocus = () => {
          if (item.value == '请填写数据！' && item.style.color == 'red') {
            item.style.color = 'black'
            item.value = ''
          }
        }
      })
      return false
    }

    let data = getLocalStorage('shortCutData')
    data.push({
      id: new Date().getTime().toString(),
      data: {
        name: domrelationObj.name.input.value,
        url: domrelationObj.url.input.value,
        // 储存图片的放大缩小数据，或上下平移
        style: {
          '1x1': style['1x1'].transform,
          '1x2': style['1x2'].transform,
          '2x1': style['2x1'].transform
        },
        imgSrc: {
          '1x1': domrelationObj['1x1'].input.value,
          '1x2': domrelationObj['1x2'].input.value,
          '2x1': domrelationObj['2x1'].input.value
        }
      }
    })

    console.clear()
    setLocalStorage('shortCutData', data)
    maskingLayerRemove()
  }

  // =========================-Dom-========================= //
  /**
   * @description: 根据传参，渲染组件并返回
   * @param {string} lable_text - 定位标的文字
   * @param {string} input_id - 输入框的 `id`
   * @param {string} input_text - 输入框没有文字时的文本
   * @param {boolean} onlyZoom - 图片链接输入框是否只含有 `zoom` 条
   */
  const itemRender = ({ lable_text, input_id, input_text }) => {
    const label = document.createElement('label')
    label.textContent = lable_text
    label.htmlFor = input_id
    const br = document.createElement('br')
    const input = document.createElement('input')
    input.id = input_id
    input.type = 'text'
    input.name = input_id
    input.placeholder = input_text
    input.spellcheck = false
    input.oninput = inputHandle
    const button = document.createElement('button')
    button.dataset.for = input_id
    button.type = 'button'
    button.className = 'shortCutAddBox_cleanButton'
    button.disabled = true
    button.textContent = '清除'
    button.onclick = cleanButtonHandler

    const Dom = document.createElement('div')
    // 非图片链接输入框组件
    if (['url', 'name'].includes(input_id)) {
      domrelationObj[input_id] = {
        input,
        button
      }
      InputDisableSet.add(input)
      Dom.append(label, br, input, button)
      return Dom
    }

    const imgContainer = document.createElement('div')
    imgContainer.className = `imgCover_${input_id}`

    // 图片链接输入框组件
    const silder_zoom = document.createElement('div')
    silder_zoom.id = `img_${input_id}_zoom_silder`
    silder_zoom.dataset.scale = '100%'

    const silderBar_zoom = document.createElement('div')
    silderBar_zoom.id = `img_${input_id}_zoom`
    silderBar_zoom.className = 'zoom'
    silderBar_zoom.dataset.name = '缩放'
    silderBar_zoom.append(silder_zoom)

    const div_inner = document.createElement('div')
    div_inner.append(imgContainer)
    const div_outer = document.createElement('div')
    div_outer.className = 'shortCutAddBox_imgInfo'

    outer[input_id] = div_outer

    domrelationObj[input_id] = {
      input,
      button,
      imgContainer
    }

    if (input_id === '1x1') {
      div_inner.append(silderBar_zoom)
      div_outer.append(div_inner)

      InputDisableSet.add(input)
      silderDom[input_id] = [silderBar_zoom, silder_zoom]

      Dom.append(label, br, input, button, div_outer)
      return Dom
    }

    const silder_x = document.createElement('div')
    silder_x.id = `img_${input_id}_x_silder`
    silder_x.dataset.scale = '0%'
    const silderBar_x = document.createElement('div')
    silderBar_x.id = `img_${input_id}_x`
    silderBar_x.className = 'x'
    silderBar_x.dataset.name = 'X轴'
    silderBar_x.append(silder_x)

    const silder_y = document.createElement('div')
    silder_y.id = `img_${input_id}_y_silder`
    silder_y.dataset.scale = '0%'
    const silderBar_y = document.createElement('div')
    silderBar_y.id = `img_${input_id}_y`
    silderBar_y.className = 'y'
    silderBar_y.dataset.name = 'Y轴'
    silderBar_y.append(silder_y)

    silderDom[input_id] = [
      [silderBar_x, silder_x],
      [silderBar_y, silder_y],
      [silderBar_zoom, silder_zoom]
    ]

    div_inner.append(silderBar_x, silderBar_y, silderBar_zoom)
    div_outer.append(div_inner)
    Dom.append(label, br, input, button, div_outer)
    return Dom
  }

  const url = itemRender({ lable_text: ' * 请输入链接： ', input_id: 'url', input_text: 'Url...' })
  const name = itemRender({ lable_text: ' * 请输入名称： ', input_id: 'name', input_text: 'Name...' })
  const img_1x1 = itemRender({
    lable_text: ' * 请输入规格为1x1的图片链接： ',
    input_id: '1x1',
    input_text: 'Src...'
  })
  const img_1x2 = itemRender({
    lable_text: ' * 请输入规格为1x2的图片链接： ',
    input_id: '1x2',
    input_text: 'Src...'
  })
  const img_2x1 = itemRender({
    lable_text: ' * 请输入规格为2x1的图片链接： ',
    input_id: '2x1',
    input_text: 'Src...'
  })

  const main = document.createElement('div')
  main.className = 'shortCutAddBox_main'
  main.append(url, name, img_1x1)

  const more = document.createElement('div')
  more.className = 'shortCutAddBox_more'
  more.append(img_1x2, img_2x1)

  // ======| 底部 |====== //
  const div_footer = document.createElement('div')
  div_footer.className = 'shortCutAddBox_button'
  const button_clearAll = document.createElement('button')
  button_clearAll.type = 'button'
  button_clearAll.textContent = '清空所有'
  button_clearAll.disabled = true
  button_clearAll.onclick = shortCutAddBoxClean

  const button_cancel = document.createElement('button')
  button_cancel.type = 'button'
  button_cancel.textContent = '取消'
  button_cancel.onclick = maskingLayerRemove

  const button_confirm = document.createElement('button')
  button_confirm.type = 'submit'
  button_confirm.textContent = '确定'

  div_footer.append(button_clearAll, button_cancel, button_confirm)

  const girdContainer = document.createElement('div')
  girdContainer.className = 'shortCutAddBox_gridContainer'
  girdContainer.append(main, more)

  const form = document.createElement('form')
  form.onsubmit = Submit
  form.append(girdContainer, div_footer)

  const Dom = document.createElement('div')
  Dom.className = 'shortCutAddBox'
  Dom.appendChild(form)

  maskingLayerRender(Dom)

  // =========================-silderConstrutor-========================= //
  for (let key in silderDom) {
    const item = silderDom[key]

    if (key === '1x1') {
      const Z = new silderConstructor(
        item[0],
        item[1],
        {
          direction: 'y',
          forward: false,
          initialDistance: 'half'
        },
        fraction => {
          const fraction_ = fraction + 1
          item[1].dataset.scale = +(fraction_ * 100).toFixed(0) + '%'
          const img = outer[key].children[0].children[0]
          img.children[0].style.transform = `scale(${fraction_})`
          style[key] = {
            zoom: fraction_,
            transform: `scale(${fraction_})`
          }
        }
      )

      silder[key] = [[item[1], Z]]
      continue
    }

    const [x, y, z] = item

    const imgContainer = outer[key].children[0].children[0]

    const X = new silderConstructor(
      x[0],
      x[1],
      {
        initialDistance: 'half'
      },
      fraction => {
        const per = +(fraction * 100).toFixed(0)
        x[1].dataset.scale = per + '%'
        const { y, zoom } = style[key]
        imgContainer.children[0].style.transform = `translate(${per}%, ${y}%) scale(${zoom})`
        style[key].x = per
        style[key].transform = `translate(${per}%, ${y}%) scale(${zoom})`
      }
    )

    // * 滑条实例 - Y
    const Y = new silderConstructor(
      y[0],
      y[1],
      {
        direction: 'y',
        forward: false,
        initialDistance: 'half'
      },
      fraction => {
        const per = +(fraction * 100).toFixed(0)
        y[1].dataset.scale = per + '%'

        const { x, zoom } = style[key]
        imgContainer.children[0].style.transform = `translate(${x}%, ${-per}%) scale(${zoom})`
        style[key].y = per
        style[key].transform = `translate(${x}%, ${per}%) scale(${zoom})`
      }
    )

    // * 滑条实例 - Z
    const Z = new silderConstructor(
      z[0],
      z[1],
      {
        direction: 'y',
        forward: false,
        initialDistance: 'half'
      },
      fraction => {
        const fraction_ = fraction + 1
        z[1].dataset.scale = +(fraction_ * 100).toFixed(0) + '%'
        const { x, y } = style[key]
        imgContainer.children[0].style.transform = `translate(${x}%, ${y}%) scale(${fraction + 1})`
        style[key].zoom = fraction + 1
        style[key].transform = `translate(${x}%, ${y}%) scale(${fraction + 1})`
      }
    )

    silder[key] = [
      [x[1], X],
      [y[1], Y],
      [z[1], Z]
    ]
  }
}
