import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { LocationPanelProps } from "~components/LocationPanel/LocationPanel";
import { ApiService, Forecast } from "~services/ApiService";

const useMultiWeather = () => {
    const apiService = new ApiService();
    const [ isLoading, setIsLoading ] = useState(true);
    const [ locationNames, setLocationNames ] = useState<string[]>([]);
    const [ locations, setLocations ] = useState<Forecast[]>([]);
    const [ searchParams ] = useSearchParams();

    useEffect(() => {
        async function getForecastData() {
            setIsLoading(true);
            const data = await apiService.getForecast(locationNames);
            setLocations(data);
            setIsLoading(false);
        }

        const locationNames = searchParams.getAll("q") || [];
        setLocationNames(locationNames);
        getForecastData().then();
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

    const formatTempString = (tempC?: number): string => {
        if (tempC == null)
            return "";

        const tempF = (tempC * 1.8) + 32;

        return `${tempC.toFixed(1)}° C | ${tempF.toFixed(1)}° F`;
    };

    const getLocationPanelProps = (location: Forecast): LocationPanelProps => {
        return {
            locationName: location.LocationName || "",
            dateTime: formatDateTimeString(location.TimeZone),
            currentTemp: formatTempString(location.CurrentTemp),
            conditionText: location.ConditionText || "",
            conditionIcon: location.ConditionIcon || "",
            maxTemp: formatTempString(location.MaxTemp),
            minTemp: formatTempString(location.MinTemp),
        };
    };

    return {
        isLoading,
        locationNames,
        locations,
        getLocationPanelProps,
    };
};

export default useMultiWeather;
