import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { LocationPanelErrorProps, LocationPanelPlaceholderProps, LocationPanelProps } from "~components/LocationPanel/LocationPanel";
import usePageContext, { PageContextType, PageContext } from "~pages/PageLayout/usePageContext";
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
    const { pageContext }: PageContextType = usePageContext();
    const { colorTheme, handleLoadLocal }: PageContext = pageContext as PageContext;

    useEffect(() => {
        const loadingMessage = document.getElementById("loading-message");
        const timeoutId = window.setTimeout(() => {
            if (isLoading && loadingMessage != null) {
                loadingMessage.classList.add("loading");
            }
        }, 1000);

        async function getForecastData() {
            setIsLoading(true);
            const data = await apiService.getForecast(newLocationNames);
            setLocations(data);
            setIsLoading(false);
            window.clearTimeout(timeoutId);
            if (loadingMessage != null) {
                loadingMessage.classList.remove("loading");
            }
        }

        const newLocationNames = searchParams.getAll("q") || [];
        setLocationNames(newLocationNames);
        if (newLocationNames.length > 0) {
            getForecastData().then();
        } else {
            setIsLoading(false);
            setLocations([]);
            window.clearTimeout(timeoutId);
        }
    }, [searchParams]);

    const formatRegionString = (region?: string, country?: string): string => {
        if (!region && !country) {
            return "";
        } else if (!region && country) {
            return country;
        } else if (region && !country) {
            return region;
        } else {
            return [ region, country ].join(", ");
        }
    };

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
            region: formatRegionString(location.Region, location.Country),
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

    const getLocationPanelErrorProps = (location: Forecast): LocationPanelErrorProps => {
        return {
            locationQuery: location.LocationQuery,
            locationName: location.LocationName || "",
            errorMessage: `No location found for search query "${location.LocationQuery}".`,
        };
    };

    const getLocationPanelPlaceholderProps = (location: string): LocationPanelPlaceholderProps => {
        const name = location.substring(0, location.indexOf(','));
        return {
            colorTheme: colorTheme,
            locationName: name.trim(),
        };
    };

    return {
        colorTheme,
        isLoading,
        locationNames,
        locations,
        getLocationPanelProps,
        getLocationPanelErrorProps,
        getLocationPanelPlaceholderProps,
        handleLoadLocal,
    };
};

export default useMultiWeather;
