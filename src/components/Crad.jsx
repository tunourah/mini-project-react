import React from 'react';

const Card = ({ imageSrc, avatarSrc, title, byWho, views, duration }) => {
  return (
    <div className="card bg-base-100 gap-2 hover:shadow-lg transition-shadow duration-200">
      <figure className="relative">
        <img
          src={imageSrc}
          alt={title}
          className="rounded-xl object-cover w-full h-48"
        />
        <div className="absolute bottom-2 left-2 text-xs text-white bg-black bg-opacity-50 px-1 rounded">
          {duration} {/* Display the formatted duration here */}
        </div>
      </figure>
       
      <div className="card-body">
        <div className="flex gap-2 items-start">
          <img
            src={avatarSrc}
            alt="avatar"
            className="rounded-full w-10 h-10"
          />
          <div className="flex flex-col">
            <h2 className="card-title">{title}</h2>
            <p className='text-xs text-gray-500'>{byWho}</p>
            <p className='text-xs text-gray-500'>{views} views</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
