import React from "react";
import map_image from "./map_image2.png";
import radiotower_image from "./radiotower_image.png";

import "./Home.css";

function InfoBox({heading, text}){
    return (
        <div className="info-box">
            <h2>{heading}</h2>
            <p>{text}</p>
        </div>
    );
}

function Home() {
    return (
        <div className="home-page">
            <div className="image-container">
                <div className="image-container-left">
                    <img src={map_image} alt ="map_image2" />
                </div>
                <div className="image-container-right">
                    <img src={radiotower_image} alt="radiotower_iamge"/>
                </div>
            </div>
            <div className="home-info-container">
                <InfoBox heading="5K+" text = "Free Things donated so far" />
                <InfoBox heading="1,234" text = "Free Things available right now" />
                <InfoBox heading="2K+" text = "Users" />
            </div>


        </div>
    );
}

export default Home;