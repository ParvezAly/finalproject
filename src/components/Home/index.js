import React from 'react';
import { LoadSpinner, LocationList, SearchForm, NavHeader } from '../../assets';
import { connect } from 'react-redux';
import { getLocationsList, getSiteAreasByCountry, getAttractionsByCountryAndArea } from '../../redux/actions';
import { Link } from 'react-router-dom';
import { PATH } from '../../config';
class Home extends React.Component {

    componentDidMount = () => {
        this.props.getLocationsList();
    }

    render() {
        return (
            <div className="container-fluid img-fluid HomeBody">
                {/* Navbar Module */}
                <NavHeader
                    {...this.props} />
                {/* Search Module for Area on the base of country */}
                <SearchForm {...this.props} />
                <div className="container thumbnails">
                    <div className="row no-margin">
                        {/* Location Module used for showing Attraction Areas on the base of Country (from Drop Down) and
                        Area (from search module) */}
                        {
                            this.props.locations.success === true
                            &&
                            <LocationList
                                {...this.props} />

                        }
                        {
                            this.props.locations.success === false
                            &&
                            this.props.locations.isLoading === true
                            &&
                            <LoadSpinner />

                        }
                    </div>
                </div>
                <div className="container btn-booking"
                    style={{ paddingBottom: 100 }}>

                    {
                        this.props.locations.success === true
                        &&
                        this.props.locations.attraction_areas
                        &&
                        this.props.locations.attraction_areas.length > 0
                        &&
                        <Link to={PATH.VIDEOPLAYER.replace(':query', this.props.locations.attraction_areas[0].title).replace(':id', this.props.locations.attraction_areas[0].id).replace(':video_id', "first-video")}
                            className="btn-link-style">
                            <button>
                                {"Book Trip Now"}
                            </button>
                        </Link>
                    }
                </div>
            </div>
        )
    }
}





const mapStateToProps = (state) => {
    return {
        auth: state.reduxTokenAuth,
        locations: state.Location
    }
}
const mapDispatchStateToProps = (dispatch) => {
    return {
        getLocationsList: () => {
            dispatch(getLocationsList())
        },
        getSiteAreasByCountry: (country_id) => {
            dispatch(getSiteAreasByCountry(country_id));
        },
        getAttractionsByCountryAndArea: (country_id, site_area) => {
            dispatch(getAttractionsByCountryAndArea(country_id, site_area));
        }
    }
}
export default connect(mapStateToProps, mapDispatchStateToProps)(Home);