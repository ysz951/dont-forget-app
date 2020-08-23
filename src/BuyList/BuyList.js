import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class BuyList extends Component {

  render() {
    const { buyList } = this.props;
    return (
        <p>
            <Link to={`/buyList/${buyList.id}`}>
                {buyList.name}
            </Link>
        </p>
    );
  }
}
