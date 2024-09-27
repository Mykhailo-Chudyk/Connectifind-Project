import React, { useState, useEffect } from 'react';
import eventservice from '../../services/eventservice.js'; 

const MyEventFeed = ({ eventDetails }) => {
    const [posts, setPosts] = useState([]);
    const [newPostContent, setNewPostContent] = useState('');

    const fetchPosts = async () => {
        console.log('Fetching posts for event:', eventDetails);
        try {
            const data = await eventservice.listFeedPosts(eventDetails.id); 
            setPosts(data);
        } catch (err) {
            console.error('Error fetching feed posts:', err);
        } 
    };

    const addPost = async () => {
        if (!newPostContent.trim()) return;
        try {
            const eventId = eventDetails.id;
            console.log('Creating new feed post for event:', eventId);
            console.log('Content:', newPostContent);
            const newPost = await eventservice.createFeedPost(eventId, {content: newPostContent });
            setPosts([...posts, newPost]);
            setNewPostContent(''); 
        } catch (err) {
            console.error('Error creating new feed post:', err);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [eventDetails]);

    return (
        <>
            <h1>Event Feed</h1>
            {posts.map(post => (
                <div key={post.id}>
                    <p>{post.content}</p>
                    <p>Author: {post.author.first_name + " " + post.author.last_name}</p>
                    <p>Posted on: {new Date(post.time).toLocaleString()}</p>
                </div>
            ))}
        
            <input
                type="text"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="Write something..."
            />
            <button onClick={addPost}>Submit</button>
        </>
    );
};

export default MyEventFeed;
