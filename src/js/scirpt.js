const product = [
    {
        id: 1,
        image: '../assets/images/image-waffle-desktop.jpg',
        title: 'Waffle with Berries',
        price: 6.50,
        sub:'Waffle',
    },
    {
        id: 2,
        image: '../assets/images/image-panna-cotta-desktop.jpg',
        title: 'Vanilla Panna Cotta',
        price: 6.0,
        sub:'Vanilla',
    },
    {
        id: 3,
        image: '../assets/images/image-tiramisu-desktop.jpg',
        title: 'Classic Tiramisu',
        price: 5.60,
        sub:'Tiramisu',
    },
    {
        id: 4,
        image: '../assets/images/image-meringue-desktop.jpg',
        title: 'Lemon Mernigue Pie',
        price: 4.5,
        sub:'Lemon',
    },
    {
        id: 5,
        image: '../assets/images/image-creme-brulee-desktop.jpg',
        title: 'Vanilla Bean Creme',
        price: 5.5,
        sub:'Creme',
    },
    {
        id: 6,
        image: '../assets/images/image-cake-desktop.jpg',
        title: 'Red Velet Cake',
        price: 6.5,
        sub:'Cake',
    },
    {
        id: 7,
        image: '../assets/images/image-brownie-desktop.jpg',
        title: 'Salted Carmel Bronie',
        price: 4.5,
        sub:'Bronie',
    },
    {
        id: 8,
        image: '../assets/images/image-baklava-desktop.jpg',
        title: 'Pistachio',
        price: 4,
        sub:'Psita',
    },
    {
        id: 9,
        image: '../assets/images/image-macaron-desktop.jpg',
        title: 'Macaton Mix of Five',
        price: 5,
        sub:'Macaron',
    }
];


const categories = [...new Set(product.map((item) => item))];
let i = 0;

// Render products

document.getElementById('root').innerHTML = categories.map((item) => {
    const { image, title, price,sub } = item;
    return `
        <div>
            <div class="flex mb-7">
                <img src="${image}" class="w-52 hover:border-2 border-rose-500 h-56 rounded-2xl" alt="">
                <div class="absolute mt-52 ml-12">
                    <button onclick='addtocart(${i++})' class="border rounded-full text-xs bg-white p-2 border-rose-700 hover:bg-rose-600 hover:text-white">
                        <i class="fa-solid fa-cart-shopping"></i> Add to cart
                    </button>
                </div>
            </div>
            <div class="mt-1  w-52 rounded-2xl py-1">
                <label class="sr-only"> Quantity </label>
                <div class="flex items-center ml-14 space-x-3">
                    <button type="button" class="text-black transition hover:opacity-75 border rounded-xl border-rose-600 px-2" onclick="decreaseQty(${i})">&minus;</button>
                    <span class="text-black" id="count${i}"></span>
                    <button type="button" class="text-black transition hover:opacity-75 border rounded-xl border-rose-600 px-2" onclick="increaseQty(${i})">&plus;</button>
                </div>
            </div>
            <div class="mt-1">
                <p class="font-thin text-gray-500">${sub}</p>
                <p class="font-bold text-lg">${title}</p>
                <p class="font-bold text-rose-800">$${price}</p>
            </div>
        </div>`;
}).join('');

let cart = [];

function addtocart(a) {
    const product = categories[a];
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.count++;
    } else {
        cart.push({ ...product, count: 1 });
    }
    displaycart();
}

function increaseQty(id) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.count++;
        displaycart();
    }
}

function decreaseQty(id) {
    const item = cart.find(item => item.id === id);
    if (item && item.count > 1) {
        item.count--;
        displaycart();
    }
}

function delElement(id) {
    cart = cart.filter(item => item.id !== id);
    displaycart();
}

function displaycart() {
    let total = 0;
    document.getElementById("count").innerHTML = cart.length;
    if (cart.length === 0) {
        document.getElementById('cartItem').innerHTML = "Your Cart is Empty";
        document.getElementById("total").innerHTML = "$0.00";
    } else {
        document.getElementById("cartItem").innerHTML = cart.map((item, j) => {
            const { title, price, count, id } = item;
            total += price * count;
            return `
              <div> 
                   
                <div class="flex flex-col md:flex-row md:justify-between items-center mt-3 mb-2">
                <p class="font-bold text-lg  md:text-lg mr-2 ">${title}</p>
                <i class="fa-solid fa-circle-xmark cursor-pointer text-2xl md:text-lg" onclick="delElement(${id})" style="color: #ec041b;"></i>
            </div>

                  <div class="flex flex-col md:flex-row space-x-0 md:space-x-6 mt-2">
                            <p class="text-rose-800 font-bold">Qty: ${count}x</p>
                            <p>Unit Price: $${price}</p>
                            <p>Total Price: $${(price * count).toFixed(2)}</p>
                        </div>
                    <hr class="w-full mt-1">
                </div>`;
        }).join('');
        document.getElementById("total").innerHTML = "$" + total.toFixed(2);
    }

}


function openModal() {
    const cartItemsList = document.getElementById("cartItemsList");
    cartItemsList.innerHTML = ''; // Clear previous content

   
    if (cart.length > 0) {

            // Iterate over each item and display the title, price, and count
        

        // Calculate the grand total based on price and count of each item
        const totalPrice = cart.reduce((sum, item) => sum + item.price * item.count, 0);
        const totalElement = document.createElement('div');
        totalElement.classList.add('font-semibold', 'mt-4', 'text-lg');
        totalElement.innerHTML = `
         <img src="../assets/images/icon-order-confirmed.svg" alt="" class="mb-4">
        <h2 class="text-3xl font-semibold mb-2">Order Confirmation</h2>
        <span class="text-slate-400 font-bold text-sm mb-3">We hope you enjoy your food</span>
        
        `;
        cartItemsList.appendChild(totalElement);

        cart.forEach(item => {
            const { title, price, count } = item;
            const itemElement = document.createElement('div');
            itemElement.classList.add('flex', 'justify-between', 'mb-2');

            // Display item with title, count, unit price, and subtotal
            itemElement.innerHTML = `
                <div class="">

                  <div class="flex justify-between items-center border-b pb-2 space-x-24">
                     <span class="text-gray-800 font-medium">${title}</span>
                    <span class="text-gray-500">(${count}x)</span>
                   
                    <span class="text-gray-900 font-semibold ml-4">$${(price * count).toFixed(2)}</span> <!-- Added margin-left -->
                  </div>
                   
               
                </div>
                
            `;

            cartItemsList.appendChild(itemElement);
          
        });
  

            
    }
    
    else {
        // If the cart is empty, show a message
        cartItemsList.innerHTML = '<p class="text-center text-gray-500">Your cart is empty Please place an order.</p>';
    }


    // Show the modal
    document.getElementById("orderConfirmationModal").classList.remove("hidden");
}


function closeModal() {
    document.getElementById("orderConfirmationModal").classList.add("hidden");
}

function redirectToHomepage() {
    window.location.href = "index.html";  // Customize URL as needed
}