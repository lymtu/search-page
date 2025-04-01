/**
 * @description: 根据给定参数 - `id` ，并从内框中删除对应的元素
 * @param {*} id
 */
function innerItemRemove(id) {
  const itemArr = [...document.querySelectorAll('innerItem')]
  const item = itemArr.find(item => item.id === id)
  item.remove()
}

function innerRender() {
  // =========================-variable-========================= //

  // =========================-function-========================= //
  /**
   * @description: 防抖
   * @param {Function} func - 执行函数
   * @param {number} delay - 误触时间
   */
  const debounce = (func, delay) => {
    let timer = null
    return function () {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        func.apply(this, arguments)
      }, delay)
    }
  }

  /**
   * @description: 将数据渲染到 `body` 内
   * @param {*} data - 渲染的数据
   */
  const renderToBody = data => {
    const body = document.createElement('div')
    body.className = 'body'
    data.map(i => {
      const img = document.createElement('img')
      img.src = i.data.imgSrc['1x1']
      img.style.transform = i.data.style['1x1']

      const item = document.createElement('div')
      item.title = i.data.name
      item.draggable = true
      item.className = 'innerItem'
      item.dataset.id = i.id
      item.onclick = () => {
        window.open(i.data.url, i.data.name)
      }
      item.oncontextmenu = e => {
        shortCutItemID = e.target.dataset.id
        menuRander('shortCutInnerOptions')
      }
      item.appendChild(img)
      body.appendChild(item)
    })

    return body
  }

  // =========================-render-========================= //
  const data = getLocalStorage('shortCutData')
  const underData = getLocalStorage('shortCutUnderData')
  const usefulData = data.filter(i => underData.includes(i.id))
  const mapArr = ['', '', '', '', '', '', '', '', '']

  const header = document.createElement('div')
  header.className = 'header'
  mapArr.map((_, i) => {
    const item = usefulData[i]
    const underItem = document.createElement('div')
    if (!item) {
      underItem.className = 'item null'
    } else {
      underItem.className = 'item'
      underItem.title = item.data.name
      underItem.draggable = true
      const img = document.createElement('img')
      img.src = item.data.imgSrc['1x1']
      img.style.transform = item.data.style['1x1']
      underItem.appendChild(img)
    }
    header.appendChild(underItem)
  })

  const input = document.createElement('input')
  input.type = 'text'
  input.placeholder = '输入以检索'
  input.spellcheck = false
  input.addEventListener('input', () => {
    const search = debounce(() => {
      const value = input.value
      const usefulData = data.filter(item => item.data.name.includes(value))
      const body = renderToBody(usefulData)
      body_outer.replaceChildren(body)
    }, 500)

    search()

    button.disabled = input.value == ''
  })
  const button = document.createElement('button')
  button.innerText = '清除'
  button.disabled = true
  button.addEventListener('mousedown', e => {
    e.preventDefault()
    const event = new Event('input', {
      bubbles: true,
      cancelabel: true
    })
    input.value = ''

    input.dispatchEvent(event)
  })
  const neck = document.createElement('div')
  neck.className = 'neck'
  neck.append(input, button)

  /**
   * 添加容器的原因：
   *  数据更新时，不能使用 `splaceWith` 方法替换原有 body，在第二次搜索时会找不到 body
   */
  const body_outer = document.createElement('div')
  body_outer.className = 'body_outer'
  const body = renderToBody(data)
  body_outer.appendChild(body)

  const Dom = document.createElement('div')
  Dom.className = 'shortCutInnerContainer'
  Dom.append(header, neck, body_outer)

  maskingLayerRender(Dom)
}
