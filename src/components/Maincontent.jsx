import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Crad';  

const Maincontent = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                    params: {
                        part: 'snippet',
                        key: 'AIzaSyD49K6Msa8ddsS4FWadnE7_3q0OMrUvPyI',  
                        maxResults: 100,
                        q: 'ALhilal',   
                    }
                });

                // Fetch additional details for each video
                const videoIds = response.data.items.map(video => video.id.videoId).join(',');
                const detailsResponse = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
                    params: {
                        part: 'contentDetails,statistics',
                        key: 'AIzaSyD49K6Msa8ddsS4FWadnE7_3q0OMrUvPyI',  
                        id: videoIds,
                    }
                });

                const videoDetails = detailsResponse.data.items.map((detail, index) => ({
                    ...response.data.items[index],
                    contentDetails: detail.contentDetails,
                    statistics: detail.statistics
                }));

                setVideos(videoDetails);
            } catch (error) {
                console.error('Error fetching videos:', error.message);
            }
        };

        fetchVideos(); // Start fetching the first set of results
    }, []);

    const formatDuration = (duration) => {
        const match = duration.match(/PT(\d+)M(\d+)S/);
        if (!match) return "00:00"; // Return a default value if format is incorrect
        const minutes = match[1];
        const seconds = match[2].padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    return (
        <div>
         <div className="flex flex-wrap gap-4 mt-2 ms-3">
  <button className="bg-black text-white py-1 px-1 sm:py-2 sm:px-4 rounded">
    All Content
  </button>
  <button className="bg-gray-300 hover:bg-gray-200 text-black py-1 px-1  sm:py-2 sm:px-4 rounded">
    Music
  </button>
  <button className="bg-gray-300 hover:bg-gray-200 text-black py-1 px-1 sm:py-2 sm:px-4 rounded">
    Rap
  </button>
  <button className="bg-gray-300 hover:bg-gray-200 text-black py-1 px-1 sm:py-2 sm:px-4 rounded">
    Science
  </button>
  <button className="bg-gray-300 hover:bg-gray-200 text-black py-1 px-1 sm:py-2 sm:px-4 rounded">
    It Has Been Viewed
  </button>
</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 mt-4">
            {videos.map((video, index) => (
           <Card
           key={index}
           videoId={video.id.videoId}   
           imageSrc={video.snippet.thumbnails.high.url}
           avatarSrc={video.snippet.thumbnails.default.url}
           title={video.snippet.title}
           byWho={video.snippet.channelTitle}
           views={video.statistics.viewCount}
           duration={formatDuration(video.contentDetails.duration)}
       />
       
            ))}
        </div>
        </div>
    );
};

export default Maincontent;
