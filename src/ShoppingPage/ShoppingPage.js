import React, { Component } from 'react';
import BuyListsContext from '../context/BuyListsContext';
import {format} from 'date-fns';
import ShoppingItem from '../ShoppingItem/ShoppingItem';
import BuyListApiService from '../services/buylist-api-service';
import FinishItem from '../FinishItem/FinishItem';
import './ShoppingPage.css';

export default class Shopping extends Component {
    static contextType = BuyListsContext;
    static defaultProps = {
        history: {
          push: () => {},
        },
        match: {
          params:{}
        }
    };
    state = {
        finishStatus: false,
        uncheckItems: [],
        showConfirm: false,
        getAll: false,
        listName: "",
    }
    
    showConfirmFunc = () => {
        this.setState({showConfirm: true});
    }

    finishShopping = () => {
        const ListItems = this.context.selectedBuyList || [];
        const uncheckItems = ListItems.filter(item => !this.context.checkSet.has(item.id));
        if (uncheckItems.length) {
            this.setState({
                finishStatus:true,
                uncheckItems,
            });
        }
        else{
            this.setState({
                getAll: true,
            });
            // setTimeout(function(){ 
            //     this.props.history.push('/buyLists');
            //  }.bind(this), 1500);
        }
    }
    deleteList = (listId) => {
        const { select ='' } = this.props;
        if (select === "Now"){
          BuyListApiService.deleteBuyList(listId)
          .then(res => {
            this.context.deleteBuyList(listId);
            this.props.history.push('/buyLists');
          })
          .catch(this.context.setError)
        }
        else {
          BuyListApiService.deleteNextList(listId)
          .then(res => {
            this.context.deleteNextList(listId);
            this.props.history.push('/nextLists');
          })
          .catch(this.context.setError)
        }
        
    }

    onUnload(event) { 
        alert('page Refreshed');
    }
    componentDidMount(){
        window.addEventListener("beforeunload", this.onUnload)
        window.onbeforeunload = function() {
            this.onUnload();
            return "";
        }.bind(this);
        const {listId} = this.props.match.params;
        this.context.clearError();
        const {select} = this.props;
        if (select === "Now"){
            BuyListApiService.getBuyListItems(listId)
            .then(res => {
                this.context.setSelectedBuyList(res.listItems);
                this.setState({listName: res.listName});
            })
            .catch(err => this.context.setError(err.error))
        }
        else if (select === "Next"){
            BuyListApiService.getNextListItems(listId)
            .then(res => {
                this.context.setSelectedBuyList(res.listItems);
                this.setState({listName: res.listName});
            })
            .catch(err => this.context.setError(err.error))
        }
        
    }
    componentWillUnmount() {
        this.context.clearCheckSet();
        this.context.clearNextSet();
        this.context.clearSelectedBuyList();
        window.removeEventListener("beforeunload", this.onUnload);
        window.onbeforeunload = () => {};
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
    addNext = (uncheckItems) => {
        const nextItems = uncheckItems.filter(item => this.context.nextSet.has(item.id));
        const time = new Date();
        const formatTime = format(new Date(time), "yyyy-MM-dd HH:mm:ss");
        const nextName = formatTime + ' Next';
        if (nextItems.length) {
            BuyListApiService.postNextList(nextName, 'Next')
                .then(res => {
                    this.context.addNextList(res)
                    const newNextList = res;
                    Promise.all(
                        nextItems.map(item => 
                            BuyListApiService.postItem(item.item_name, newNextList.id))
                    )
                    .then(res => {
                        this.props.history.push('/nextLists');
                    })
                    .catch(err => this.context.setError(err.error))
                    // for (let item of nextItems) {
                    //     BuyListApiService.postItem(item.item_name, newNextList.id)
                    //         .then(() => {
                    //             this.props.history.push('/nextLists');
                    //         })
                    //         .catch(err => this.context.setError(err.error))
                    // }
                })
                .catch(err => this.context.setError(err.error))
            
        }
        else {
            this.props.history.push('/buyLists');
        }
    }
    addAll = (uncheckItems) => {
        const nextItems = uncheckItems;
        const time = new Date();
        const formatTime = format(new Date(time), "yyyy-MM-dd HH:mm:ss");
        const nextName = formatTime + ' Next'
        BuyListApiService.postNextList(nextName, 'Next')
            .then(res => {
                this.context.addNextList(res)
                const newNextList = res;
                Promise.all(
                    nextItems.map(item => 
                        BuyListApiService.postItem(item.item_name, newNextList.id))
                )
                .then(res => {
                    this.props.history.push('/nextLists');
                })
                .catch(err => this.context.setError(err.error))
            })
            .catch(err => this.context.setError(err.error))     
    }
        
    render() {
        const ListItems = this.context.selectedBuyList || [];
        const {error} = this.context;
        const {listId} = this.props.match.params;
        const uncheckItems = this.state.uncheckItems || [];
        return (error ?
                <div role='alert'>
                    <p className='red'>{error}</p>
                </div>
                :
                <>
                <h2>Shopping</h2>
                <h3>{this.state.listName}</h3>
                {!this.state.getAll ? 
                    !this.state.finishStatus ? 
                    <div>       
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
                    </div>
                    :
                    <div>
                        <ul>
                            <FinishItem uncheckItems={uncheckItems}/>
                        </ul>
                        <button onClick={() => this.addNext(uncheckItems)}>OK </button>
                        <button onClick={() => this.addAll(uncheckItems)}>Add all to next </button>
                    </div>
                :
                <div>
                    <p>Get everything</p>
                    <button onClick={() => this.addNext([])}>OK </button>
                    <button onClick={() => this.deleteList(listId)}>Delete This List? </button>
                </div>
                }
                </>
        );
    }
}
