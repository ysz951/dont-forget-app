import React, { Component } from 'react';
import RecipeContext  from '../context/RecipeContext';
import RecipeApiService from '../services/recipe-api-service';
import TokenService from '../services/token-service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {format} from 'date-fns';
import './RecipeComments.css';

export default class RecipeComments extends Component {
  static defaultProps = {
    updateCommentNumber: () => {},
  };
  state = {
    textAreaActive: false,
    selectedCommentId: null,
  };
  static contextType = RecipeContext;
  componentDidMount() {
    const { recipeId } = this.props;
    this.context.clearError();
    RecipeApiService.getRecipeComments(recipeId)
      .then(this.context.setComments)
      .catch(this.context.setError)
  }

  deleteComment = (commentId) => {
      RecipeApiService.deleteComment(commentId)
        .then(res => {
          this.context.deleteComment(commentId)
          this.props.updateCommentNumber()
        })
        .catch(this.context.setError)
  }
  submitUpdateComment = ev => {
    ev.preventDefault();
    const { recipe } = this.context;
    const { updateComment } = ev.target;
    RecipeApiService.updateComment(recipe.id, updateComment.value, this.state.selectedCommentId)
        .then(res => this.context.updateComment(updateComment.value, this.state.selectedCommentId))
        .then(() => {
          updateComment.value = ''
            this.setState({
              textAreaActive: false,
              selectedCommentId: null,
            })
        })
        .catch(this.context.setError)
    
  }
  changeComment = (commentId) => {
      this.setState({
        textAreaActive: true,
        selectedCommentId: commentId,
      });
  }
  closeTextArea = () => {
    this.setState({
      textAreaActive: false,
      selectedCommentId: null,
    });
  }

  manipulateCommentButton = (comment) => {
    return(
      <div className="Recipepage__comment_manipulateCommentButton">
        <button type='button' onClick={() => this.deleteComment(comment.id)}> 
          <FontAwesomeIcon icon="trash-alt"/>
          {' '}
          Delete 
        </button>
        <button type='button' onClick={() => this.changeComment(comment.id)}>
          <FontAwesomeIcon icon="edit"/>
          {' '}
          Edit 
        </button> 
      </div>
    );
  }
  commentContentArea = (comment, user_id) => {
    return (
      this.state.textAreaActive 
      && comment.user.id === user_id 
      && comment.id === this.state.selectedCommentId
      ? <form
          className='Recipepage__comment_manipulateCommentForm'
          onSubmit={this.submitUpdateComment}
        > 
          <textarea
            className='Recipepage__comment_manipulateCommentForm_textarea'
            required
            aria-label='Type a comment...'
            name='updateComment'
            id='updateComment'
            defaultValue={comment.content}
            rows='3'
          />
          <div className="Recipepage__comment_CommentFormButton">
            <button className="btn_type_2" type='button' onClick={this.closeTextArea}>
              Cancel
            </button>
            <button className="btn_type_3" type='submit'>
              Update
            </button>
          </div>
        </form>
      : <p className="RecipePage__coment_content Crimson">{comment.content}</p>
    )
  }
  render() {
    const user_id = TokenService.hasAuthToken() ? TokenService.readJwtToken().user_id : null;
    const { comments = [], error } = this.context;
    return (
      <>
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <ul className='RecipePage__comment_list'>
            {comments.map(comment =>
              <li key={comment.id} className='RecipePage__comment'>
                <div className="RecipePage__comment_poster_control_group">
                  <p className="RecipePage__comment_poster"> 
                    {comment.user.id === user_id 
                    ? <span className="bold"> {comment.user.user_name}</span>
                    : comment.user.user_name}
                  </p>
                  {comment.date_created && 
                    <p className="RecipePage__comment_dateCreated">
                      {format(new Date(comment.date_created), 'MM-dd-yyyy')}
                    </p>
                  }
                  { comment.user.id === user_id 
                    ? !this.state.textAreaActive && !this.state.selectedCommentId 
                    ? this.manipulateCommentButton(comment)
                    : comment.id !== this.state.selectedCommentId && this.state.textAreaActive 
                    ? this.manipulateCommentButton(comment)
                    : ''
                    : ''
                  }
                </div>
                { this.commentContentArea(comment, user_id)}
              </li>   
            )} 
        </ul>
      </>
  )};
}
