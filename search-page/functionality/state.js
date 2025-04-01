// ======| 全局状态 |====== //
let location_origin = window.location.origin
let shortCutItemID // 正在右键的快捷方式的 ID
let shortCutAddBoxInputDom // 正在右键的添加框中的输入框

// ======| 输入框状态 |====== //
let is_CN_Input = false // 中文输入状态
let deleterNum = 0 // 删除按钮计数器

// ======| 联想框状态 |====== //
let timeout = -1 // 联想时用定时器防抖
let associationTagIndex = -1 // 联想数据索引值
let mouseEnterJudgmentState = false // 是否按动键盘上下键

// ======| 菜单控制的状态 |====== //
let timeoutForsize = -1 // 防抖获取窗口大小
let winWidth = window.innerWidth // 窗口宽度
let winHeight = window.innerHeight // 窗口高度
let menuOptionsNum = 0 // 菜单选项计数器 - 用以计算菜单高度，作贴边计算
let isMenu_open = false // 菜单是否打开
let isAssociation_exist = true // 联想框是否存在
let isSCOuter_exist = true // 快捷访问外框是否存在
let isSCUnder_exist = true // 快捷访问下框是否存在