import React, { Component } from 'react';
import BuyListsContext from '../context/BuyListsContext';

import BuyList from '../BuyList/BuyList';
// import './RecipeListPage.css';
export default class NextListsPage extends Component {
  static contextType = BuyListsContext;

  renderLists(buyLists) {
    return buyLists.filter(buyList => buyList.type === "Next").map(buyList => 
      <li className="Buy__list" key = {buyList.id}>
          <BuyList buyList={buyList}/>
      </li>
      )
  }

  render() {
    const { buyLists } = this.context;
    return (
      <>
        <section>
          <ul className="Buy__Lists">
            {this.renderLists(buyLists)}
          </ul>
        </section>
      </>
    );
  }
}
