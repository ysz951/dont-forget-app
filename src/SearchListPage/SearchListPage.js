import React, { Component } from 'react';
import RecipeListContext from '../context/RecipeListContext';
import RecipeApiService from '../services/recipe-api-service';
import SearchNav from '../SearchNav/SearchNav';
import RecipeList from '../RecipeList/RecipeList';
import './SearchListPage.css';
export default class SearchListPage extends Component {
  static contextType = RecipeListContext;
  componentDidMount() {
    const { query } = this.props;
    RecipeApiService.getSearchRecipes(query)
      .then(this.context.setRecipeList)
      .catch(this.context.setError)
  }
  
  render() {
    const { recipeList = [], error } = this.context;
    const {query} = this.props;
    return (
      <section>
          <div role='alert'>
            {error && <p className='red'>{error}</p>}
          </div>
          <SearchNav history={this.props.history}/>
          {query && (<p className="Search_query">{recipeList.length} Results for "<span className="italic">{query}</span>"</p>)}
          <RecipeList recipes = {recipeList} history={this.props.history}/>
      </section>
    );
  }
}
