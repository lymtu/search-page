/**
 * @description: 根据数据渲染快捷访问外框，并添加出现动画
 * @param {boolean} boo - 是否播放显示动画
 */
function outerRender(boo = true) {
  const data = getLocalStorage('shortCutData')
  const outdata = getLocalStorage('shortCutOutData')

  let drapIndex, drapEnterIndex, target

  if (outdata == []) {
    shortCutOuterContainer.remove()
    return
  }

  const Dom = document.createElement('div')
  Dom.className = 'shortCutOuterContainer'


  Dom.ondragover = e => {
    e.preventDefault()
  }

  outdata.map((i, index) => {
    const item = data.find(item => item.id === i.id)
    const ImgDom = document.createElement('img')
    ImgDom.style.transform = item?.data.style[i.size]
    ImgDom.src = item?.data.imgSrc[i.size == '2x2' ? '1x1' : i.size]
    const DomItem = document.createElement('div')
    DomItem.className = 'outItem'
    DomItem.draggable = true
    DomItem.ondragstart = () => {
      drapIndex = index
      target = DomItem
    }
    DomItem.ondragenter = (e) => {
      e.preventDefault()
      drapEnterIndex = index
      e.dataTransfer.dropEffect = 'move'
    }
    DomItem.ondragend = () => {
      if (!drapEnterIndex) {
        return
      }

      const Outdata = outdata.filter(I => I != i)
      Outdata.splice(drapEnterIndex, 0, i)
      setLocalStorage('shortCutOutData', Outdata)
      outerRender(false)
    }
    DomItem.dataset.size = i.size
    DomItem.dataset.name = item?.data.name
    DomItem.dataset.id = i.id
    DomItem.title = item?.data.name
    DomItem.onclick = () => {
      setTimeout(() => {
        window.open(item?.data.url, item?.data.name)
      }, 300)

    }
    DomItem.oncontextmenu = e => {
      shortCutItemID = e.target.dataset.id
      menuRander('shortCutOuterOptions')
    }
    DomItem.appendChild(ImgDom)
    Dom.appendChild(DomItem)
  })

  if (shortCutOuterContainer) {
    shortCutOuterContainer.remove()
  }

  main_dom.appendChild(Dom)
  shortCutOuterContainer = Dom

  if (boo) {
    outerAppear()
  }
}

/**
 * @description: 对outer添加出现动画
 */
function outerAppear() {
  shortCutOuterContainer.style.animation = '0.75s ease 0s 1 normal forwards running outerAppear'
}

/**
 * @description: 对outer添加隐藏动画
 */
function outerHidden() {
  shortCutOuterContainer.style.animation = '0.75s ease 0s 1 normal forwards running outerHidden'
}

/**
 * @description: 播放隐藏动画，0.5s后删除outer
 */
function outerRemove() {
  outerHidden()
  setTimeout(() => {
    shortCutOuterContainer.remove()
  }, 500)
}

/**
 * @description: 根据给定参数 - `id` ，并从外框中删除对应的元素
 * @param {string} id - 给定的 id
 */
function outerItemRemove(id) {
  const itemArr = [...document.querySelectorAll('.outItem')]
  const item = itemArr.find(i => i.dataset.id == id)
  item.remove()
}
