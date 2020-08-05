import React from 'react';
import { Spinner } from 'react-bootstrap';


export class LoadSpinner extends React.Component {
    render() {
        //Loading Module
        return (
            <div className="loader-center">
                <Spinner animation="border" variant="info" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        )
    }
}
