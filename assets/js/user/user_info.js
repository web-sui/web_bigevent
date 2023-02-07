/* 入口函数 */
; (function () {
    // 用户信息验证
    let form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6 || value.length < 1) {
                return '昵称只能在1~6字符之间'
            }
        }
    })
    // 调用用户初始化方法
    getUserInfo()
})()
// 初始化获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        data: { username: 'itheima' },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            // 快速赋值表单赋值
            layui.form.val('formUserInfo', res.data)
        }
    })
}
// 完善重置按钮功能
$('#btnReset').on('click', function (e) {
    //    阻止默认行为
    e.preventDefault()
    getUserInfo()
})
/* 完善提交修改按钮功能 */
// 获取提交功能
$('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
        method: 'POST',
        url: '/my/userinfo',
        // 获取表单提交元素
        data: $(this).serialize(),
        success: function (res) {
            if (res.status == 1) {
                return layui.layer.msg(res.message)
            }
            layui.layer.msg(res.message)
            // 子页面调用父页面的方法，因为是iframe显示,index.html页面调用
            window.parent.getUserInfo()
        }
    })
})