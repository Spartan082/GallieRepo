import "../styles/homepage.scss";
import Posts from "./Posts";
import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

function Homepage() {
    const [search, setSearch] = useState('');
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios
            .get('http://localhost:8000/posts')
            .then(response => {
                setPosts(response.data)
            })
    }, [])

    const filteredPosts = search.length === 0 ? posts : 
        posts.filter(post => post.artworkName.toLowerCase().includes(search.toLowerCase()));

  return (
      <div className="homepage">
          <div className='search'>
            <input
                className='searchbar'
                value={search}
                onChange={e => setSearch(e.target.value)}
                type="text"
                placeholder="Search"
                name="keyword" 
            />          
         </div>
        
        <div className='feed'>
           { filteredPosts.length === 0 ? <div className='noPosts'><h1 className='noPosts'>No Posts</h1></div>
                : <Posts postsOnFeed={filteredPosts}/>
            }
        </div>
      </div>
  );
}

export default Homepage;
