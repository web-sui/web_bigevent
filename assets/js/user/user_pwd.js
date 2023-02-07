/* 入口函数 */
; (function () {
    let form = layui.form;
    // 密码验证规则 
    form.verify({
        pass: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
        newPwd: function (value) {
            if (value === $('#oldPwd').val()) {
                return '新密码与旧密码一致,请重新输入!'
            }
        },
        rePwd: function (value) {
            if (value !== $('#newPwd').val()) {
                return '两次输入的密码不一致,请重新输入!'
            }
        }
    })
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)
                // 使用原生dom元素来获取reset()这个方法
                $('.layui-form')[0].reset()
            }
        })

    })
})()

