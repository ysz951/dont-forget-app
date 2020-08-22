import React, { Component } from 'react';
import RecipeListContext from '../context/RecipeListContext';
import RecipeApiService from '../services/recipe-api-service';
import SearchNav from '../SearchNav/SearchNav';
import RecipeList from '../RecipeList/RecipeList';
import './CategoryListPage.css';
export default class CategoryListPage extends Component {
  static contextType = RecipeListContext;
  componentDidMount() {
    const { categoryId } = this.props;
    RecipeApiService.getCategoryRecipes(categoryId)
      .then(this.context.setRecipeList)
      .catch(this.context.setError);
  }
  render() {
    const { recipeList = [], error } = this.context;
    const {categoryId} = this.props;
    const selectedCategory = 
      (this.context.categoryList || [])
      .find(category => Number(category.id) === Number(categoryId));
    return (
      <section>
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <SearchNav history={this.props.history}/>
        { selectedCategory && selectedCategory.name && 
        (<p className="selectedCategory italic">"{selectedCategory.name}"</p>)}
        <RecipeList recipes = {recipeList} history={this.props.history}/>
      </section>
    );
  }
}
