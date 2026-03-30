let LT = document.getElementsByClassName('light-theme');
let DT = document.getElementsByClassName('dark-theme');

let btnTheme = document.getElementById('theme-toggle');
let bar = document.getElementById('theme-status');

btnTheme.addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    bar.textContent = "Current Theme: Dark"
}
)

