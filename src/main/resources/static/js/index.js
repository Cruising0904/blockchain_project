function login_from_show() {
    let elm = document.querySelector('.login_frm')
    elm.classList.add('show')
}

function frm_check() {
    let id = document.querySelector('#id')
    let password = document.querySelector('#password')
    // console.log('id')
    if(id.value=='' || id.value == null || password.value=='' || password.value == null){
        alert('invalid')
        return false;
    }
    // alert(id.value)
    // todo sending via thymeleaf for secure reason
    ajax('/login', {"phoneNum":id.value, "password":password.value});
}
async function ajax(url='', data={}){
  console.log(url)
  console.log(data)
  
    const response = await fetch(url, {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  // .then(response => response.json())
  // .then(data => {
  //   console.log('Success:', data);
  // })
  // .catch((error)=> {
  //   console.error('Error:', error);
  // })
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

