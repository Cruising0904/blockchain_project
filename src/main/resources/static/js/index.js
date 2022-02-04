function login_from_show() {
    let elm = document.querySelector('.login_frm')
    console.log(elm)
    elm.classList.toggle('show')
}

function frm_check() {

    if(id.value=='' || id.value == null || password.value=='' || password.value == null){
        alert('invalid')
        return false;
    }
   
    let result = ajax('/login', {"id":id.value, "password":password.value})
    .then(location.reload())
}

let responseData
async function ajax(url='', obj={}){
  console.log(url)
  console.log(obj)
  
    const response = await fetch(url, {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  }).then(response => {
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new TypeError("Oops, we haven't got JSON!");
    }
    return response.json();
 })
 .then(data => {
     /* process your data further */
     responseData = (data)
    //  console.log(objs)
 })
 .catch(error => console.error(error));
//   //.then((response)=> response.json())
//   .then((data)=> console.log(data))

}

function scroll_chk(){
    let scrollPosition = window.scrollY;
    let header = document.querySelector('header')
    console.log(header)
    if(scrollPosition > 0){
        header.classList.add('headerscroll')
    }else if (scrollPosition ==0){
        header.classList.remove('headerscroll')
    }
console.log(scrollPosition);
}

function logout(){
  ajax('/logout')
  location.reload()
}

async function getNotice(){
  document.querySelector('.main_quote').style.opacity = 0.15
  document.querySelector('.active').classList.remove('active')
  document.querySelector('.notice').classList.add('active')
  let board = document.querySelector('.board')
  board.style.visibility = "visible"
  document.querySelector('.board_title').innerHTML = '공지사항'
  await ajax('/notice').then(contentBoard)
  
}

async function board(){
  document.querySelector('.main_quote').style.opacity = 0.15
  document.querySelector('.active').classList.remove('active')
  document.querySelector('.report').classList.add('active')
  let board = document.querySelector('.board')
  board.style.visibility = "visible"
  document.querySelector('.board_title').innerHTML = '게시판'
  console.log(document.querySelector('.board_title').value)
   await ajax('/report').then(contentBoard)

}

function main(){
  document.querySelector('.main_quote').style.opacity = 1
  document.querySelector('.active').classList.remove('active')
  document.querySelector('.logo').classList.add('active')
  document.querySelector('.board').style.visibility = "hidden"

}

function contentBoard(){
  // todo 클릭시 내용 보이게 하려고 하는데 하드코딩해야할거 같다.
  let tb = document.querySelector('tbody')
  tb.innerHTML=''
  for(let i =0; i<responseData.length;i++){
    let tr = tb.insertRow()

    let link = document.createElement('a')
    link.setAttribute("id", "row"+i)
 
    let content = document.createElement('td')
    content.classList.add('contents')
    
    let contentText = document.createTextNode(responseData[i]['title'])
    content.appendChild(contentText)
    link.appendChild(content)

    let time =document.createElement('td')
    let timeText = document.createTextNode(responseData[i]['time'])
    time.appendChild(timeText)
    link.appendChild(time)
    tr.appendChild(link)
   
  }

}