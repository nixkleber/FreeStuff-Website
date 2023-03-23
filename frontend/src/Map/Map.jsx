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

function addMarkersToMap(map, setSelectedLocation, locations) {
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
    const [locations, setLocations] = useState([]);


    useEffect(() => {
        const mapContainer = L.DomUtil.get('map');
        if (mapContainer != null) {
            mapContainer._leaflet_id = null;
        }
        const map = createMap();

        fetch('http://localhost:8080/api/locations')
            .then(response => response.json())
            .then(locations => {
                setLocations(locations);
                addMarkersToMap(map, setSelectedLocation, locations);
            });
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
                        <table className="info-details">
                            <tbody>
                            <tr>
                                <td className="info-details-left"><p>Description:</p></td>
                                <td><p>{selectedLocation.description}</p></td>
                            </tr>
                            <tr>
                                <td className="info-details-left"><p>Since:</p></td>
                                <td><p>{selectedLocation.since}</p></td>
                            </tr>
                            </tbody>
                        </table>
                    </>
                )}
            </div>

        </div>
    );
}

export default Map;
