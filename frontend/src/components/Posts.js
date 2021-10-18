import "../styles/posts.scss";

function Posts({postsOnFeed}) {
    return (<ul className="card">
        { postsOnFeed.map(val => {
            return (
                <div className="post">
                    <div className="username">
                        <strong>{val.username}</strong>
                    </div>

                    <img 
                        className="postImage" 
                        src={"https://picsum.photos/800/900"} 
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