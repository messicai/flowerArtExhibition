let query = location.search.split('=')[1] //接收url参数
let date1 = document.querySelector('#date1')
let session = document.querySelector('.session')
console.log(query);
axios.get(`http://shopback.bluej.cn/api/f_user/chooselist?token=${query}`).then(function(response) {
    // console.log(response.data.result.list);
    let dateList = response.data.result.list
    console.log(dateList);
    [...dateList].forEach(ele => {
        date1.innerHTML += `<option value="${ele.day_time}">${ele.day_time}</option>`
    })

}, function(err) {
    console.log(err);
    alarm('请求失败')
})

let timeDiv = session.querySelectorAll('.bookList')
let index = 0
timeDiv.forEach(ele => ele.style.display = 'none')
    //select选中查询预约场次
date1.addEventListener('change', function() {
    let session_time = document.querySelectorAll('.session_time')
    index = date1.selectedIndex
    console.log(index);
    console.log(date1.options[index].value);
    if (index != 0) {
        timeDiv.forEach(ele => ele.style.display = 'flex')
    } else {
        timeDiv.forEach(ele => ele.style.display = 'none')
    }
    axios.get(`http://shopback.bluej.cn/api/f_user/chooseday?token=${query}&day_time=${date1.options[index].value}`).then(function(response) {
        console.log(response);
        let bookTime = response.data.result.list
        console.log(bookTime);
        session_time.forEach((ele, index) => {
            ele.innerText = `${bookTime[index].show_name}`
            ele.parentNode.children[1].setAttribute('id', index + 1)
        })
        session = document.querySelector('.session')
    }, function(err) {
        alarm('请求错误')
        console.log(err);
    })
})

//点击预约
let state = document.querySelectorAll('.state');
session.addEventListener("click", (e) => {
        console.log(e.path[0].id);
        axios.post(`http://shopback.bluej.cn/api/f_user/bookday`, {
            token: query,
            day_time: date1.options[index].value,
            show_id: e.path[0].id
        }).then(function(response) {
            console.log(response);
            console.log(response.data.result.id);
            window.location.href = `enterance.html?token=${query}&id=${response.data.result.id}`
        }, function(err) {
            alarm('请求错误')
            console.log(err);
        })
    })
    // state.forEach((ele, id) => {
    //     axios.post(`http://shopback.bluej.cn/api/f_user/bookday`, {
    //         token: query,
    //         day_time: date1.options[index].value,
    //         show_id: id + 1
    //     }).then(function(response) {
    //         console.log(response);
    //     }, function(err) {
    //         alarm('请求错误')
    //         console.log(err);
    //     })
    // })