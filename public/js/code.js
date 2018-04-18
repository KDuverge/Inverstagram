console.log("Connected...");

let heartBtn = document.querySelectorAll('.heart-btn');
let showHeart = document.querySelectorAll('.show-icon');

var count = 0;

heartBtn.forEach(heart => {
  heart.addEventListener('click', function(){
    count++;
    console.log(count);
    heart.classList.toggle('red-btn');
  })
})

showHeart.forEach(heart => {
  heart.addEventListener('click', function(){
    count++;
    console.log(count);
    heart.classList.toggle('red-btn');
  })
})


const commentPar = document.querySelectorAll('.comment-par');
const deleteX = document.querySelectorAll('.delete');

console.log(commentPar);

commentPar.forEach(comment => {
  comment.addEventListener('mouseenter', function(){
    this.nextSibling[0].classList.add('hover-over');
    this.classList.add('hover-background');
  })
})

commentPar.forEach(comment => {
  comment.addEventListener('mouseleave', function(){
    this.nextSibling[0].classList.remove('hover-over');
    this.classList.remove('hover-background');
  })
})

// commentPar.forEach(comment => {
//   comment.addEventListener('mouseleave', function(){
//     this.children[1].style.opacity = 0;
//     this.style.background
//   })
// })