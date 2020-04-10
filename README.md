# Google-Functions-API

Controller     API       -->        1...2...3...4...(List)

(Java) function: simulating the devices, send the device over there including the lat and lng. 
Then go and check the list of geofences. To check if this device inside a geofence or not.
And the function that was implemented by sending the line to the lattitude and longitude, and we will send
a geofence that basically tell if the device inside there.

Alert Table. Once the row is added in the alert table we actually send SMS or email. This will do through
twilio.

Finding one lat, lng in many 1 million geofences will take a long time. Every time a device calls, I will 
assign it a Zone ID, based on the longitude and lattitude.
See how many geofences are there in a zone, and we'll query only those zones. So there will be additional
call of signing a geofence or getting a geofence based on the lat, lng and zone ID. Querying this database and
finding that out.  

(Web page or android)
