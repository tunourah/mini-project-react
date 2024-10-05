import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ videoId, imageSrc, avatarSrc, title, byWho, views, duration }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/video/${videoId}`);
    };

    return (
        <div onClick={handleClick} className="cursor-pointer">
            <img src={imageSrc} alt={title} className="w-full h-auto rounded-md" />
            <div className="flex items-start mt-2">
                <img src={avatarSrc} alt={byWho} className="w-8 h-8 rounded-full" />
                <div className="ml-3">
                    <h1 className="font-semibold text-sm">{title}</h1>
                    <p className="text-gray-500 text-xs">{byWho}</p>
                    <p className="text-gray-500 text-xs">{views} views • {duration}</p>
                </div>
            </div>
        </div>
    );
};

export default Card;
