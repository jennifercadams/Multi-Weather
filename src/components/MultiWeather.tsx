import * as React from "react";
import { useEffect, useState } from "react";
import LocationPanel from "./LocationPanel";

const MultiWeather = () => {
    const [apiKey, setApiKey] = useState<string>("");
    const [locations, setLocations] = useState<string[]>([]);

    useEffect(() => {
        const queryString = location.search;
        const queryParams = new URLSearchParams(queryString);
        const keyParam = queryParams.get("key") || "";
        const qParam = queryParams.getAll("q") || [];
        setApiKey(keyParam);
        setLocations(qParam);
    }, []);

    return (
        <div id="multi-weather">
            <h1>MultiWeather</h1>
            {locations.map((locationQuery, index) => {
                const key = `LocationPanel${index}`;
                return <LocationPanel key={key} apiKey={apiKey} locationQuery={locationQuery} />;
            })}
        </div>
    );
};

export default MultiWeather;
