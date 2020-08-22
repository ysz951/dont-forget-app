import React, { Component } from 'react';
import RecipeContext, { nullRecipe } from '../context/RecipeContext';
import {format} from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RecipeApiService from '../services/recipe-api-service';
import CommentForm from '../CommentForm/CommentForm';
import RecipeComments from '../RecipeComments/RecipeComments';
import RecipeTitle from '../RecipeTitle/RecipeTitle';
import './RecipePage.css';

export default class RecipePage extends Component {
  static contextType = RecipeContext;
  componentDidMount() {
    const { recipeId } = this.props;
    this.context.clearError();
    RecipeApiService.getRecipe(recipeId)
      .then(this.context.setRecipe)
      .catch(this.context.setError)
  }
  componentWillUnmount() {
    this.context.clearRecipe();
  }
  
  updateCommentNumber = () => {
    const { recipeId } = this.props;
    this.context.clearError();
    RecipeApiService.getRecipe(recipeId)
      .then(this.context.setRecipe)
      .catch(this.context.setError)
  }

  renderRecipe() {
    const { recipe, error } = this.context;
    return (
      <>
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <RecipeTitle recipe={recipe} history={this.props.history}/>
        <div className="RecipePage_image">
          {recipe.img_src && <img src={recipe.img_src} alt="error"/>}
        </div>
        <div className="RecipePage_author_crateDate_group">
          <RecipeAuthor recipe={recipe}/>
          {recipe.date_created && <RecipeDate recipe={recipe}/>}
        </div>
        <hr/>
        <RecipeContent recipe={recipe} />
        <hr/>
        <p className="RecipePage_numberOfComments">
          <FontAwesomeIcon icon="comment-dots"/>
          {' '}
          Comments: {recipe.number_of_comments}
        </p>
        {/* {this.CommentForm()} */}
        <CommentForm history={this.props.history} updateCommentNumber={this.updateCommentNumber} /> 
        <RecipeComments recipeId={this.props.recipeId} updateCommentNumber={this.updateCommentNumber}/>
      </>
    );
  }

  render() {
    return (
      <section className='RecipePage'>
        {this.renderRecipe()}
      </section>
    );
  }
}

function RecipeDate({ recipe }) {
  return (
    <p className='RecipeListItem_date'>
        {format(new Date(recipe.date_created), 'MM-dd-yyyy')}
    </p>
  );
}

function RecipeAuthor({ recipe = nullRecipe}) {
  return (
    <p>
      <FontAwesomeIcon icon="user-edit"/>
      {' '}
      <span className='RecipePage__author bold Acme'>
        {recipe.author.user_name}
      </span>
    </p>
  );
}

function RecipeContent({ recipe }) {
  return (
    <p className='RecipePage__content Lora bold'>
      {recipe.content}
    </p>
  );
}

