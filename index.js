const RECIPE_COMPLEX_URL =
    "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex";


let recipes = [];

$(function () {
    $('.js-search-form').submit(function (event) {
        event.preventDefault();
        var searchTerm = $(this).find('.js-query').val();
        getRequest(searchTerm);
    });
});

function getRequest(term) {
    let queryObject = {
        cuisine: "american",
        diet: "",
        intolerances: [],
        fillIngredients: true,
        instructionsRequired: true,
        addRecipeInformation: true,
        query: term,
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

    // let title = recipes[0].title;
    // $('.titleH2').html(`${title}`);
}

function renderResult(result, index) {
    console.log(result)
    const ingredients = result.missedIngredients.map((item, index) => item.name);
    return `
  <div data-index="${index}" class="result">
  <h2 class="result-title"><a href="${result.id}">${result.title}</a></h2>
  <div class="image-container-2">
  <img src=${
        result.image
        } alt="search result image" class="result-image">
        <br><span class="imgCredit"><span class="creditSmall">Credit:&nbsp;&nbsp;</span><a href="${result.sourceUrl}">${result.sourceName}</a></span>
  </div>
  
  


  <div class="info-container">
  <p><span class="info-label">Cuisine:</span><br> ${result.cuisines.join(
            ", "
        )}</p>
  <p><span class="info-label">Diet:</span><br> ${result.diets.join(
            ", "
        )}</p>
  <p><span class="info-label">Ingredients:</span><br> ${ingredients.join(
            ", "
        )}</p>
  <p><span class="info-label">Ready in:</span> ${
        result.readyInMinutes
        } min.</p>
  </div>
  <div class="clear"></div>
  <hr>
  </div>
  `;
}







$(".blackbox").show();
$(".blackbox").hide();


// sourceName: "Will Cook for Smiles"
//   sourceUrl: "http://willcookforsmiles.com/2013/07/avocado-cupcakes.html"
//   spoonacularScore: 26
//   spoonacularSourceUrl: "https://spoonacular.com/avocado-cupcakes-554001"


// $.ajax({
//   url:"wiki",
//   //more stuff
//   success:showWikis
// })
// $.ajax({
//   url:"yt",
//   //more stuff
//   success:showYt
// })
// $.ajax({
//   url:"recipes",
//   //more stuff
//   success:showRecipes
// })

// showRecipes(data){
//   console.log(data)
//   data.recipes.map(recipe => renderRecipe(recipe))
// }

// showWikis(data){

// };

// showYt(data){

// };
