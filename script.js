// cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let Closecart = document.querySelector("#close-cart");

// open cart
cartIcon.onclick = () => {
    cart.classList.add("active")
};
// close cart
Closecart.onclick = () => {
    cart.classList.remove("active")
};

//  cart working js
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

//making function
function ready() {
    // remove items from cart
    var removeCartButtons = document.getElementsByClassName('cart-remove')
    console.log(removeCartButtons)
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i]
        button.addEventListener("click", removeCartItem)
    }

    // quantity change
    var quantityInputs = document.getElementsByClassName('cart-quantity')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    // add to cart 
    var addCart = document.getElementsByClassName('add-cart')
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i]
        button.addEventListener("click", addCartClicked);
    }
    // buy button
    document.getElementsByClassName('Submit')[0].addEventListener('click', buyButtonClicked);

}

// buy function 
function buyButtonClicked(){
    // alert('Your Order is placed')
    var cartContent= document.getElementsByClassName('cart-content')[0]
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild)
    }
    updateTotal();

}

// remove items from cart
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}
// funtion _> change total 
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

// add to cart
function addCartClicked(event) {
    var button = event.target
    var shopProducts = button.parentElement
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('product-price')[0].innerText;
    var productimg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, productimg);
    updateTotal();
}

function addProductToCart(title, price, productimg) {
    var cartshopbox = document.createElement("div");
    cartshopbox.classList.add("cart-box");
    var cartItem = document.getElementsByClassName('cart-content')[0];
    var cartItemsname = cartItem.getElementsByClassName('cart-product-title');
    for (var i = 0; i < cartItemsname.length; i++) {
        if (cartItemsname[i].innerText == title) {
            alert("You have already added this item to cart");
            return;
        }
    }


    var cartBoxContent = `
                    <img src="${productimg}" alt="ajay" class="cart-img">
                      <div class="detain-box">
                        <div class="cart-product-title">${title}</div>
                        <div class="cart-price">${price}</div>
                        <input type="number" value="1" class="cart-quantity">
                      </div>
                    <!-- remove -->
                    <i class='bx bxs-trash-alt cart-remove'></i>
`;

    cartshopbox.innerHTML = cartBoxContent;
    cartItem.append(cartshopbox);
    cartshopbox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartshopbox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
}
// funtion _> update total
function updateTotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0]
    var cartBoxes = cartContent.getElementsByClassName('cart-box')
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i]
        var priceElement = cartBox.getElementsByClassName('cart-price')[0]
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0]
        var price = parseFloat(priceElement.innerText.replace("Rs", ""));
        var quantity = quantityElement.value
        total = total + (price * quantity);
    }
        // if price contain some cents value
        total = Math.round(total * 100) / 100;

        document.getElementsByClassName('total-price')[0].innerText = "Rs" + total;
    
}


