const RECIPE_COMPLEX_URL =
    "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex";


let recipes = [];

$(function () {
    $('.js-search-form').submit(function (event) {
        event.preventDefault();
        var searchTerm = $(this).find('.js-query').val();
        getRequest(searchTerm);
    });

    $('.cuisine').click(function (event) {
        event.preventDefault();
        var cuisine = $(this).text();
        console.log(cuisine);
        getRequest("", cuisine);
    });



});

function getRequest(term, cuisine) {
    let queryObject = {
        cuisine: cuisine || "",
        diet: "",
        intolerances: [],
        fillIngredients: true,
        instructionsRequired: true,
        addRecipeInformation: true,
        query: term  || "",
        offset: 0
    };
    const ajaxSettings = {
        url: RECIPE_COMPLEX_URL,
        data: queryObject,
        headers: {
            "X-Mashape-Key": "IUGi5Z89cemshooIekxfGjDuG9dgp1Vbya9jsniIa76bJFYNXx",
            "X-Mashape-Host": "spoonacular-recipe-food-nutrition-v1.p.mashape.com"
        },
        dataType: "json",
        type: "GET",
        success: displayRecipeSearchData,
        error: function (err) {
            console.log(err);
        }
    };
    $.ajax(ajaxSettings);
}




function displayRecipeSearchData(data) {
    recipes = data.results;
    const results = recipes.map((item, index) => renderResult(item, index));
    $(".search-results").html(results);
}

function renderResult(result, index) {
    console.log(result)
    const ingredients = result.missedIngredients.map((item, index) => item.name);
    return `
  <div data-index="${index}" class="result">
  <h2 class="result-title "><span class="highlight">
  <a href="${result.id}">${result.title}</a></span></h2>
  <div class="image-container-2">
  <img src=${
        result.image
        } alt="search result image" class="result-image">
        <br><span class="imgCredit"><span class="creditSmall">Image ©&nbsp;</span><a href="${result.sourceUrl}">${result.sourceName}</a></span>
  </div>

  <div class="info-container">
  <p><span class="info-label">Cuisine:</span><br> ${result.cuisines.join(
            ", "
        )}</p>
  <p><span class="info-label">Diet:</span><br> ${result.diets.join(
            ", "
        )}</p>
  <p class="ingredients"><span class="info-label">Ingredients:</span><br> ${ingredients.join(
            ", "
        )}</p>
  <p class="readyInMinutes"><span class="info-label">Ready in:</span> ${
        result.readyInMinutes
        } min.</p>
  </div>
  <div class="clear"></div>
  <hr>
  </div>
  `;
}


$(".img2").show();
$(".img3").show();
$(".img4").show();



$(".blackbox").show();
$(".blackbox").hide();

// More requests to API.
// function displayMainImg(data) {
//     const img1 = true;
//     let term = "vegan";
//    getRequest(term)
//    const recipes = data.results;
//
// }
