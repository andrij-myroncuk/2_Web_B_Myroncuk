let input = document.getElementById('search');
let datalist = document.getElementById('charlist');

window.addEventListener('load', async function(){
    const response = await fetch('https://thronesapi.com/api/v2/Characters')
    const data = await response.json();
    for(let char of data) {
        let option = this.document.createElement('option')
        option.innerHTML = char.fullName;
        datalist.appendChild(option);
        this.window.sessionStorage.setItem(char.fullName,char.id)
    }
});

input.addEventListener('keydown', async function(e){
if(e.key == "Enter"){
    if(window.sessionStorage.getItem(input.value)){
        const response = await fetch(`https://thronesapi.com/api/v2/Characters/${window.sessionStorage.getItem(input.value)}`)
        const data = await response.json();
        let img = document.createElement('img');
        img.src = data.imageUrl;
        img.style.height = "150px";
        document.body.append(img);
    }
}
})