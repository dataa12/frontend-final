const form = document.getElementById('form')
const modal = document.getElementById('myModal')
const btn = document.querySelector('.loginBtn')
const btnMobile = document.querySelector('.loginBtnMobile')
const span = document.getElementById('close')

const email = document.getElementById('email')
const password = document.getElementById('password')
const mobile = document.getElementById('mobile-number')
const login = document.getElementById('login')
const emailError = document.querySelector('.email-error');
const mobileError = document.querySelector('.mobile-number-error');
const passwordError = document.querySelector('.password-error');

btn.onclick = function(){
    modal.style.display = "block";
}

btnMobile.onclick = function(){
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event){
    if(event.target == modal){
        modal.style.display = 'none'
    }
}

function validateForm(event) {
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const mobileValue = mobile.value.trim(); 

    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const mobileRegex = /^5\d{8}$/;

    let isValid = true;

    if (!emailRegex.test(emailValue)) {
        emailError.textContent = "Email must end with 'gmai.com'";
        isValid = false;
    } else {
        emailError.textContent = "";
    }

    if (!mobileRegex.test(mobileValue)) {
        mobileError.textContent = "Mobile number must start with '5' and be 9 digits long";
        isValid = false;
    } else {
        mobileError.textContent = "";
    }

    if (passwordValue.length < 8) {
        passwordError.textContent = "Password must be at least 8 characters long";
        isValid = false;
    } else {
        passwordError.textContent = "";
    }

    if (isValid) {
        modal.style.display = 'none';
        document.querySelector("form").reset();
    }
}

form.addEventListener('submit', event => {
    event.preventDefault()
    emailError.textContent = "";
    passwordError.textContent = "";
    validateForm();

 
})

document.addEventListener("DOMContentLoaded", () => {
    const apiURL = "https://reqres.in/api/users?page=2";
    const itemsList = document.getElementById("items-list");

    async function fetchTopSellers() {
        try {
            const response = await fetch(apiURL);
            const data = await response.json();

            itemsList.innerHTML = "";

            data.data.forEach((user, index) => {
                const itemCard = document.createElement("div");
                itemCard.classList.add("item");

                itemCard.innerHTML = `
                    <h6>${index + 1}. </h6>
                    <img src="${user.avatar}" alt="author image">
                    <p>${user.first_name} ${user.last_name} <br>
                    <small>${(Math.random() * 10).toFixed(1)} ETH or ${(Math.random() * 15000).toFixed(0)}$</small>
                    </p>
                `;

                itemsList.appendChild(itemCard);
            });

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    fetchTopSellers();
});

function toggleMenu() {
    const mobileMenu = document.getElementById("mobileMenu");
    mobileMenu.classList.toggle("active");
}

document.getElementById("togglePassword").addEventListener("click", function () {
    const passwordField = document.getElementById("password");
    if (passwordField.type === "password") {
        passwordField.type = "text";
        this.classList.remove("fa-eye");
        this.classList.add("fa-eye-slash"); 
    } else {
        passwordField.type = "password";
        this.classList.remove("fa-eye-slash");
        this.classList.add("fa-eye"); 
    }
});