# Changelog

## Version 0.2.3 (5 Apr 2025)

- Change font to sans-serif
- Add viewport meta element so that site displays properly on mobile
- Changes to vite config and React router setup to support deployment on Render

## Version 0.2.2 (15 Mar 2025)

- Added high and low temperatures
- Fixed bug caused by certain location names containing hash symbols

## Version 0.2.1 (27 Feb 2025)

- Fixed bug where the temperature did not display when either the Celsius or Fahrenheit temperature was exactly 0.
- Added descriptive text to search page.
- Added loading indicators.
- Minor CSS improvements.

## Version 0.2.0 (10 Feb 2025)

- Implemented back end to replace direct calls from the front end to WeatherAPI.
- The landing page is now a search page that allows the user to build a list of locations to display weather data for.
- The current page stores location names in the query string to allow users to refresh or bookmark the page.

## Version 0.1.0 (30 Jan 2025)

First draft. Front end only web app that displays current weather for multiple locations using WeatherAPI. Required passing API key and location search terms in query string.
