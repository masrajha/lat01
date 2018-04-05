
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
document.getElementById('info').innerHTML = "Info";

var markerRef = db.ref('markers');
console.log(markerRef);

markerRef.on('value', updateInfo, showErr);
function updateInfo(data) {
    var marker = data.val();
    var info = "";
    kunci = Object.keys(data.val());
    for (var i = 0; i < kunci.length; i++) {
        // console.log(kunci[i]);
        console.log(marker[kunci[i]].coord.lat);
        info += marker[kunci[i]].coord.lat + "<br>";
    }
    document.getElementById('info').innerHTML = info;
    // console.log(marker[kunci[0]].val());


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
                coord:{lat:lat.value,lng:lng.value},
                info:infomarker.value 
            }
        );
    });
