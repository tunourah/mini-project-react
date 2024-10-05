import React from 'react';

const Commint = ({ comments = [], addComment }) => {
  const [newComment, setNewComment] = React.useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      addComment(newComment);  // Pass the comment to the parent component
      setNewComment(''); // Clear the input field
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold">Comments</h2>
      <form onSubmit={handleCommentSubmit} className="flex gap-2 mt-4">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 border rounded-md p-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Comment</button>
      </form>
      
      <div className="mt-4">
        {Array.isArray(comments) && comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="flex items-start gap-2 mb-4 border-b pb-2">
              <img
                src={comment.authorProfileImage}
                alt={`${comment.author}'s profile`}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">{comment.author}</p>
                <p className="text-gray-700">{comment.text}</p>
                <p className="text-xs text-gray-500">{new Date(comment.publishedAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No comments yet.</p> // Fallback message if no comments exist
        )}
      </div>
    </div>
  );
};

export default Commint;
