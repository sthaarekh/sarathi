import React, { useState } from 'react'
import { toast } from "sonner";
import { ReportNotices } from '../utils/api';
import moment from 'moment/moment';

const Post = (posts, club) => {
  const [openMenuId, setOpenMenuId] = useState(null)
  const id = posts.club._id;
  const handleReportNotice = (noticeId) => {
    let reportedNoticesList = JSON.parse(
      localStorage.getItem("reportedNotices") || "[]"
    );

    if (reportedNoticesList.includes(noticeId)) {
      toast.error("You have already reported this notice");
      return;
    }

    toast.promise(ReportNotices({ id, noticeId }), {
      loading: "Reporting notice...",
      success: () => {
        reportedNoticesList.push(noticeId);
        localStorage.setItem(
          "reportedNotices",
          JSON.stringify(reportedNoticesList)
        );
        return "Notice has been reported successfully";
      },
      error: "Failed to report the notice",
    });
  };
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
          <div key={post._id} className="border rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex space-x-3">
                {/* Club image - fixed position */}
                <div className="flex-shrink-0">
                  <img 
                    src={posts.club.profilePicture} 
                    alt="Club Profile" 
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                  />
                </div>
                
                {/* Content container */}
                <div className="flex flex-col min-w-0">
                  <h3 className="font-medium text-gray-800 truncate">{posts.club.name}</h3>
                  <h4 className="text-xs text-gray-500 flex-shrink-0">{moment(post.createdAt).fromNow()}</h4>
                  <div className="text-sm text-gray-600 mt-1 break-words">
                    {renderParagraphs(post.description)}
                  </div>
                </div>
              </div>
              
              {/* Dropdown Menu */}
              <div className="relative flex-shrink-0 ml-2">
                <button 
                  className="text-gray-500 hover:text-gray-800 rounded-full p-1 hover:bg-gray-100 transition-colors"
                  onClick={() => setOpenMenuId(openMenuId === post._id ? null : post._id)}
                >
                  <span className="text-xl">...</span>
                </button>
                
                {/* Dropdown Content */}
                {openMenuId === post._id && (
                  <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                    <div className="py-1">
                      <button
                        className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                        onClick={() => {
                          handleReportNotice(post._id);
                          setOpenMenuId(null);
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Report Notice
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {post.image && (
              <img
                src={post.image}
                alt={post.title || "Post image"}
                className="w-full h-800 object-cover rounded-lg mb-4"
              />
            )}
          </div>
        ))}
    </div>
  )
}

export default Post
