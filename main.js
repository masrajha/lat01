
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBuI-BYb36mw6WLb0nBE6Tn8lu-2QszRWo",
    authDomain: "testproject-4921f.firebaseapp.com",
    databaseURL: "https://testproject-4921f.firebaseio.com",
    projectId: "testproject-4921f",
    storageBucket: "testproject-4921f.appspot.com",
    messagingSenderId: "665460309043"
};
firebase.initializeApp(config);


var db = firebase.database();
var markerRef = db.ref('markers');
console.log(markerRef);

markerRef.on('value', updateInfo, showErr);
function updateInfo(data) {
    var marker = data.val();
    var info = "";
    kunci = Object.keys(data.val());
    for (var i = 0; i < kunci.length; i++) {
        console.log(marker[kunci[i]].coordinate.lat);
        var position = { lat: marker[kunci[i]].coordinate.lat, lng: marker[kunci[i]].coordinate.lng };
        createMarker(position, null, marker[kunci[i]].properties.info).setMap(map);

    }
}
function showErr(err) {
    document.getElementById('info').innerHTML = "Ada error " + err;
}
//referensi objek html
var lat = document.getElementById('lat');
var lng = document.getElementById('lng');
var infomarker = document.getElementById('infomarker');

document.getElementById('simpan').addEventListener('click',
    function (evt) {
        // console.log("klik ",lat.value,lng.value,infomarker.value);
        markerRef.push(
            {
                type: 'point',
                coordinate: { lat: parseFloat(lat.value), lng: parseFloat(lng.value) },
                properties: {
                    info: infomarker.value,
                    categories: {
                        kuliner: document.forms[0].cats[0].checked,
                        kantor: document.forms[0].cats[1].checked,
                        taman: document.forms[0].cats[2].checked,
                        tempatibadah: document.forms[0].cats[3].checked
                    }
                }
            }
        );
    });

//inisialisasi peta
var map = null;
function initMap() {
    var center = { lat: -5.351645650506815, lng: 105.40080353027338 };
    var options = {
        center: center,
        zoom: 10
    };
    map = new google.maps.Map(document.getElementById('map'), options);
    createMarker(center).setMap(map);


}

navigator.geolocation.getCurrentPosition(showPosition);
function showPosition(position) {
    lat.value = position.coords.latitude;
    lng.value = position.coords.longitude;
}

function createMarker(position, iconImg = null, info = null) {
    var marker = new google.maps.Marker(
        {
            position: position,
            icon: iconImg
        }
    );
    if (info) {
        var infowindow = new google.maps.InfoWindow(
            {
                content: info
            }
        );
        
        marker.addListener('click', function (e) {
            infowindow.open(map, marker);
        });
    }
    return marker;
}