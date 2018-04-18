console.log("Connected...");

let heartBtn = document.querySelectorAll('.heart-btn');
let showHeart = document.querySelectorAll('.show-icon');

var count = 0;

const url = "http://localhost:3000/api/image";

heartBtn.forEach((heart, i) => {
  heart.addEventListener('click', function(){
    heart.innerHTML++;
    heart.classList.toggle('red-btn');

  })
})






