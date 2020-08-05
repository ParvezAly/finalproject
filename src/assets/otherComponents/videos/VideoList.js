import React from 'react';
import { Link } from 'react-router-dom';
import { PATH } from '../../../config';

export class VideoList extends React.Component {
    render() {
        const query = this.props.match.params.query;
        // Showing List of Videos from Youtube Based on Selected Attraction Area
        return (
            <>
                {
                    this.props
                    &&
                    this.props.videos
                    &&
                    this.props.videos.videoList
                    &&
                    this.props.videos.videoList.items
                    &&
                    this.props.videos.videoList.items.map((video, index) => {
                        return (
                            <div key={index} className="videos-list">
                                <div className="row no-margin">
                                    <div className="col-3 col-sm-3 col-md-3 col-lg-3">
                                        <div className="video-thumbnail">

                                            <iframe title={`video-${index}`} width="100%" height="150" controls
                                                src={`https://www.youtube.com/embed/${video.id.videoId}`}>

                                            </iframe>
                                        </div>
                                    </div>
                                    <div className="col-9 col-sm-9 col-md-9 col-lg-9">
                                        <div className="video-detail">
                                            <Link to={{
                                                pathname: PATH.VIDEOPLAYER.replace(':query', query).replace(':id', this.props.areaID).replace(':video_id', video.id.videoId),
                                                myProps: {
                                                    id: this.props.areaID
                                                }
                                            }}>
                                                {video.snippet.title}</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })


                }
            </>
        )
    }
}