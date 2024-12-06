import React, { useState, useEffect } from 'react';
import eventservice from '../../services/eventservice.js'; 
import './styles.scss';
import ButtonComponent from '../ButtonComponent/ButtonComponent.js';
import InputField from '../InputField/InputField.js';
const MyEventFeed = ({ eventDetails }) => {
    const [posts, setPosts] = useState([]);
    const [newPostContent, setNewPostContent] = useState('');

    const fetchPosts = async () => {
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
        <div className="feed-container">
            <h1>Feed</h1>
            {posts.map(post => (
                <div key={post.id} className="event-details-container">
                    <div className="event-details-header">
                        <div className="event-details-date">
                            <p>{post.author.first_name + " " + post.author.last_name}</p>
                        </div>
                        <div className="event-details-location">
                            <p>{new Date(post.time).toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="event-details-body">
                        <p>{post.content}</p>
                    </div>
                </div>
            ))}
            <div className="feed-post-bottom">
                <div className="feed-post-input">
                    <InputField 
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        placeholder="Write something..."
                        multiline={true}
                    />  
                </div>
                <div className="feed-post-button">  
                    <ButtonComponent text="Submit" onClick={addPost} width="300px"/>
                </div>
            </div>
        </div>
    );
};

export default MyEventFeed;
