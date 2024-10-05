import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidecard = ({ videoId, imageSrc, title, channel, views, date }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/video/${videoId}`);
    };

    // Function to handle image loading errors
    const handleImageError = (e) => {
        e.target.onerror = null; // Prevent looping
        e.target.src = '/images/placeholder.jpg'; // Replace with a placeholder image
    };

    return (
        <div onClick={handleClick} className="cursor-pointer mb-4">
            <div className="flex p-2 border-b border-gray-300 hover:bg-gray-100">
                <img 
                    src={imageSrc} 
                    alt={title} 
                    className="w-40 h-24 object-cover" 
                    onError={handleImageError} // Add error handling for images
                />
                <div className="ml-2 flex-1">
                    <h3 className="text-sm font-semibold">{title}</h3>
                    <p className="text-xs text-gray-600">{channel}</p>
                    <p className="text-xs text-gray-500">
                        {views.toLocaleString()} views • {new Date(date).toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Sidecard;
