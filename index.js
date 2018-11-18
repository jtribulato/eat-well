const RECIPE_COMPLEX_URL =
"https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex";


let recipes = [];
let state={
  showDropdown:false
};


$(function () {
  $('.js-search-form').submit(function (event) {
    event.preventDefault();
    var searchTerm = $(this).find('.js-query').val();
    getRequest(searchTerm);
  });

  $('.diet').click(function (event) {
    event.preventDefault();
    $('.dropdown-box-diet').hide();
    var diet = $(this).text();
    getRequest(diet);
  });


  $('.diet-link').click(function (event) {
    event.preventDefault();
    if(state.showDropdown){
      $('.dropdown-box-diet').hide();
    }else{
      $('.dropdown-box-diet').show();
    }
    console.log(state.showDropdown);
    state.showDropdown=!state.showDropdown;
  });




});




function getRequest(term, cuisine) {
  $('#landing-page').hide();
  $('#results-page').show();
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
  console.log(data.results);
  const results = recipes.map((item, index) => renderResult(item, index));
  $(".search-results").html(results);  // shows just the first result => results[0]
  
}



function renderResult(result, index) {
  const ingredients = result.missedIngredients.map((item, index) => item.name);
  let classname = '';
  if (index % 2 === 0) {  
      classname = 'gray'; 
    } else {
      classname = 'none';
  };
  return `
  <section class="temp ${classname}">  
  <div class="section-container">
  <div data-index="${index}" class="result">
  <h2 class=""><span class="highlight">
  <a class="result-title" href="${result.sourceUrl}" target="_blank">${result.title}</a></span></h2>

  <div class="image-container-2">
  <img src=${result.image} alt="${result.title}" class="result-image img left">
  <div class="clear-left"></div>
  <div><span class="creditSmall textBold">Photo Credit:</span> <a class="imgCredit creditSmall" href="${result.sourceUrl}" alt="link to recipe">${result.creditsText}</a></div>
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
