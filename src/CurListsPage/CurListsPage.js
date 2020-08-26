import React, { Component } from 'react';
import BuyListsContext from '../context/BuyListsContext';
import ListNav from '../ListNav/ListNav';
import { Link, withRouter } from 'react-router-dom';
import BuyListApiService from '../services/buylist-api-service';
// import BuyList from '../BuyList/BuyList';
import './CurListsPage.css';
class CurListsPage extends Component {
  static contextType = BuyListsContext;
  state = {
    textAreaActive: false,
    selectedListId: null,
  }
  componentDidMount() {
    this.context.clearError();
    const {select=''} = this.props;
    if (select==="Now"){
      BuyListApiService.getBuyLists()
      .then(this.context.setBuyLists)
      .catch(this.context.setError)
    }
    else{
      BuyListApiService.getNextLists()
      .then(this.context.setNextLists)
      .catch(this.context.setError)
    }
  }
  componentWillUnmount() {
    this.context.clearBuyLists();
    this.context.clearNextLists();
  }
  deleteList = (listId) => {
    BuyListApiService.deleteBuyList(listId)
      .then(res => {
        this.context.deleteBuyList(listId);
      })
      .catch(this.context.setError)
  }
  changeButtonClick = (listId) => {
    this.setState({
      textAreaActive: true,
      selectedListId: listId,
    })
  }
  closeTextArea = () => {
    this.setState({
      textAreaActive: false,
      selectedListId: null,
    });
  }
  submitUpdateList = ev => {
    ev.preventDefault();
    const {updateList} = ev.target;
    // console.log(this.state.selectedListId, updateList.value)
    BuyListApiService.updateBuyList(this.state.selectedListId, updateList.value)
      .then(res => {
        this.context.updateBuyList(this.state.selectedListId, updateList.value)
        this.setState({
          textAreaActive: false,
          selectedListId: null,
        })
      })
      .catch(err => this.context.setError(err.error))
  }
  renderLists(selectLists, select) {
    return selectLists.map(list => 
      <li className="Buy__list" key = {list.id}>
         {this.state.textAreaActive && list.id === this.state.selectedListId ?
          <form
            className='Buy__list_form'
            onSubmit={this.submitUpdateList}
          > 
            <textarea
              className='Buy__list_textarea'
              required
              aria-label='Type a list name...'
              name='updateList'
              id='updateList'
              defaultValue={list.list_name}
              rows='1'
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
          :
          <>
            <button onClick={() => this.deleteList(list.id)}> Delete </button>
            {' '}
            <BuyList list={list} select={select}/>
            {' '}
            <button onClick={() => this.changeButtonClick(list.id)}> Edit</button>
          </>
          }
        
      </li>
      )
  }

  render() {
    const { error } = this.context;
    const {select=""} = this.props;
    const selectLists = (select === 'Now' ? this.context.buyLists : this.context.nextLists ) || [];
    return (
      <>
        <ListNav select={select}/>
        <section>
          <ul className="Buy__Lists">
            {this.renderLists(selectLists, select)}
          </ul>
        </section>
        {
          select === "Now" && 
          <Link className = 'AddBuyList__Link' to='/addbuylist'> 
            Add a list 
          </Link>
        }
      </>
    );
  }
}
export default withRouter(CurListsPage)

function BuyList({list, select}){
  return (
    <p className="Buy__list_name">
        {select === "Now" ?
        <Link to={`/buyLists/${list.id}`}>
            {list.list_name}
        </Link>
        :
        <Link to={`/nextLists/${list.id}`}>
            {list.list_name}
        </Link>
        }
    </p>
  )
}
