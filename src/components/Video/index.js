import React from 'react';
import { connect } from 'react-redux';
import { getVideosList, setAreaId } from '../../redux/actions';
import { LoadSpinner, VideoList,NavHeader } from '../../assets';
class Video extends React.Component {
    componentDidMount = () => {

        if (this.props.location.navProps) {
            this.props.setAreaId(this.props.location.navProps.id)
        }

        this.props.getVideosList(this.props.match.params.query);
    }
    render() {
        return (

            <div className="img-fluid VideoBody">
                {/* Navbar Module */}
                <NavHeader
                    {...this.props} />

                <div className="container">
                    <div className="detail-video">
                        {/* Video List Module used for display videos from Youtube
                        on the base of attraction area */}
                        {
                            this.props
                            &&
                            this.props.videos.success === true
                            &&
                            <VideoList
                                {...this.props} />
                        }
                        {
                            this.props
                            &&
                            this.props.videos.success === false && this.props.videos.isLoading === true
                            &&
                            <LoadSpinner />
                        }
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        auth: state.reduxTokenAuth,
        videos: state.Videos,
        areaID: state.Location.areaID
    }
}
const mapDispatchStateToProps = (dispatch) => {
    return {
        getVideosList: (query) => {
            dispatch(getVideosList(query))
        },
        setAreaId: (location) => {
            dispatch(setAreaId(location))
        }
    }
}
export default connect(mapStateToProps, mapDispatchStateToProps)(Video);