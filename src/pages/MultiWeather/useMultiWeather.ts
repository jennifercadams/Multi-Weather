import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { LocationPanelProps } from "~components/LocationPanel/LocationPanel";
import { ApiService, Forecast } from "~services/ApiService";

export type Temp = {
    C: string;
    F: string;
};

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
        const [M,d,y] = dateString.split("/");
        const timeString = localDate.toLocaleTimeString("en-US", { timeZone, timeZoneName:"short" });
        const [h,m,_,ampm,tz] = timeString.split(/[: ]/);

        return `${d} ${months[parseInt(M) - 1]} ${y} ${h}:${m} ${ampm} (${tz})`;
    };
    
    const getTempObject = (tempC?: number): Temp => {
        if (tempC == null)
            return { C: "", F: "" };

        const tempF = (tempC * 1.8) + 32;

        return {
            C: `${tempC.toFixed(1)} °C`,
            F: `${tempF.toFixed(1)} °F`,
        };
    };

    const formatTempString = (tempC?: number): string => {
        if (tempC == null)
            return "";

        const tempF = (tempC * 1.8) + 32;

        return `${tempC.toFixed(1)} °C   |   ${tempF.toFixed(1)} °F`;
    };

    const formatChanceString = (chance?: number): string => {
        if (chance == null)
            return "";

        return `${chance}%`;
    };

    const formatTotalPrecipString = (precipMm?: number): string => {
        if (precipMm == null)
            return "";

        const precipIn = precipMm / 25.4;
        const precipMmString = precipMm < 1 ? "< 1" : precipMm.toFixed(0);
        const precipInString = precipIn < 1 ? "< 1" : precipIn.toFixed(2);

        return `${precipMmString} mm  |  ${precipInString} in`;
    };

    const formatTotalSnowString = (snowCm?: number): string => {
        if (snowCm == null)
            return "";

        const snowIn = snowCm / 2.54;
        const snowCmString = snowCm < 1 ? "< 1" : snowCm.toFixed(2);
        const snowInString = snowIn < 1 ? "< 1" : snowIn.toFixed(2);

        return `${snowCmString} cm  |  ${snowInString} in`;
    };

    const getLocationPanelProps = (location: Forecast): LocationPanelProps => {
        return {
            locationName: location.LocationName || "",
            dateTime: formatDateTimeString(location.TimeZone),
            conditionText: location.ConditionText || "",
            conditionIcon: location.ConditionIcon || "",
            currentTemp: getTempObject(location.CurrentTemp),
            feelsLike: formatTempString(location.FeelsLike),
            maxTemp: formatTempString(location.MaxTemp),
            minTemp: formatTempString(location.MinTemp),
            willItRain: location.WillItRain || false,
            chanceOfRain: formatChanceString(location.ChanceOfRain),
            totalPrecip: formatTotalPrecipString(location.TotalPrecipMm),
            willItSnow: location.WillItSnow || false,
            chanceOfSnow: formatChanceString(location.ChanceOfSnow),
            totalSnow: formatTotalSnowString(location.TotalSnowCm),
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
