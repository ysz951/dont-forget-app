import React, { Component } from 'react';
import RecipeContext from '../context/RecipeContext';
import RecipeApiService from '../services/recipe-api-service';
import TokenService from '../services/token-service';
import './CommentForm.css';

export default class CommentForm extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
    updateCommentNumber: () => {},
  };
  static contextType = RecipeContext;

  handleSubmit = ev => {
    ev.preventDefault()
    if (!TokenService.hasAuthToken()) {
      this.props.history.push('/login');
    }
    else{
      const { recipe } = this.context;
      const { comment_post_textarea } = ev.target;
      this.context.clearError();
      RecipeApiService.postComment(recipe.id, comment_post_textarea.value)
        .then(this.context.addComment)
        .then(() => {
          comment_post_textarea.value = ''
          // go to bottom
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth"
          })
          this.props.updateCommentNumber()
        })
        .catch(this.context.setError)
    }
  }

  render() {
    const {error} = this.context;
    return (
      <>
        <div role='alert'>
            {error && <p className='red'>{error}</p>}
        </div>
        <form
          className='CommentForm'
          onSubmit={this.handleSubmit}
        >
          <textarea
            className='CommentForm_textarea'
            required
            aria-label='Type a comment...'
            name='comment_post_textarea'
            id='comment_post_textarea'
            // cols='30'
            rows='3'
            placeholder='Type a comment..'
          />
          <button className="btn_type_1" type='submit'>
            Post
          </button>
        </form>
      </>
    );
  }
}

