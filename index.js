const RECIPE_COMPLEX_URL =
    "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex";


let recipes = [];



console.log("Hi")

$(function () {
    $('.js-search-form').submit(function (event) {
        event.preventDefault();
        var searchTerm = $(this).find('.js-query').val();
        getRequest(searchTerm);
        console.log("Hi")
        $('#landing-page').hide();
        $('#results-page').show();

    });

    $('.diet-link').click(function (event) {
        event.preventDefault();
        $('.dropdown-box-diet').show();
    });

    $('.diet').click(function (event) {
        event.preventDefault();
        var diet = $(this).text();
        getRequest(diet);

    });
});




function getRequest(term, cuisine) {
    $('.dropdown-box-diet').hide();
    $('.spinner').show();
    let queryObject = {
        cuisine: cuisine || "",
        diet: "",
        intolerances: [],
        fillIngredients: true,
        instructionsRequired: true,
        addRecipeInformation: true,
        query: term || "",
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
            $('.spinner').hide();
            console.log(err);
        }
    };
    $.ajax(ajaxSettings);
}

function displayRecipeSearchData(data) {
    $('.spinner').hide();
    recipes = data.results;
    const results = recipes.map((item, index) => renderResult(item, index));
    $(".search-results").html(results);  // shows just the first result [0]
}




function renderResult(result, index) {
    const ingredients = result.missedIngredients.map((item, index) => item.name);
    return `
     <section>
        <div class="section-container">
            <div data-index="${index}" class="result">
                <h2 class="result-title "><span class="highlight">
                <a href="${result.id}">${result.title}</a></span></h2>

                <div class="image-container-2">
                <img src=${result.image} alt="search result image" class="result-image img left">
                </div>


                <div class="text right">
                    <div class="info-container">
                 <!-- <p><span class="info-label cuisine">Cuisine:</span><br> ${result.cuisines.join(
             ", "
         )}</p> -->
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
                </div>
            </div>
        </div>
        <div class="clear"></div>
    </section>

     `;
};
