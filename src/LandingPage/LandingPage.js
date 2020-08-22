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
                    <span className="LandingPage_welcome Lustria">
                        <span className="red">
                            We
                        </span>
                        <span className="brown">
                            lco
                        </span>
                        <span className="orange">
                            me
                        </span>
                    </span>
                </h1>
                
                <p className="LandingPage_feature bold black Libre larger">
                    <span className="italic">
                        Search{' '}
                    </span>
                        the recipe you want
                </p>
                <p className="LandingPage_feature bold black Libre x-large" >
                    <span className="italic">
                        Collect{' '}
                    </span>
                        the recipe you like
                </p>
                <p className="LandingPage_feature_last bold black Libre x-large">
                    <span className="italic">
                        Share{' '}
                    </span>
                        the experience you have
                </p>
                <p className="LandingPage_findMore Fredoka">
                    <Link to='/login'>
                        Find More
                    </Link>
                </p>
            </div>
        </div>
    );
}
export default withRouter(LandingPage);
