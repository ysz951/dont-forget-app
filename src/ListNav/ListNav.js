import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ListNav.css';
export default function ListNav(props) {
    const {select = ''} = props;
    return (
        <ul className="ListNav">
            <li>
                <h2> 
                {select === 'Now' 
                ?   <Link to='/buyLists' className="Seleted_Nav">
                        Buy List
                    </Link>
                :   <Link to='/buyLists'>
                        Buy List
                    </Link>
                }
                </h2>
            </li>
            <li> 
                <h2>
                {select === 'Next' 
                ?   <Link to='/nextLists' className="Seleted_Nav">
                        Next Time List
                    </Link>
                :   <Link to='/nextLists'>
                        Next Time List
                    </Link>
                }
                </h2>
            </li>
        </ul>
    )
}
