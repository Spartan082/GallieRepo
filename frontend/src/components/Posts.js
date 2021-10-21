import "../styles/posts.scss";
import React from 'react';

function Posts({postsOnFeed}) {

    const awsRoute = 'https://gallie-artwork-images.s3.amazonaws.com/';    

    return (<ul className="card">
        { postsOnFeed.map(val => {
            return (
                <div className="post">
                    <div className="username">
                        <strong>{val.username}</strong>
                    </div>
                    
                    <img 
                        className="postImage" 
                        src={awsRoute + val.artworkURL} 
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
            })
        }
    </ul>
    );
}

export default Posts; 