import React, { Component } from 'react';
import BuyListsContext from '../context/BuyListsContext';

import BuyList from '../BuyList/BuyList';
// import './RecipeListPage.css';
export default class CurListsPage extends Component {
  static contextType = BuyListsContext;

  renderLists(buyLists) {
    return buyLists.filter(buyList => buyList.type === "Now").map(buyList => 
      <li className="Buy__list" key = {buyList.id}>
          <BuyList buyList={buyList}/>
      </li>
      )
  }

  render() {
    const { buyLists } = this.context;
    // console.log(buyLists.filter(buyList => buyList.type ==='Now'))
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
