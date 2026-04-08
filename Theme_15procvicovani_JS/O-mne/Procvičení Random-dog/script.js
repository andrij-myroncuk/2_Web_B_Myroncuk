const PressMe = document.getElementById("btn");
const fotka = document.getElementById("photo");

function loadDog() {
    fetch("https://dog.ceo/api/breeds/image/random")
        .then(response => response.json())
        .then(data => {
            fotka.src = data.message;
        });
}

PressMe.addEventListener("click", loadDog);
