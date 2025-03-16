# Multi-Weather

A simple web app to display the local time and weather for multiple locations.

## How It Works

- On the landing page, search for a location. You can search by:
    - postal code
    - city name
    - city plus state, province, region, or country
    - latitude and longitude
- Click the result you would like to add
- Optionally, search for additional locations and add them
- Click continue
- The current time and weather will display for each selected location
- Locations are stored in the url query string so that you can bookmark the page to visit later

## Technology

Multi-Weather uses React for the front end and a .NET 8 web API for the back end.

Weather data is provided by WeatherAPI.com.

## Limitations

This is a hobby project and the back end is currently hosted using a free service. If the back end service is idle for a certain period of time, it will sleep until another request is made. This means that sometimes search results or weather data may take up to a minute to load.

## Version 0.2.2 (15 Mar 2025)

- Added high and low temperatures
- Fixed bug caused by certain location names containing hash symbols

[View full changelog](CHANGELOG.md)
