import "../styles/post.scss";

function Card(props) {
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
            className="cardImage" 
            src={image} 
            alt="card content"
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

export default Card;