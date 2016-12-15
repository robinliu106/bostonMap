//Generates the plotly graph

//PROPERTY VALUE
var property_trace = {
  x: ['Allston', 'Back Bay', 'Bay Village', 'Beacon Hill', 'Brighton', 'Charlestown', 'Chinatown', 'Dorchester', 'Downtown Crossing', 'East Boston', 'Fenway', 'Hyde Park', 'Jamaica Plain', 'Mattapan', 'Mission Hill', 'North End', 'Roslindale', 'Roxbury', 'South Boston', 'West End', 'West Roxbury'],
  y: [828954*.01, 2389486*.01, 2055781*.01, 2460397*.01, 750061*.01, 1466931*.01, 1948693*.01,577924*.01, 1835967*.01, 1423304*.0001, 1360339*.01, 335695*.01, 688737*.01, 350038*.01, 862229*.01, 1707763*.01, 410828*.01, 516787*.01, 1614672*.01, 1399858*.0001, 2036205*.01, 422383*.01],
  type: 'scatter'
};

// CRIME RATE
var crime_trace = {
  x: ['Allston', 'Back Bay', 'Bay Village', 'Beacon Hill', 'Brighton', 'Charlestown', 'Chinatown', 'Dorchester', 'Downtown Crossing', 'East Boston', 'Fenway', 'Hyde Park', 'Jamaica Plain', 'Mattapan', 'Mission Hill', 'North End', 'Roslindale', 'Roxbury', 'South Boston', 'West End', 'West Roxbury'],
  y: [9960, 46910, 48982, 39728, 7844, 20714, 46512, 46090, 42214, 21971, 37248, 9561, 32559, 24580, 36950, 31544, 13138, 52097, 41100, 59815, 34357, 4652],
  type: 'scatter'
};

// HOSPITAL DISTANCE
var hospital_trace = {
    x: ['Allston', 'Back Bay', 'Bay Village', 'Beacon Hill', 'Brighton', 'Charlestown', 'Chinatown', 'Dorchester', 'Downtown Crossing', 'East Boston', 'Fenway', 'Hyde Park', 'Jamaica Plain', 'Mattapan', 'Mission Hill', 'North End', 'Roslindale', 'Roxbury', 'South Boston', 'West End', 'West Roxbury'],
    y: [0.16001979257907314, 1.0202819982628333, 0.5354757984150593, 0.42570246403084794, 1.2437650755569514, 1.2557752685062529, 0.08482466653796399, 1.4124338532760736, 0.6999797624245208, 2.215623734141166, 0.6931341777907019, 3.8629676782088493, 1.436916128020817, 1.0218596535964761, 0.0028661666637534314, 0.995959889303452, 1.6201146479126376, 0.3745273172783064, 1.8503431238923769, 0.38988065384160736, 0.13931661442378618, 0.9073310312990648],
    type: 'scatter'
};

// SCHOOL COUNT
var school_trace = {
    x: ['Allston', 'Back Bay', 'Bay Village', 'Beacon Hill', 'Brighton', 'Charlestown', 'Chinatown', 'Dorchester', 'Downtown Crossing', 'East Boston', 'Fenway', 'Hyde Park', 'Jamaica Plain', 'Mattapan', 'Mission Hill', 'North End', 'Roslindale', 'Roxbury', 'South Boston', 'West End', 'West Roxbury'],
    y: [11, 26, 29, 19, 10, 13, 24, 39, 25, 13, 30, 15, 27, 25, 38, 19, 26, 45, 23, 41, 18, 10],
    type: 'scatter'
};

var property_data = [property_trace];
var hospital_data = [hospital_trace];
var school_data = [school_trace];
var crime_data = [crime_trace];

var property_layout = {
    title: ' Average Value of Residential Properties in Each Neighborhood'
}

var hospital_layout = {
    title: ' # of Hospitals in Each Neighborhood'
}

var school_layout = {
    title: ' # of Schools in Each Neighborhood'
}
var crime_layout = {
    title: ' # of Crimes in Each Neighborhood'
}

Plotly.newPlot('property_graph', property_data,property_layout);
Plotly.newPlot('hospital_graph', hospital_data,hospital_layout);
Plotly.newPlot('school_graph', school_data,school_layout);
Plotly.newPlot('crime_graph', crime_data,crime_layout);


$(document).ready(function(){
    $("#property_graph_toggle").click(function(){
        //console.log('property toggle clicked');
        $("#property_graph").show();
        $("#school_graph").hide();
        $("#hospital_graph").hide();
        $("#crime_graph").hide();
    });

    $("#school_graph_toggle").click(function(){
        //console.log('property toggle clicked');
        $("#school_graph").show();
        $("#property_graph").hide();
        $("#hospital_graph").hide();
        $("#crime_graph").hide();
    });

    $("#crime_graph_toggle").click(function(){
        //console.log('property toggle clicked');
        $("#crime_graph").show();
        $("#school_graph").hide();
        $("#hospital_graph").hide();
        $("#property_graph").hide();
    });

    $("#hospital_graph_toggle").click(function(){
        //console.log('property toggle clicked');
        $("#hospital_graph").show();
        $("#school_graph").hide();
        $("#property_graph").hide();
        $("#crime_graph").hide();
    });

});
