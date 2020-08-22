import React, { Component } from 'react';

class ComponentError extends Component {
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    constructor(props) {
        super(props);
        this.state = {
          hasError: false
        };
    }
    render() {
        const {sec} = this.props;
        if (this.state.hasError) {      
          return (
            <h2>Could not display {sec} part.</h2>
          );
        }
        return this.props.children;
    }
}

export default ComponentError;