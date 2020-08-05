import React from 'react';
import { Link } from 'react-router-dom';
import { PATH } from '../../../config';
export class LocationList extends React.Component {
    render() {
        /*  List of All Attraction Sites on The Base of 
          Country (from DropDown) and Location (from Search Bar)
        */
        return (
            <>
                {
                    this.props
                    &&
                    this.props.locations
                    &&
                    this.props.locations.attraction_areas
                    &&
                    this.props.locations.attraction_areas.map((location, index) => {
                        // Setting List of All Attraction Sites on The Base of
                        // Country(from DropDown) and Location(from Search Bar)
                        // In View 
                        return (
                            <div key={index} className="col-12 col-sm-6 col-md-6 col-lg-4">
                                <div className="thumb-img"
                                    style={{
                                        backgroundImage: "url(" + `${location.thumbnail_img_url}` + ")"
                                    }}>
                                    <Link to={{
                                        pathname: PATH.VIDEOS.replace(":query", location.title),
                                        navProps: {
                                            id: location.id
                                        }
                                    }}>
                                        {location.title}
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                }

            </>
        )
    }
}
