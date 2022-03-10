//https://codepen.io/netsi1964/pen/QbLLGW
import {Button, useMediaQuery} from '@geist-ui/core'
var commandsMap = [
  {
      "cmd": "backColor",
      "short": "颜色",
      "val": "red",
      "desc": "修改文档的背景颜色。在styleWithCss模式下，则只影响容器元素的背景颜色。这需要一个<color> 类型的字符串值作为参数传入。注意，IE浏览器用这个设置文字的背景颜色。"
  },
  {
      "cmd": "bold",
      "short": "加粗",
      "desc": "开启或关闭选中文字或插入点的粗体字效果。IE浏览器使用 <strong>标签，而不是<b>标签。"
  },
  {
      "cmd": "ClearAuthenticationCache",
      "short": "清除缓存",
      "desc": "清除缓存中的所有身份验证凭据。"
  },
  {
      "cmd": "contentReadOnly",
      "short": "编辑切换",
      "desc": "通过传入一个布尔类型的参数来使能文档内容的可编辑性。(IE浏览器不支持)"
  },
  {
      "cmd": "copy",
      "short": "复制",
      "desc": "拷贝当前选中内容到剪贴板。启用这个功能的条件因浏览器不同而不同，而且不同时期，其启用条件也不尽相同。使用之前请检查浏览器兼容表，以确定是否可用。"
  },
  {
      "cmd": "createLink",
      "short": "创建链接",
      "val": "http://",
      "desc": "将选中内容创建为一个锚链接。这个命令需要一个hrefURI字符串作为参数值传入。URI必须包含至少一个字符，例如一个空格。（浏览器会创建一个空链接）"
  },
  {
      "cmd": "cut",
      "short": "剪切",
      "desc": "剪贴当前选中的文字并复制到剪贴板。启用这个功能的条件因浏览器不同而不同，而且不同时期，其启用条件也不尽相同。使用之前请检查浏览器兼容表，以确定是否可用。"
  },
  {
      "cmd": "decreaseFontSize",
      "short": "小字体",
      "desc": "给选中文字加上 <small> 标签，或在选中点插入该标签。(IE浏览器不支持)"
  },
  {
      "cmd": "defaultParagraphSeparator",
      "short": "段落分割",
      "desc": "更改在可编辑文本区域中创建新段落时使用的段落分隔符。有关更多详细信息，请参阅标记生成的差异。"
  },
  {
      "cmd": "delete",
      "short": "删除",
      "desc": "删除选中部分."
  },
  {
      "cmd": "enableAbsolutePositionEditor",
      "short": "移动定位",
      "desc": "启用或禁用允许移动绝对定位元素的抓取器。Firefox 63 Beta/Dev Edition 默认禁用此功能(bug 1449564)。"
  },
  {
      "cmd": "enableInlineTableEditing",
      "short": "表格增删",
      "desc": "启用或禁用表格行和列插入和删除控件。(IE浏览器不支持)"
  },
  {
      "cmd": "enableObjectResizing",
      "short": "图像调整",
      "desc": "启用或禁用图像和其他对象的大小可调整大小手柄。(IE浏览器不支持)"
  },
  {
      "cmd": "fontName",
      "val": "",
      "short": "字体名称",
      "desc": "在插入点或者选中文字部分修改字体名称. 需要提供一个字体名称字符串 (例如：Arial作为参数。)"
  },
  {
      "cmd": "fontSize",
      "short": "字体大小",
      "val": "1-7",
      "desc": "在插入点或者选中文字部分修改字体大小. 需要提供一个HTML字体尺寸 (1-7) 作为参数。"
  },
  {
      "cmd": "foreColor",
      "short": "修改字体颜色",
      "val": "red",
      "desc": "在插入点或者选中文字部分修改字体颜色. 需要提供一个颜色值字符串作为参数。"
  },
  {
      "cmd": "formatBlock",
      "short": "块标签",
      "desc": "添加一个HTML块式标签在包含当前选择的行, 如果已经存在了，更换包含该行的块元素 (在 Firefox中, BLOCKQUOTE 是一个例外 -它将包含任何包含块元素). 需要提供一个标签名称字符串作为参数。几乎所有的块样式标签都可以使用(例如. H1, P, DL, BLOCKQUOTE) (IE浏览器仅仅支持标题标签 H1 - H6, ADDRESS, 和 PRE,使用时还必须包含标签分隔符 < >, 例如 <H1>.)"
  },
  {
      "cmd": "forwardDelete",
      "short": "删除",
      "desc": "删除光标所在位置的字符。 和按下删除键一样。"
  },
  {
      "cmd": "heading",
      "short": "标题标签",
      "val":"H1",
      "desc": "添加一个标题标签在光标处或者所选文字上。 需要提供标签名称字符串作为参数 (例如. H1, H6). (IE 和 Safari不支持)"
  },
  {
      "cmd": "hiliteColor",
      "short": "修改背景色",
      "val": "red",
      "desc": "更改选择或插入点的背景颜色。需要一个颜色值字符串作为值参数传递。 UseCSS 必须开启此功能。(IE浏览器不支持)"
  },
  {
      "cmd": "increaseFontSize",
      "short": "增大",
      "desc": "在选择或插入点周围添加一个BIG标签。(IE浏览器不支持)"
  },
  {
      "cmd": "indent",
      "short": "缩进",
      "desc": "缩进选择或插入点所在的行， 在 Firefox 中, 如果选择多行，但是这些行存在不同级别的缩进, 只有缩进最少的行被缩进。"
  },
  {
      "cmd": "insertBrOnReturn",
      "short": "切换Enter行为",
      "desc": "控制当按下Enter键时，是插入 br 标签还是把当前块元素变成两个。(IE浏览器不支持)"
  },
  {
      "cmd": "insertHorizontalRule",
      "short": "删除线",
      "desc": "在插入点插入一个水平线（删除选中的部分）"
  },
  {
      "cmd": "insertHTML",
      "short": "插入html",
      "val": "",
      "desc": "在插入点插入一个HTML字符串（删除选中的部分）。需要一个个HTML字符串作为参数。(IE浏览器不支持)"
  },
  {
      "cmd": "insertImage",
      "short": "插入图片",
      "val": "http://",
      "desc": "在插入点插入一张图片（删除选中的部分）。需要一个 URL 字符串作为参数。这个 URL 图片地址至少包含一个字符。空白字符也可以（IE会创建一个链接其值为null）"
  },
  {
      "cmd": "insertOrderedList",
      "short": "有序列表",
      "desc": "在插入点或者选中文字上创建一个有序列表"
  },
  {
      "cmd": "insertUnorderedList",
      "short": "无序列表",
      "desc": "在插入点或者选中文字上创建一个无序列表。"
  },
  {
      "cmd": "insertParagraph",
      "short": "段落",
      "desc": "在选择或当前行周围插入一个段落。(IE会在插入点插入一个段落并删除选中的部分.)"
  },
  {
      "cmd": "insertText",
      "short": "插入文本",
      "val": "",
      "desc": "在光标插入位置插入文本内容或者覆盖所选的文本内容。"
  },
  {
      "cmd": "italic",
      "short": "斜体",
      "desc": "在光标插入点开启或关闭斜体字。 (Internet Explorer 使用 EM 标签，而不是 I )"
  },
  {
      "cmd": "justifyCenter",
      "short": "居中",
      "desc": "对光标插入位置或者所选内容进行文字居中。"
  },
  {
      "cmd": "justifyFull",
      "short": "文本对齐",
      "desc": "对光标插入位置或者所选内容进行文本对齐。"
  },
  {
      "cmd": "justifyLeft",
      "short": "左对齐",
      "desc": "对光标插入位置或者所选内容进行左对齐。"
  },
  {
      "cmd": "justifyRight",
      "short": "右对齐",
      "desc": "对光标插入位置或者所选内容进行右对齐。"
  },
  {
      "cmd": "outdent",
      "short": "减少缩进",
      "desc": "对光标插入行或者所选行内容减少缩进量。"
  },
  {
      "cmd": "paste",
      "short": "粘贴",
      "desc": "在光标位置粘贴剪贴板的内容，如果有被选中的内容，会被替换。剪贴板功能必须在 user.js 配置文件中启用。参阅 [1]."
  },
  {
      "cmd": "redo",
      "short": "重做",
      "desc": "重做被撤销的操作。"
  },
  {
      "cmd": "removeFormat",
      "short": "格式擦",
      "desc": "所选内容去除所有格式"
  },
  {
      "cmd": "selectAll",
      "short": "全部选中",
      "desc": "中编辑区里的全部内容。"
  },
  {
      "cmd": "strikeThrough",
      "short": "启用删除线",
      "desc": "光标插入点开启或关闭删除线。"
  },
  {
      "cmd": "subscript",
      "short": "下角标",
      "desc": "光标插入点开启或关闭下角标。"
  },
  {
      "cmd": "superscript",
      "short": "上角标",
      "desc": "光标插入点开启或关闭上角标。"
  },
  {
      "cmd": "underline",
      "short": "下划线",
      "desc": "光标插入点开启或关闭下划线。"
  },
  {
      "cmd": "undo",
      "short": "撤销",
      "desc": "销最近执行的命令。"
  },
  {
      "cmd": "unlink",
      "short": "除链",
      "desc": "除所选的锚链接的<a>标签"
  },
  {
      "cmd": "useCSS",
      "short": "使用css",
      "val": "true",
      "desc": "换使用 HTML tags 还是 CSS 来生成标记. 要求一个布尔值 true/false 作为参数。注: 这个属性是逻辑上的倒退 (例如. use false to use CSS, true to use HTML).(IE不支持)该属性已经废弃，使用 styleWithCSS 代替。"
  },
  {
      "cmd": "styleWithCSS",
      "short": "使用css（新）",
      "val": "true",
      "desc": "用这个取代 useCSS 命令。 参数如预期的那样工作, i.e. true modifies/generates 风格的标记属性, false 生成格式化元素。"
  },
  {
      "cmd": "AutoUrlDetect",
      "short": "自动链接",
      "desc": "更改浏览器自动链接行为（仅IE浏览器支持）"
  }
]
var commandRelation = {};

function supported(cmd) {
  return !!document.queryCommandSupported(cmd.cmd)
}

function Tabs() {
  const isXS = useMediaQuery('xs')
  const isSM = useMediaQuery('sm')
  const isMD = useMediaQuery('md')
  const isLG = useMediaQuery('lg')
  const isXL = useMediaQuery('xl')
  commandsMap.map((v,i)=>{
    commandRelation[v.cmd] = commandsMap[i]
  })
  function doCommand(cmdKey) {
    var cmd = commandRelation[cmdKey];
    console.log(cmd)
    if (!supported(cmd)) {
      alert("execCommand(“" + cmd.cmd + "”)\n不支持你的浏览器");
      return;
    }
    console.log(`command is ${cmd.cmd}`)
    var val =
      typeof cmd.val !== "undefined"
        ? prompt("Value for " + cmd.cmd + "?", cmd.val)
        : "";
    document.execCommand(cmd.cmd, false, val || ""); // Thanks to https://codepen.io/bluestreak for finding this bug
  }
  return (
    <div style={{ display: 'flex', flex: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
      {commandsMap.map((command, i) => {
        return <Button 
                scale={(isXS && 0.1)||(isSM && 0.2)||(isMD && 0.3)||(isLG && 0.4)||(isXL && .5)} 
                disabled={!document.queryCommandSupported(command.cmd)} 
                type={document.queryCommandSupported(command.cmd)?"success-light":"error-light"}  
                ghost  
                key={i}  
                style={{ margin: '.1rem',opacity: document.queryCommandSupported(command.cmd)? 1: 0.3}} 
                title={command.desc} 
                onMouseDown={e => e.preventDefault()} 
                onClick={e => doCommand(command.cmd)}>{command.short}</Button>
      })}
    </div>
  )
}

export default Tabs
