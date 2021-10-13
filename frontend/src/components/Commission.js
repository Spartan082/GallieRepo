import '../styles/App.scss';
import Navigation from "./Navigation";
import React from 'react';
import Card from "./Post";

function Commission() {
  return (
    <div className="posts">

            <Card 
                username="Commisssion"
                image="https://picsum.photos/800/900"
                artworkName="Work 1"
                description = "Woah dude, this is awesome! 🔥"
            />
    </div>
  );
}

export default Commission;
