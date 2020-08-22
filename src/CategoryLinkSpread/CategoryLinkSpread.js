import React from 'react';
import { NavLink } from 'react-router-dom';
import './CategoryLinkSpread.css';
function CategoryLinkSpread(props) {
    const {categories=[]} = props;
    return (
        <ul className="CategorylinkSpread wide-screen-only">   
            <li key="all_categories">
                <NavLink key="all" exact to='/' activeClassName="selected">
                    All
                </NavLink>  
            </li>   
            {categories.map(categorie => 
            <li key={categorie.id}>
                <span> </span>
                <NavLink exact to={`/category/${categorie.id}`} activeClassName="selected">
                {categorie.name}
                </NavLink>
            </li>
            )}  
        </ul>
    );
}

export default CategoryLinkSpread;