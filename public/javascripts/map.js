var map; //important

google.maps.event.addDomListener(window, 'load', initialize); //load map



var schools = fetchSchools(); //to get the names
var school_coords = fetchSchoolsCoord(); //just the coordinates

var hospitals = fetchHospitals(); //names and coord
var hospital_coords = fetchHospitalsCoord(); //just the coordinates

var crimes = fetchCrimesCoord();

//var properties = fetchProperties();

function initialize() {

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: { lat: 42.342132, lng: -71.103023 }, //Boston
    });

    for (var i in school_coords) {
        var schoolCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: map,
            center: school_coords[i],
            radius: 300
        });
    }


    for (var i in hospital_coords) {
        var hospitalCircle = new google.maps.Circle({
            strokeColor: '#00FF00', //green
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#00FF00',
            fillOpacity: 0.35,
            map: map,
            center: hospital_coords[i],
            radius: 300
        });
    }

    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(document.getElementById('legend'));

    //Create a marker on the map
    google.maps.event.addListener(map, 'click', function(marker) {
        addMarker(marker.latLng); //add marker to map
        getClosest(marker.latLng,hospital_coords,'hospitals'); //find nearest hospital
        getClosest(marker.latLng,school_coords,'schools'); //find nearest school
        calculateScore(marker.latLng);
    });

    //set the default text
    document.getElementById('origin_address').innerHTML = 'Marker Address: ';
    document.getElementById('score').innerHTML = 'Score: ';

    document.getElementById('hospital_name').innerHTML = 'Hospital Name: ';
    document.getElementById('dest_address_hospital').innerHTML = 'Closest Hospital Address: ';
    document.getElementById('distance_hospital').innerHTML = 'Distance to Hospital: ';

    document.getElementById('school_name').innerHTML = 'School Name: ';
    document.getElementById('dest_address_school').innerHTML = 'Closest School Address: ';
    document.getElementById('distance_school').innerHTML = 'Distance to School: ';

}




//////////////
// Fetch data
//////////////

//get hospital data in format: [name,coord]
function fetchHospitals(){
    var hospitals = [];
    $.getJSON('https://data.cityofboston.gov/api/views/46f7-2snz/rows.json?accessType=DOWNLOAD',{ },
    function(response) {
        for (var i = 0; i < 25; i++) {
            hospitals.push([ response.data[i][8] , [response.data[i][14][1],response.data[i][14][2]] ] );
        }
    });
    return hospitals;
}

//get hospital data in just coordinate form
function fetchHospitalsCoord(){
    var hospitals = [];
    $.getJSON('https://data.cityofboston.gov/api/views/46f7-2snz/rows.json?accessType=DOWNLOAD',{ },
    function(response) {
        for (var i = 0; i < 25; i++) {
            hospitals.push( new google.maps.LatLng(response.data[i][14][1],response.data[i][14][2]) );
        }
    });
    return hospitals;
}

//get school data in format: [name,coord]
function fetchSchools() {
    var schools = [];
    $.getJSON( 'https://data.cityofboston.gov/api/views/e29s-ympv/rows.json?accessType=DOWNLOAD',{ },
    function(response) {
        for (var i = 0; i < 25; i++) {
            schools.push( [response.data[i][10] , response.data[i][12][1] , response.data[i][12][2]] );
        }
    });
    return schools;
}
//get school data in just coordinate form
function fetchSchoolsCoord() {
    var schoolsCoord = [];
    $.getJSON( 'https://data.cityofboston.gov/api/views/e29s-ympv/rows.json?accessType=DOWNLOAD',{ },
    function(response) {
        for (var i = 0; i < 25; i++) {
            schoolsCoord.push( new google.maps.LatLng( response.data[i][12][1] , response.data[i][12][2] ) );
        }
    });
    return schoolsCoord;
}

function fetchCrimesCoord() {
    var crimes = [];
    $.getJSON( 'https://data.cityofboston.gov/api/views/fqn4-4qap/rows.json?accessType=DOWNLOAD',{ },
    function(response) {
        for (var i = 0; i < 500; i++) {
            crimes.push( new google.maps.LatLng( response.data[i][24][1] , response.data[i][24][2] ) );
        }
    });
    return crimes;
}

function fetchProperties() {
    console.log('running fetch properties');
    var residentUse = ['CD', 'R1', 'R2', 'R3', 'R4', 'RC', 'RL'];
    var properties = [];
    $.getJSON( 'https://data.cityofboston.gov/api/views/i7w8-ure5/rows.json?accessType=DOWNLOAD',{ },
    function(response) {
        for (var i = 0; i < response.data.length; i++) {
            //console.log('i: ' + i);
            if (response.data[i][83] == "#N/A" || response.data[i][84] == "#N/A") {
                ;
            } else if ( residentUse.indexOf(response.data[i][13]) != -1 ){
                properties.push( new google.maps.LatLng( response.data[i][83] , response.data[i][84] ) );
            }
        }

    });
    console.log(properties);
    return properties;
}

////////////////////////////
// Heatmap Toggles
////////////////////////////
//create circle for each school







//init school heatmap
var heatMapSchool = new google.maps.visualization.HeatmapLayer({
    data: school_coords,
    map: map,
    radius: 40
});

//Toggle school heatmap
function toggle_heatmap_school() {
    heatMapSchool.setMap(heatMapSchool.getMap() ? null : map);
}


//init hospital heatmap toggle
var heatMapHospital = new google.maps.visualization.HeatmapLayer({
    data: hospital_coords,
    map: map,
    radius: 40,
    gradient: [
          'rgba(0, 255, 255, 0)',
          'rgba(0, 255, 255, 1)',
          'rgba(0, 191, 255, 1)',
          'rgba(0, 127, 255, 1)',
          'rgba(0, 63, 255, 1)',
          'rgba(0, 0, 255, 1)',
          'rgba(0, 0, 223, 1)',
          'rgba(0, 0, 191, 1)',
          'rgba(0, 0, 159, 1)',
          'rgba(0, 0, 127, 1)',
          'rgba(63, 0, 91, 1)',
          'rgba(127, 0, 63, 1)',
          'rgba(191, 0, 31, 1)',
          'rgba(255, 0, 0, 1)'
        ]
});

//toggle hospital heatmap
function toggle_heatmap_hospital() {
    heatMapHospital.setMap(heatMapHospital.getMap() ? null : map);
}


////////////////////////////
// Adds a marker to the map.
////////////////////////////

function addMarker(location) {
    marker = new google.maps.Marker({
        position: location,
        map: map
    });
}

/////////////////
//calculate score
/////////////////
function calculateScore(marker) {
    var threshold = 3; //threshold in km for distance to a category

    var currentDistance = 0;
    var school_count = 0;
    var hospital_count = 0;
    var crime_count = 0;
    var score = 0;


    for (var i = 0; i < schools.length; i++) {
        currentDistance = calcDistance(marker.lat(),marker.lng(),school_coords[i].lat(),school_coords[i].lng());
        if (currentDistance < threshold) {
            school_count += 1;
        }
    }

    for (var i = 0; i < hospitals.length; i++) {
        currentDistance = calcDistance(marker.lat(),marker.lng(),hospital_coords[i].lat(),hospital_coords[i].lng());
        if (currentDistance < threshold) {
            hospital_count += 1;
        }
    }

    for (var i = 0; i < crimes.length; i++) {
        currentDistance = calcDistance(marker.lat(),marker.lng(),crimes[i].lat(),crimes[i].lng());
        if (currentDistance < threshold) {
            crime_count += 1;
        }
    }

    score = school_count * 0.25 + hospital_count * 0.25 - crime_count * 0.25 / 100;
    document.getElementById('score').innerHTML = 'Score: ' + score;


}

function getClosest(marker,category,type) {
    var minDistance = 100000;
    var currentDistance , counter;

    for (var i = 0; i < category.length; i++) {
        currentDistance = calcDistance(marker.lat(),marker.lng(),category[i].lat(),category[i].lng());
        if (currentDistance < minDistance) { //found new minimum distance
            minDistance = currentDistance;
            counter = i;
        }
    }

    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
        origins: [marker],
        destinations: [category[counter]],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }, callback);

    //parse response
    function callback(response, status) {
        if (status == "OK") {

            document.getElementById('origin_address').innerHTML = 'Marker Address: ' + response.originAddresses;

            if (type == 'hospitals') {
                document.getElementById('hospital_name').innerHTML = 'Hospital Name: ' + hospitals[counter][0];
                document.getElementById('dest_address_hospital').innerHTML = 'Closest Hospital Address: ' + response.destinationAddresses;
                document.getElementById('distance_hospital').innerHTML = 'Distance to Hospital: ' + minDistance*1000 + ' meters';
            } else if (type == 'schools') {
                document.getElementById('school_name').innerHTML = 'School Name: ' + schools[counter][0];
                document.getElementById('dest_address_school').innerHTML = 'Closest School Address: ' + response.destinationAddresses;
                document.getElementById('distance_school').innerHTML = 'Distance to School: ' + minDistance*1000 + ' meters';
            }
        } else {
            console.log(' Distance Matrix error status is: ' + status);
        }
    }

}

function calcDistance(lat1,lon1,lat2,lon2) {
    var R = 6371;
    var dLat = deg2rad(lat2-lat1);
    var dLon = deg2rad(lon2-lon1);
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d;
}

function deg2rad(deg){
    return deg * (Math.PI/180);
}

var neighborhoods = [
['Allston', [42.3539, -71.1337]],
['Back Bay', [42.3503, -71.0810]],
['Bay Village', [42.3490, -71.0698]],
['Beacon Hill', [42.3588, -71.0707]],
['Brighton', [42.3464, -71.1627]],
['Charlestown', [42.3782, -71.0602]],
['Chinatown', [42.3501, -71.0624]],
['Dorchester', [42.3016, -71.0676]],
['Downtown Crossing', [42.3555, -71.0594]],
['East Boston', [42.3702, -71.0389]],
['Fenway', [42.3429, -71.1003]],
['Hyde Park', [42.2565, -71.1241]],
['Jamaica Plain', [42.3097, -71.0476]],
['Mattapan', [42.2771, -71.0914]],
['Mission Hill', [42.3296, -71.1062]],
['North End', [42.3647, -71.0542]],
['Roslindale', [42.2832, -71.1270]],
['Roxbury', [42.3152, -71.0914]],
['South Boston', [42.3381, -71.0476]],
['South End', [42.3388, -71.0765]],
['West End', [42.3644, -71.0661]],
['West Roxbury', [42.2798, -71.1627]]
]