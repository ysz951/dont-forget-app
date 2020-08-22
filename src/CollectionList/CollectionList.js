import React, { Component } from 'react';
import CollectionListContext from '../context/CollectionListContext';
import RecipeApiService from '../services/recipe-api-service';
import TokenService from '../services/token-service';
import RecipeListItem from '../RecipeListItem/RecipeListItem';

export default class CollectionList extends Component {
    static defaultProps = {
        recipes: [],
    };
    static contextType = CollectionListContext;
    componentDidMount() {
        if (TokenService.hasAuthToken()) {
            RecipeApiService.getCollectionList()
            .then(this.context.setCollectionList)
            .catch(this.context.setError)
        }
    }
    renderRecipes(recipes) {
        return recipes.map(recipe => 
                <li className='Recipe__list_item' key={recipe.id}>
                    <RecipeListItem recipe={recipe} />
                </li>
            )   
    }
    render() {
        const {collectionList = new Set()} = this.context;
        const {recipes} = this.props;
        const collectionrecipes = recipes.filter(recipe => collectionList.has(recipe.id));
        return (
            <ul className="Recipe__list">
                {this.renderRecipes(collectionrecipes)}
            </ul>
        );
    }
}
