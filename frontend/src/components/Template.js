import "../styles/homepage.scss";
import TemplateInfo from "../functions/artType";
import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

function Info() {
    const [info, setInfo] = useState([])

    useEffect(() => {
        axios
            .get('http://localhost:8000/info')
            .then(response => {
                setInfo(response.data)
            })
    }, [])

  return (
    <div>
      <h1>Creating Artist Rate Template</h1>
      <TemplateInfo templateInfo = {info} />
      <ul>
        <li><h2>Icon</h2></li>
        <li>Sketch</li>
        <li>Lineart</li>
        <li>Flat Color</li>
        <li>Shaded</li>
        <li>Logo</li>
      </ul>
    </div>
  );
}

export default Info;