/**
 * @description: 搜索路径
 * @param {*} keyword - 搜索关键字
 * @param {*} url - 搜索路径
 */
function search(keyword, url = 'https://cn.bing.com/search?q=') {
  searchBox.blur()
  setTimeout(() => {
    window.open(url + keyword, keyword)
  }, 500)
}

/**
 * @description: 添加清除按钮
 */
function adddeleter() {
  if (deleterNum == 0) {
    deleterNum = 1

    const deleter = document.createElement('div')
    deleter.innerHTML = "<img src='./img/clear.png' alt='' />"
    deleter.className = 'searchBoxdeleter'
    deleter.title = '清除'
    deleter.onmousedown = (e) => {
      e.preventDefault()
    }
    deleter.onclick = () => {
      // 清空输入框和联想框
      searchBox.value = ''
      if (isAssociation_exist) {
        associationContainer.innerHTML = ''
        associationContainer.classList.remove('associationContainer_show')
      }

      // 防止快速触发
      setTimeout(() => {
        try {
          deleter.remove()
          deleterNum = 0
        } catch (error) {
          return false
        }
      }, 150)
    }
    searchBoxContainer.insertBefore(deleter, searchButton)
  }
}

/**
 * @description: 输入框用户输入触发
 */
searchBox.addEventListener('input', () => {
  // associationContainer = document.querySelector('.associationContainer')
  const value = searchBox.value
  associationTagIndex = -1

  if (value == '') {
    // 删除 清除按钮
    searchBoxContainer.removeChild(searchBoxContainer.children[1])
    deleterNum = 0
  } else if (deleterNum == 0) {
    adddeleter()
  }

  if (isAssociation_exist) {
    if (value != '') {
      // 打开联想框
      associationContainer.classList.add('associationContainer_show_faster')
      associationContainer.classList.add('associationContainer_show')

      setTimeout(() => {
        associationContainer.classList.remove('associationContainer_show_faster')
      }, 500)

      associationRender(value)
    } else {
      // 关闭联想框
      associationContainer.classList.remove('associationContainer_show')
      associationContainer.innerHTML = ''
    }
  }
})

/**
 * @description: 搜索框聚焦触发
 */
searchBox.addEventListener('focus', () => {
  // 背景聚焦
  backgroundImg.classList.add('searchBoxFocusToBackground')
  // 搜索框放大
  searchBoxContainer.classList.add('searchBoxFocusToContainer')
  // 快捷访问外框下移隐藏
  outerHidden()
  shortCutUnderContainer.classList.add('hidden')

  // value 不为空时，在聚焦时联想一次
  if (searchBox.value != '' && isAssociation_exist) {
    // 开启联想框
    associationContainer.classList.add('associationContainer_show')
    associationRender(searchBox.value)
  }
})

/**
 * @description: 搜索框失焦触发
 */
searchBox.addEventListener('blur', () => {
  backgroundImg.classList.remove('searchBoxFocusToBackground')
  searchBoxContainer.classList.remove('searchBoxFocusToContainer')
  shortCutUnderContainer.classList.remove('hidden')
  outerAppear()

  if (isAssociation_exist) {
    // 关闭联想框
    associationContainer.classList.remove('associationContainer_show')
  }

  associationTagIndex = -1

  associationTag_item
    ? associationTag_item.forEach((item) => {
        item.classList.remove('association_active')
      })
    : false
})

/**
 * @description: 点击 Enter 用于搜索
 * @param {*} e - 用于取消默认事件
 */
searchBox.addEventListener('keydown', (e) => {
  const keyword = searchBox.value
  if (e.key == 'Enter' && keyword != '') {
    search(keyword)
  }
})

searchBox.oncontextmenu = (e) => {
  e.preventDefault()
  e.stopPropagation()
  menuRander('searchBoxOptions')
}

/** == 事件提出以便联想框关闭时删除
 * @description: 上键下键来移动联想框条焦点
 * @param {*} e
 */
const upOrDownToSwitch = (e) => {
  if (e.key == 'ArrowUp') {
    // 阻止默认事件
    event.preventDefault()
    ToSwitch('up')
  } else if (e.key == 'ArrowDown') {
    ToSwitch('down')
  }
}

/** == 本事件提出以便 -鼠标滚动切换焦点事件- 使用
 * @description: 根据参数来切换联想条焦点
 * @param {*} type - `up` 和 `down`
 */
function ToSwitch(type) {
  // 不为 -1 时，删除上一个焦点
  associationTagIndex == -1
    ? false
    : associationTag_item[associationTagIndex].classList.remove('association_active')

  if (type == 'up') {
    // 下标值为 `0` 或 `-1` 时，变为 `associationData.length - 1`
    if (associationTagIndex <= 0) {
      associationTagIndex = associationData.length - 1
    } else {
      associationTagIndex--
    }
    associationTag_item[associationTagIndex].classList.add('association_active')
    // 更改 value 值
    searchBox.value = associationData[associationTagIndex]
  } else if ('down') {
    if (associationTagIndex >= associationData.length - 1) {
      associationTagIndex = 0
    } else {
      associationTagIndex++
    }
    associationTag_item[associationTagIndex].classList.add('association_active')
    // 更改 value 值
    searchBox.value = associationData[associationTagIndex]
  }

  mouseEnterJudgmentState = true
}

searchBox.addEventListener('keydown', upOrDownToSwitch)

/**
 * @description: 点击搜索图标用于搜索
 */
const submitSearch = () => {
  const keyword = searchBox.value
  if (keyword) {
    search(keyword)
  } else {
    // 提示框事件
  }
}

// 浏览器失去焦点时触发
window.onblur = () => {
  searchBox.blur()
  menuRemove()
}