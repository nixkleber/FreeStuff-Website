import React from 'react';
import L from 'leaflet';
import markerIconOrange from './markerIconOrange.png';
import markerIconGreen from './markerIconGreen.png';

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

function Marker({ location, isSelected, onClick }) {
    const markerRef = React.useRef(null);

    React.useEffect(() => {
        const markerOptions = { icon: getMarkerIcon(isSelected ? 'green' : 'orange') };
        markerRef.current = L.marker([location.lat, location.lng], markerOptions);
        markerRef.current.on('click', onClick);
        return () => {
            markerRef.current.off('click', onClick);
            markerRef.current.remove();
        }
    }, [location, isSelected, onClick]);

    React.useEffect(() => {
        if (isSelected) {
            markerRef.current.setIcon(getMarkerIcon('green'));
        } else {
            markerRef.current.setIcon(getMarkerIcon('orange'));
        }
    }, [isSelected]);

    return null;
}

export default Marker;
