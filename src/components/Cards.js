import "../styles/cards.scss";
import Card from "./Post";

function Cards() {

    return (
        <div className="cards">

            <Card 
                username="rafagrassetti"
                image="https://picsum.photos/800/900"
                artworkName="Work 1"
                description = "Woah dude, this is awesome! 🔥"
            />
             <Card 
                username="therealadamsavage"
                image="https://picsum.photos/800/"
                artworkName="Work 2"
                description="Like!"
            />
             <Card 
                username="mapvault"
                image="https://picsum.photos/800/1000"
                artworkName="Work 3"
                description="Niceeeee!"
            />
        </div>
    )
}

export default Cards;