document.getElementById("searchIcon").addEventListener("click", search);

function search() {
    // Trim input to handle extra spaces
    const queryName = document.getElementById("searchInput").value.trim();
    
    // Check for empty input
    if (!queryName) {
        alert(`Please enter a valid search query.`);
        return;
    }
    const result = data.find(item => item.name.toLowerCase() === queryName.toLowerCase());

    if (result) {
        // Open a new window and write the content dynamically
        const newWindow = window.open("", "_blank");
        newWindow.document.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
                <link rel="stylesheet" href="geolocation.css" />
                <link rel="icon" href="cow.jpg" type="image/x-icon">
                 <link rel="stylesheet" href="img.css" />
                <title>${result.name}</title>
            </head>
            <body>
                <div id="layer">
                    <h1>${result.name}</h1>
                    ${
                        result.imageurl
                            ? `<img src="${result.imageurl}" alt="${result.name}">`
                            : ""
                    }
                    <p><span>Category:</span> ${result.category}</p>
                    <p><span>Location:</span> ${result.location}</p>
                    <p><span>Hours of Operation:</span> ${result.hours_of_operation}</p>
                    <p><span>Contact Info:</span> ${result.contact_info}</p>
                    <p><span>Entry Fee:</span> ${result.entry_fee}</p>
                    <p><span>Rating:</span> ${result.rating}</p>
                    <button onclick="window.close()">Close</button>
                </div>
            </body>
            </html>
            <h3 style="text-align: center;">Bangalore Points of Interest</h3>
    <div id="map"></div>
    <div id="suggestions"><b>Nearest Suggestions (Currently Open in Green):</b></div>

    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <script>
        // Helper function to parse operational hours
        function isOpenNow(hours) {
            if (!hours || hours.toLowerCase() === "closed to public") return false;
            const now = new Date();
            const currentHour = now.getHours();
            const currentMinute = now.getMinutes();
            const [start, end] = hours.split(' - ').map(h => {
                const [hour, minute] = h.split(':').map(Number);
                return hour * 60 + (minute || 0);
            });
            const nowMinutes = currentHour * 60 + currentMinute;
            return nowMinutes >= start && nowMinutes <= end;
        }

        const map = L.map('map').setView([12.9716, 77.5946], 12); // Default Bangalore center

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Array of Bangalore places
        const bangalorePlaces = [
        { name: "Lalbagh Botanical Garden", category: "Tourist Attraction", lat: 12.9507, lng: 77.5848, hours: "6:00 - 19:00", description: "Entry Fee: Rs. 20" },
        { name: "Bangalore Palace", category: "Historical Site", lat: 12.9987, lng: 77.5922, hours: "10:00 - 17:30", description: "Entry Fee: Rs. 230 (Indians)" },
        { name: "Mavalli Tiffin Room (MTR)", category: "Restaurant", lat: 12.9436, lng: 77.5848, hours: "6:30 - 21:00", description: "Entry Fee: None" },
        { name: "Cubbon Park", category: "Park", lat: 12.9763, lng: 77.5929, hours: "6:00 - 18:00", description: "Entry Fee: Free" },
        { name: "Tipu Sultan's Summer Palace", category: "Historical Site", lat: 12.9593, lng: 77.5736, hours: "8:30 - 17:30", description: "Entry Fee: Rs. 20" },
        { name: "Nandi Hills", category: "Nature Spot", lat: 13.3702, lng: 77.6835, hours: "6:00 - 18:00", description: "Entry Fee: Rs. 5" },
        { name: "Commercial Street", category: "Shopping Area", lat: 12.9847, lng: 77.6050, hours: "10:00 - 20:00", description: "Entry Fee: Free" },
        { name: "UB City", category: "Shopping Mall", lat: 12.9719, lng: 77.5969, hours: "10:00 - 23:00", description: "Entry Fee: Free" },
        { name: "Bannerghatta National Park", category: "Wildlife Park", lat: 12.8003, lng: 77.5771, hours: "9:00 - 17:00", description: "Entry Fee: Rs. 80 (Indians)" },
        { name: "Vidhana Soudha", category: "Government Building", lat: 12.9786, lng: 77.5890, hours: "Closed to Public", description: "Entry Fee: Free" },
        { name: "Ramanagaram", category: "Nature Spot", lat: 12.5674, lng: 77.3384, hours: "24 Hours", description: "Entry Fee: Free, Contact: +91 80 2336 0000" },
        { name: "Sri Chamarajendra Park", category: "Park", lat: 12.9765, lng: 77.5932, hours: "5:30 AM - 8 PM", description: "Entry Fee: Free, Contact: +91 80 2286 4567" },
        { name: "Vishveshwarya Industrial and Technological Museum", category: "Museum", lat: 12.9717, lng: 77.5947, hours: "10 AM - 6 PM", description: "Entry Fee: Rs. 50, Contact: +91 80 2227 7362" },
        { name: "Sri Kanteerava Indoor Stadium", category: "Sports Complex", lat: 12.9745, lng: 77.5953, hours: "9 AM - 10 PM", description: "Entry Fee: Varies, Contact: +91 80 2237 5455" },
        { name: "Bangalore Fort", category: "Historical Site", lat: 12.9495, lng: 77.5741, hours: "9 AM - 6 PM", description: "Entry Fee: Rs. 15, Contact: +91 80 2221 4367" },
        { name: "Jayanagar 4th Block", category: "Shopping Area", lat: 12.9301, lng: 77.5832, hours: "10 AM - 9 PM", description: "Entry Fee: Free" },
        { name: "Malleswaram", category: "Shopping Area", lat: 13.0089, lng: 77.5727, hours: "10 AM - 8 PM", description: "Entry Fee: Free" },
        { name: "Jawahar Bal Bhavan", category: "Amusement Park", lat: 12.9740, lng: 77.5930, hours: "10 AM - 5 PM", description: "Entry Fee: Rs. 25, Contact: +91 80 2222 3899" },
        { name: "Shivagange", category: "Religious/Adventure Spot", lat: 13.2742, lng: 77.4874, hours: "24 Hours", description: "Entry Fee: Free, Contact: +91 80 2339 7877" },
        { name: "Basavanagudi Bull Temple", category: "Religious Site", lat: 12.9409, lng: 77.5760, hours: "6 AM - 8 PM", description: "Entry Fee: Free, Contact: +91 80 2661 0088" },
        { name: "Innovative Film City", category: "Amusement Park", lat: 12.9072, lng: 77.6282, hours: "10 AM - 7 PM", description: "Entry Fee: Rs. 600, Contact: +91 80 2200 0000" },
        { name: "Ulsoor Lake", category: "Lake", lat: 12.9736, lng: 77.6123, hours: "6 AM - 8 PM", description: "Entry Fee: Free, Contact: +91 80 2221 0000" },
        { name: "Hesaraghatta Lake", category: "Nature Spot", lat: 13.1293, lng: 77.5879, hours: "24 Hours", description: "Entry Fee: Free, Contact: +91 80 2332 4444" },
        { name: "The National Gallery of Modern Art", category: "Art Gallery", lat: 12.9783, lng: 77.5948, hours: "10 AM - 5 PM", description: "Entry Fee: Rs. 20, Contact: +91 80 2235 0411" },
        { name: "Gavi Gangadhareshwara Temple", category: "Religious Site", lat: 12.9405, lng: 77.5726, hours: "6 AM - 8 PM", description: "Entry Fee: Free, Contact: +91 80 2648 1140" },
        { name: "Hebbal Lake", category: "Lake", lat: 13.0484, lng: 77.5972, hours: "6 AM - 6 PM", description: "Entry Fee: Free, Contact: +91 80 2348 5858" },
        { name: "Lumbini Gardens", category: "Park", lat: 13.0505, lng: 77.6098, hours: "10 AM - 6 PM", description: "Entry Fee: Rs. 50, Contact: +91 80 2324 5454" },
        { name: "Bugle Rock", category: "Nature Spot", lat: 12.9451, lng: 77.5744, hours: "6 AM - 6 PM", description: "Entry Fee: Free, Contact: +91 80 2222 3092" }
    ];
    
        function calculateDistance(lat1, lng1, lat2, lng2) {
            const R = 6371; // Earth's radius in km
            const dLat = (lat2 - lat1) * (Math.PI / 180);
            const dLng = (lng2 - lng1) * (Math.PI / 180);
            const a = 
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
                Math.sin(dLng / 2) * Math.sin(dLng / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c; // Distance in km
        }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                const places = bangalorePlaces
                    .map(place => {
                        place.distance = calculateDistance(userLat, userLng, place.lat, place.lng);
                        place.open = isOpenNow(place.hours);
                        return place;
                    })
                    .sort((a, b) => a.distance - b.distance);
                let suggestionsHtml = "<ul>";
                places.forEach(place => {
                    const markerColor = place.open ? "green" : "blue";
                    const marker = L.circleMarker([place.lat, place.lng], {
                        radius: 8,
                        color: markerColor,
                        fillColor: markerColor,
                        fillOpacity: 0.8
                    }).addTo(map);

                    marker.bindPopup("<b>" + place.name + "</b><br>" + place.category+ "<br>" + place.description + "<br><b>Distance:</b>" + place.distance.toFixed(2) + " km");
                    suggestionsHtml += "<li><b>" + place.name + "</b> (" + place.category + ") - " + place.distance.toFixed(2) + " km away</li>";
                });
                suggestionsHtml += "</ul>";
                document.getElementById("suggestions").innerHTML += suggestionsHtml;

                const userIcon = L.divIcon({
                    className: 'user-location-icon'
                });
                L.marker([userLat, userLng], { icon: userIcon }).addTo(map)
                    .bindPopup("You are here!")
                    .openPopup();

                map.setView([userLat, userLng], 13);
            }, error => {
                alert("Error getting your location. Showing default map.");
            });
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    </script>
        `);
        newWindow.document.close();
    } else {
        // Alert if no match is found
        alert(`No matching result found.
        Try : Bangalore Palace`);
    }
}
const data = [
        {
          "name": "Lalbagh Botanical Garden",
          "category": "Tourist Attraction",
          "location": "Mavalli, Bangalore",
          "hours_of_operation": "6 AM - 7 PM",
          "contact_info": "+91 80 2657 8184",
          "entry_fee": "Rs. 20",
          "rating": 4.5
        },
        {
          "name": "Bangalore Palace",
          "category": "Historical Site",
          "location": "Vasanth Nagar, Bangalore",
          "hours_of_operation": "10 AM - 5:30 PM",
          "contact_info": "+91 80 2336 0818",
          "entry_fee": "Rs. 230 (Indians)",
          "rating": 4.3
        },
        {
          "name": "Mavalli Tiffin Room (MTR)",
          "category": "Restaurant",
          "location": "Basavanagudi, Bangalore",
          "hours_of_operation": "6:30 AM - 11 AM, 12 PM - 9 PM",
          "contact_info": "+91 80 2222 0022",
          "entry_fee": "None",
          "rating": 4.7
        },
        {
          "name": "Cubbon Park",
          "category": "Park",
          "location": "Kasturba Road, Bangalore",
          "hours_of_operation": "6 AM - 6 PM",
          "contact_info": "+91 80 2286 4567",
          "entry_fee": "Free",
          "rating": 4.6
        },
        {
          "name": "Tipu Sultan's Summer Palace",
          "category": "Historical Site",
          "location": "Chamrajpet, Bangalore",
          "hours_of_operation": "8:30 AM - 5:30 PM",
          "contact_info": "+91 80 2670 6836",
          "entry_fee": "Rs. 20",
          "rating": 4.2
        },
        {
          "name": "Nandi Hills",
          "category": "Nature Spot",
          "location": "Chikkaballapur, near Bangalore",
          "hours_of_operation": "6 AM - 6 PM",
          "contact_info": "+91 8156 260836",
          "entry_fee": "Rs. 5",
          "rating": 4.4
        },
        {
          "name": "Commercial Street",
          "category": "Shopping Area",
          "location": "Shivajinagar, Bangalore",
          "hours_of_operation": "10 AM - 8 PM",
          "contact_info": "-",
          "entry_fee": "Free",
          "rating": 4.3
        },
        {
          "name": "UB City",
          "category": "Shopping Mall",
          "location": "Vittal Mallya Road, Bangalore",
          "hours_of_operation": "10 AM - 11 PM",
          "contact_info": "+91 80 2222 3456",
          "entry_fee": "Free",
          "rating": 4.5
        },
        {
          "name": "Bannerghatta National Park",
          "category": "Wildlife Park",
          "location": "Bannerghatta, Bangalore",
          "hours_of_operation": "9 AM - 5 PM",
          "contact_info": "+91 80 2977 7483",
          "entry_fee": "Rs. 80 (Indians)",
          "rating": 4.4
        },
        {
          "name": "Vidhana Soudha",
          "category": "Government Building",
          "location": "Dr. Ambedkar Rd, Bangalore",
          "hours_of_operation": "Closed to public",
          "contact_info": "-",
          "entry_fee": "Free",
          "rating": 4.3
        },
        
           {
              "name": "Ramanagaram",
              "category": "Nature Spot",
              "location": "Ramanagaram, Bangalore",
              "hours_of_operation": "24 Hours",
              "contact_info": "+91 80 2336 0000",
              "entry_fee": "Free",
              "rating": 4.6
            },
            {
              "name": "Sri Chamarajendra Park",
              "category": "Park",
              "location": "Cubbon Park, Bangalore",
              "hours_of_operation": "5:30 AM - 8 PM",
              "contact_info": "+91 80 2286 4567",
              "entry_fee": "Free",
              "rating": 4.4
            },
            {
              "name": "Vishveshwarya Industrial and Technological Museum",
              "category": "Museum",
              "location": "Kasturba Road, Bangalore",
              "hours_of_operation": "10 AM - 6 PM",
              "contact_info": "+91 80 2227 7362",
              "entry_fee": "Rs. 50",
              "rating": 4.2
            },
            {
              "name": "Nandi Hills",
              "category": "Nature Spot",
              "location": "Chikkaballapur, Bangalore",
              "hours_of_operation": "6 AM - 6 PM",
              "contact_info": "+91 8156 260836",
              "entry_fee": "Rs. 5",
              "rating": 4.4
            },
            {
              "name": "Sri Kanteerava Indoor Stadium",
              "category": "Sports Complex",
              "location": "Kanteerava Stadium, Bangalore",
              "hours_of_operation": "9 AM - 10 PM",
              "contact_info": "+91 80 2237 5455",
              "entry_fee": "Varies",
              "rating": 4.1
            },
            {
              "name": "Bangalore Fort",
              "category": "Historical Site",
              "location": "K.R. Market, Bangalore",
              "hours_of_operation": "9 AM - 6 PM",
              "contact_info": "+91 80 2221 4367",
              "entry_fee": "Rs. 15",
              "rating": 3.9
            },
            {
              "name": "Jayanagar 4th Block",
              "category": "Shopping Area",
              "location": "Jayanagar, Bangalore",
              "hours_of_operation": "10 AM - 9 PM",
              "contact_info": "-",
              "entry_fee": "Free",
              "rating": 4.2
            },
            {
              "name": "Malleswaram",
              "category": "Shopping Area",
              "location": "Malleswaram, Bangalore",
              "hours_of_operation": "10 AM - 8 PM",
              "contact_info": "-",
              "entry_fee": "Free",
              "rating": 4.1
            },
            {
              "name": "Jawahar Bal Bhavan",
              "category": "Amusement Park",
              "location": "Cubbon Park, Bangalore",
              "hours_of_operation": "10 AM - 5 PM",
              "contact_info": "+91 80 2222 3899",
              "entry_fee": "Rs. 25",
              "rating": 4.3
            },
            {
              "name": "Shivagange",
              "category": "Religious/Adventure Spot",
              "location": "Tumkur District, near Bangalore",
              "hours_of_operation": "24 Hours",
              "contact_info": "+91 80 2339 7877",
              "entry_fee": "Free",
              "rating": 4.5
            },
            {
              "name": "Basavanagudi Bull Temple",
              "category": "Religious Site",
              "location": "Basavanagudi, Bangalore",
              "hours_of_operation": "6 AM - 8 PM",
              "contact_info": "+91 80 2661 0088",
              "entry_fee": "Free",
              "rating": 4.2
            },
            {
              "name": "Innovative Film City",
              "category": "Amusement Park",
              "location": "Bangalore-Mysore Highway",
              "hours_of_operation": "10 AM - 7 PM",
              "contact_info": "+91 80 2200 0000",
              "entry_fee": "Rs. 600",
              "rating": 4.0
            },
            {
              "name": "Ulsoor Lake",
              "category": "Lake",
              "location": "Ulsoor, Bangalore",
              "hours_of_operation": "6 AM - 8 PM",
              "contact_info": "+91 80 2221 0000",
              "entry_fee": "Free",
              "rating": 4.3
            },
            {
              "name": "Hesaraghatta Lake",
              "category": "Nature Spot",
              "location": "Hesaraghatta, Bangalore",
              "hours_of_operation": "24 Hours",
              "contact_info": "+91 80 2332 4444",
              "entry_fee": "Free",
              "rating": 4.2
            },
            {
              "name": "The National Gallery of Modern Art",
              "category": "Art Gallery",
              "location": "Palace Road, Bangalore",
              "hours_of_operation": "10 AM - 5 PM",
              "contact_info": "+91 80 2235 0411",
              "entry_fee": "Rs. 20",
              "rating": 4.6
            },
            {
              "name": "Gavi Gangadhareshwara Temple",
              "category": "Religious Site",
              "location": "Gavipuram, Bangalore",
              "hours_of_operation": "6 AM - 8 PM",
              "contact_info": "+91 80 2648 1140",
              "entry_fee": "Free",
              "rating": 4.5
            },
            {
              "name": "Hebbal Lake",
              "category": "Lake",
              "location": "Hebbal, Bangalore",
              "hours_of_operation": "6 AM - 6 PM",
              "contact_info": "+91 80 2348 5858",
              "entry_fee": "Free",
              "rating": 4.2
            },
            {
              "name": "Lumbini Gardens",
              "category": "Park",
              "location": "Hebbal, Bangalore",
              "hours_of_operation": "10 AM - 6 PM",
              "contact_info": "+91 80 2324 5454",
              "entry_fee": "Rs. 50",
              "rating": 4.3
            },
            {
              "name": "Bugle Rock",
              "category": "Nature Spot",
              "location": "Basavanagudi, Bangalore",
              "hours_of_operation": "6 AM - 6 PM",
              "contact_info": "+91 80 2222 3092",
              "entry_fee": "Free",
              "rating": 4.0
            }
          
          
];
