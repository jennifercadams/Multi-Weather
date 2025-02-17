import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { ApiService, Current } from "~services/ApiService";

const useMultiWeather = () => {
    const apiService = new ApiService();
    const [ locations, setLocations ] = useState<Current[]>([]);
    const [ searchParams ] = useSearchParams();

    useEffect(() => {
        async function getCurrentData() {
            const data = await apiService.getCurrent(locationNames);
            setLocations(data);
        }

        const locationNames = searchParams.getAll("q") || [];
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
        if (!tempC && !tempF)
            return "";
        return `${tempC}° C | ${tempF}° F`;
    };

    const getLocationPanelProps = (location: Current) => {
        return {
            locationName: location.LocationName || "",
            dateTime: formatDateTimeString(location.TimeZone),
            temperature: formatTempString(location.TempC, location.TempF),
            conditionText: location.ConditionText || "",
            conditionIcon: location.ConditionIcon || "",
        };
    };

    return {
        locations,
        getLocationPanelProps,
    };
};

export default useMultiWeather;
