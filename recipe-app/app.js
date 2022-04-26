const suggestSectionEl = document.getElementById('suggest-meal');
const favoriteListEl = document.getElementById('favorite-list');
const inputEl = document.getElementById('input');
const searchBtn = document.getElementById('search-btn');
const popupEl = document.getElementById('popup');
const mealInfoEl = document.getElementById('meal-info');
const popupMealDescription = document.getElementById('popup-meal-description');
const popupCloseBtn = document.getElementById('popup-clear-btn');

getRandomMeal();
fetchFavoriteMeals();

async function getRandomMeal() {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const responseData = await response.json();
    const randomMeal = responseData.meals[0];
    // console.log(randomMeal);
    
    loadRandomMeal(randomMeal, true);
};

async function getMealById(id) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    const responseData = await response.json();
    const mealById = responseData.meals[0];
    return mealById;
};

async function getMealBySearch(name) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    const responseData = await response.json();
    const searchedMeals = await responseData.meals;
    return searchedMeals;
}


function loadRandomMeal(mealData, random = false) {
    const meal = document.createElement('div');
    meal.classList.add('meal');

    meal.innerHTML = `${random ? `<p class="title">Suggest meal</p>` : ``}   
            <img class="suggest-image" src="${mealData.strMealThumb}" alt="${mealData.strMeal}" width=380 height=220>
            <div class="suggest-section-text">
            <h3 class="meal-name">${mealData.strMeal}</h3>
            <button class="heart-btn" id="heart-btn">
                <svg class="heart-icon" width="16" height="16">
                    <use href="img/sprite.svg#icon-heart"></use>
                </svg>
            </button>
            </div>
    `;

    const btn = meal.querySelector('.suggest-section-text .heart-btn');

    btn.addEventListener('click', onHeartBtnClick);

    function onHeartBtnClick() {
        if (btn.classList.contains('active')) {
            removeMealLocalStorage(mealData.idMeal);
            btn.classList.remove('active');
        } else {
            addMealLocalStorage(mealData.idMeal);
            btn.classList.add('active');
        }     
        fetchFavoriteMeals();
    };

    meal.addEventListener('click', () => showMealInfo(mealData));

    suggestSectionEl.appendChild(meal)
};

function addMealLocalStorage(mealId) {
    const mealIds = getMealsLocalStorage();
    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]));
};

function removeMealLocalStorage(mealId) {
    const mealIds = getMealsLocalStorage();
    localStorage.setItem('mealIds', JSON.stringify(mealIds.filter(id=>id!==mealId)));
};

function getMealsLocalStorage() {
    const mealIds = JSON.parse(localStorage.getItem("mealIds"));
    return mealIds === null ? [] : mealIds;
};

async function fetchFavoriteMeals() {
    favoriteListEl.innerHTML = '';
    
    const mealIds = getMealsLocalStorage();

    for (let i = 0; i < mealIds.length; i += 1){
        const mealId = mealIds[i];
         meal = await getMealById(mealId);
        addMealFavorite(meal);
    };
};

function addMealFavorite(mealData) {
    const favMeal = document.createElement('li');
    favMeal.classList.add('item');

    favMeal.innerHTML = `
    <img src="${mealData.strMealThumb}" class="image" alt="${mealData.strMeal}" width=70 height=70>
    <span class="meal-description" id="meal-description">${mealData.strMeal}</span>
    <button class="btn-clear" id="clear-btn">
                <svg class="clear-icon" width="12" height="12">
                    <use href="img/sprite.svg#icon-cross"></use>
                </svg>
    </button>
    `;

    const btn = favMeal.querySelector('.btn-clear');

    btn.addEventListener('click', onClearBtnClick);

    function onClearBtnClick() {
        removeMealLocalStorage(mealData.idMeal);
        fetchFavoriteMeals();
    }

    favMeal.addEventListener('click', () => showMealInfo(mealData));

    favoriteListEl.appendChild(favMeal);
};

searchBtn.addEventListener('click', onSearchBtnClick);

async function onSearchBtnClick() {
    suggestSectionEl.innerHTML = '';
    const search = inputEl.value;
    
    const meals = await getMealBySearch(search);

    if (meals) {
        meals.forEach(meal =>loadRandomMeal(meal));
    };
};

function showMealInfo(mealData) {
    popupMealDescription.innerHTML = '';

    const mealEl = document.createElement('div');
    mealEl.classList.add('meal-info');

    let ingredients = [];

    for (let i = 1; i <=20; i += 1){
        if (mealData["strIngredient" + i]) {
            ingredients.push(
                `${mealData["strIngredient" + i]}/
                ${mealData["strMeasure" + i]}`
            );
        } else {
            break;
        };
    };

    mealEl.innerHTML = `
    <h3>${mealData.strMeal}</h3>
                    
                <img class="popup-image" src="${mealData.strMealThumb}" width=500 height=380 alt="${mealData.strMeal}">
                <p>${mealData.strInstructions}</p>
                
                <h3>Ingredients:</h3>
                <ul style="display:block;">
                ${ingredients.map(ingredient => `
                <li>${ingredient}</li>
                `).join("")}
                </ul>
            
        `

    popupMealDescription.appendChild(mealEl);
    popupEl.classList.remove('hidden');

};

popupCloseBtn.addEventListener("click", () => {
    popupEl.classList.add("hidden");
});
    
