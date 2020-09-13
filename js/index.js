let alarm = document.querySelector(".text").querySelectorAll("b")
let input = document.querySelector(".text").querySelectorAll("input")
let flag = false //判断所有输入框是否正确
input[0].addEventListener("blur", function() {
    let str = /^([\u4e00-\u9fa5]{2,4})|([A-Za-z0-9_]{4,16})|([a-zA-Z0-9_\u4e00-\u9fa5]{3,16})$/;
    if (str.test(this.value)) {
        alarm[0].innerText = ""
    } else {
        alarm[0].innerText = "用户名错误，仅支持4-16位字母,数字,汉字,下划线"
    }
})
input[1].addEventListener("blur", function() {
    let str = /^1[3456789]\d{9}$/
    if (str.test(this.value)) {
        alarm[1].innerText = ""
    } else {
        alarm[1].innerText = '请输入正确的手机号码'
    }
})
input[2].addEventListener("blur", function() {
    let str = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    if (str.test(this.value)) {
        alarm[2].innerText = ""
    } else {
        alarm[2].innerText = '请输入正确的身份证号码'
    }
})


//预约模块
let btn1 = document.querySelector('.btn1')
let btn2 = document.querySelector('.btn2')
btn1.addEventListener("click", () => {
    window.location.href = `mymake.html`
})

btn2.addEventListener("click", function() {
    flag = [...alarm].every(ele => ele.innerText === '')
    console.log(flag);
    if (flag) {
        sessionStorage.setItem('name', input[0].value)
        sessionStorage.setItem('phone', input[1].value)
        sessionStorage.setItem('ID', input[2].value)
        console.log(sessionStorage.getItem('name'));
        axios.post(`http://shopback.bluej.cn/api/f_user/register`, {
            name: sessionStorage.getItem('name'),
            phone: sessionStorage.getItem('phone'),
            card: sessionStorage.getItem('ID')
        }).then(function(response) {
            console.log(response.data.result.token);
            window.location.href = `make.html?token=${response.data.result.token}`
            sessionStorage.setItem('token', response.data.result.token)
        }, function(err) {
            console.log(err);
            alert("网路错误")
        })
    }

})