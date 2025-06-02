exports.isValidLatLng = (lat, lng) => {
    return (
      typeof lat === 'number' && typeof lng === 'number' &&
      lat >= -90 && lat <= 90 &&
      lng >= -180 && lng <= 180
    );
  };
  