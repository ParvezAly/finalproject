import React from 'react';
export class VideoPlayerFormat extends React.Component {

    componentDidMount = () => {
        const video_id = this.props.match.params.video_id;
        if (video_id !== "first-video") {
            this.props.setSource(`${video_id}`);
        } else if (this.props.hotels && this.props.hotels.hotelList.length > 0) {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
            const match = this.props.hotels.hotelList[0].video_url.match(regExp);

            let videoid = (match && match[2].length === 11) ? match[2] : null;
            this.props.setSource(videoid);
        }
    }

    componentDidUpdate = () => {
        // const video_id = this.props.match.params.video_id;
        // if(video_id != "first-video") {
        //     this.props.setSource(`${video_id}`);
        // } else if(this.props.hotels.length > 0) {
        //     console.log("hotels", this.props.hotels);
        //     const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        //     const match = this.props.hotels[0].video_url.match(regExp);

        //     let videoid = (match && match[2].length === 11) ? match[2] : null;
        //     this.props.setSource(videoid);
        // }
    }

    render() {
        //Video Player that Play video of Attraction Area or Available Hotel in Attraction Area
        return (
            <div className="videos-list">
                <div className="row no-margin">

                    <div className="video-parent col-12 col-sm-12 col-md-6 col-lg-6">
                        <div className="video-thumbnail">
                            <iframe title="id" width="95%" height="300"
                                src={`https://www.youtube.com/embed/${this.props.source}`}>

                            </iframe>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
