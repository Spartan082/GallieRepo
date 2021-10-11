import "../styles/post.scss";

function Post(props) {
    const {
        username,
        image,
        artworkName,
        description,
    } = props;

    return (<div className="post">
        <div className="username">
            <strong> {username}</strong>
        </div>

        <img 
            className="postImage" 
            src={image} 
            alt="post content"
        />

        <div className="artworkName">
            <strong> {artworkName}</strong>
        </div>

        <div className="description">
            <strong> {description}</strong>
        </div>
    
    </div>
    );
}

export default Post;