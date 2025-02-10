export class ApiService {
    private readonly baseUrl = "https://distance-tools.onrender.com/";

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

    public async getCurrent(locationNames: string[]) {
        const queries = `q=${locationNames.join("&q=")}`;
        const url = `${this.baseUrl}/multiweather/getcurrent?${queries}`;

        const currentResults: Current[] = await fetch(url)
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
    Latitude: string;
    Longitude: string;
    ShortName: string;
    FullName: string;
}

export type Current = {
    LocationQuery: string;
    LocationFound: boolean;
    LocationName?: string;
    TimeZone?: string;
    ConditionText?: string;
    ConditionIcon?: string;
    TempC?: number;
    TempF?: number;
}
