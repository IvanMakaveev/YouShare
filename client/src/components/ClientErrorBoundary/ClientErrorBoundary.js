import { Component } from 'react';

import * as errorService from '../../services/errorService';

class ClientErrorBoundary extends Component {
    constructor(props) {
        super(props)

        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError() {
        return {
            hasError: true
        }
    }

    componentDidCatch(error) {
        errorService.logError(error);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="vh-100" style={{ backgroundImage: "url(error.jpg)" }}>
                    <h1>There has been an unexpected error</h1>
                    <h2>We are sorry for the inconvenience. Our team will try to fix the problem as soon as possible.</h2>
                </div>
            )
        }

        return this.props.children;
    }
}

export default ClientErrorBoundary;