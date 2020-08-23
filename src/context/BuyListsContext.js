import React, { Component } from 'react';
import STORE from '../dummy-story';
const BuyListsContext = React.createContext({
  buyLists: [],
  items: [],
  itemToList: [],
  selectedBuyList: null,
  setSelectedBuyList: () => {},
});

export default BuyListsContext;

export class BuyListsProvider extends Component {
  state = {
    buyLists: STORE.buyLists,
    items: STORE.items,
    itemToList: STORE.itemToList,
    selectedBuyList: null,
  };

  setSelectedBuyList = listItems => {
    // console.log(listItems)
    this.setState({selectedBuyList: listItems})
  }

  render() {
    const value = {
      buyLists: this.state.buyLists,
      items: this.state.items,
      itemToList: this.state.itemToList,
      selectedBuyList: this.state.selectedBuyList,
      setSelectedBuyList: this.setSelectedBuyList,
    };
    return (
      <BuyListsContext.Provider value={value}>
        {this.props.children}
      </BuyListsContext.Provider>
    );
  }
}
