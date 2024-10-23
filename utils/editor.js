// 富文本编辑器
// 创建编辑器函数，创建工具栏函数
const { createEditor, createToolbar } = window.wangEditor

// 编辑器的配置对象
const editorConfig = {
    // 占位提示文字
    placeholder: '在此输入文章内容...',
    // 编辑器变化时的回调函数
    onChange(editor) {
        // 获取富文本的内容
        const html = editor.getHtml()
        console.log('editor content', html)
        // 🌟 也可以同步到 <textarea>
        document.querySelector('.publish-content').value = html
    }
}

// 创建编辑器
const editor = createEditor({
    // 创建位置
    selector: '#editor-container',
    // 默认内容
    html: '<p><br></p>',
    // 配置项
    config: editorConfig,
    // 配置集成模式
    mode: 'default', // or 'simple'
})

// 工具栏配置对象
const toolbarConfig = {}

// 创建工具栏
const toolbar = createToolbar({
    editor,
    selector: '#toolbar-container',
    config: toolbarConfig,
    mode: 'default', // or 'simple'
})