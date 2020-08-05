import React from 'react';
import { connect } from 'react-redux';
import { getAllHotelList, getAllAreaHotelList, getBooking } from '../../redux/actions';
import SimpleForm from '../../assets/otherComponents/FormSubmit';
import { LoadSpinner, VideoPlayerFormat, CarouselList, NavHeader } from '../../assets';
import { getUserName, getUserEmail } from '../../redux/api';
class VideoPlayer extends React.Component {
    state = {
        source: '',
        hotel_id: 0
    }
    setSource = (source) => {
        this.setState({ source: source })
    }
    setHotelId = (hotel_id) => {
        this.setState({ hotel_id: hotel_id })
    }
    componentDidMount = () => {
        if (this.props.match.params && this.props.match.params.id) {
            this.props.getAllAreaHotelList(this.props.match.params.id);
        }
        else {
            this.props.getAllHotelList();

        }
        // this.setState({ hotel_id: 0 })
    }

    render() {
        return (
            <div className="img-fluid BookingBody">
                {/* Navbar Module */}
                <NavHeader
                    {...this.props} />

                <div className="container-fluid no-margin no-padding">
                    {/* Video Player Module Used for Playing Attraction Video or 
                    Hotel video available in attraction area */}
                    {
                        this.props
                        &&
                        this.props.hotels
                        &&
                        this.props.hotels.success === true
                        &&
                        <VideoPlayerFormat
                            setSource={this.setSource}
                            source={this.state.source}
                            {...this.props} />
                    }
                    {
                        this.props
                        &&
                        this.props.hotels
                        &&
                        this.props.hotels.success === false && this.props.hotels.isLoading === true
                        &&
                        <LoadSpinner />
                    }
                    <div className="row no-margin col-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="col-12 col-sm-12 col-md-8 col-lg-8">
                        </div>
                        {
                            this.props
                            &&
                            this.props.hotels
                            &&
                            this.props.hotels.hotelList.length > 0
                            &&
                            <div className="col-12 col-sm-12 col-md-3 col-lg-3">
                                {/* Form Module Used for Booking Hotel Available in Attraction Area */}
                                {
                                    this.props
                                    &&
                                    this.props.hotels
                                    &&
                                    this.props.hotels.success === true
                                    &&
                                    this.props.hotels.isLoading === false
                                    &&
                                    <SimpleForm
                                        {...this.props}
                                        setHotelId={this.setHotelId}
                                        initialValues={{
                                            user_name: getUserName(),
                                            email: getUserEmail(),
                                            hotel: this.state.hotel_id
                                        }} />
                                }
                                {
                                    this.props
                                    &&
                                    this.props.hotels
                                    &&
                                    this.props.hotels.success === false && this.props.hotels.isLoading === true
                                    &&
                                    <LoadSpinner />
                                }
                            </div>
                        }
                    </div>

                    {
                        this.props
                        &&
                        this.props.hotels
                        &&
                        this.props.hotels.success === true
                        &&
                        <div className="no-margin no-padding col-12 col-sm-12 col-md-12 col-lg-12">
                            {/* Carousel Module Used for Displaying Hotel Available in Attraction Area */}
                            <CarouselList
                                setSource={this.setSource}
                                setHotelId={this.setHotelId}
                                source={this.state.source}
                                {...this.props} />
                        </div>
                    }
                    {
                        this.props
                        &&
                        this.props.hotels
                        &&
                        this.props.hotels.success === false && this.props.hotels.isLoading === true
                        &&
                        <LoadSpinner />
                    }
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        auth: state.reduxTokenAuth,
        hotels: state.Hotels
    }
}
const mapDispatchStateToProps = (dispatch) => {
    return {
        getAllHotelList: () => {
            dispatch(getAllHotelList())
        },
        getAllAreaHotelList: (areaId) => {
            dispatch(getAllAreaHotelList(areaId))
        },
        getBooking: (data) => {
            dispatch(getBooking(data))
        }
    }
}
export default connect(mapStateToProps, mapDispatchStateToProps)(VideoPlayer);