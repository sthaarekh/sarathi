import React from 'react'

const Post = (posts, club) => {
  return (
    <div>
        {posts.posts.slice().reverse().map((post) => (
                <div key={post._id} className="border rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <img src={posts.club.profilePicture} alt="Event" className="w-10 h-10 rounded-full"/>
                      <div>
                        <h3 className="font-medium">{posts.club.name}</h3>
                        <p className="text-sm text-gray-500">{post.description}</p>
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
