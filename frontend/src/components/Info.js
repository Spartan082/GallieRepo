import '../styles/App.scss';
import Navigation from "./Navigation";
import React from 'react';
import Card from "./Post";

function Info() {
  return (
    <div className="posts">
        <Card 
                username="Info"
                image="https://picsum.photos/800/"
                artworkName="Work 2"
                description="Like!"
        />
    </div>
  );
}

export default Info;