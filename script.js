let total = 0;
let count = 0;

function changePrice(select, priceId) {
    document.getElementById(priceId).innerText = select.value;
}

function customCakeEnquiry() {
    let occasion = document.getElementById("cakeOccasion").value;
    alert("Thank you! We will contact you for a " + occasion + " cake.");
}

function addToCart(item, btn) {
    let card = btn.parentElement;

    // Get selected flavour text
    let flavour = card.querySelector("select").selectedOptions[0].text;

    // Get price
    let price = parseInt(card.querySelector("span").innerText);

    let li = document.createElement("li");
    li.innerHTML = `
    <span class="cart-text">${flavour} ${item} - ₹${price}</span>
    <button class="remove-btn" onclick="removeItem(this, ${price})">✖</button>
`;

    document.getElementById("cartItems").appendChild(li);

    total += price;
    count++;

    document.getElementById("totalPrice").innerText = total;
    document.getElementById("cartCount").innerText = count;

    // Pass full name to toast
    showToast(flavour + " " + item);
}

function updateCartUI() {
    const cartItemsDiv = document.getElementById("cartItems");
    const totalDiv = document.getElementById("cartTotal");

    cartItemsDiv.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        cartItemsDiv.innerHTML += `
            <div class="cart-item">
                <span>${item.name} - ₹${item.price}</span>
                <button onclick="removeFromCart(${index})">✖</button>
            </div>
        `;
    });

    totalDiv.textContent = `₹${total}`;
}

function showToast(fullItemName) {
    let toast = document.getElementById("toast");
    toast.innerText = "✔ " + fullItemName + " added to cart";
    toast.style.display = "block";

    setTimeout(() => {
        toast.style.display = "none";
    }, 1500);
}


function removeItem(button, price) {
    button.parentElement.remove();

    total -= price;
    count--;

    document.getElementById("totalPrice").innerText = total;
    document.getElementById("cartCount").innerText = count;
}

function clearCart() {
    document.getElementById("cartItems").innerHTML = "";
    total = 0;
    count = 0;
    document.getElementById("totalPrice").innerText = 0;
    document.getElementById("cartCount").innerText = 0;
}

function toggleCart() {
    let cart = document.getElementById("cartBox");

    if (cart.style.display === "block") {
        cart.style.display = "none";
    } else {
        cart.style.display = "block";
    }
}


document.addEventListener("click", function (event) {
    let cart = document.getElementById("cartBox");
    let cartIcon = document.querySelector(".cart-icon");

    if (
        cart.style.display === "block" &&
        !cart.contains(event.target) &&
        !cartIcon.contains(event.target)
    ) {
        cart.style.display = "none";
    }
});

function saveFeedback() {
    let feedback = document.getElementById("feedbackText").value;

    if (feedback.trim() === "") {
        alert("Please write some feedback before saving.");
        return;
    }

    // Create text file
    let blob = new Blob([feedback], { type: "text/plain" });

    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "feedback.txt";

    link.click();

    document.getElementById("feedbackText").value = "";
}
