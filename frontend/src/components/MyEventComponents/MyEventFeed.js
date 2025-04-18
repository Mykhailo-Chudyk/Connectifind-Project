import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import eventservice from '../../services/eventservice.js';
import { formatEventDate } from '../../utils/dateTimeUtils';
import { fetchFeed, addPost } from '../../redux/actions/feedActions';
import './styles.scss';
import ButtonComponent from '../ButtonComponent/ButtonComponent.js';
import InputField from '../InputField/InputField.js';
import useDeviceType from '../../hooks/useDeviceType';

const MyEventFeed = ({ eventDetails }) => {
    /* 
    MyEventFeed component displays a feed of posts for a specific event and allows users to add new posts.
    
    This component is integrated within the event details view, showing community posts and interactions
    related to a particular event. It fetches posts from the Redux store and displays them in chronological
    order, while also providing an input area for users to create new posts.
    
    Props:
    - eventDetails: Object containing event information, including the event ID which is used to fetch
      and display the relevant feed posts. The component expects at minimum the event ID to be present
      in this object to function properly.
    */
    const dispatch = useDispatch();
    const [newPostContent, setNewPostContent] = useState('');
    const { feeds, loading } = useSelector((state) => state.feed);
    const posts = feeds[eventDetails?.id] || [];
    const { isMobile } = useDeviceType();
    useEffect(() => {
        if (eventDetails?.id) {
            // If we don't have the feed data yet, fetch it
            if (!feeds[eventDetails.id]) {
                dispatch(fetchFeed(eventDetails.id));
            }
            // Refresh feed data in background
            dispatch(fetchFeed(eventDetails.id));
        }
    }, [eventDetails?.id, dispatch]);

    const addNewPost = async () => {
        if (!newPostContent.trim()) return;
        try {
            const newPost = await eventservice.createFeedPost(eventDetails.id, {content: newPostContent});
            dispatch(addPost(eventDetails.id, newPost));
            setNewPostContent('');
        } catch (err) {
            console.error('Error creating new feed post:', err);
        }
    };

    return (
        <div className={`feed-container ${isMobile ? 'mobile' : ''}`}>
            <h1 className="feed-title">Feed</h1>
            <p className="feed-label">Share your thoughts and ideas with the community</p>
            {posts.map(post => (
                <div key={post.id} className="feed-details-container">
                    <div className="feed-details-header">
                        <div className="feed-details-date">
                            <p>{post.author.first_name} {post.author.last_name}</p>
                        </div>
                        <div className="feed-details-date">
                            <p>{formatEventDate(post.time)}</p>
                        </div>
                    </div>
                    <div className="feed-details-body">
                        <p>{post.content}</p>
                    </div>
                </div>
            ))}
            <div className={`feed-post-bottom ${isMobile ? 'mobile' : ''}`}>
                <div className="feed-post-input">
                    <InputField 
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        placeholder="Write something..."
                        isTextarea={true}
                    />  
                </div>
                <div className="feed-post-button">  
                    <ButtonComponent text="Submit" onClick={addNewPost} width="300px"/>
                </div>
            </div>
        </div>
    );
};

export default MyEventFeed;
