import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare const google: any;
interface Marker {
    lat: number;
    lng: number;
    label?: string;
    draggable?: boolean;
}
@Component({
    selector: 'app-maps',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

    @ViewChild('map') mapElement: ElementRef;

    map = null;

    myCurrentLocation = null;
    biranchi_Lat = 3.1756663000000005;
    biranchi_long = 101.6843509;


    directionsService: any;
    directionsDisplay: any;
    distanceMsg = "";

    biranchi_dest_marker = null;


    constructor() { }

    ngOnInit() {

    }

    ngAfterViewInit() {

        var self = this;

        const biranchiLatlng = new google.maps.LatLng(this.biranchi_Lat, this.biranchi_long);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log("Current Lat :" + position.coords.latitude);
                console.log("Current Lng :" + position.coords.longitude);

                // Testing
                // self.myCurrentLocation = new google.maps.LatLng(3.187986, 101.689773);

                self.myCurrentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                var destinationLatLng = new google.maps.LatLng(self.biranchi_Lat, self.biranchi_long);


                //self.showCurrLocationOnMap();

                self.getDistanceBetweenPoints(self.myCurrentLocation, destinationLatLng, 'km', function (result) {
                    self.distanceMsg = "Approx. <b>" + result + " km</b> away";

                    console.log("distanceMsg : " + self.distanceMsg);
                });


                self.drawRouteMap();


            });
        } else {

            self.addMarker("Biranchi's Location", biranchiLatlng);
            console.log("Adding marker to Biranchi's location : " + biranchiLatlng.lat() + ',' + biranchiLatlng.lng());
        }

        const mapOptions = {
            zoom: 13,
            center: biranchiLatlng,
            scrollwheel: false, // we disable de scroll over the map, it is a really annoing when you scroll through page
            styles: [
                { 'featureType': 'water', 'stylers': [{ 'saturation': 43 }, { 'lightness': -11 }, { 'hue': '#0088ff' }] },
                {
                    'featureType': 'road', 'elementType': 'geometry.fill', 'stylers': [{ 'hue': '#ff0000' },
                    { 'saturation': -100 }, { 'lightness': 99 }]
                },
                {
                    'featureType': 'road', 'elementType': 'geometry.stroke', 'stylers': [{ 'color': '#808080' },
                    { 'lightness': 54 }]
                },
                { 'featureType': 'landscape.man_made', 'elementType': 'geometry.fill', 'stylers': [{ 'color': '#ece2d9' }] },
                { 'featureType': 'poi.park', 'elementType': 'geometry.fill', 'stylers': [{ 'color': '#ccdca1' }] },
                { 'featureType': 'road', 'elementType': 'labels.text.fill', 'stylers': [{ 'color': '#767676' }] },
                { 'featureType': 'road', 'elementType': 'labels.text.stroke', 'stylers': [{ 'color': '#ffffff' }] },
                { 'featureType': 'poi', 'stylers': [{ 'visibility': 'off' }] },
                {
                    'featureType': 'landscape.natural', 'elementType': 'geometry.fill', 'stylers': [{ 'visibility': 'on' },
                    { 'color': '#b8cb93' }]
                },
                { 'featureType': 'poi.park', 'stylers': [{ 'visibility': 'on' }] },
                { 'featureType': 'poi.sports_complex', 'stylers': [{ 'visibility': 'on' }] },
                { 'featureType': 'poi.medical', 'stylers': [{ 'visibility': 'on' }] },
                { 'featureType': 'poi.business', 'stylers': [{ 'visibility': 'simplified' }] }
            ]
        };

        // this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);




        //----------------- Destination Marker Start ------------------------

        self.biranchi_dest_marker = new google.maps.Marker({
            position: biranchiLatlng,
            icon: {
                url: 'assets/img/svg_PinRed.svg'
            },
            title: 'Biranchi\'s Location'
        });
        self.biranchi_dest_marker.setMap(self.map);


        const dest_infowindow = new google.maps.InfoWindow({
            content: 'Biranchi\'s Location' + self.distanceMsg
        });

        self.biranchi_dest_marker.addListener('click', function () {
            if (self.distanceMsg && self.distanceMsg.length) {
                dest_infowindow.setContent('Biranchi\'s Location <br>' + self.distanceMsg);
            }
            dest_infowindow.open(self.map, self.biranchi_dest_marker);
        });

        setTimeout(function () {
            google.maps.event.trigger(self.biranchi_dest_marker, 'click');
        }, 2500);

        //----------------- Destination Marker End ------------------------

    }



    showCurrLocationOnMap() {

        var self = this;
        //----------------- Source Marker Start ------------------------

        if (self.myCurrentLocation) {
            const source_marker = new google.maps.Marker({
                position: self.myCurrentLocation,
                icon: {
                    url: 'assets/img/svg_PinBlue.svg'
                },
                title: 'My Location',

            });
            source_marker.setMap(this.map);
        }

        //----------------- Source Marker Start ------------------------


    }



    //=================== Distance Calculation Start ================

    getDistanceBetweenPoints(start, end, units, callback) {

        let earthRadius = {
            miles: 3958.8,
            km: 6371
        };

        // console.log("start : ", start.toString(), ", type: ", typeof (start));
        // console.log("end : ", end.toString(), ", type: ", typeof (end));


        let R = earthRadius[units || 'miles'];
        let lat1 = start.lat();
        let lon1 = start.lng();
        let lat2 = end.lat();
        let lon2 = end.lng();

        // console.log("lat1 : ", lat1, ",lon1 : ", lon1);
        // console.log("lat2 : ", lat2, ",lon2 : ", lon2);

        let dLat = this.toRad((lat2 - lat1));
        let dLon = this.toRad((lon2 - lon1));


        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c;

        //return d;
        callback(d.toFixed(2));
    }


    toRad(x) {
        return x * Math.PI / 180;
    }

    //=================== Distance Calculation  Ends ==================




    //====================== Direction Service Start =================================


    // startDirectionServices(callback) {

    //     this.directionsService = new google.maps.DirectionsService;
    //     this.directionsDisplay = new google.maps.DirectionsRenderer({
    //         map: this.map
    //     });

    //     callback("success");
    // }

    //====================== Direction Service End =================================




    drawRouteMap() {

        var self = this;

        this.directionsService = new google.maps.DirectionsService;
        this.directionsDisplay = new google.maps.DirectionsRenderer({
            map: this.map,
            suppressMarkers: true
        });

        var stepDisplay = new google.maps.InfoWindow;


        var request = {
            origin: { lat: this.myCurrentLocation.lat(), lng: this.myCurrentLocation.lng() },
            destination: { lat: this.biranchi_Lat, lng: this.biranchi_long },
            waypoints: [],
            optimizeWaypoints: false,
            travelMode: 'DRIVING'
        };

        //console.log("drawRouteMap request : " + JSON.stringify(request));

        this.directionsService.route(request, function (response, status) {
            //console.log("directionsService response : ", JSON.stringify(response));
            console.log("directionsService status : ", status);

            if (status === 'OK') {

                //--------- Static Maps Start ------------

                var start = self.myCurrentLocation.lat() + ',' + self.myCurrentLocation.lng();
                var end = self.biranchi_Lat + ',' + self.biranchi_long;

                // var path = response.routes[0].overview_polyline;
                // var lmarkers = [];
                // var waypoints_labels = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];
                // var waypoints_label_iter = 0;
                // lmarkers.push("markers=color:green|label:" + waypoints_labels[waypoints_label_iter] + '|' + start);

                // for (var i = 0; i < request.waypoints.length; i++) {
                //     //I have waypoints that are not stopovers I dont want to display them
                //     //if (request.waypoints[i].stopover == true) {
                //     lmarkers.push("markers=color:blue|label:" + waypoints_labels[++waypoints_label_iter] + '|' + request.waypoints[i].location.lat() + "," + request.waypoints[i].location.lng());
                //     //}
                // }

                // lmarkers.push("markers=color:red|label:" + waypoints_labels[++waypoints_label_iter] + '|' + end);

                //var finalMarkers = lmarkers.join('&');
                //self.googleStaticMapsURL = "https://maps.googleapis.com/maps/api/staticmap?size=640x640&scale=2&maptype=roadmap&path=enc:" + path + "&" + finalMarkers + "&key=" + self.googleAPIKey;
                //console.log("static Maps url : ", self.googleStaticMapsURL);

                //--------- Static Maps End --------------

                self.directionsDisplay.setDirections(response);
                //self.showSteps(response, [], stepDisplay, self.map);


                //Remove the old destination marker
                self.biranchi_dest_marker.setMap(null);

                //Add new Source and Destination markers
                var leg = response.routes[0].legs[0];
                self.addMarker("My Location", leg.start_location);
                self.addMarker("Biranchi's Location", leg.end_location);


            } else {
                console.log('Directions request failed due to ', status);
            }
        });

    }



    //============== Show Steps Start ===================

    // showSteps(directionResult, markerArray, stepDisplay, map) {
    //     // For each step, place a marker, and add the text to the marker's infowindow.
    //     // Also attach the marker to an array so we can keep track of it and remove it
    //     // when calculating new routes.
    //     var self = this;

    //     var myRoute = directionResult.routes[0].legs[0];
    //     for (var i = 0; i < myRoute.steps.length; i++) {
    //         var marker = markerArray[i] = markerArray[i] || new google.maps.Marker;

    //         if (i == 0) {
    //             console.log("First Marker : " + JSON.stringify(marker));
    //         }
    //         if (i == myRoute.steps.length - 1) {
    //             console.log("Last Marker : " + marker);
    //         }

    //         marker.setMap(map);
    //         marker.setPosition(myRoute.steps[i].start_location);
    //         self.attachInstructionText(stepDisplay, marker, myRoute.steps[i].instructions, map);
    //     }
    // }

    // attachInstructionText(stepDisplay, marker, text, map) {
    //     google.maps.event.addListener(marker, 'click', function () {
    //         // Open an info window when the marker is clicked on, containing the text
    //         // of the step.
    //         stepDisplay.setContent(text);
    //         stepDisplay.open(map, marker);
    //     });
    // }

    //============== Show Steps End =======================



    //====================== Load Map Start =================================


    // loadMap(callback) {

    //     let mapOptions = {
    //         center: this.myCurrentLocation,
    //         zoom: 18,
    //         mapTypeId: google.maps.MapTypeId.ROADMAP
    //     }

    //     this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    //     this.directionsService = new google.maps.DirectionsService;
    //     this.directionsDisplay = new google.maps.DirectionsRenderer({
    //         map: this.map
    //     });

    //     //============ Add Marker =========

    //     this.addMarker("My Location", this.myCurrentLocation);

    //     callback("success");

    // }


    //====================== Load Map End =================================




    //==================== Add Marker Start =======================

    addMarker(placeName, latLng) {


        var self = this;
        //============== Marker Start =================

        var marker: any = "";

        if (placeName == "My Location") {

            marker = new google.maps.Marker({
                map: self.map,
                title: self.capitalizeString(placeName),
                animation: google.maps.Animation.DROP,
                icon: {
                    url: 'assets/img/svg_PinBlue.svg'
                },
                position: latLng //this.map.getCenter()
            });

        } else {

            marker = new google.maps.Marker({
                map: self.map,
                title: self.capitalizeString(placeName) + "<br>" + self.distanceMsg,
                animation: google.maps.Animation.DROP,
                icon: {
                    url: 'assets/img/svg_PinRed.svg'
                },
                position: latLng //this.map.getCenter()
            });
        }

        marker.setVisible(true);

        //============== Marker End =================


        //============== Add Info Window Start =================

        let infoWindow = new google.maps.InfoWindow({
            content: marker.title
        });
        //infoWindow.open(this.map, marker);

        // marker.addListener('click', function () {
        //   infowindow.open(this.map, marker);
        // });

        google.maps.event.addListener(marker, 'click', () => {
            //this.ngZone.run(() => {
            infoWindow.open(this.map, marker);
            //});
        });




        //--------------- Add to markers array Start ----------------

        //this.markersArr.push({ "placeName": placeName, "marker": marker });
        // console.log("Markers array : ", this.markersArr);

        //--------------- Add to markers array End ----------------



        //============== Add Info Window End =================

    }

    //==================== Add Marker End =======================





    //====================== Helper Function =================

    capitalizeString(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }



}
