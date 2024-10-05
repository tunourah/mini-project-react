import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Commint from './Commint'; 

const VideoMore = () => {
  const { videoId } = useParams();   
  const [videoDetails, setVideoDetails] = useState(null); // Updated default state to null
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const [showFullDescription, setShowFullDescription] = useState(false);

  // Function to toggle the description view
  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  // Limit the description to two lines, with null checks
  const descriptionLines = showFullDescription 
    ? videoDetails?.snippet?.description 
    : videoDetails?.snippet?.description?.split('\n').slice(0, 2).join('\n');

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
          params: {
            part: 'snippet,contentDetails,statistics',
            key: 'AIzaSyD1bPP-jFKG2r3O4ykac6nXlPfo6bTFq3s',  
            id: videoId,
          },
        });
        setVideoDetails(response.data.items[0]);
      } catch (error) {
        console.error('Error fetching video details:', error.message);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/commentThreads', {
          params: {
            part: 'snippet',
            key: 'AIzaSyD1bPP-jFKG2r3O4ykac6nXlPfo6bTFq3s',   
            videoId: videoId,
            textFormat: 'plainText',
            maxResults: 100,  
          },
        });

        const commentsData = response.data.items.map(item => ({
          text: item.snippet.topLevelComment.snippet.textDisplay,
          author: item.snippet.topLevelComment.snippet.authorDisplayName,
          authorProfileImage: item.snippet.topLevelComment.snippet.authorProfileImageUrl,
          publishedAt: item.snippet.topLevelComment.snippet.publishedAt,
        }));

        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching comments:', error.message);
      }
    };

    fetchVideoDetails();
    fetchComments();
  }, [videoId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          text: newComment,
          author: 'Your Name', // Replace with actual user name
          authorProfileImage: 'default_profile_image_url', // Replace with actual user profile image URL
          publishedAt: new Date().toISOString(),
        },
      ]);
      setNewComment(''); // Clear the input field
    }
  };

  if (!videoDetails) {
    return <div>Loading...</div>;  // Loading state while data is being fetched
  }

  return (
    <div className="p-4 max-w-screen-lg">
      {/* Video Section */}
      <div>
        <iframe
          className='rounded-lg'
          width="100%"
          height="500px"
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={videoDetails?.snippet?.title}
        />
        <h1 className="text-md sm:text-xl font-bold mt-3">
          {videoDetails?.snippet?.title}
        </h1>
      </div>

      {/* Video Details Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4">
        {/* Channel Info */}
        <div className="flex items-start sm:items-center gap-3 w-full sm:w-auto">
          <img
            src={videoDetails?.snippet?.thumbnails?.default?.url}
            alt="Channel Thumbnail"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
          />
          <div className="flex-1 sm:flex-none">
            <h1 className="text-base sm:text-lg font-bold">{videoDetails?.snippet?.channelTitle}</h1>
            <p className="text-xs sm:text-sm text-gray-500">Subscribers</p>
          </div>
          <button className="bg-black text-white text-xs sm:text-sm font-semibold p-1 sm:p-2 px-3 sm:px-4 rounded-3xl mt-2 sm:mt-0 ml-auto sm:ml-4 hover:bg-opacity-70">
            Subscribe
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-0">
          {/* Like Button */}
          <button className="bg-gray-200 text-black text-xs sm:text-sm font-medium p-1 sm:p-2 px-3 sm:px-4 rounded-lg hover:bg-gray-300 w-32">
            <div className='flex justify-between'>
              <div className='flex items-center justify-between'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904" />
                </svg>
                <span className="ml-2">{videoDetails?.statistics?.likeCount}</span>
              </div>
            </div>
          </button>

          {/* Share Button */}
          <button className="bg-gray-200 text-black text-xs sm:text-sm font-medium p-1 sm:p-2 px-3 sm:px-4 rounded-lg hover:bg-gray-300 w-32">
            <div className='flex items-center justify-between'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m0 0l-5.5-5.5m5.5 5.5L17.5 15.5" />
              </svg>
              <span className="ml-2">Share</span>
            </div>
          </button>
        </div>
      </div>

      {/* Description */}
      <div className='mt-4'>
        <h2 className='text-lg font-bold'>Description</h2>
        <p className='text-gray-600'>
          {descriptionLines}
          {!showFullDescription && videoDetails?.snippet?.description?.split('\n').length > 2 && (
            <span onClick={toggleDescription} className='text-blue-500 cursor-pointer'> ...</span>
          )}
        </p>
        {showFullDescription && (
          <span onClick={toggleDescription} className='text-blue-500 cursor-pointer'> Show less</span>
        )}
      </div>

      {/* Comments Section */}
      <Commint comments={comments} addComment={handleCommentSubmit} />
    </div>
  );
};

export default VideoMore;
