export class ApiService {
    private readonly baseUrl = "https://distance-tools.onrender.com";

    public async searchLocation(locationQuery: string) {
        const url = `${this.baseUrl}/multiweather/searchlocation?q=${locationQuery}`;

        const searchResults: SearchLocationResult[] = await fetch(url)
            .then(async (jsonResponse) => {
                const response = await jsonResponse.json();
                if (!jsonResponse.ok)
                    throw new Error(response.error.message);

                return response;
            })
            .catch((error) => {
                console.error("Error searching location:", error);
            });
        
        return searchResults;
    }

    public async getForecast(locationNames: string[]) {
        const queries = `q=${locationNames.join("&q=")}`;
        const url = `${this.baseUrl}/multiweather/getforecast?${queries}`;

        const currentResults: Forecast[] = await fetch(url)
            .then(async (jsonResponse) => {
                const response = await jsonResponse.json();
                if (!jsonResponse.ok)
                    throw new Error(response.error.message);

                return response;
            })
            .catch((error) => {
                console.error("Error fetching current data:", error);
            });

        return currentResults;
    }

}

export type SearchLocationResult = {
    ShortName: string;
    FullName: string;
}

export type Forecast = {
    LocationQuery: string;
    LocationFound: boolean;
    LocationName?: string;
    TimeZone?: string;
    ConditionText?: string;
    ConditionIcon?: string;
    CurrentTemp?: number;
    MaxTemp?: number;
    MinTemp?: number;
}
