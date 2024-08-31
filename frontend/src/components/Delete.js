import React, { useState, useEffect } from 'react';
import axios from 'axios';

// An example component that fetches a message from the backend
function HelloWorld() {
    const [message, setMessage] = useState('');

    // useEffect(() => {
    //     axios.get('http://127.0.0.1:8000/user/hello/')
    //         .then(response => {
    //             setMessage(response.data.message);
    //         })
    //         .catch(error => {
    //             console.error('There was an error!', error);
    //         });
    // }, []); 

    return (
        <div>
            <h1>{message}</h1>
        </div>
    );
}

export default HelloWorld;
