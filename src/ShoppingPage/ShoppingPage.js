import React, { Component } from 'react';
import BuyListsContext from '../context/BuyListsContext';
import { Link } from 'react-router-dom';
import {format} from 'date-fns';
import ShoppingItem from '../ShoppingItem/ShoppingItem';
import BuyListApiService from '../services/buylist-api-service';
import './ShoppingPage.css';
export default class Shopping extends Component {
    static contextType = BuyListsContext;
    static defaultProps = {
        history: {
          push: () => {},
        },
    };
    state = {
        finishStatus: false,
        uncheckItems: [],
        showConfirm: false,
    }
    renderItems(ListItems) {
        return (
            ListItems.map(item => 
                <li className="Shopping__list_item" key = {item.id}>
                    <ShoppingItem item={item}/>
                </li>
            )
        )
    }
    showConfirmFunc = () => {
        this.setState({showConfirm: true});
    }

    finishShopping = () => {
        const ListItems = this.context.selectedBuyList || [];
        const uncheckItems = ListItems.filter(item => !this.context.checkSet.has(item.id));
        this.setState({
            finishStatus:true,
            uncheckItems,
        })
        // this.props.history.push('/finish');
    }
    componentDidMount(){
        const {listId} = this.props.match.params;
        this.context.clearError();
        const {select} = this.props;
        // console.log(select)
        if (select === "Now"){
            BuyListApiService.getBuyListItems(listId)
            .then(res => {
                // this.context.setItems(res.listItems);
                // this.setState({listName: res.listName});
                this.context.setSelectedBuyList(res.listItems)
            })
            .catch(err => this.context.setError(err.error))
        }
        else if (select === "Next"){
            BuyListApiService.getNextListItems(listId)
            .then(res => {
                // this.context.setItems(res.listItems);
                // this.setState({listName: res.listName});
                this.context.setSelectedBuyList(res.listItems)
            })
            .catch(err => this.context.setError(err.error))
        }
        
    }
    componentWillUnmount() {
        // console.log('ok');
        this.context.clearCheckSet();
        this.context.clearNextSet();
        this.context.clearSelectedBuyList();
    }

    renderFinish = (uncheckItems) => {
        return (
            uncheckItems.map(item => 
                <li key={item.id}>
                    {this.context.nextSet.has(item.id) 
                    ? <span className="red">{item.item_name}</span>
                    : item.item_name
                    }
                    {this.context.nextSet.has(item.id) 
                    ? <button onClick={() => {this.context.deleteNext(item.id)}}> cancel </button>
                    : <button onClick={() => {this.context.addNext(item.id)}}> add next </button>
                    }
                </li>
            )
        )
    }

    addNext = (uncheckItems) => {
        const nextItems = uncheckItems.filter(item => this.context.nextSet.has(item.id))
        // console.log(nextItems)
        const time = new Date();
        const formatTime = format(new Date(time), "yyyy-MM-dd HH:mm:ss");
        const nextName = formatTime + ' Next'
        // console.log(nextName)
        if (nextItems.length) {
            BuyListApiService.postNextList(nextName, 'Next')
                .then(res => {
                    this.context.addNextList(res)
                    for (let item of nextItems) {
                        BuyListApiService.postItemToList(item.id, res.id)
                            .catch(err => this.context.setError(err.error))
                    }
                })
                .catch(err => this.context.setError(err.error))
            this.props.history.push('/nextLists');
            
        }
        else {
            this.props.history.push('/buyLists');
            
        }
    }

    render() {
        const ListItems = this.context.selectedBuyList || [];
        const {error} = this.context;
     
        // console.log('check', this.context.checkSet)
        // console.log('next', this.context.nextSet)

        const uncheckItems = this.state.uncheckItems || [];
        // console.log(uncheckItems)
        return (!this.state.finishStatus ? 
                (<div>
                    <h2>Shopping</h2>
                    {error  &&  
                    <div role='alert'>
                        <p className='red'>{error}</p>
                    </div>}
                    {this.state.showConfirm && (
                        <div className="Shopping__confirm">
                            <h2>Are you sure? </h2>
                            <div>
                                <button onClick={() => this.setState({showConfirm:false})}>No</button>
                                <button onClick={() => this.finishShopping()}>Yes</button>
                            </div>
                        </div>
                    )}
                    <ul className="Shopping__list">
                        {this.renderItems(ListItems)}
                    </ul>
                    <button onClick={() => this.showConfirmFunc()}> Finish </button>
                </div>)
                :
                (<div>
                    {/* <p>Finish</p> */}
                    {/* <button onClick={() => this.setState({finishStatus:false})}>Back </button> */}
                    <ul>
                        {this.renderFinish(uncheckItems)}
                    </ul>
                    <button onClick={() => this.addNext(uncheckItems)}>OK </button>
                </div>)
           )
    }
}
