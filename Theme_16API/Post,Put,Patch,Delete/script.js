let inputName = document.getElementById('name');
let txtData = document.getElementById('data');
let btnPost = document.getElementById('post');
let btnPut = document.getElementById('put');
let btnPatch = document.getElementById('patch');
let btnDel = document.getElementById('delete');

async function Post() {
    const response = await fetch('https://api.restful-api.dev/objects',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: inputName.value,
            data: txtData.value
        })
    });
    const data = await response.json();
    inputName.value = null;
    txtData.value = null;
    console.log(data);
    sessionStorage.setItem('objektID', data.id);
}


async function Put() {
    const response = await fetch(`https://api.restful-api.dev/objects/${sessionStorage.getItem('objektID')}`,{
        method: 'Put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: inputName.value,
            data: txtData.value
        })
    });
    const data = await response.json();
    inputName.value = null;
    txtData.value = null;
    console.log(data);
}


btnPut.addEventListener('click',Put);
btnPost.addEventListener('click',Post);