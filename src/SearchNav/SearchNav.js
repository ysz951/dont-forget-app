import React, { Component } from 'react';
import RecipeListContext from '../context/RecipeListContext';
import RecipeApiService from '../services/recipe-api-service';
import CategoryLink from '../CategoryLink/CategoryLink';
import CategoryLinkSpread from '../CategoryLinkSpread/CategoryLinkSpread';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './SearchNav.css';
export default class SearchNav extends Component {
  state = { 
    query: "",
    searchCategory: "",
  };
  static contextType = RecipeListContext;
  updateQuery(query){
      this.setState({query});
  }
  handleSubmit = e => {
      e.preventDefault();
      const {history} = this.props;
      history.push(this.state.query ? `/search/${this.state.query}` : '/main');
  }
  componentDidMount() {
    this.context.clearError();
    RecipeApiService.getCategories()
      .then(this.context.setCategoryList)
      .catch(this.context.setError)
  }

  render() {
    const {categoryList = []} = this.context;
    return (
      <div className="SearchNav">
        <div className="SearchNav_group">
          <CategoryLink categories={categoryList}/>
          <CategoryLinkSpread categories={categoryList}/>
          <form className="SearchForm" onSubmit={this.handleSubmit}>
            <input
              id="SearchForm_search"
              className="SearchForm_input"
              name="SearchForm_search"
              placeholder="Search recipes"
              onKeyUp={e => this.updateQuery(e.target.value)}
              type="text"
            />
            <button className="SearchNav_btn" type="submit"><FontAwesomeIcon icon="search"/></button>
          </form>
        </div>
      </div>
    );
  }
}

