import React, { Component } from 'react';

export const nullRecipe = {
  author: {},
  tags: [],
};

const RecipeContext = React.createContext({
  recipe: nullRecipe,
  comments: [],
  error: null,
  setError: () => {},
  clearError: () => { },
  setRecipe: () => {},
  clearRecipe: () => {},
  setComments: () => {},
  addComment: () => {},
  deleteComment: () => {},
  updateComment: () => {},
});

export default RecipeContext;

export class RecipeProvider extends Component {
  state = {
    recipe: nullRecipe,
    error: null,
  };

  setError = error => {
    console.error(error);
    this.setState({ error });
  }

  clearError = () => {
    this.setState({ error: null });
  }

  setRecipe = recipe => {
    this.setState({ recipe });
  }

  setComments = comments => {
    this.setState({ comments });
  }

  clearRecipe = () => {
    this.setRecipe(nullRecipe);
    this.setComments([]);
  }

  deleteComment = commentId => {
    const newComments = 
      this.state.comments.filter(comment => Number(comment.id) !== Number(commentId));
    this.setComments(newComments);
  }
  addComment = comment => {
    this.setComments([
      ...this.state.comments,
      comment
    ]);
  }
  updateComment = (content, commentId) => {
    const newComments = this.state.comments;
    const index = newComments.findIndex(comment => comment.id === commentId);
    newComments[index].content = content;
    this.setComments(newComments);
  }

  render() {
    const value = {
      recipe: this.state.recipe,
      comments: this.state.comments,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setRecipe: this.setRecipe,
      setComments: this.setComments,
      clearRecipe: this.clearRecipe,
      addComment: this.addComment,
      deleteComment: this.deleteComment,
      updateComment: this.updateComment, 
    };
    return (
      <RecipeContext.Provider value={value}>
        {this.props.children}
      </RecipeContext.Provider>
    );
  }
}
