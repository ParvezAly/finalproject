import React from 'react';
export class CarouselList extends React.Component {
    state = {
        id: null
    }
    clickVideo = (source) => {
        this.props.setSource(source)

    }
    getVideoId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);

        return (match && match[2].length === 11)
            ? match[2]
            : null;
    }
    onSelect = (hotel, index) => {
        this.setState({ id: hotel.id })
        this.props.setHotelId(index);
    }
    componentDidMount = () => {
        if (this.props.hotels.hotelList.length > 0) {
            this.setState({ id: this.props.hotels.hotelList[0].id });
             this.props.setHotelId(0);
        }
    }
    render() {
        // Showing List of All Hotels and their Detail with Videos Available in Attraction Area
        return (
            <>
                {
                    this.props
                    &&
                    this.props.hotels
                    &&
                    this.props.hotels.hotelList
                    &&
                    this.props.hotels.hotelList.length > 0
                    &&
                    <div className="scrollmenu">
                        {
                            this.props
                            &&
                            this.props.hotels
                            &&
                            this.props.hotels.hotelList
                            &&
                            this.props.hotels.hotelList.map((hotel, index) => {
                                let video_id = this.getVideoId(hotel.video_url);
                                return (
                                    <div key={index}
                                        onClick={() => { this.clickVideo(video_id); this.onSelect(hotel, index) }}
                                        className="video-thumbnail">
                                        <img
                                            alt=""
                                            src={`https://img.youtube.com/vi/${video_id}/default.jpg`} />
                                        <span>
                                            <p className="hotel-name"> {hotel.name}</p>
                                        </span>
                                        <span className="row no-margin hotel-detail">
                                            <span>
                                                <input type="radio" value="hotel"
                                                    onChange={() => { this.onSelect(hotel, index) }}
                                                    checked={(this.state.id === hotel.id) ? true : false} />
                                                <label forhtml="Book Now">Book Now</label>
                                            </span>

                                            <p className="hotel-name"> {'US $ 200'}</p>
                                        </span>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
            </>
        )
    }
}