import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CollectionListContext  from '../context/CollectionListContext';
import RecipeApiService from '../services/recipe-api-service';
import TokenService from '../services/token-service';
import './RecipeListItem.css';

export default class RecipeListItem extends Component {
  static defaultProps = {
    recipe: {
      name: '',
      content:'',
      date_created: '',
      author: {
        user_name: '',
      }
    },
  };
  static contextType = CollectionListContext;
  componentDidMount() {
    if (TokenService.hasAuthToken()) {
      RecipeApiService.getCollectionList()
      .then(this.context.setCollectionList)
      .catch(this.context.setError)
    }
  }
  handleClick = (recId) => {
    if (TokenService.hasAuthToken()) {
      const {collectionList = new Set()} = this.context;
      if (!collectionList.has(recId)){
        RecipeApiService.postCollectionList(recId)
        .then(this.context.addCollection)
        .catch(this.context.setError)
      }
      else{
        RecipeApiService.deleteCollectionList(recId)
        .then(this.context.deleteCollection(recId))
        .catch(this.context.setError)
      }
    }
    else{
      this.props.history.push('/login');
    }
  }
  render() {
    const { recipe } = this.props;
    const {collectionList = new Set(), error} = this.context;
    return (
      <>
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <Link to={`/recipe/${recipe.id}`} className="RecipeListItem_link">
          <div className="RecipeListItem_image" style={{backgroundImage: `url(${recipe.img_src})`}}>
          </div>
          </Link>
          <div className="RecipeListItem_group">
            <div className="RecipeListItem_name_favorite_group">
              <Link to={`/recipe/${recipe.id}`} className="RecipeListItem_link">
                <RecipeName recipe={recipe}/>
              </Link>
              <button className="RecipeListItem_collect_btn" 
                onClick={() => this.handleClick(recipe.id)}
              > 
                {!!collectionList && collectionList.has(recipe.id) 
                ? <FontAwesomeIcon icon='star'/> 
                : <FontAwesomeIcon icon='star' className="light-grey" />}
              </button>
            </div>
            <Link to={`/recipe/${recipe.id}`} className="RecipeListItem_link">
              <div className="RecipeListItem_autho_commentNum_group">
                <RecipeAuthor recipe={recipe}/>
                <RecipeNumberOfComments recipe={recipe}/>
              </div>
              <RecipeContent recipe={recipe}/>
            </Link>
          </div>
        
      </>
    );
  }
}

function RecipeName({ recipe }) {
  return (
    <p className='RecipeListItem_name Lustria'>
        {truncate(recipe.name, 20)}
    </p>
  );
}
function RecipeContent({recipe}){
  return (
    <p className='RecipeListItem_content Crimson'>
        {truncate(recipe.content, 10, 'split')}
    </p>
  );
}

function truncate(text, limitLength, method='') {
  switch(method){
    case 'split':
      const words = text.split(' ');
      if (words.length > limitLength) {
        return words.slice(0, limitLength).join(' ') + ' ...';
      }
      return text;
    default:
      if (text.length > limitLength) {
        return text.slice(0, limitLength) + ' ...';
      }
      return text;
  };
}

function RecipeAuthor({ recipe }) {
    return (
    <p className='RecipeListItem_author'>
        By <span className="bold Acme">{recipe.author.user_name}</span>
    </p>
    );
}

function RecipeNumberOfComments({recipe}){
  return (
    <p className='RecipeListItem_NumberOfComments'>
        {recipe.number_of_comments} <FontAwesomeIcon icon='comment-dots'/> 
    </p>
  );
}

