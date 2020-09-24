# PurpleAir
PurpleAir makes inexpensive air pollution sensors. The air sensors track PM2.5 concentrations. PM2.5 is short for "Particulate Matter 2.5 Micron," which is small particles such as from burning matter.  PurpleAir data is available over the Internet, i.e. the sensors are part of the Internet of Things (IoT). The data can be accessed through Thingspeak, although it does require initially getting specific sensor info from Purpleair site itself.


# Tableau Web Data Connector for PurpleAir
Tableau has a number of options for connecting with data, one of which is a Web Data Connector (WDC). These are HTML pages using Javascript that Tableau can use to pull data from the Internet. One advantage is that they are available for use by the free Tableau Public application & site. 

To use the connector: 
1. Open Tableau and Add a new Connection
2. Select Web Data Connector from the options on the Add a Connection window. 
3. Copy in the connector URL  (https://jetarcher.github.io/PurpleAir/PurpleAirSensorList.html). 
4. On the page that appears, click on the button that says "Get PurpleAir Data!" 
5. The connector page should disappear, the connection will be initiated, and the data should be visibile on the Connection page..

The URL for this Connector is: https://jetarcher.github.io/PurpleAir/PurpleAirSensorList.html

(If you go to that URL through a web browser, the button will be usable but you won't see any of the data if you click on it.)
