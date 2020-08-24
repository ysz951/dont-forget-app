import React, { Component } from 'react';
import STORE from '../dummy-story';
const BuyListsContext = React.createContext({
  buyLists: [],
  nextLists: [],
  items: [],
  itemToList: [],
  selectedBuyList: null,
  setSelectedBuyList: () => {},
  setError: () => {},
  setBuyLists: () => {},
  setNextLists: () => {},
  clearError: () => {},
  setItems: () => {},
  clearItems: () => {},
  addBuyList: () => {},
  addItem: () => {},
  addCheck: () => {},
  deleteCheck: () => {},
  checkSet: new Set(),
  error: null,
});

export default BuyListsContext;

export class BuyListsProvider extends Component {
  state = {
    buyLists: [],
    nextLists: [],
    items: [],
    itemToList: [],
    selectedBuyList: null,
    error: null,
    checkSet: new Set(),
  };

  setBuyLists = buyLists => {
    this.setState({buyLists})
  }
  setNextLists = nextLists => {
    this.setState({nextLists})
  }
  addBuyList = buyList => {
    this.setBuyLists([
      ...this.state.buyLists,
      buyList
    ]);
  }
  addCheck = itemId => {
    const newCheckSet = this.state.checkSet;
    newCheckSet.add(itemId);
    this.setState({checkSet: newCheckSet});
  }
  deleteCheck = itemId => {
    const newCheckSet = this.state.checkSet;
    newCheckSet.delete(itemId);
    this.setState({checkSet: newCheckSet});
  }

  setItems = items => {
    this.setState({items})
  }

  addItem = item => {
    this.setItems([
      ...this.state.items,
      item
    ])
  }

  clearItems = () => {
    this.setState({items: []})
    this.setState({selectedBuyList: null})
  }
  setError = error => {
    console.error(error);
    this.setState({ error });
  }
  clearError = () => {
    this.setState({ error: null });
  }
  setSelectedBuyList = listItems => {
    // console.log(listItems)
    this.setState({selectedBuyList: listItems})
  }

  render() {
    const value = {
      buyLists: this.state.buyLists,
      nextLists: this.state.nextLists,
      items: this.state.items,
      itemToList: this.state.itemToList,
      selectedBuyList: this.state.selectedBuyList,
      setSelectedBuyList: this.setSelectedBuyList,
      setError: this.setError,
      setBuyLists: this.setBuyLists,
      setNextLists: this.setNextLists,
      clearError: this.clearError,
      setItems: this.setItems,
      clearItems: this.clearItems,
      addBuyList: this.addBuyList,
      addItem: this.addItem,
      addCheck: this.addCheck,
      deleteCheck: this.deleteCheck,
      error: this.state.error,
      checkSet: this.state.checkSet,
    };
    return (
      <BuyListsContext.Provider value={value}>
        {this.props.children}
      </BuyListsContext.Provider>
    );
  }
}
