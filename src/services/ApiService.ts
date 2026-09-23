export class ApiService {
    private readonly baseUrl = "https://distance-tools.onrender.com";

    public async searchLocation(locationQuery: string) {
        const url = `${this.baseUrl}/multiweather/searchlocation?q=${locationQuery}`;

        const searchResults: SearchResults = await fetch(url)
            .then(async (jsonResponse) => {
                if (!jsonResponse.ok)
                    throw new Error("searchLocation request failed");

                const response = await jsonResponse.json();
                return { Results: response };
            })
            .catch((error) => {
                console.error("Error searching location:", error);
                return { Error: "Error retrieving search results."};
            });
        
        return searchResults;
    }

    public async getForecast(locationNames: string[]) {
        const queries = `q=${locationNames.join("&q=")}`;
        const url = `${this.baseUrl}/multiweather/getforecast?${queries}`;

        const currentResults: Forecast[] = await fetch(url)
            .then(async (jsonResponse) => {
                if (!jsonResponse.ok)
                    throw new Error("getForecast request failed");

                const response = await jsonResponse.json();
                return response;
            })
            .catch((error) => {
                console.error("Error fetching current data:", error);
                return null;
            });

        return currentResults;
    }

}

export type SearchResults = {
    Results?: SearchLocationResult[],
    Error?: string;
}

export type SearchLocationResult = {
    ShortName: string;
    FullName: string;
}

export type Forecast = {
    LocationQuery: string;
    LocationFound: boolean;
    LocationName?: string;
    Region?: string;
    Country?: string;
    TimeZone?: string;
    ConditionText?: string;
    ConditionIcon?: string;
    CurrentTemp?: number;
    FeelsLike?: number;
    MaxTemp?: number;
    MinTemp?: number;
    WillItRain?: boolean;
    ChanceOfRain?: number;
    TotalPrecipMm?: number;
    WillItSnow?: boolean;
    ChanceOfSnow?: number;
    TotalSnowCm?: number;
}
