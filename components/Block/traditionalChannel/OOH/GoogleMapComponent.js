// GoogleMapComponent.js
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 47.918873, // Example latitude
  lng: 106.917881 // Example longitude
};

const locations = [
  { id: 1, title: 'LED Screen 1', position: { lat: 47.920873, lng: 106.917881 }, info: 'Хүнсний нэг' },
  { id: 2, title: 'LED Screen 2', position: { lat: 47.918873, lng: 106.919881 }, info: 'Сүхбаатарын талбайн ЛЕД' },
  { id: 3, title: 'LED Screen 3', position: { lat: 47.914799, lng: 106.916280 }, info: 'Улсын төв номын сан' },
  { id: 4, title: 'LED Screen 4', position: { lat: 47.910765, lng: 106.920401 }, info: 'Соёл амралтын хүрээлэн' },
  { id: 5, title: 'LED Screen 5', position: { lat: 47.913433, lng: 466.904887 }, info: 'Сөүлийн гудамж' },
  { id: 6, title: 'LED Screen 6', position: { lat: 47.902785, lng: 466.915293 }, info: 'Наадмын талбай' },
  // Add more locations as needed
];

const GoogleMapComponent = () => {
    const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
  };

  const handleCloseInfoWindow  = () => {
    setSelectedLocation(null);
  };

  return (
    <>
      <LoadScript googleMapsApiKey="AIzaSyC_3ggBdEtjomUHiERqGsNQHeCvntOYHwk">
        <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={15}>
          {locations.map((location) => (
            <Marker
              key={location.id}
              position={location.position}
              title={location.title}
              onClick={() => handleMarkerClick(location)}
            />
          ))}
          {selectedLocation && (
          <InfoWindow
            position={selectedLocation.position}
            onCloseClick={handleCloseInfoWindow}
          >
            <div className='location-container'>
              <h2>{selectedLocation.title}</h2>
              <p>{selectedLocation.info}</p>
            </div>
          </InfoWindow>
        )}
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default GoogleMapComponent;
