import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView';
import bookmarkView from './views/bookmarkView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';
console.log(icons);
const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const getRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    console.log(id);
    recipeView.renderSpinner();
    await model.loadRecipe(id);
    const recipe = { ...model.state.recipe };
    console.log(recipe);
    resultsView.updateNewServings(
      model.getSearchResultsPage(model.state.search.page)
    );

    recipeView.render(model.state.recipe);

    // recipeView.updateNewServings(model.state.recipe);
  } catch (err) {
    recipeView.renderError(err);
  }
};
console.log('test');
const controlSearchResults = async function () {
  try {
    model.state.search.page = 1;
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    console.log(query);
    if (!query) return;
    await model.loadSearchResults(query);
    searchView.clearInput();
    console.log(model.state.search.results);
    resultsView.render(model.getSearchResultsPage(model.state.search.page));
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
const controlPagination = function (gotopage) {
  resultsView.render(model.getSearchResultsPage(gotopage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);
  // recipeView.render(model.state.recipe);
  recipeView.updateNewServings(model.state.recipe);
};
const controlAddBookmark = function () {
  console.log(model.state.recipe.bookmarked);
  if (
    model.state.recipe.bookmarked == false ||
    model.state.recipe.bookmarked == undefined
  ) {
    model.addBookmark(model.state.recipe);
    console.log(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  bookmarkView.render(model.state.bookmarks);
  recipeView.updateNewServings(model.state.recipe);
};
const controlAddRecipe = async function (newRecipe) {
  try {
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);
    recipeView.render(model.state.recipe);
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // setTimeout(function () {
    //   addRecipeView.toggleWindow();
    // }, 2500);
  } catch (err) {
    console.log(err);
    addRecipeView.renderError(err);
  }
};
const init = function () {
  bookmarkView.render(model.state.bookmarks);

  recipeView.addHandlerRenderer(getRecipe);
  recipeView.addhandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
