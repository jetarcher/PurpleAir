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
        	id: "Channel",
        	alias:"Sensor Channel",
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
        },/*{
            id: "LastSeen",
            alias: "When data was last seen",
            dataType: tableau.dataTypeEnum.datetime
        }, */{
            id: "label",
            alias: "Sensor Label",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "THINGSPEAK_PRIMARY_ID",
            alias: "THINGSPEAK_PRIMARY_ID",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "THINGSPEAK_PRIMARY_ID_READ_KEY",
            alias: "THINGSPEAK_PRIMARY_ID_READ_KEY",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "THINGSPEAK_SECONDARY_ID",
            alias: "THINGSPEAK_SECONDARY_ID",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "THINGSPEAK_SECONDARY_ID_READ_KEY",
            alias: "THINGSPEAK_SECONDARY_ID_READ_KEY",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "Type",
            alias: "Sensor Type",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "Temperature_F",
            alias: "Current temperature in Farenheit",
            dataType: tableau.dataTypeEnum.float
       },{
            id: "Humidity",
            alias: "Current humidity in percent",
            dataType: tableau.dataTypeEnum.float    
       },{
            id: "Pressure",
            alias: "Current pressure in Millibars",
            dataType: tableau.dataTypeEnum.float                
		}
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
            var res = resp.results,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = res.length; i < len; i++) {
            // Channel isn't explicitly identified in the data
            // But so far, only B channels are associated with a parentID
            // Might also check if the parentID and ID are the same
            // But that isn't always true, it appears
            	thischannel = 'A'
            	if (res[i].ParentID) 
            		{
            		thischannel = 'B'
            		}
                tableData.push({
                    "id": res[i].ID,
                   "ParentID": res[i].ParentID,
                    "label": res[i].Label,
                	"Lat": res[i].Lat,
                    "Lon": res[i].Lon,                                                            
                    "PM25Value": res[i].PM2_5Value,
                    "Channel": thischannel,
                    "THINGSPEAK_PRIMARY_ID":res[i].THINGSPEAK_PRIMARY_ID,
                    "THINGSPEAK_PRIMARY_ID_READ_KEY":res[i].THINGSPEAK_PRIMARY_ID_READ_KEY,
                    "THINGSPEAK_SECONDARY_ID":res[i].THINGSPEAK_SECONDARY_ID,
                    "THINGSPEAK_SECONDARY_ID_READ_KEY":res[i].THINGSPEAK_SECONDARY_ID_READ_KEY,
                    "Type":res[i].Type,
                    "Temperature_F":res[i].temp_f,  // Current temperature in F
					"Humidity":res[i].humidity, // Current humidity in %
					"Pressure":res[i].pressure//, // Current pressure in Millibars
					//"LastSeen":Number(res[i].LastSeen)  //  
                //	"PM2 5Value": feat[i].properties.mag,
                  //  "Label": feat[i].properties.title,
     
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
