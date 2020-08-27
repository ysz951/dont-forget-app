import React, { Component } from 'react';
import BuyListsContext from '../context/BuyListsContext';
import ListNav from '../ListNav/ListNav';
import { Link, withRouter } from 'react-router-dom';
import BuyListApiService from '../services/buylist-api-service';
// import BuyList from '../BuyList/BuyList';
// import './CurListsPage.css';
class NextListsPage extends Component {
  static contextType = BuyListsContext;

  componentDidMount() {
    this.context.clearError();
    BuyListApiService.getNextLists()
      .then(res => {
        // console.log(res)
        this.context.setNextLists(res)})
      .catch(err => this.context.setError(err.error))
  }

  renderLists(buyLists) {
    return buyLists.map(buyList => 
      <li className="Buy__list" key = {buyList.id}>
          <BuyList buyList={buyList}/>
      </li>
      )
  }

  render() {
    const { nextLists = [], error } = this.context;
    return (
      <>
        <ListNav select='Next'/>
        <section>
          <ul className="Buy__Lists">
            {this.renderLists(nextLists)}
          </ul>
        </section>
        {/* <Link className = 'AddBuyList__Link' to='/addbuylist'> add a list </Link> */}
      </>
    );
  }
}
export default withRouter(NextListsPage);
function BuyList({buyList}){
  return (
    <p>
        <Link to={`/nextLists/${buyList.id}`}>
            {buyList.list_name}
        </Link>
    </p>
  )
}
