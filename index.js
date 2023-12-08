import { menuArray } from './data.js'
let orderList = []

let id = 0
let fullName = ''

const modalEl = document.getElementById("modal")
const payBtn = document.getElementById("pay-btn")
const compeleteOrderBtn = document.getElementById("compelete-order-btn")
const modalForm = document.getElementById("modal-form")




compeleteOrderBtn.addEventListener("click", function() {
    modalEl.style.display = "inline"
    document.body.style.backgroundColor = "orange";
})

modalForm.addEventListener("submit", function(e) {
    e.preventDefault()
    orderList.length = 0
    const modalFormData = new FormData(modalForm)
    fullName = modalFormData.get("fullName")
    
    modalEl.style.display = "none"
    document.getElementById("order").style.display = "none"
    document.getElementById("thanking-message").style.display = "block"
    setTimeout( ()=> document.getElementById("thanking-message").style.display = "none",3000)
    render()
    document.body.style.backgroundColor = "#fff";
})

document.addEventListener("click", function(e){
    if(e.target.dataset.add) {
        handleAddBtn(e.target.dataset.add)
        document.getElementById("order").style.display = "block"
    }
    else if(e.target.dataset.remove) {
        handleRemoveBtn(e.target.dataset.remove)
    }
})

function handleAddBtn(itemId) {
    const itemObj = menuArray.filter(function(choosenItem){
        return choosenItem.id === itemId
    })[0]
    orderList.push(itemObj)
    render()
}

function handleRemoveBtn(removedIndex){
    orderList.splice(removedIndex, 1)
    render()
}


function getTheOrder() {    
    let choosenOrder = ''

    orderList.forEach(function(orderItem){
        choosenOrder += `
    <div class="order-list">
        <div class="inner-order-list">
            <h2>${orderItem.name}</h2>
            <button class="remove-btn" data-remove="${orderList.indexOf(orderItem)}">remove</button>
        </div>
        <h2>$${orderItem.price}</h2>
    </div> 
        `
    })
    return choosenOrder
}

function getTotalPrice() {
    let totalPriceHtml = ''
    
    let totalPrice = 0
    orderList.forEach(function(orderItem){
        totalPrice += orderItem.price
    })
    
    totalPriceHtml = `<div class="inner-total-price">
                <h2>Total price:</h2>
                <h2>$${totalPrice}</h2>
                </div>`
    return totalPriceHtml
}


function getDinerMenu() {
    let dinerMenu = ''
    menuArray.forEach(function(choosenItem){
        dinerMenu += `<section class="container">
                <div id="main-container" class="main-container">
                    <div id="inner-main-container" class="inner-main-container">
                        <div class="wrapper-item">
                            <i class="icon">${choosenItem.emoji}</i>
                            <div class="item-details">
                                <h2 class="item-name">${choosenItem.name}</h2>
                                <P class="item-ingredients">${choosenItem.ingredients}</P>
                                <h3 class="item-price">$${choosenItem.price}</h3>
                            </div>
                        </div>
                        <button class="add-button" data-add="${choosenItem.id}">+</button>
                    </div>
                </div>
            </section>`
    })
    return dinerMenu   
}

function render() {
    // console.log(getTheOrder())
    if(orderList.length === 0) {
        document.getElementById("order").style.display = "none"
    }
    document.getElementById("menu").innerHTML = getDinerMenu()
    document.getElementById("the-order").innerHTML = getTheOrder()
    document.getElementById("total-price").innerHTML = getTotalPrice()
    document.getElementById("thanking-inner").innerHTML = ThankingMessage()  

}
render()

function ThankingMessage() {
    return `<p>Thanks, ${fullName}! your order is on it way</p>`     
}
