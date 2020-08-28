import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ListNav.css';
export default function ListNav(props) {
    const {select = ''} = props;
    return (
        <ul className="ListNav">
            <li>
                
                {select === 'Now' 
                ?   
                <h2 className="Seleted_Nav"> 
                    <Link to='/buyLists'>
                        Buy List
                    </Link>
                </h2>
                :   
                <h2> 
                    <Link to='/buyLists'>
                        Buy List
                    </Link>
                </h2>
                }
            </li>
            <li> 
                
                {select === 'Next' 
                ?   
                <h2  className="Seleted_Nav">
                    <Link to='/nextLists'>
                        Next Time List
                    </Link>
                </h2>
                :   
                <h2>
                    <Link to='/nextLists'>
                        Next Time List
                    </Link>
                </h2>
                }
                
            </li>
        </ul>
    )
}
