import "../styles/posts.scss";
import Axios from "axios";
import React, { useState, useEffect } from 'react';

function Posts(props) {
    const {
        username,
        image,
    } = props;

    const [postsOnFeed, setPosts] = useState([]);

    useEffect(() => {
        Axios
            .get('http://localhost:3001/')
            .then((response) => {
                //console.log(response);
                setPosts(response.data);
            }); 
    }, []);

    return (<div className="card">
        { postsOnFeed.map((val)=> {
            return (
                <div className="post">
                    <div className="username">
                        <strong> {username ? username : "Test User"} </strong>
                    </div>

                    <img 
                        className="postImage" 
                        src={image ? image : "https://picsum.photos/800/900"} 
                        alt="post content"
                    />

                    <div className="artworkName">
                        <strong> {val.artworkName}</strong>
                    </div>

                    <div className="description">
                        <strong> {val.prodDesc}</strong>
                    </div>
                </div>
            )
        })}
    </div>
    );
}

export default Posts;