let top = document.querySelector('.top')
console.log(sessionStorage.getItem('name'));
top.innerText = `尊敬的${sessionStorage.getItem('name')}老板:`
let img = document.querySelector('.box_img').querySelector('img') //图片
let save = document.querySelector('.baocun_img') //保存图片
let info = location.search.split('?')[1].split('&')
let token = info[0].split('=')[1]
console.log(token);
let id = info[1].split('=')[1]
console.log(id);
console.log(info);

let img_src = ''
axios.get(`http://shopback.bluej.cn/api/f_user/Qrcode?token=${token}&id=${id}`).then(function(response) {
    console.log(response.data.data.data);
    img.src = `${response.data.data.data}`
    img_src = response.data.data.data
}, function(err) {
    alarm('请求错误')
    console.log(err);
})

save.addEventListener("click", () => {
    save.setAttribute('download', `${img_src}`)
    save.setAttribute('href', `${img_src}`)
})