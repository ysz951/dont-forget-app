import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './LandingPage.css';
function LandingPage(props){
    return(
        <div className="LandingPage">
            <div className="LandingPage_image_group">
                <div className="LandingPage_image"/>
            </div>
            <div className="LandingPage_text_group">
                
                <h1>
                    <span className="Lustria">
                        Dont forget what you want !
                    </span>
                </h1>
                
                <p>Build a Buy List</p>
                <p>Check the items of list during shopping</p>
                <p>Add the out of store items in Next Time List</p>
                <p className="LandingPage_findMore Fredoka">
                    <Link to='/buyList'>
                        Find More
                    </Link>
                </p>
            </div>
        </div>
    );
}
export default withRouter(LandingPage);
