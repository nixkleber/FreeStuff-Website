import React, {useState, useEffect} from 'react';
import L from 'leaflet';
import locations from './locations';
import './Map.css';
import markerIcon from './markerIcon.png'

function createMap() {
    const map = L.map('map', {
        center: [52.5200, 13.4050],
        zoom: 13,
        dragging: true,
    });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    return map;
}

function addMarkersToMap(map, setSelectedLocation) {
    const myIcon = L.icon({
        iconUrl: markerIcon,
        iconSize: [38, 38],
        popupAnchor: [-3, -76],
    });
    locations.forEach(location => {
        const marker = L.marker([location.lat, location.lng], {icon: myIcon}).addTo(map);
        marker.on('click', () => {
            setSelectedLocation(location);
        });
    });
}

function Map() {
    const [selectedLocation, setSelectedLocation] = useState(null);

    useEffect(() => {
        const mapContainer = L.DomUtil.get('map');
        if (mapContainer != null) {
            mapContainer._leaflet_id = null;
        }
        const map = createMap();
        addMarkersToMap(map, setSelectedLocation);
    }, []);


    return (
        <div className="map-page">
            <div className="map-container">
                <div id="map"></div>
            </div>
            <div className="info-container">
                {selectedLocation && (
                    <>
                        <h2>{selectedLocation.title}</h2>
                        <img src={selectedLocation.image} alt={selectedLocation.title}/>
                        <p>{selectedLocation.description}</p>
                    </>
                )}
            </div>
        </div>
    );
}

export default Map;
