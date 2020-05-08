import React from 'react'
import SearchBar from './SearchBar'
import youtube from '../Apis.js/youtube'
import VideoList from './VideoList'
import VideoDetail from './VideoDetail'



const KEY = "AIzaSyBiSg1yWcd2wStLxJWUml9mt5DgNATk4Fk"

class App extends React.Component {
    state = {
        videos: [],
        selectedVideo : null
    }


    componentDidMount = ()=>{
        this.onTermSubmit('Gdańsk');
    }

    onVideoSelect = (video)=>{
        //console.log("Z apki",video)
        this.setState({selectedVideo : video})
    }

    onTermSubmit = (term) =>{
        youtube.get("/search",{
            params: {
                q: term,
                part: "snippet",
                maxparams: 5,
                key: KEY
            }
        })
        .then(videos =>{
            console.log(videos.data.items)
            this.setState({videos: videos.data.items, selectedVideo: videos.data.items[0]});
        })
        .catch((err) =>{
            console.log(err)
        });
    }

    render() {
        return (
            <div className="ui container" id="content">
                    <SearchBar onFormSubmit={this.onTermSubmit}/>
                    <div className="ui grid">
                        <div className="ui row">
                            <div className="eleven wide column">
                            <VideoDetail video = {this.state.selectedVideo}/>
                            </div>
                            <div className="five wide column">
                                    <VideoList onVideoSelect={this.onVideoSelect} videos = {this.state.videos}/>
                            </div>
                        </div>
                    </div>
            </div>

        )
    }
}
export default App