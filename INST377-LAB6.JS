async function getData(latitude, longitude) {
    const mapData = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
        .then((res) => res.json());

    console.log(mapData);
    return mapData.locality
}

async function createMap() {
    var map = L.map('map').setView([32.5, -95], 8);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const latitudes = [] 
    const longitudes = [] 

    for (let i = 0; i < 3; i++) {
        latitudes.push(getRandomInRange(30, 35, 6));
        longitudes.push(getRandomInRange(-100, -90, 6)); 
    }


    console.log('latitudes:', latitudes); 
    console.log('longitudes:', longitudes); 

    for (let i = 0; i < 3; i++) {
        const locality = await getData(latitudes[i], longitudes[i]);
        console.log(locality)
        const marker = L.marker([latitudes[i], longitudes[i]]).addTo(map);
        const markerId = `marker${i+1}`;
        const localityId = `locality${i+1}`;
        const markerText = document.getElementById(markerId);
        const localityText = document.getElementById(localityId);
        markerText.innerHTML = (`Marker ${i+1}: latitude: ${latitudes[i]}, longitude: ${longitudes[i]}`);
        localityText.innerHTML =  (`Locality: ${locality}`); 
    }
}


window.onload = createMap;


function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}



