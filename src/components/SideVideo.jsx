import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaReact, FaHtml5, FaCss3Alt } from 'react-icons/fa';
import Sidecard from './Sidecard';

const SideVideo = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                    params: {
                        part: 'snippet',
                        key: 'AIzaSyD49K6Msa8ddsS4FWadnE7_3q0OMrUvPyI',
                        maxResults: 50,
                        q: 'ALhilal',
                    }
                });

                console.log(response.data); // Check API response

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
                    videoId: response.data.items[index].id.videoId,
                    title: response.data.items[index].snippet.title,
                    imageSrc: response.data.items[index].snippet.thumbnails.high.url,
                    channel: response.data.items[index].snippet.channelTitle,
                    views: detail.statistics.viewCount,
                    date: new Date(response.data.items[index].snippet.publishedAt).toLocaleDateString(),
                }));

                setVideos(videoDetails);
            } catch (error) {
                console.error('Error fetching videos:', error.message);
            }
        };

        fetchVideos();
    }, []);

    return (
        <div className='h-screen flex flex-col p-4'>
          <div className="card border   shadow-xl transition-transform transform hover:scale-105 ">
    <div className="card-body text-center">
        <h2 className="card-title text-2xl font-bold"> NORA</h2>
        <p className="mt-2 text-gray-700">A Passionate Front-End Developer</p>
       
        <div className="flex justify-center mt-4 space-x-4">
            <FaReact className="text-4xl text-blue-400" title="React" aria-label="React" />
            <FaHtml5 className="text-4xl text-orange-500" title="HTML5" aria-label="HTML5" />
            <FaCss3Alt className="text-4xl text-blue-600" title="CSS3" aria-label="CSS3" />
        </div>
        <div className="card-actions   before: mt-6">
            <a 
                href="https://www.linkedin.com/in/noura-a-altuwaim"  
                target="_blank"  
                rel="noopener noreferrer" 
                className="btn   bg-sky-200 rounded-full text-blue-400 "
            >
                View More
            </a>
            
        </div>
    </div>
</div>

            {/* Render fetched videos using Sidecard */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-6">
                {videos.length > 0 ? (
                    videos.map((video) => (
                        <Sidecard 
                            key={video.videoId}
                            videoId={video.videoId}
                            imageSrc={video.imageSrc}
                            title={video.title}
                            channel={video.channel}
                            views={video.views}
                            date={video.date}
                        />
                    ))
                ) : (
                    <p>No videos found</p>
                )}
            </div>
        </div>
    );
}

export default SideVideo;
