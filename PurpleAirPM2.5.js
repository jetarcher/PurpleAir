(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [
        {
            id: "id",
            alias: "Sensor ID",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "ParentID",
            alias: "Parent Sensor ID",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "Lat",
            alias: "Latitude",
            dataType: tableau.dataTypeEnum.float
        },{
            id: "Lon",
            alias: "Longitude",
            dataType: tableau.dataTypeEnum.float
        } , {
            id: "PM25Value",
            alias: "PM25 Value",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "label",
            alias: "Sensor Label",
            dataType: tableau.dataTypeEnum.string
        }, 
        /* We'll try to set this up once we can get SOMEthing in
        	{
            id: "location",
            dataType: tableau.dataTypeEnum.geometry
        }
        */
        ];

        var tableSchema = {
            id: "PurpleAirPM25Feed",
            alias: "Current PM2.5 data from PurpleAir sensors and list of sensors",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    // use "https://www.purpleair.com/json?show=250" to get a small amount of data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://www.purpleair.com/json", function(resp) {
            var feat = resp.results,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "id": feat[i].ID,
                   "ParentID": feat[i].ParentID,
                	"Lat": feat[i].Lat,
                    "Lon": feat[i].Lon,                                                            
                    "PM25Value": feat[i].PM2_5Value,
                //	"PM2 5Value": feat[i].properties.mag,
                  //  "Label": feat[i].properties.title,
                    "label": feat[i].Label
                                       // "label": feat[i].geometry
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "PurpleAir SensorList JSON"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
