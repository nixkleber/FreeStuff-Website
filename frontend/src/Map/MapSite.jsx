import React, {useState, useEffect, useRef} from 'react';
import L from 'leaflet';
import './MapSite.css';
import markerIconOrange from './markerIconOrange.png'
import markerIconGreen from './markerIconGreen.png'

function MapSite() {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [locations, setLocations] = useState([]);

    const mapRef = useRef(null);
    const lastMarkerRef = useRef(null);

    const [showNewLocationForm, setShowNewLocationForm] = useState(false);

    const [isAddingLocation, setIsAddingLocation] = useState(false);

    const [newLocationCoordinates, setNewLocationCoordinates] = useState(null);

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

    function getMarkerIcon(color) {
        let iconUrl;

        if (color === "orange") {
            iconUrl = markerIconOrange;
        } else {
            iconUrl = markerIconGreen;
        }

        return (
            L.icon({
                iconUrl,
                iconSize: [60, 60],
                popupAnchor: [-3, -76],
            })
        )
    }

    function addMarkersToMap(map, setSelectedLocation, setShowNewLocationForm, locations) {
        const myIcon = getMarkerIcon("orange");
        locations.forEach(location => {
            const marker = L.marker([location.lat, location.lng], {icon: myIcon}).addTo(map);
            marker.on('click', () => {
                setSelectedLocation(location);
                setShowNewLocationForm(false);
            });
        });
    }

    useEffect(() => {
        const mapContainer = L.DomUtil.get('map');
        if (mapContainer != null) {
            mapContainer._leaflet_id = null;
        }
        const map = createMap();
        mapRef.current = map;

        mapRef.current.on('click', () => {
            setSelectedLocation(null);
        });

        fetch('http://localhost:8080/api/locations')
            .then(response => response.json())
            .then(locations => {
                setLocations(locations);
                addMarkersToMap(map, setSelectedLocation, setShowNewLocationForm, locations);
            });
    }, []);

    useEffect(() => {
        const handleMapClick = (event) => {
            if (isAddingLocation) {
                const {latlng} = event;
                const {lat, lng} = latlng;

                setNewLocationCoordinates([lat, lng]);

                if (lastMarkerRef.current) {
                    mapRef.current.removeLayer(lastMarkerRef.current);
                    lastMarkerRef.current = null;
                    setSelectedLocation(null);
                } else {
                    const newMarker = L.marker([lat, lng], {icon: getMarkerIcon("green")}).addTo(mapRef.current);
                    lastMarkerRef.current = newMarker;
                    const {x, y} = mapRef.current.latLngToContainerPoint(latlng);
                    const {width, height, top, left} = mapRef.current.getContainer().getBoundingClientRect();
                    const isClickOnMap = x >= left && x <= left + width && y >= top && y <= top + height;
                    if (isClickOnMap) {
                        setSelectedLocation(null);
                        setShowNewLocationForm(true);
                    }
                }
            }
        };


        if (isAddingLocation) {
            mapRef.current.on('click', handleMapClick);
        } else {
            mapRef.current.off('click', handleMapClick);
        }

        return () => {
            mapRef.current.off('click', handleMapClick);
        };
    }, [isAddingLocation]);

    useEffect(() => {
        const handleMapClick = () => {
            setShowNewLocationForm(false);
        };
        mapRef.current.on('click', handleMapClick);

        return () => {
            mapRef.current.off('click', handleMapClick);
        };
    }, []);

    function handleFormSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formData = {
            title: form.title.value,
            image: form.image.value,
            description: form.description.value,
            lat: newLocationCoordinates[0],
            lng: newLocationCoordinates[1],
            since: new Date().toISOString(),
            available: true
        };
        console.log(formData); // do something with the form data

        fetch('http://localhost:8080/api/locations/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to create location');
                }
                return response.json();
            })
            .then(location => {
                console.log('New location created:', location);
                setLocations([...locations, location]);
                mapRef.current.removeLayer(lastMarkerRef.current);
                const myIcon = getMarkerIcon("orange");
                const marker = L.marker([location.lat, location.lng], {icon: myIcon}).addTo(mapRef.current);

                marker.on('click', () => {
                    setSelectedLocation(location);
                    setShowNewLocationForm(false);
                });
                lastMarkerRef.current = null;
                setSelectedLocation(location);
                setIsAddingLocation(false);
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <div className="map-page">
            <div className="map-container">
                <button className={`button ${isAddingLocation ? 'red' : 'green'}`} onClick={() => setIsAddingLocation(!isAddingLocation)}>
                    {isAddingLocation ? <h3 className="red">Cancel</h3> : <h3 className="green">Add free stuff</h3>}
                </button>
                <div id="map"></div>
            </div>
            <div
                className={`info-container ${selectedLocation ? 'show' : ''}`}>
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
            <div
                className={`new-location-form-container ${showNewLocationForm && isAddingLocation ? 'show' : ''}`}>{/* add show class when selectedLocation is truthy */}

                    <div className="new-location-form">

                        <h2>Create a new location</h2>

                        <form onSubmit={handleFormSubmit}>

                            <table className="form-details">
                                <tbody>
                                <tr>
                                    <td className="form-details-left"><label htmlFor="title">Title:</label></td>
                                    <td className="form-details-right"><input type="text" id="title" name="title" required/></td>
                                </tr>
                                <tr>
                                    <td className="form-details-left"><label htmlFor="image">Image URL:</label></td>
                                    <td className="form-details-right"><input type="text" id="image" name="image" required/></td>
                                </tr>
                                <tr>
                                    <td className="form-details-left"> <label htmlFor="description">Description:</label></td>
                                    <td className="form-details-right"><textarea id="description" name="description" rows="5"></textarea></td>
                                </tr>
                                </tbody>
                            </table>

                            <button type="submit">Submit new location</button>
                        </form>

                    </div>
            </div>
        </div>
    );
}

export default MapSite;
