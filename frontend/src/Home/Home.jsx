import React, { useEffect, useState } from "react";
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
    const [locations, setLocations] = useState([]);
    const [availableCount, setAvailableCount] = useState(0);
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch('http://localhost:8080/api/locations')
            .then(response => response.json())
            .then(locations => {
                setLocations(locations);
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/api/users/all')
            .then(response => response.json())
            .then(users => {
                setUsers(users);
            });
    }, []);

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
                <InfoBox heading={`${locations.length}`} text = "Free Things donated so far" />
                <InfoBox heading= {`${locations.length}`} text = "Free Things available right now" />
                <InfoBox heading={`${users.length}`} text = "Users" />
            </div>
        </div>
    );
}

export default Home;
