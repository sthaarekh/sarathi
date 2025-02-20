import React from 'react'

const Post = (posts, club) => {
  const renderParagraphs = (text) => {
    if (!text) return null;
    
    // First, normalize line endings by replacing \r\n with \n
    const normalizedText = text.replace(/\r\n/g, '\n');
    
    // Split by double line breaks to separate paragraphs
    const paragraphs = normalizedText.split(/\n\n+/);
    
    return paragraphs.map((paragraph, index) => {
      // Handle special characters and formatting within paragraphs
      const formattedParagraph = paragraph
        .split('\n')  // Split single line breaks within paragraphs
        .map((line, lineIndex) => {
          // Check if line starts with numbers (for lists)
          const isList = /^\d+\./.test(line);
          
          if (isList) {
            // If it's a list item, preserve spacing
            return (
              <span key={lineIndex} className="block mb-1">
                {line}
              </span>
            );
          }
          
          // Regular line
          return (
            <React.Fragment key={lineIndex}>
              {lineIndex > 0 && <br />}
              {line}
            </React.Fragment>
          );
        });

      return (
        <p key={index} className="text-sm text-gray-500 mb-4 last:mb-0">
          {formattedParagraph}
        </p>
      );
    });
  };
  return (
    <div>
        {posts.posts.slice().reverse().map((post) => (
                <div key={post._id} className="border rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <img src={posts.club.profilePicture} alt="Event" className="w-10 h-10 rounded-full"/>
                      <div>
                        <h3 className="font-medium">{posts.club.name}</h3>
                        {renderParagraphs(post.description)}
                      </div>
                    </div>
                    <button className="text-gray-600 hover:text-gray-800">
                      <span className="text-xl">...</span>
                    </button>
                  </div>
                  <img src={post.image} alt={post.title} className="w-full h-800 object-cover rounded-lg mb-4"/>
                </div>
              ))}
    </div>
  )
}

export default Post
