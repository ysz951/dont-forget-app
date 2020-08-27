import config from '../config';
import TokenService from './token-service';
const BuyListApiService = {
    getBuyLists() {
        return fetch(`${config.API_ENDPOINT}/buylists`, {
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
    getBuyListItems(listId) {
        return fetch(`${config.API_ENDPOINT}/buylists/${listId}/items`, {
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
    getNextLists() {
        return fetch(`${config.API_ENDPOINT}/nextlists`, {
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
    getNextListItems(listId) {
        return fetch(`${config.API_ENDPOINT}/nextlists/${listId}/items`, {
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
    // getShoppingItems(listId) {
    //     return fetch(`${config.API_ENDPOINT}/shopping/${listId}`, {
    //         headers: {
    //             'authorization': `bearer ${TokenService.getAuthToken()}`,
    //         },
    //     })
    //     .then(res =>

    //         (!res.ok)
    //         ? res.json().then(e => Promise.reject(e))
    //         : res.json()
    //     )
    // },
    
    postBuyList(list_name, type="Now") {
        return fetch(`${config.API_ENDPOINT}/buylists`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'authorization': `bearer ${TokenService.getAuthToken()}`,
        },
        body: JSON.stringify({
            list_name,
            
        }),
        })
        .then(res =>
            (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },
    postNextList(list_name, type="Next") {
        return fetch(`${config.API_ENDPOINT}/nextlists`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'authorization': `bearer ${TokenService.getAuthToken()}`,
        },
        body: JSON.stringify({
            list_name,
            
        }),
        })
        .then(res =>
            (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },
    postItem(item_name, list_id) {
        return fetch(`${config.API_ENDPOINT}/items`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'authorization': `bearer ${TokenService.getAuthToken()}`,
        },
        body: JSON.stringify({
            item_name,
            list_id,
        }),
        })
        .then(res =>
            (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },

    deleteBuyList(listId) {
        return fetch(`${config.API_ENDPOINT}/buylists/${listId}`, {
        method: 'DELETE',
        headers: {
            'authorization': `bearer ${TokenService.getAuthToken()}`,
        },
        })
        .then(res => {
            if (!res.ok) {
              return res.json().then(error => Promise.reject(error))
            }
        })
    },
    deleteNextList(listId) {
        return fetch(`${config.API_ENDPOINT}/nextlists/${listId}`, {
        method: 'DELETE',
        headers: {
            'authorization': `bearer ${TokenService.getAuthToken()}`,
        },
        })
        .then(res => {
            if (!res.ok) {
              return res.json().then(error => Promise.reject(error))
            }
        })
    },
    updateBuyList(listId, list_name) {
        return fetch(`${config.API_ENDPOINT}/buylists/${listId}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            'authorization': `bearer ${TokenService.getAuthToken()}`,
        },
        body: JSON.stringify({
            list_name,
        }),
        })
        .then(res => {
            if (!res.ok) {
              return res.json().then(error => Promise.reject(error))
            }
          })
    },
    updateNextList(listId, list_name) {
        return fetch(`${config.API_ENDPOINT}/nextlists/${listId}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            'authorization': `bearer ${TokenService.getAuthToken()}`,
        },
        body: JSON.stringify({
            list_name,
        }),
        })
        .then(res => {
            if (!res.ok) {
              return res.json().then(error => Promise.reject(error))
            }
          })
    },
    deleteItem(itemId) {
        return fetch(`${config.API_ENDPOINT}/items/${itemId}`, {
        method: 'DELETE',
        headers: {
            'authorization': `bearer ${TokenService.getAuthToken()}`,
        },
        })
        .then(res => {
            if (!res.ok) {
              return res.json().then(error => Promise.reject(error))
            }
        })
    },
    updateItem(itemId, item_name, list_id) {
        return fetch(`${config.API_ENDPOINT}/items/${itemId}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            'authorization': `bearer ${TokenService.getAuthToken()}`,
        },
        body: JSON.stringify({
            item_name,
            list_id
        }),
        })
        .then(res => {
            if (!res.ok) {
              return res.json().then(error => Promise.reject(error))
            }
          })
    },
    // getCollectionList() {
    //     return fetch(`${config.API_ENDPOINT}/users/collections`, {
    //         headers: {
    //             'authorization': `bearer ${TokenService.getAuthToken()}`,
    //         },
    //         })
    //         .then(res =>
    //             (!res.ok)
    //             ? res.json().then(e => Promise.reject(e))
    //             : res.json()
    //         )
        
        
    // },
    // postCollectionList(recId) {
    //     return fetch(`${config.API_ENDPOINT}/users/collections`, {
    //         method: 'POST',
    //         headers: {
    //             'content-type': 'application/json',
    //             'authorization': `bearer ${TokenService.getAuthToken()}`,
    //         },
    //         body: JSON.stringify({
    //             rec_id: recId,
    //         }),
    //         })
    //         .then(res =>
    //             (!res.ok)
    //             ? res.json().then(e => Promise.reject(e))
    //             : res.json()
    //         )
    // },
    // deleteCollectionList(recId) {
    //     return fetch(`${config.API_ENDPOINT}/users/collections/${recId}`, {
    //         method: 'DELETE',
    //         headers: {
    //             'content-type': 'application/json',
    //             'authorization': `bearer ${TokenService.getAuthToken()}`,
    //         },
    //         })
    //         .then(res => {
    //             if (!res.ok) {
    //             return res.json().then(error => Promise.reject(error))
    //             }
    //         })
    // },
};

export default BuyListApiService;
