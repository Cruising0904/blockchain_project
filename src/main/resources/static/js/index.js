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
    alert(id.value)
    // todo ajax fetch

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

function ajax(){
    let text = document.querySelector('.main_quote')
    text.style.opacity = 0.3
    
    fetch('/list')
  .then((response) => console.log("response:", response))
  
  .catch((error) => console.log("error:", error))
  
  ;
}