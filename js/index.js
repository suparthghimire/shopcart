
if(document.readyState =='loading'){
    document.addEventListener('DOMContentLoaded',readytoLoad)
}
else{
    readytoLoad();
}


function readytoLoad(){
    var removeBtns = document.getElementsByClassName('red');
        for(var i=0;i<removeBtns.length;i++){
            var btn = removeBtns[i];
            btn.addEventListener('click',removeCartItem)
        }


    var quantityInputs = document.getElementsByClassName('cart-quantity-input');
        for(var i=0;i<quantityInputs.length;i++){
                var input = quantityInputs[i];
                input.addEventListener('change',quantityChanged); 
            }
    
    var itemsToCart = document.getElementsByClassName('add-item-to-cart');
        for(var i = 0;i<itemsToCart.length;i++){
            var addButton = itemsToCart[i];
            addButton.addEventListener('click',addToCart);
        }

    document.getElementsByClassName('purchase-btn')[0].addEventListener('click',purchase);
    }

   function purchase(){
       alert (`Thankyou For Purchasing`);
       var cartItems = document.getElementsByClassName('cart-items')[0];
       while(cartItems.hasChildNodes()){
           cartItems.removeChild(cartItems.firstChild);
       }
       updateTotal();
   }
function removeCartItem(event){
    var btnClick = event.target;
    btnClick.parentElement.parentElement.remove();
    updateTotal();
}

function quantityChanged(event){
    var input =event.target;
    if(isNaN(input.value) || input.value<=0){
        input.value=1;
    }
    updateTotal();
}
function addToCart(event){
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    var imgSrc = shopItem.getElementsByClassName('card-img')[0].src;
    alert(`${title} has been added to yout cart!`);

    console.log(title,price,imgSrc);
    addItemRow(title,price,imgSrc);
    updateTotal();
}

function addItemRow(title,price,imgSrc){
    var newCartRow=document.createElement('div');
    newCartRow.classList.add('cart-row');
    newCartRow.innerText=title;
    var newCartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = document.getElementsByClassName('cart-item-title');
    for(var i = 0;i<cartItemNames.length;i++){
        if(cartItemNames[i].innerText==title){
            alert(`${title} has already been added to the cart`);
            return;
        }
    }
    var cartRowContents = `
    <span class="cart-item cart-column">
    <img src="${imgSrc}" alt="card bg"class = "card-img cart-item-image" width="100px" height="100px">
    <span class="cart-item-title">${title}</span>
    </span>
    <span class="cart-price  cart-column">${price}</span>
    <span class="cart-quantity  cart-column">
    <input type="number" class="cart-quantity-input" value="1">  
    <button type="button" class="btn red">Remove</button>
    </span>`
    newCartRow.innerHTML = cartRowContents;
    newCartItems.append(newCartRow);
    newCartRow.getElementsByClassName('red')[0].addEventListener('click',removeCartItem);
    newCartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChanged);
    console.log(updateTotal)
}



function updateTotal(){
    var cartItem = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItem.getElementsByClassName('cart-row');
    var total = 0;
    
    for(var i=0;i<cartRows.length;i++){
        var cartRow = cartRows[i];
        var priceElement =  cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price=parseFloat(priceElement.innerText.replace('$',''));
        var quantity = quantityElement.value;    
        total=total+(price*quantity);
    }
    total=Math.round(total*100)/100;
    document.getElementsByClassName('cart-total-price')[0].innerText='$'+total;
}

