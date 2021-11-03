import "../styles/homepage.scss";
import TemplateInfo from "../functions/artType";
import UploadTemplate from "../functions/UploadTemplate";
import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

function Info() {
    const [icon, setIcon] = useState([])
    const [sketch, setSketch] = useState([])
    const [lineart, setLineArt] = useState([])
    const [flatcolor, setFlatColor] = useState([])
    const [shaded, setShaded] = useState([])
    const [logo, setLogo] = useState([])

    useEffect(() => {
        axios
            .get(process.env.REACT_APP_IP_ADDRESS + '/info/icon')
            .then(response => {
                setIcon(response.data)
            })
    }, [])

    useEffect(() => {
      axios
            .get(process.env.REACT_APP_IP_ADDRESS + '/info/sketch')
            .then(response => {
                setSketch(response.data)
            })
    }, [])

    useEffect(() => {
      axios
            .get(process.env.REACT_APP_IP_ADDRESS + '/info/lineart')
            .then(response => {
                setLineArt(response.data)
            })
    }, [])

    useEffect(() => {
      axios
            .get(process.env.REACT_APP_IP_ADDRESS + '/info/flatcolor')
            .then(response => {
                setFlatColor(response.data)
            })
    }, [])

    useEffect(() => {
      axios
            .get(process.env.REACT_APP_IP_ADDRESS + '/info/shaded')
            .then(response => {
                setShaded(response.data)
            })
    }, [])

    useEffect(() => {
      axios
          .get(process.env.REACT_APP_IP_ADDRESS + '/info/logo')
          .then(response => {
              setLogo(response.data)
          })
  }, [])

    const [showForm, setShowForm] = useState(false);
    const [showIcon, setShowIcon] = useState(false);
    const [showSketch, setShowSketch] = useState(false);
    const [showFlat, setShowFlat] = useState(false);
    const [showLineart, setShowLineart] = useState(false);
    const [showShaded, setShowShaded] = useState(false);
    const [showLogo, setShowLogo] = useState(false);
    const reset = () => {
      setShowIcon(false);
      setShowSketch(false);
      setShowFlat(false);
      setShowLineart(false);
      setShowShaded(false);
      setShowLogo(false);
      setShowForm(false);
    }
    const FormOnClick = () => {
      if(showForm === true){
        setShowForm(!showForm);
      }
      else{
        reset(); 
        setShowForm(!showForm);
      }
    }
    const IconOnClick = () => {
      if(showIcon === true){
        setShowIcon(!showIcon);
      }
      else{
        reset(); 
        setShowIcon(!showIcon);
      }
    }
    const SketchOnClick = () => {
      if(showSketch === true){
        setShowSketch(!showSketch);
      }
      else{
        reset(); 
        setShowSketch(!showSketch);
      }
    }
    const FlatOnClick = () => {
      if(showFlat === true){
        setShowFlat(!showFlat);
      }
      else{
        reset(); 
        setShowFlat(!showFlat);
      }
    }
    const LineartOnClick = () => {
      if(showLineart === true){
        setShowLineart(!showLineart);
      }
      else{
        reset(); 
        setShowLineart(!showLineart);
      }
    }
    const ShadedOnClick = () => {
      if(showShaded === true){
        setShowShaded(!showShaded);
      }
      else{
        reset(); 
        setShowShaded(!showShaded);
      }
    }
    const LogoOnClick = () => {
      if(showLogo === true){

        setShowLogo(!showLogo);
      }
      else{
        reset(); 
        setShowLogo(!showLogo);
      }
    }

  return (
    <div>
      <h1>Creating Artist Rate Template</h1>
      <li className="item"><button onClick={FormOnClick}>Modify</button>
      {showForm ? <UploadTemplate /> : null}</li>
      <ul>
        <li className="item"><button onClick={IconOnClick}>Icon</button>
        {showIcon ? <TemplateInfo templateInfo = {icon} /> : null}</li>
        <li className="item"><button onClick={SketchOnClick}>Sketch</button>
        {showSketch ? <TemplateInfo templateInfo = {sketch} /> : null}</li>
        <li className="item"><button onClick={FlatOnClick}>Flat Color</button>
        {showFlat ? <TemplateInfo templateInfo = {flatcolor} /> : null}</li>
        <li className="item"><button onClick={LineartOnClick}>Lineart</button>
        {showLineart ? <TemplateInfo templateInfo = {lineart} /> : null}</li>
        <li className="item"><button onClick={ShadedOnClick}>Shaded</button>
        {showShaded ? <TemplateInfo templateInfo = {shaded} /> : null}</li>
        <li className="item"><button onClick={LogoOnClick}>Logo</button>
        {showLogo ? <TemplateInfo templateInfo = {logo} /> : null}</li>
      </ul>
    </div>
  );
}

export default Info;