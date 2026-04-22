let ulUsers = document.getElementById('users');
let img = document.createElement('img');
let newUser = document.getElementById('newUser');
let formInputs = document.querySelectorAll('#newUser input');

window.addEventListener('load', load);

async function load()
{
    const response = await fetch('https://69cb799b0b417a19e07ab828.mockapi.io/api/test/test_data');
    const users = await response.json();
    for(let user of users)
    {
        let item = document.createElement('li');
        item.addEventListener('click', function() {
            img.src = user.avatar;
            document.body.appendChild(img)
        })
        item.addEventListener('dblclick',function(){
            img.src = null;
            
        })
        item.innerHTML = user.name;
        ulUsers.appendChild(item);
    }
};

newUser.addEventListener('submit', async function(e) {
    e.preventDefault();

    const response = fetch('https://69cb799b0b417a19e07ab828.mockapi.io/api/test/test_data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: formInputs[0].value,
            avatar: formInputs[1].value,
            address: formInputs[2].value,
        })
    });
    for (let i = 0; i < formInputs.length; i++) {
        formInputs[i].value = null;
    }
    const data = response.json();
    load();
})


//Na doubleclick na jméno ze seznamu se daný objekt smaže z databáze

//Přidej druhý formulář, když se klikne na jméno, tak se data z daného prvku načtou do formuláře a při potvrzení se pošle na dané ID PUT
//Tzn. vybereš usera v seznamu a změníš údaje na jeho id