function login_from_show() {
  let elm = document.querySelector('.login_frm')
  // console.log(elm)
  elm.classList.toggle('show')
}

function frm_check() {
  console.log('id:' , login_id.value, ' pwd: ', login_password.value)

  if (login_id.value == '' || login_id.value == null || login_password.value == '' || login_password.value == null) {
    alert('invalid')
    return false;
  }

  ajax('/login', { "userid": login_id.value, "password": login_password.value })
    .then(() => console.log("result : ", responseData["data"]))
    .then(() => {
      if (responseData.data == "welcome") {
        alert("환영합니다")
      } else {
        if (responseData.data == "no" || responseData.data == "wrong") {
          alert("로그인 정보를 확인하세요")
        }
      }
    }

    )
    .then(location.reload())
}


let responseData
async function ajax(url = '', obj = {}) {
  // console.log(url)
  // console.log(obj)

  const response = await fetch(url, {
    method: 'POST',
    headers: {
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
    .catch(error => console.error(error))
    //   //.then((response)=> response.json())
    .then((data) => console.log(data))

}

function scroll_chk() {
  let scrollPosition = window.scrollY;
  let header = document.querySelector('.main_header')
  // console.log(header)
  if (scrollPosition > 0) {
    header.classList.add('headerscroll')
  } else if (scrollPosition == 0) {
    header.classList.remove('headerscroll')
  }
  // console.log(scrollPosition);
}

function logout() {
  ajax('/logout')
  location.reload()
}

async function getNotice() {
  document.querySelector('.main_quote').style.opacity = 0.15
  document.querySelector('.active').classList.remove('active')
  document.querySelector('.notice').classList.add('active')
  let board = document.querySelector('.board')
  board.style.visibility = "visible"
  document.querySelector('.board_title').innerHTML = '공지사항'
  await ajax('/notice').then(contentBoard)

}

async function board() {
  document.querySelector('.main_quote').style.opacity = 0.15
  document.querySelector('.active').classList.remove('active')
  document.querySelector('.report').classList.add('active')
  let board = document.querySelector('.board')
  board.style.visibility = "visible"
  document.querySelector('.board_title').innerHTML = '게시판'
  // console.log(document.querySelector('.board_title').value)
  await ajax('/report').then(contentBoard)

}

function main() {
  document.querySelector('.main_quote').style.opacity = 1
  document.querySelector('.active').classList.remove('active')
  document.querySelector('.logo').classList.add('active')
  document.querySelector('.board').style.visibility = "hidden"

}

function contentBoard() {
  // todo 클릭시 내용 보이게 하려고 하는데 하드코딩해야할거 같다.
  let tb = document.querySelector('tbody')
  tb.innerHTML = ''
  for (let i = 0; i < responseData.length; i++) {
    let tr = tb.insertRow()

    let link = document.createElement('a')
    link.setAttribute("id", "row" + i)

    let content = document.createElement('td')
    content.classList.add('contents')

    let contentText = document.createTextNode(responseData[i]['title'])
    content.appendChild(contentText)
    link.appendChild(content)

    let time = document.createElement('td')
    let timeText = document.createTextNode(responseData[i]['time'])
    time.appendChild(timeText)
    link.appendChild(time)
    tr.appendChild(link)

  }

}

function modal(){
  // alert('modal')
  const modal = document.querySelector('.modal')
  modal.classList.toggle('show')
  // modal.style.display = 'block'
}
function close(){
  const modal = document.querySelector('.modal')
  modal.classList.remove('show')
}


// 자원을 화면에 로드하게 되면 수행할 동작(==function)
window.onload = function() {
      var join = document.register; //form데이터를 모두 join변수에 저장
      
      // close 버튼
      let close_btn = document.querySelector('.close')
      close_btn.addEventListener('click', ()=>close())

      // 유효성검사할 부분을 class로 부여했기에 check class 태그를 모두 input에 저장 가져옴
      // 이때 input 한 태그당 배열 인덱스로 받는다.
      var input = document.querySelectorAll('.check');

      // 오류 문구 //errorId : span의 id들(각 요소마다 나타낼 오류를 표시하기 위함)
      // error : class list의 하위 span을 모두 불러냄(일괄 처리를 위함 - 반복문)
      var errorId = [ "idError", "pwError", "pwCheckError", "nameError", "phoneNumError", "emailError" ];
      var error = document.querySelectorAll('.list > span');
   
      
      // 오류문구 초기화 메서드
      // 오류 표시 후, 사용자가 올바르게 수정을 하면 텍스트가 사라지는 모습을 구현
      function innerReset(error){
         for (var i = 0; i < error.length; i++) {
            error[i].innerHTML = "";
         }
      }

      // 초기화 메서드 호출
      innerReset(error);

      // [ ID 입력문자 유효성검사 ] 
      join.userid.onkeydown = function(){
         innerReset(error); // 초기화 메서드 호출
         var idLimit = /^[a-zA-Z0-9-_]{5,20}$/; //정규식 5~20자 (a~z, A~Z, 0~9, -, _만 입력가능)
         if (!idLimit.test(input[0].value)) { //입력값과 정규식 범위와 같지 않다면
            // id의 오류 문구삽입
            document.getElementById(errorId[0]).innerHTML = "5~20자의 영문 소대문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.";

         }
      }
      // [ PW 입력문자 유효성검사 ]
      join.password.onkeydown = function(){
         innerReset(error); // 초기화 메서드 호출
         var pwLimit = /^[a-zA-Z0-9~!@#$%^&*()_-]{10,20}$/; //정규식(a~z, A~Z, 0~9, ~!@#$%^&*()_- 만 입력가능)
         if (!pwLimit.test(input[1].value)) { //입력값과 정규식 범위와 같지 않다면
            // pw의 오류 문구삽입
            document.getElementById(errorId[1]).innerHTML = " 10~20자의 영문 소대문자, 숫자와 특수기호 '~!@#$%^&*()_-'만 사용 가능합니다.";
         }   
      }
      // [ PW 재확인 입력문자 초기화 ]
      //비밀번호 동일여부는 submit 버튼 클릭시 검사해줄 예정
      join.pwCheck.onkeydown = function(){
         // pw의 오류 문구삽입
         innerReset(error);// 오류문구 초기화   
      }
      // [ 휴대폰번호 입력문자 유효성검사 ]
         join.phoneNum.onkeydown = function(){ //입력값과 정규식 범위와 같지 않다면
         innerReset(error); // 초기화 메서드 호출   
            var pnumLimit =  /^01[0|1|6|7|8|9]{1}[0-9]{8}$/; // 정규식(^$--> 문자의미, 01, (6자리중 "1자리"), 0~9--> "8자리")
            if (!pnumLimit.test(input[4].value)) { //입력값과 정규식 범위와 같지 않다면
               // pw의 오류 문구삽입 
               document.getElementById(errorId[4]).innerHTML = " 올바른 형식이 아닙니다. 다시 확인해주세요.";
            }
         }
         
         // [ 이메일 입력 유효성검사 ] 
         join.email.onkeydown = function(){ //입력값과 정규식 범위와 같지 않다면
            innerReset(error); // 초기화 메서드 호출
            var emailLimit = /[0-9a-zA-Z-_.]/; // 정규식 0~9, a~z, A~Z, -, _, .내에서만 입력가능
               if (!emailLimit.test(input[5].value)) {  //입력값과 정규식 범위와 같지 않다면
                  // 이메일의 오류 문구삽입
                  document.getElementById(errorId[5]).innerHTML = " 올바른 형식이 아닙니다. 영문,숫자, (-)(_)(.) 입력만 가능합니다.";
               }
            }
         //submit 실행시 수행할 동작
      join.onsubmit = function() { //join에서 submit이 실행된다면 수행할 함수           
        var errorStr = [ " 아이디를", " 비밀번호를", " 비밀번호 확인을", " 성함을", " 휴대폰번호를", " 이메일을" ];
        
        innerReset(error); // 오류문구 초기화
        
        // [ input 공백확인 ]
        for (var i = 0; i < input.length - 1; i++) { // -1 == submit제외 
           if (!input[i].value) { 
              document.getElementById(errorId[i]).innerHTML = errorStr[i]+ " 입력해 주세요.";
              input[i].focus(); // 포커스 이동
              return false; // 종료 (포커스 이동유지를 위해 false 종료)
           }
        }         
        
        // [주소 input 공백확인]
        {//지역변수 스코프 조정(address) -일회성사용
           var inputAddress = document.querySelectorAll('.addressCheck');
           for(var i = 0; i < inputAddress.length; i++){
              //console.log(inputAddress[i]);
              if(!inputAddress[i].value){
                 document.getElementById("addressError").innerHTML = " 주소 혹은 상세주소를 입력해주세요.";
                 return false;   
              }
           }
        }
        //유효성검사) 비밀번호 재확인
        if (join.pw.value != join.pwCheck.value) {
           document.getElementById("pwCheckError").innerHTML = " 비밀번호가 일치하지 않습니다.";
           join.pwCheck.focus(); // 포커스 이동
           return false;
        }

        // 정규식 변수 모음     
        var idLimit = /^[a-zA-Z0-9-_]{5,20}$/; //정규식(a~z, A~Z, 0~9, -, _만 입력가능)
        var pwLimit = /^[a-zA-Z0-9~!@#$%^&*()_-]{10,20}$/;///[a-zA-Z0-9]{10, 20}/; //정규식(a~z, A~Z, 0~9,~!@#$%^&*()_-특수문자 만 입력가능)
        var pnumLimit =  /^01[0|1|6|7|8|9]{1}[0-9]{8}$/; // 01로 시작, 0,1,6,7,8,9 중 한자리, 0~9에서 8자리 입력
        var emailLimit = /[0-9a-zA-Z-_.]/; // 정규식 0~9, a~z, A~Z, -, _, .내에서만 입력가능

        // [ ID 유효성검사 ]
        if (!idLimit.test(input[0].value)) {
           document.getElementById(errorId[0]).innerHTML = " 5~20자의 영문 소대문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.";
           join.id.focus(); // 포커스 이동
           return false;
        }

        // [ PW 유효성검사 ]
        if (!pwLimit.test(input[1].value)) {
           document.getElementById(errorId[1]).innerHTML = " 10~20자의 영문 소대문자, 숫자와 특수기호 '~!@#$%^&*()_-'만 사용 가능합니다.";
           //console.log(input[1].value);
           //console.log(pwLimit.test(input[1].value));
           join.pw.focus(); // 포커스 이동
           return false;
        }         

       // [ 휴대폰번호 유효성검사 ]
        if (!pnumLimit.test(input[4].value)) { 
           document.getElementById(errorId[4]).innerHTML = " 올바른 형식이 아닙니다. 다시 확인해주세요.";
           join.phoneNum.focus(); // 포커스 이동
           return false;
        }

       // [ email 아이디 유효성검사 ]
        if (!emailLimit.test(input[5].value)) { 
           document.getElementById(errorId[5]).innerHTML = " 올바른 형식이 아닙니다. 영문,숫자, (-)(_)(.) 외 입력은 불가합니다.";
           join.email.focus(); // 포커스 이동
           return false;
        }

       // [ email 주소선택 유효성검사 ]
        if (document.getElementById("mail_Select").value=="이메일 선택") { 
           document.getElementById(errorId[5]).innerHTML = " 이메일을 선택해주세요.";
           return false;
        }
        //console.log(document.getElementById("mail_Select").value);
        
        // 개인정보 동의박스 체크
        var consentCheck = document.getElementById("check");
        //console.log(consentCheck);
        if(!consentCheck.checked){
           document.getElementById("consentError").innerHTML = "개인정보 수집이용 동의를 해주세요.";
           return false;
        }
        
        alert("회원가입이 완료되었습니다. 라이더의 멤버가 되신 것을 환영합니다!! :D");


     }//join.onsublit

  }//window

  function idcheck(){
    let confirmId= document.querySelector('#userid')
    var idLimit = /^[a-zA-Z0-9-_]{5,20}$/; //정규식 5~20자 (a~z, A~Z, 0~9, -, _만 입력가능)
    if (!idLimit.test(confirmId.value)) {
      document.getElementById('idError').innerHTML = " 5~20자의 영문 소대문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.";
      confirmId.focus(); // 포커스 이동
      return false;
   }
    console.log(confirmId.value)
    ajax('/idcheck', {"userid":confirmId.value})
    
    .then(()=> {
      if(responseData.data == "ok"){
        alert('사용가능한 아이디입니다')
        confirmId.focus
      }else if(responseData.data == "already"){
        alert('이미 존재하는 아이디입니다.')
        //todo focus 
        confirmId.focus
      }
    })
  }
  

  function sample4_execDaumPostcode() {
    new daum.Postcode(
            {
                oncomplete : function(data) {
                    // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                    // 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
                    // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                    var fullRoadAddr = data.roadAddress; // 도로명 주소 변수
                    alert(fullRoadAddr);
                    var extraRoadAddr = ''; // 도로명 조합형 주소 변수

                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if (data.bname !== ''
                            && /[동|로|가]$/g.test(data.bname)) {
                        extraRoadAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if (data.buildingName !== ''
                            && data.apartment === 'Y') {
                        extraRoadAddr += (extraRoadAddr !== '' ? ', '
                                + data.buildingName : data.buildingName);
                    }
                    // 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                    if (extraRoadAddr !== '') {
                        extraRoadAddr = ' (' + extraRoadAddr + ')';
                    }
                    // 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
                    if (fullRoadAddr !== '') {
                        fullRoadAddr += extraRoadAddr;
                    }

                    // 우편번호와 주소 정보를 해당 필드에 넣는다.
                    document.getElementById('sample4_postcode').value = data.zonecode; //5자리 새우편번호 사용
                    document.getElementById('sample4_roadAddress').value = fullRoadAddr;
                    document.getElementById('sample4_jibunAddress').value = data.jibunAddress;

                    // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
                    if (data.autoRoadAddress) {
                        //예상되는 도로명 주소에 조합형 주소를 추가한다.
                        var expRoadAddr = data.autoRoadAddress
                                + extraRoadAddr;
                        document.getElementById('guide').innerHTML = '(예상 도로명 주소 : '
                                + expRoadAddr + ')';

                    } else if (data.autoJibunAddress) {
                        var expJibunAddr = data.autoJibunAddress;
                        document.getElementById('guide').innerHTML = '(예상 지번 주소 : '
                                + expJibunAddr + ')';

                    } else {
                        document.getElementById('guide').innerHTML = '';
                    }
                }
            }).open();
}