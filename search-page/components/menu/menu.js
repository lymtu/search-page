// ======| 右键菜单函数 |====== //
const menuOptions = {
  globalOptions: [
    {
      text: '刷新',
      function() {
        location.reload()
      }
    },
    {
      text: '添加新的快捷访问',
      function() {
        // 弹出面板
        SCAddBoxRender()
      }
    },
    {
      text: '打开快捷访问框',
      function() {
        innerRender()
      }
    },
    {
      text: '隐藏外部快捷访问框',
      function() {
        isSCOuter_exist ? outerRemove() : outerRender()
        this.text = isSCOuter_exist ? '打开外部快捷访问框' : '隐藏外部快捷访问框'
        isSCOuter_exist = !isSCOuter_exist
      }
    },
    {
      text: '隐藏快捷访问底框',
      function() {
        this.text = isSCUnder_exist ? '显示快捷访问底框' : '隐藏快捷访问底框'
        isSCUnder_exist = !isSCUnder_exist
      }
    },
    {
      text: '隐藏搜索联想框',
      function() {
        this.text = isAssociation_exist ? '显示搜索联想框' : '隐藏搜索联想框'

        if (isAssociation_exist) {
          // 删除 -搜索框上下切换联想条焦点- 事件
          searchBox.removeEventListener('keydown', upOrDownToSwitch)
          // 删除 -联想框- 元素
          associationContainer.remove()
        } else {
          // 否则添加 -联想框- 元素
          searchBox.addEventListener('keydown', upOrDownToSwitch)
          associationContainerRender()
        }
        isAssociation_exist = !isAssociation_exist
      }
    },
    {
      text: '更换壁纸',
      function() {
        bgSwitchBoxRender()
      }
    }
  ],
  shortCutOuterOptions: [
    { text: '编辑该快捷访问', function() {} },
    { text: '隐藏该快捷访问', function() {} }
  ],
  shortCutInnerOptions: [
    {
      text: '添加到外部',
      function() {
        let outData = getLocalStorage('shortCutOutData')
        if (outData.some(item => item.id === shortCutItemID)) {
          // 弹窗提示
          return false
        }

        outData.push({
          id: shortCutItemID,
          size: '1x1'
        })

        setLocalStorage('shortCutOutData', outData)
        outerRender(false)
      }
    },
    {
      text: '编辑该快捷访问',
      function() {
        // 弹出编辑框
      }
    },
    {
      text: '删除该快捷访问',
      function() {
        let data = getLocalStorage('shortCutData')
        data = data.filter(item => item.id != shortCutItemID)
        setLocalStorage('shortCutData', data)
        innerItemRemove(shortCutItemID)

        // 判断是否在外部展示框内，是再重新渲染
        let outdata = getLocalStorage('shortCutOutData')
        if (outdata.some(item => item.id == shortCutItemID) || isSCOuter_exist) {
          outdata = outdata.filter(item => item.id != shortCutItemID)
          setLocalStorage('shortCutOutData', outdata)
          outerItemRemove(shortCutItemID)
        }
      }
    }
  ],
  searchBoxOptions: [
    {
      text: '粘贴',
      async function() {
        const text = await navigator.clipboard.readText()
        searchBox.value += text
        associationContainer.classList.add('associationContainer_show')
        adddeleter()
        associationRender(searchBox.value)
      }
    },
    {
      text: '粘贴并搜索',
      async function() {
        const text = await navigator.clipboard.readText()
        searchBox.value += text
        adddeleter()
        search(searchBox.value)
      }
    }
  ]
}

/**
 * @description: 根据传入参数 `name` ， 渲染菜单
 * @param {'globalOptions' | 'shortCutOptions' | 'shortCutInnerOptions' | 'searchBoxOptions' | 'shortCutAddBoxInputOptions'} name - 数据名
 * @param {*} left - 默认为 `e.pageX`
 * @param {*} top - 默认为 `e.pageY`
 */
function menuRander(name, left = event.pageX, top = event.pageY) {
  event.preventDefault()
  // 添加判断，以此避免可以在右键菜单中右键打开菜单
  if (!isMenu_open && name) {
    isMenu_open = true
    let data = menuOptions[name]
    menuOptionsNum = data.length
    const menu_dom = document.createElement('div')
    menu_dom.id = 'rightMenu'

    data.map(item => {
      const menu_option = document.createElement('div')
      menu_option.textContent = item.text
      menu_option.onclick = () => {
        item.function()
        menuRemove()
      }
      menu_dom.appendChild(menu_option)
    })

    let menuHeight = menuOptionsNum * 38 + (menuOptionsNum - 1) * 8 + 36
    menu_dom.style.top = top + 5 + menuHeight < winHeight ? top + 5 + 'px' : winHeight - menuHeight + 5 + 'px'
    left + 5 + 13 * 16 < winWidth ? (menu_dom.style.left = left + 5 + 'px') : (menu_dom.style.right = '5px')
    menu_dom.style.zIndex = 999
    menu_dom.style.padding = '1rem'
    menu_dom.onmousedown = e => {
      e.stopPropagation()
      e.preventDefault()
    }
    document.body.appendChild(menu_dom)

    window.addEventListener('mousedown', menuRemove)
  }
}

// 全局右键呼出右键菜单
window.oncontextmenu = () => {
  menuRander('globalOptions')
}

/**
 * @description: 删除菜单函数
 */
function menuRemove() {
  const menu = document.getElementById('rightMenu')
  if (menu) {
    menu.remove()
    isMenu_open = false
    window.removeEventListener('globalOptions', menuRemove)
  }
}
