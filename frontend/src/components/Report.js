import '../styles/App.scss';
import Navigation from "./Navigation";
import React from 'react';
import Card from "./Post";

function Report() {
  return (
    <div className="posts">
        <Card 
                username="Report"
                image="https://picsum.photos/800/"
                artworkName="Work 2"
                description="Like!"
        />
    </div>
  );
}

export default Report;