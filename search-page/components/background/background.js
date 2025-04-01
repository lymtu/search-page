;(() => {
  const backgroundImgData = getLocalStorage('backgroundImg') || {
    src: './img/background.jpg',
    style: ''
  }

  backgroundImg.src = backgroundImgData.src
  backgroundImg.style = backgroundImgData.style
})()
