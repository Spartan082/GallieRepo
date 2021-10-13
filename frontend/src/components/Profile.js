import '../styles/App.scss';
import Navigation from "./Navigation";
import React from 'react';
import Card from "./Posts";

function Profile() {
  return (
    <div className="posts">
        <Card 
                username="Profile"
                image="https://picsum.photos/800/"
                artworkName="Work 2"
                description="Like!"
        />
    </div>
  );
}

export default Profile;