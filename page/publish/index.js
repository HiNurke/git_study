/**
 * 目标1：设置频道下拉菜单
 *  1.1 获取频道列表数据
 *  1.2 展示到下拉菜单中
 */
// 1.1 获取频道列表数据
async function setChannleList() {
    const res = await axios({
        url: '/v1_0/channels'
    })
    // console.log(res);

    const htmlStr = '<option value="" selected>请选择文章频道</option>' + res.data.channels.map(item => {
        return `<option value="${item.id}">${item.name}</option>`
    }).join('')
    document.querySelector('.form-select').innerHTML = htmlStr

}
// 网页运行后，默认调用一次
setChannleList()

/**
 * 目标2：文章封面设置
 *  2.1 准备标签结构和样式
 *  2.2 选择文件并保存在 FormData
 *  2.3 单独上传图片并得到图片 URL 网址
 *  2.4 回显并切换 img 标签展示（隐藏 + 号上传标签）
 */

document.querySelector('.img-file').addEventListener('change', async (e) => {
    const file = e.target.files[0]
    const fd = new FormData
    fd.append('image', file)

    const res = await axios({
        url: '/v1_0/upload',
        method: 'POST',
        data: fd
    })
    document.querySelector('.rounded').src = res.data.url
    document.querySelector('.rounded').classList.add('show')
    document.querySelector('.place').classList.add('hide')

})
// 优化：点击 img 可以重新切换封面
document.querySelector('.rounded').addEventListener('click', () => {
    document.querySelector('.img-file').click()
})

/**
 * 目标3：发布文章保存
 *  3.1 基于 form-serialize 插件收集表单数据对象
 *  3.2 基于 axios 提交到服务器保存
 *  3.3 调用 Alert 警告框反馈结果给用户
 *  3.4 重置表单并跳转到列表页
 */
// 3.1 基于 form-serialize 插件收集表单数据对象
document.querySelector('.send').addEventListener("click", async e => {
    // 如果不存在data-id，则视为发布新文章
    if (document.querySelector('[name=id]').dataset.id) return
    const form = document.querySelector('.art-form')
    const data = serialize(form, { hash: true, empty: true })
    // console.log(data);
    // 删掉data中的‘id’属性
    delete data.id
    // 增驾文章封面cover对象
    data.cover = {
        type: 1, // 默认传递1-1张图(注意是 integer整数型常量)
        images: [document.querySelector('.rounded').src]
    }
    console.log(data);

    // 3.3 调用 Alert 警告框反馈结果给用户
    try {
        // 3.2 基于 axios 提交到服务器保存
        const res = await axios({
            url: '/v1_0/mp/articles',
            method: 'POST',
            data: data
        })
        myAlert(true, '成功发布文章')
        // 3.4 重置表单并跳转到列表页
        form.reset();
        // 需要手动重置img和富文本区域
        document.querySelector('.rounded').src = ''
        document.querySelector('.rounded').classList.remove('show')
        document.querySelector('.place').classList.remove('hide')
        editor.setHtml('')

        setTimeout(() => {
            location.href = '../content/index.html'
        }, 1500)

        // 成功发布文章后跳转至内容页面
    } catch (err) {
        // console.dir(err)
        myAlert(false, err.response.data.message)
    }
})

    /**
      * 目标4：编辑-回显文章
      *  4.1 页面跳转传参（URL 查询参数方式）
      *  4.2 发布文章页面接收参数判断（共用同一套表单）
      *  4.3 修改标题和按钮文字
      *  4.4 获取文章详情数据并回显表单
      */
    //   采用立即调用函数
    ; (function () {
        const paramsStr = location.search
        // console.log(paramsStr);
        const params = new URLSearchParams(paramsStr)

        // for (const key of params.keys()) {
        //     console.log(key);
        // }

        params.forEach(async (value, key) => {
            // console.log(value, key);
            // 判断当前是否有文章id传入进来
            if (key === 'id') {
                // 4.3 修改标题和按钮文字
                document.querySelector('.title span').innerHTML = '修改文章';
                document.querySelector('.send').innerHTML = '提交'

                // 4.4 获取文章详情数据并回显表单
                const res = await axios({
                    url: `/v1_0/mp/articles/${value}`
                })
                // console.log(res);
                // 整理我仅仅需要的数据对象，为后续遍历回显到页面上做铺垫
                const { channel_id, title, cover: { images: [rounded] }, content, id } = res.data
                const dataObj = { channel_id, title, rounded, content, id };

                document.querySelector('[name=id]').dataset.id = id

                // 遍历数据对象属性，映射到页面元素上，快速赋值
                for (const key in dataObj) {
                    if (key === 'rounded') {
                        if (dataObj[key]) {
                            // 有封面
                            document.querySelector('.rounded').src = dataObj.rounded
                            document.querySelector('.rounded').classList.add('show')
                            document.querySelector('.place').classList.add('hide')
                        }
                    } else if (key === 'content') {
                        // 富文本内容
                        editor.setHtml(dataObj[key])
                    } else {
                        // 用数据对象属性名，作为标签 name 属性选择器值来找到匹配的标签
                        document.querySelector(`[name=${key}]`).value = dataObj[key]
                    }
                }
            }
        })

    })()

/**
 * 目标5：编辑-保存文章
 *  5.1 判断按钮文字，区分业务（因为共用一套表单）
 *  5.2 调用编辑文章接口，保存信息到服务器
 *  5.3 基于 Alert 反馈结果消息给用户
 */
document.querySelector('.send').addEventListener('click', async e => {
    // 5.1 判断按钮文字，区分业务（因为共用一套表单）
    if (document.querySelector('[name=id]').dataset.id) {
        const form = document.querySelector('.art-form')
        const data = serialize(form, { hash: true, empty: true })
        console.log(data);

        try {
            // 5.2 调用编辑文章接口，保存信息到服务器
            const res = await axios({
                url: `/v1_0/mp/articles/${data.id}`,
                method: 'PUT',
                data: {
                    ...data,
                    cover: {
                        type: document.querySelector('.rounded').src ? 1 : 0,
                        images: [document.querySelector('.rounded').src]
                    }
                }
            })
            console.log(res);
            myAlert(true, '修改文章成功')

            setTimeout(() => {
                location.href = '../content/index.html'
            }, 1500)
        } catch (err) {
            myAlert(false, err.response.data.message)
        }
    }
})
