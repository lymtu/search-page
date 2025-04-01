function underRender() {
  // =========================-function-========================= //
  const renderToBox = data => {
    const box = document.createElement('div')
    box.className = 'box'
    data.map(i => {
      const gap = document.createElement('div')
      gap.className = 'gap'
      const item = document.createElement('div')
      item.className = 'item'
      item.onclick = () => {
        window.open(i.data.url, i.data.name)
      }
      const img = document.createElement('img')
      img.src = i.data.imgSrc['1x1']
      img.style.transform = i.data.style['1x1']
      item.appendChild(img)

      box.append(gap, item)
    })

    return box
  }

  // =========================-render-========================= //
  const data = getLocalStorage('shortCutData')
  const underData = getLocalStorage('shortCutUnderData')
  const usefulData = data.filter(i => underData.includes(i.id))

  const box = renderToBox(usefulData)
  const gap_2 = document.createElement('div')
  gap_2.className = 'gap'
  const gap_1 = document.createElement('div')
  gap_1.className = 'gap'
  const more = document.createElement('div')
  more.className = 'item more'
  more.onclick = innerRender
  more.innerHTML = '<img src="./img/all-application.png" alt="" />'
  box.appendChild(gap_2)
  box.appendChild(more)
  box.appendChild(gap_1)

  shortCutUnderContainer.replaceChildren(box)
}

/**
 * @description: 根据依赖项，控制底框的显隐
 * @param {'hidden' | 'appear'} state - 状态
 */
function underTransform(state) {
  if (state === 'hidden') {
    shortCutUnderContainer.classList.add('hidden')
    shortCutUnderContainer.innerHTML = ''
    isSCUnder_exist = false
    return
  }

  shortCutUnderContainer.classList.remove('hidden')
  isSCUnder_exist = true
  underRender()
}
