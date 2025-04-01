const main_dom = document.querySelector('.main')
// 背景
const background = main_dom.children[0]
const backgroundImg = background.children[0]
// 搜索框
const searchBoxContainer = main_dom.children[1]
const searchBox = searchBoxContainer.children[0]
const searchButton = document.querySelector('.searchButton')
// 联想框
let associationContainer = document.querySelector('.associationContainer')
// 联想条
let associationTag_item

// 快捷访问外框 - 由 JS 渲染 因为包含需要渲染的数据
let shortCutOuterContainer
// 快捷访问底框
const shortCutUnderContainer = document.querySelector('.shortCutUnderContainer')
