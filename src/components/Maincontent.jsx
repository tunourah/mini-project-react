import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Crad'; // Ensure the correct file name

const Maincontent = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                    params: {
                        part: 'snippet',
                        key: 'AIzaSyD1bPP-jFKG2r3O4ykac6nXlPfo6bTFq3s', // Replace with your YouTube API key
                        maxResults: 50,
                        q: 'web development',
                    }
                });

                // Fetch additional details for each video
                const videoIds = response.data.items.map(video => video.id.videoId).join(',');
                const detailsResponse = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
                    params: {
                        part: 'contentDetails,statistics',
                        key: 'AIzaSyD1bPP-jFKG2r3O4ykac6nXlPfo6bTFq3s', // Replace with your YouTube API key
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
            {videos.map((video, index) => (
                <Card
                    key={index}
                    imageSrc={video.snippet.thumbnails.high.url}
                    avatarSrc={video.snippet.thumbnails.default.url}
                    title={video.snippet.title}
                    byWho={video.snippet.channelTitle}
                    views={video.statistics.viewCount} // Use actual view count
                    duration={formatDuration(video.contentDetails.duration)} // Format duration
                />
            ))}
        </div>
    );
};

export default Maincontent;
