import '../styles/App.scss';
import React from 'react';
import Card from "./Posts";

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