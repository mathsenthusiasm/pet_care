const btn = document.getElementById("findBtn");
const statusText = document.getElementById("status");
const results = document.getElementById("results");

// Create Map
const map = L.map("map").setView([28.6139, 77.2090], 5);

// OpenStreetMap Layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors"
}).addTo(map);

// Button Click
btn.addEventListener("click", () => {

  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  statusText.innerHTML = "Getting your location...";

  navigator.geolocation.getCurrentPosition(
    success,
    error
  );
});

// Success
function success(position) {

  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  statusText.innerHTML =
    `Location Found Successfully`;

  // Zoom map
  map.setView([lat, lon], 14);

  // User Marker
  L.marker([lat, lon])
    .addTo(map)
    .bindPopup("📍 You are here")
    .openPopup();

  // ALWAYS SHOW CLINICS
  showClinics(lat, lon);
}

// Error
function error() {
  alert("Please allow location access");
}

// Show Clinics
function showClinics(lat, lon) {

  results.innerHTML = "";

  // Demo Clinics
  const clinics = [

    {
      name: "City Pet Hospital",
      lat: lat + 0.01,
      lon: lon + 0.01
    },

    {
      name: "Animal Care Center",
      lat: lat - 0.01,
      lon: lon + 0.02
    },

    {
      name: "Pet Emergency Clinic",
      lat: lat + 0.02,
      lon: lon - 0.01
    },

    {
      name: "Happy Paws Veterinary",
      lat: lat - 0.015,
      lon: lon - 0.015
    }

  ];

  clinics.forEach((clinic) => {

    // Marker
    L.marker([clinic.lat, clinic.lon])
      .addTo(map)
      .bindPopup(clinic.name);

    // Clinic Card
    results.innerHTML += `
      <div class="clinic">

        <h3>${clinic.name}</h3>

        <p>Nearby Pet Medical Service</p>

        <a href="https://www.google.com/maps?q=${clinic.lat},${clinic.lon}"
           target="_blank">

           Open in Maps

        </a>

      </div>
    `;
  });
}