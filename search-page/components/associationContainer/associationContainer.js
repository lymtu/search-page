/**
 * @description: 联想框的提出渲染
 */
function associationContainerRender() {
  const Dom = document.createElement('div')
  Dom.className = 'associationContainer'
  Dom.onmousedown = (e) => {
    e.preventDefault()
  }
  Dom.onmousewheel = (e) => {
    mouseWheelToSwitch(e)
  }

  main_dom.appendChild(Dom)
  // 获取新的 -联想框- 元素
  associationContainer = Dom

  // 添加 -搜索框上下切换联想条焦点- 事件
  searchBox.addEventListener('keydown', upOrDownToSwitch)
}

/**
 * @description: 根据关键词联想，得出数据，并渲染到 `.associationContainer` 内
 * @param {*} keyword - 关键词
 */
function associationRender(keyword) {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=' + keyword
      document.body.appendChild(script)
      // 移除script标签
      script.remove()

      window.baidu = {
        sug: (json) => {
          resolve(json.s)
        }
      }
    }).then((data) => {
      if (data.length !== 0) {
        associationContainer.style.height = `calc((5vh + 0.25rem) * ${data.length} + 2rem)`
        associationContainer.style.padding = '1rem'

        associationData = data
        const Dom = document.createElement('div')
        data.map((item, index) => {
          const img = document.createElement('img')
          img.src = './img/arrow-left-up.png'
          img.addEventListener('click', () => {
            clickToSearchValue(index)
          })

          img.title = '填充到输入框'

          const p = document.createElement('p');
          p.textContent = item

          const innerDom = document.createElement('div')
          innerDom.className = 'association'
          innerDom.onclick = () => {
            clickToSearch(index)
          }
          innerDom.onmouseenter = () => {
            mouseEnterToChangeIndex(index)
          }
          
          innerDom.appendChild(p)
          innerDom.appendChild(img)

          Dom.appendChild(innerDom)
        })
        associationContainer.innerHTML = ''
        associationContainer.appendChild(Dom)

        associationTag_item = document.querySelectorAll('.association')
      } else {
        associationContainer.style.height = `0vh`
        associationContainer.style.padding = '0rem'
        associationData = []
        associationContainer.innerHTML = ''
      }
    })
    // clearTimeout(timeout)
    timeout = -1
  }, 300)
}

/**
 * @description: 点击联想条以搜索
 * @param {*} index - 联想条的索引
 */
function clickToSearch(index) {
  let keyword = associationData[index]
  searchBox.value = keyword
  adddeleter()
  search(keyword)
}

/**
 * @description: 点击联想框条末尾图标来填入 value
 * @param {*} index - 联想框条的索引
 */
function clickToSearchValue(index) {
  // 阻止事件冒泡
  this.stopPropagation()
  searchBox.value = associationData[index]
  adddeleter()
}

/**
 * @description: 联想框鼠标滑入移除联想条焦点事件
 * @param {*} index - 联想条的索引值
 */
const mouseEnterToChangeIndex = (index) => {
  /*
   * 判断 associationTagIndex 是否为 oldIndexForJudgment
   *   - 是的话不遍历删除 'association_active'
   *   - 不是的话（按动按键或滑动滚轮）遍历删除 'association_active'
   * 最后让 associationTagIndex 和 oldIndexForJudgment 等于 index
   *
   *   bug
   *     associationTagIndex == oldIndexForJudgment在用户后也有可能成立
   *   所以只用一个判断
   *     添加一个状态值， 触发 ToSwitch() 时 - 状态变为 true
   *                     不操作时 - 状态为 false
   */

  if (mouseEnterJudgmentState) {
    associationTag_item.forEach((item) => {
      item.classList.remove('association_active')
    })
    mouseEnterJudgmentState = false
  }

  associationTagIndex = index
}

/**
 * @description: 鼠标滚动切换焦点
 * @param {*} e - 用于阻止事件默认事件
 */
function mouseWheelToSwitch(e) {
  e.preventDefault()
  e.deltaY > 0 ? ToSwitch('down') : ToSwitch('up')
}
