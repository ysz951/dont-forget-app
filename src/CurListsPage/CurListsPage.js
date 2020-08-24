import React, { Component } from 'react';
import BuyListsContext from '../context/BuyListsContext';
import ListNav from '../ListNav/ListNav';
import { Link } from 'react-router-dom';
import BuyListApiService from '../services/buylist-api-service';
// import BuyList from '../BuyList/BuyList';
import './CurListsPage.css';
export default class CurListsPage extends Component {
  static contextType = BuyListsContext;

  componentDidMount() {
    this.context.clearError();
    BuyListApiService.getBuyLists()
      .then(this.context.setBuyLists)
      .catch(this.context.setError)
  }

  renderLists(buyLists) {
    return buyLists.map(buyList => 
      <li className="Buy__list" key = {buyList.id}>
          <BuyList buyList={buyList}/>
      </li>
      )
  }

  render() {
    const { buyLists = [], error } = this.context;
    return (
      <>
        <ListNav select='Now'/>
        <section>
          <ul className="Buy__Lists">
            {this.renderLists(buyLists)}
          </ul>
        </section>
        <Link className = 'AddBuyList__Link' to='/addbuylist'> add a list </Link>
      </>
    );
  }
}

function BuyList({buyList}){
  return (
    <p>
        <Link to={`/buyLists/${buyList.id}`}>
            {buyList.list_name}
        </Link>
    </p>
  )
}
