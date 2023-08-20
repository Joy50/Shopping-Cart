let totalPrice = 0

class UI{
    static showAlert(message,className) {
        const alertContainer = document.querySelector('.alert-container');
        const alertDiv = document.createElement('div');
        alertDiv.classList.add('alert', className, 'mb-3');
        alertDiv.textContent = message;
        alertContainer.appendChild(alertDiv);

        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    }
    static loadProductList(product){
        let productList = document.querySelector('#product-list')
        let row = document.createElement("div")
        row.innerHTML = 
        `
        <div class="card mb-3">
            <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text">Taka ${product.price}</p>
                <input type="submit" id="addBtn" class="btn btn-primary" value="Add to cart">
            </div>
        </div>
        `
        productList.appendChild(row)
    }
    static addCartItem(product){
        let cartList = document.querySelector("#cart-list")
        let row = document.createElement("div")
        row.innerHTML = 
        `
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">${product.price}</p>
                    <a href="#" class="removeBtn btn btn-danger">Remove</a>
                </div>
            </div>
        `
        cartList.appendChild(row)
    }

    static removeFromCart(cart){
        cart.remove()
    }
}

class Product{
    constructor(title,price){
        this.title = title
        this.price = price
    }
}

const products = [
    new Product("Learn Python in the heard way",550),
    new Product("Head fast C",1050),
    new Product("Art of panitration testing",2000),
]

class Cart{
    constructor(title,price){
        this.title = title
        this.price = price
    }
}


document.addEventListener('DOMContentLoaded',()=>{
    products.forEach(product=>{
        UI.loadProductList(product)
    })
    let addBtns = document.querySelectorAll("#addBtn")
    addBtns.forEach((addBtn,index)=>{
        addBtn.addEventListener('click',(event)=>{
            event.preventDefault()
            let productTitle = addBtn.previousSibling.previousSibling.previousSibling.previousSibling.textContent
            let productPrice = addBtn.previousSibling.previousSibling.textContent
            let cartItem = new Cart(productTitle,productPrice)
            UI.showAlert(`${productTitle}" added to cart!`,"alert-success");
            UI.addCartItem(cartItem)
        })
    })

    let cartList = document.querySelectorAll("#cart-list")
    cartList.forEach((cartItem,index)=>{
        cartItem.addEventListener("click",(event)=>{
            event.preventDefault()
            if(event.target.classList.contains("removeBtn")){
                let removedCart = event.target.closest(".card");
                UI.removeFromCart(removedCart)
                UI.showAlert("Item is removed from cart","alert-danger")
            }
        })
    })
})