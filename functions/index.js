const functions = require('firebase-functions');


exports.addText = functions.database.ref("texts/{textID}").onCreate((snapShot, context)=>{
    console.log("Node created");
});

exports.deleteText = functions.database.ref("texts/{textID}").onDelete((snapShot, context)=>{
    console.log("Text Node Deleted");
});

exports.updateText = functions.database.ref("texts/{textID}").onUpdate((snapShot, context)=>{
    console.log(context.params.textID);
    console.log(context.params.anotherParam);
    const msg = snapShot;
    console.log(snapShot);
    console.log("Node Updated");
});

//Devices

exports.addDevice = functions.database.ref("devices/{deviceID}").onCreate((sanpShot, context) =>{
    console.log("Device added");
})

exports.deleteDevice = functions.database.ref("devices/{deviceID}").onDelete((sanpShot, context) =>{
    console.log("Device Deleted");
})

exports.updateDevice = functions.database.ref("devices/{deviceID}").onUpdate((sanpShot, context) =>{

    console.log("DeviceID:" + context.params.deviceID);
    const snapAfter = snapShot.after.val();
    let deviceId = snapAfter["DeviceID"];
    let lat = snapAfter["Lat"];
    let lng = snapAfter["Lng"];
    let deviceName = snapAfter["Name"];
    console.log("DeviceID: " + snapAfter["DeviceID"] );
    console.log("Lat: " + snapAfter["Lat"] );
    console.log("Lng: " + snapAfter["Lng"] );
    console.log("Name: " + snapAfter["Name"] );

    

    var isInsideGeofence = isDeviceInsideGeofence(lat, lng);
    if(isInsideGeofence == true){
        console.log("**********************");
        console.log("Device " + deviceName + " is inside Geofence " + " Lat: "  + lat + " Lng : " + lng);
        return addAlert(deviceId, deviceName, lat, lng);
        console.log("**********************")
    }else{
        console.log("Not inside");
    }

    
    // console.log.apply(snapAfter);
    console.log("Device Updated");
});

function addAlert(deviceId, deviceName, lat, lng){
  let alertData = {
      alert: "Device in  Alert",
      dateTime: new Date().toUTCString(),
      deviceId: deviceId,
      deviceName: deviceName,
      lat: lat,
      lng: lng,
      sendInfo: "Not sent"
  };

  var alertLoc = "alerts/" + deviceId;
  var key = db.ref(alertLoc).push().key;
  alertLoc += "/" + key;
  console.log("Alert Location = " + alertLoc);

  let alertUpdates = {};
  alertUpdates[alertLoc] = alertData;

  return db.ref().update(alertUpdates);
}


function isDeviceInsideGeofence(lat, lng) {

    // Hardcoded right now we would change this when data comes from real database
    var latlngsString = '[{"lat": 47.6103309,"lng": -122.2073798},{"lat": 47.60941953,"lng": -122.206956},{"lat": 47.60925317,"lng": -122.2085814},{"lat": 47.6100669,"lng": -122.209075},{"lat": 47.61034175,"lng": -122.2079109}]';
    vertices_y = new Array();
    vertices_x = new Array();
    longitude_x = lng;
    latitude_y = lat;
    var latLngs = JSON.parse(latlngsString);
    var r = 0;
    var i = 0;
    var j = 0;
    var isDeviceInGeofence = false;
    var point = 0;
 
    for (r = 0; r < latLngs.length; r++) {
      vertices_y.push(latLngs[r].lat);
      vertices_x.push(latLngs[r].lng);
    }
    points_polygon = vertices_x.length;
    for (i = 0, j = points_polygon; i < points_polygon; j = i++) {
      point = i;
      if (point == points_polygon)
        point = 0;
      if (((vertices_y[point] > latitude_y != (vertices_y[j] > latitude_y)) && (longitude_x < (vertices_x[j] -
          vertices_x[point]) * (latitude_y - vertices_y[point]) / (vertices_y[j] - vertices_y[
          point]) + vertices_x[point])))
        isDeviceInGeofence = !isDeviceInGeofence;
    }
    if (isDeviceInGeofence) {
        db.ref("alerts")
          .push({
            alert: "Geo fence Alert",
            dateTime: new Date().toTimeString(),
            lat: lat,
            lng: lng
          })
          .then(() => {
            return isDeviceInGeofence;
          })
          .catch(error => {
            console.log("Error on updating Alerts" + error);
          });
      }
    
      return isDeviceInGeofence;
    }
//     return isDeviceInGeofence;
//   }
 




// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// exports.addDate = functions.https..onRequest((request, response) => {
//     if(req.method != 'GET'){
//         return response.status(403).send("Forbidden");
//     }
    
    
//     const test = new Date();
//     const snapShot = admin.database().ref('/dates').push({now: test.toDateString()});
//     // res.redirect(303, snapShot.ref.toString())
//     res.send(currDate.toDateString());
// }

// exports.addDevice = functions.https.onRequest((req, res) => {
//     if(req.method != 'POST'){
//         return response.status(403).send("Forbidden");
// }
// const deviceName = req.query.deviceID;
// const lat = req.query.lat;
// const lng = req.query.lng;

// console.log("Ashish:" + deviceName);
// console.log("Ashish:" + lat);
// console.log("Ashish:" + lng);

//     const snapShot = admin.database().ref('/devices').push(
//        {
//            deviceName: "testDevice",
//            lat: 0.0,
//            lng: 0.0
//        }
//    );
//    res.send("OK");
// });
// // //Add Alets function
// // exports.deviceAdded = functions.database
// // .ref("device/{deviceID}")
// // .onUpdate((snapShot,context) =>{
// //     const 

// // })do database triggers next class


