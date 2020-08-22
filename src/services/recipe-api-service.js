import config from '../config';
import TokenService from '../services/token-service';
const RecipeApiService = {
    getRecipes() {
        return fetch(`${config.API_ENDPOINT}/recipes`, {
        headers: {
        },
        })
        .then(res =>

            (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },
    getRecipe(recipeId) {
        return fetch(`${config.API_ENDPOINT}/recipes/${recipeId}`, {
        headers: {
        },
        })
        .then(res =>
            (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },
    getCategories() {
        return fetch(`${config.API_ENDPOINT}/categories`, {
        headers: {
        },
        })
        .then(res =>
            (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },
    getCategoryRecipes(categoryId) {
        return fetch(`${config.API_ENDPOINT}/categories/${categoryId}`, {
        headers: {
        },
        })
        .then(res =>
            (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },
    getSearchRecipes(query) {
        return fetch(`${config.API_ENDPOINT}/search/${query}`, {
        headers: {
        },
        })
        .then(res =>
            (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },
    getRecipeComments(recipeId) {
        return fetch(`${config.API_ENDPOINT}/recipes/${recipeId}/comments`, {
        headers: {
        },
        })
        .then(res =>
            (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },
    postComment(recipeId, content) {
        return fetch(`${config.API_ENDPOINT}/comments`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'authorization': `bearer ${TokenService.getAuthToken()}`,
        },
        body: JSON.stringify({
            recipe_id: recipeId,
            content,
        }),
        })
        .then(res =>
            (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },
    deleteComment(commentId) {
        return fetch(`${config.API_ENDPOINT}/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'authorization': `bearer ${TokenService.getAuthToken()}`,
        },
        })
        .then(res => {
            if (!res.ok) {
              return res.json().then(error => Promise.reject(error))
            }
          })
    },
    updateComment(recipeId, content, commentId) {
        return fetch(`${config.API_ENDPOINT}/comments/${commentId}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            'authorization': `bearer ${TokenService.getAuthToken()}`,
        },
        body: JSON.stringify({
            recipe_id: recipeId,
            content,
        }),
        })
        .then(res => {
            if (!res.ok) {
              return res.json().then(error => Promise.reject(error))
            }
          })
    },

    getCollectionList() {
        return fetch(`${config.API_ENDPOINT}/users/collections`, {
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            })
            .then(res =>
                (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
        
        
    },
    postCollectionList(recId) {
        return fetch(`${config.API_ENDPOINT}/users/collections`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({
                rec_id: recId,
            }),
            })
            .then(res =>
                (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
    },
    deleteCollectionList(recId) {
        return fetch(`${config.API_ENDPOINT}/users/collections/${recId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            })
            .then(res => {
                if (!res.ok) {
                return res.json().then(error => Promise.reject(error))
                }
            })
    },
};

export default RecipeApiService;
