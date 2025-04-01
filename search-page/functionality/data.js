// 联想数据存储框
let associationData = []

// 快捷访问总数据
let shortCutData = [
  {
    // 根据时间戳来创建ID以便存储和删除
    id: '1',
    data: {
      name: 'bilibili',
      url: 'https://www.bilibili.com/',
      // 储存图片的放大缩小数据，或上下平移
      style: {
        '1x1': '',
        '2x1': 'translate(-20px, 0px)',
        '1x2': ''
      },
      imgSrc: {
        '1x1':
          'https://ts3.cn.mm.bing.net/th?id=OIP-C.hVLkOxa2nWCnf21QSNEmGwHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
        '2x1':
          'https://tse2-mm.cn.bing.net/th/id/OIP-C.49ZbzO9RA-ns3B_6I1w2wAHaHa?w=176&h=180&c=7&r=0&o=5&pid=1.7',
        '1x2': 'https://logo800.cn/uploads/logoxinshang/56/logo800_16491624018615580.png'
      }
    }
  },
  {
    id: '2',
    data: {
      name: '有道翻译',
      url: 'https://fanyi.youdao.com/index.html#/',
      style: {
        '1x1': '',
        '2x1': '',
        '1x2': ''
      },
      imgSrc: {
        '1x1':
          'https://ts1.cn.mm.bing.net/th?id=OIP-C.BHq5lvJU_rCRsMqBeK_DWQHaHa&w=175&h=185&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
        '2x1': '',
        '1x2': ''
      }
    }
  },
  {
    id: '3',
    data: {
      name: 'React Api',
      url: 'https://react.docschina.org/reference/react',
      style: {
        '1x1': 'translate(0)',
        '2x1': '',
        '1x2': 'translateY(-1rem)'
      },
      imgSrc: {
        '1x1': 'https://tse3-mm.cn.bing.net/th/id/OIP-C.swkWTqCj7NWt2Sb5K71X8QHaHa?rs=1&pid=ImgDetMain',
        '2x1': '',
        '1x2': 'https://tse1-mm.cn.bing.net/th/id/OIP-C.9jVyV1JtRT6jZh_ux1O9JQHaEK?rs=1&pid=ImgDetMain'
      }
    }
  },
  {
    id: '4',
    data: {
      name: 'MDN',
      url: 'https://developer.mozilla.org/zh-CN/',
      style: {
        '1x1': 'translateY(1rem) scale(2)',
        '2x1': '',
        '1x2': ''
      },
      imgSrc: {
        '1x1':
          'https://www.zdnet.com/a/img/resize/44cb4343f342b683972621a6113a88cbaeff547e/2022/03/01/33b5e401-651b-4108-8fcf-6b6fa5670039/screen-shot-2022-03-01-at-11-24-49-am.png?width=770&height=578&fit=crop&format=pjpg&auto=webp',
        '2x1': '',
        '1x2': ''
      }
    }
  },
  {
    id: '5',
    data: {
      name: 'React Router',
      url: 'https://baimingxuan.github.io/react-router6-doc/start/tutorial',
      style: {
        '1x1': 'scale(0.8)',
        '2x1': '',
        '1x2': 'translateY(2rem) scale(0.8)'
      },
      imgSrc: {
        '1x1': 'https://tse4-mm.cn.bing.net/th/id/OIP-C.tUj-2mmaCmlgk-2o4p7-wwHaHa?rs=1&pid=ImgDetMain',
        '2x1': '',
        '1x2': 'https://reactrouter.com/_brand/react-router-color.png'
      }
    }
  },
  {
    id: '6',
    data: {
      name: 'Svg',
      url: 'https://iconpark.oceanengine.com/official',
      style: {
        '1x1': 'scale(0.6)',
        '2x1': '',
        '1x2': 'translateY(-3.5rem) scale(0.8)'
      },
      imgSrc: {
        '1x1': 'https://tse3-mm.cn.bing.net/th/id/OIP-C.-3bRC2rPE62JKhN-p7WigAAAAA?rs=1&pid=ImgDetMain',
        '2x1': '',
        '1x2': 'https://image.dbyun.net/upload/20220930/0b3595f29d23d5fcdc4a9878d2b24817.png'
      }
    }
  },
  {
    id: '7',
    data: {
      name: 'Vite',
      url: 'https://cn.vitejs.dev/guide/',
      style: {
        '1x1': 'scale(0.6)',
        '2x1': '',
        '1x2': ''
      },
      imgSrc: {
        '1x1': 'https://cn.vitejs.dev/logo-with-shadow.png',
        '2x1': '',
        '1x2': ''
      }
    }
  },
  {
    id: '8',
    data: {
      name: 'TailwindCSS',
      url: 'https://www.tailwindcss.cn/',
      style: {
        '1x1': 'translateY(0.5rem) scale(0.6)',
        '2x1': '',
        '1x2': 'translateY(-1rem) scale(0.8)'
      },
      imgSrc: {
        '1x1': 'https://tse4-mm.cn.bing.net/th/id/OIP-C.pEeKeUoENMqoN-kR8f8XoQHaFj?rs=1&pid=ImgDetMain',
        '2x1': '',
        '1x2': 'https://tse4-mm.cn.bing.net/th/id/OIP-C.S-SYtYzIhgPRnmRd8yWH4gAAAA?rs=1&pid=ImgDetMain'
      }
    }
  },
  {
    id: '9',
    data: {
      name: 'GitHub',
      url: 'https://github.com/',
      style: {
        '1x1': 'translateY(1rem)',
        '2x1': '',
        '1x2': ''
      },
      imgSrc: {
        '1x1': 'https://tse1-mm.cn.bing.net/th/id/OIP-C.fqZ9-PPqcG_cm0k3JfoINQHaEK?rs=1&pid=ImgDetMain',
        '2x1': '',
        '1x2': ''
      }
    }
  },
  {
    id: '10',
    data: {
      name: 'Query',
      url: 'https://tanstack.com/query/latest/docs/framework/react/overview',
      style: {
        '1x1': 'translateY(0.3rem) scale(0.8)',
        '2x1': '',
        '1x2': 'translateY(1.2rem) scale(0.8)'
      },
      imgSrc: {
        '1x1': 'https://seeklogo.com/images/R/react-query-logo-1340EA4CE9-seeklogo.com.png',
        '2x1': '',
        '1x2': 'https://tse2-mm.cn.bing.net/th/id/OIP-C.pl-EjgVZLn3h3CFQRUIw-gHaBc?rs=1&pid=ImgDetMain'
      }
    }
  },
  {
    id: '11',
    data: {
      name: '高德地图 Open Api',
      url: 'https://lbs.amap.com/api/webservice/guide/api/search',
      style: {
        '1x1': '',
        '2x1': '',
        '1x2': 'translateY(-3.2rem) scale(0.8)'
      },
      imgSrc: {
        '1x1': 'https://gd-hbimg.huaban.com/7b050517e98db04ef95292309a1aa38dd5c02e4174e1-dQWLez_fw658',
        '2x1': '',
        '1x2': 'https://tse1-mm.cn.bing.net/th/id/OIP-C.WAYYrlTL3Bp9GwYRAPwhTQHaHa?rs=1&pid=ImgDetMain'
      }
    }
  },
  {
    id: '12',
    data: {
      name: 'Vidhub',
      url: 'https://vidhub.tv/',
      style: {
        '1x1': 'scale(0.8)',
        '2x1': '',
        '1x2': 'translateY(-0.5rem)'
      },
      imgSrc: {
        '1x1':
          'https://ts1.cn.mm.bing.net/th/id/R-C.469e7f5ec74781eafb2b584ef25dc0e8?rik=lWHVJ1ZQCC0ltA&riu=http%3a%2f%2fpic.yx007.com%2fup%2f2023-6%2f202367176582182.png&ehk=uTTej2ZoNdDRXaRy%2f%2fKggc380Hbdg5zuvkjHWITRMwM%3d&risl=&pid=ImgRaw&r=0',
        '2x1': '',
        '1x2': 'https://biemoyu.com/wp-content/uploads/2023/05/img_646b5dea49bb2.png'
      }
    }
  },
  {
    id: '13',
    data: {
      name: 'm3u3',
      url: 'https://blog.luckly-mjw.cn/tool-show/m3u8-downloader/index.html',
      style: {
        '1x1': 'scale(0.6)',
        '2x1': '',
        '1x2': ''
      },
      imgSrc: {
        '1x1':
          'https://ts1.cn.mm.bing.net/th/id/R-C.3788497f64eeedf38a4f016511c42fb6?rik=1ApM1v%2fv%2fhlS9A&riu=http%3a%2f%2ficon.chrafz.com%2fuploads%2fallimg%2f160919%2f1-1609191A3380-L.png&ehk=KtuaDMFbY29WzPwmvP72IokO%2bUcfXFwi%2bIQbI2Qh57g%3d&risl=&pid=ImgRaw&r=0',
        '2x1': '',
        '1x2': ''
      }
    }
  },
  {
    id: '14',
    data: {
      name: '文心一言',
      url: 'https://yiyan.baidu.com/',
      style: {
        '1x1': '',
        '2x1': '',
        '1x2': ''
      },
      imgSrc: {
        '1x1':
          'https://ts1.cn.mm.bing.net/th/id/R-C.2f88f1731e8c03352a64a0f1a54d186c?rik=SWRl9ajHqyOjEQ&riu=http%3a%2f%2fwww.kuaipng.com%2fUploads%2fpic%2fw%2f2023%2f03-18%2f136331%2fwater_136331_698_698_.png&ehk=6KTJE4kFQo6BK0gcDKlAIturGRi%2f7X0494ei%2fizwHsI%3d&risl=&pid=ImgRaw&r=0',
        '2x1': '',
        '1x2': ''
      }
    }
  }
]

// 快捷访问外框数据
let shortCutOutData = [
  { id: '1', size: '2x1' },
  { id: '2', size: '1x1' },
  { id: '14', size: '1x1' },
  { id: '3', size: '1x2' },
  { id: '4', size: '1x1' },
  { id: '5', size: '1x1' },
  { id: '6', size: '1x1' },
  { id: '7', size: '1x1' },
  { id: '8', size: '1x1' }, { id: '9', size: '1x1' },
  { id: '10', size: '1x2' },
  { id: '11', size: '1x1' },
  { id: '12', size: '1x1' },
  { id: '13', size: '1x1' }
]


let shortCutUnderData = ['1', '2', '3', '4', '5', '6', '7', '8']
