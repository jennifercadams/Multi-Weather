import * as React from "react";
import { useEffect, useState } from "react";
import LocationPanel from "./LocationPanel";
import { ApiService, Current } from "~services/ApiService";

const MultiWeather = () => {
    const apiService = new ApiService();
    const [ locations, setLocations ] = useState<Current[]>([]);

    useEffect(() => {
        async function getCurrentData() {
            const data = await apiService.getCurrent(locationNames);
            setLocations(data);
        }

        const queryString = location.search;
        const queryParams = new URLSearchParams(queryString);
        const locationNames = queryParams.getAll("q") || [];
        getCurrentData().then();
    }, []);

    const formatDateTimeString = (timeZone?: string): string => {
        if (!timeZone)
            return "";

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const localDate = new Date();
        const dateString = localDate.toLocaleDateString("en-US", { timeZone });
        const [M,d] = dateString.split("/");
        const timeString = localDate.toLocaleTimeString("en-US", { timeZone, timeZoneName:"short" });
        const [h,m,_,ampm,tz] = timeString.split(/[: ]/);

        return `${months[parseInt(M) - 1]} ${d}, ${h}:${m} ${ampm} (${tz})`;
    };

    const formatTempString = (tempC?: number, tempF?: number): string => {
        if (!tempC || !tempF)
            return "";
        return `${tempC}° C | ${tempF}° F`;
    };

    return (
        <div id="multi-weather">
            <h1>MultiWeather</h1>
            {locations.map((location, index) => {
                const key = `LocationPanel${index}`;
                const locationPanelProps = {
                    locationName: location.LocationName || "",
                    dateTime: formatDateTimeString(location.TimeZone),
                    temperature: formatTempString(location.TempC, location.TempF),
                    conditionText: location.ConditionText || "",
                    conditionIcon: location.ConditionIcon || "",
                };
                return <LocationPanel key={key} {...locationPanelProps}/>;
            })}
        </div>
    );
};

export default MultiWeather;
