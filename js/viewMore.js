//add to cart button selector
var modalBtn = document.getElementById('modal-btn');
//for actual modal container
var modalContainer = document.getElementById('view-model');
//for close button
var closeBtn = document.getElementById('close-btn-x');


modalBtn.addEventListener('click',openModal);
closeBtn.addEventListener('click',closeModal);

function openModal(){
    modalContainer.style.display='block';
}
function closeModal(){
    modalContainer.style.display='none';
}




