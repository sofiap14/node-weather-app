function initMap(lat, lon) {
    // Create a new map centered on the coordinates retrieved from the weather API
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat, lng: lon },
      zoom: 8,
    });
  
    // Add a marker to the map at the center coordinates
    const marker = new google.maps.Marker({
      position: { lat, lng: lon },
      map: map,
    });
  }
  