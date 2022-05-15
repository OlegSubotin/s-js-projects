const URL = "https://api.github.com/users/";

const wrapperEl = document.querySelector(".wrapper");
const formEl = document.getElementById("form");
const inputEl = document.getElementById("input");

pushFetch('OlegSubotin');

async function pushFetch(user) {
    const response = await fetch(URL + user);
    const responseData = await response.json();
    console.log(responseData)
    renderUserCard(responseData);
};

function renderUserCard(data) {
    wrapperEl.innerHTML = '';
          const userCard = document.createElement('div');
    userCard.classList.add('card');
    userCard.innerHTML = `
        <div class="img-wrapper">
            <img class="image" src="${data.avatar_url}" alt="name" width="130" height="130">
        </div>
        <div class="info-wrapper">
            <p class="text">Name: ${data.name}</p>
            <p class="text">Profile:
            <a target="blank" style="color:#fff; cursor:pointer; text-decoration:underline;" href="${data.html_url}">
             link</a>
            </p>
            <p class="text">Public repos: ${data.public_repos}</p>
        </div>
    `;
    wrapperEl.appendChild(userCard);  
};

formEl.addEventListener('submit', onInputSubmit);

function onInputSubmit() {
    let user = inputEl.value.trim();
    if (!user) {
        alert('Please, put a user name')
    } else {
        pushFetch(user);
    }
};