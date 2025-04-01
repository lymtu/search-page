/*
 * @Author: lumtu
 * @Date: 2024-02-17 10:04:45
 */

/**
 * @description 封装滑条滑块实例
 * @todo 使用时 new 一个实例，传入 （滑条dom，滑块dom，*其它配置项， *回调函数），调用实例的 `add` 方法 ，删除则调用实例的 `clear` 方法
 * @param {Element} silderBarDom - 滑条dom
 * @param {Element} silderDom - 滑块dom
 * @param {*} rest - 接收配置项和回调函数
 * @example  // 默认配置
 * ({ direction: 'x', forward: true, initialDistance: 'start' }, (fraction: string) => {})
 * // 配置可选项
 * direction = 'x' | 'y'
 * forward = true | false
 * initialDistance = 'start' | 'half'
 * // 示例
 * direction = 'x', forward = true => 从左到右
 * direction = 'x', forward = false => 从右到左
 * direction = 'y', forward = true => 从上到下
 * direction = 'y', forward = false => 从下到上
 */
function silderConstructor(silderBarDom, silderDom, ...rest) {
  // ======| 配置项 |====== //
  // 配置项对象
  let configuration
  // 回调函数
  let callBackFn = () => {}

  // ======| 传入参数处理 |====== //
  // 判断类型，赋给配置项
  rest.forEach(config => {
    if (typeof config === 'function') {
      callBackFn = config
    } else if (config.constructor === Object) {
      configuration = config
    }
  })

  // 解构
  const { direction, forward, initialDistance } = {
    ...{ direction: 'x', forward: true, initialDistance: 'start' },
    ...configuration
  }

  // ======| 依赖参数 |====== //
  // * 滑动的总长度
  const Length =
    direction == 'x'
      ? silderBarDom?.clientWidth - silderDom?.clientWidth
      : silderBarDom?.clientHeight - silderDom?.clientHeight

  // * 滑块可滑动的距离
  const MovableDistanc = initialDistance == 'half' ? Length / 2 : Length
  // * 滑块初始位置参数
  let StartMousePosition
  // * 运动开始时，滑块位置参数
  let StartSilderPosition
  this.originalStyle = transformExtraction()
  this.dataset_key = getSilderDomDataset(silderDom?.dataset).key
  this.dataset_value = getSilderDomDataset(silderDom?.dataset).value

  // ======| 函数 |====== //
  // * 获取 silderDom 样式 ==> return {x: number, y: number }
  function transformExtraction() {
    const arr = window
      .getComputedStyle(silderDom)
      .transform.split(', ')
      .slice(-2)
      .map((item, index) => (index == 1 ? item.replace(')', '') : item))

    return {
      x: arr[0] == 'none' ? 0 : +arr[0],
      y: arr[1] == undefined ? 0 : +arr[1]
    }
  }
  function getSilderDomDataset(DomMap) {
    for (let key in DomMap) {
      return {
        key,
        value: DomMap[key]
      }
    }
  }
  // * 样式清除函数
  const clearStyle = () => {
    silderDom.style.transform = `translate(${this.originalStyle.x}px, ${this.originalStyle.y}px)`
    silderDom.dataset[this.dataset_key] = this.dataset_value
  }
  // * 移动函数
  const move = () => {
    // * 鼠标移动距离
    const distance = (direction == 'x' ? event.screenX : event.screenY) - StartMousePosition
    // * silder dom 移动的距离 - 样式距离
    let silderDomStyle = StartSilderPosition[direction] + distance

    /** 边界判断
     * 滑块位置初始位置 initialDistance == 'half'
     *
     *   - true ==> 判断silder移样式距离是否大于silderBar长度
     *       - true ==> silder样式距离等于silderBar长度
     *       - false ==> 判断silder样式距离是否小于 0
     *           - true ==> silder样式距离 = 0
     *           - false ==> 样式确定，执行回调函数
     *
     *   - false ==> 判断 |样式距离| 是否大于sikder的可移动距离，且样式距离是否大于 0
     *       - true ==> 样式距离等于可移动距离
     *       - false ==> 判断样式距离是否小于 0
     *           - true ==> 样式距离等于 0
     *           - false ==> 确定样式，执行回调函数
     */

    if (initialDistance == 'half') {
      if (silderDomStyle > Length) {
        silderDomStyle = Length
      } else if (silderDomStyle < 0) {
        silderDomStyle = 0
      }

      callBackFn(
        forward
          ? (silderDomStyle - MovableDistanc) / MovableDistanc
          : (MovableDistanc - silderDomStyle) / MovableDistanc
      )
    } else {
      if (Math.abs(silderDomStyle) > MovableDistanc && silderDomStyle > 0) {
        silderDomStyle = MovableDistanc
      } else if (silderDomStyle < 0) {
        silderDomStyle = 0
      }

      callBackFn(forward ? silderDomStyle / MovableDistanc : (Length - silderDomStyle) / MovableDistanc)
    }

    direction == 'x'
      ? (silderDom.style.transform = `translate(${silderDomStyle}px, ${StartSilderPosition.y}px)`)
      : (silderDom.style.transform = `translate(${StartSilderPosition.x}px, ${silderDomStyle}px)`)
  }
  // * 结束事件函数
  const removeEventListener = () => {
    window.removeEventListener('mousemove', move)
    window.removeEventListener('mouseup', this.removeEventListener)
  }

  // * 开始事件
  const addEventListener = () => {
    // * 鼠标按下开启事件时的鼠标位置
    StartMousePosition = direction == 'x' ? event.screenX : event.screenY
    // * 事件开始时，滑块的位置
    StartSilderPosition = transformExtraction()
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', removeEventListener)
  }

  return {
    add() {
      silderDom.addEventListener('mousedown', addEventListener)
    },
    // * 清除事件及样式
    clear() {
      silderDom.removeEventListener('mousedown', addEventListener)
      clearStyle()
    }
  }
}
