let phone = sessionStorage.getItem('phone')
let name = sessionStorage.getItem('name')
let token = sessionStorage.getItem('token')
let yesnum = document.querySelector('.yesnum')
let yesdate = document.querySelector('.yesdate')
let yesname = document.querySelector('.yesname')

let no = document.querySelector('.no')
axios.post(`http://shopback.bluej.cn/api/f_user/report`, {
    phone: phone,
    name: name
}).then(function(response) {
    console.log(response);
    let lastinfo = response.data.result.length - 1
    console.log(lastinfo);
    console.log(response.data.result[lastinfo]);
    let showId = response.data.result[lastinfo].show_id
    let dayTime = response.data.result[lastinfo].day_time
    no.style.display = 'none'
    yesdate.innerText = `日期:${dayTime}`
    yesname.innerText = `姓名:${response.data.result[lastinfo].name}`
    console.log(showId);
    axios.get(`http://shopback.bluej.cn/api/f_user/chooseday?token=${token}&day_time=${dayTime}`).then(function(response) {
        console.log(response);
        let bookTime = response.data.result.list
        console.log(bookTime)
        yesnum.innerText = `场次:${bookTime[showId-1].show_name}`
    }, function(err) {
        alarm('请求错误')
        console.log(err);
    })
}, function(err) {
    // alert('请求错误')
    console.log(err);
})