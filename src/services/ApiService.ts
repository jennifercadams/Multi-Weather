export class ApiService {
    private readonly baseUrl = "https://localhost:7211";

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
}

export type SearchLocationResult = {
    Latitude: string;
    Longitude: string;
    ShortName: string;
    FullName: string;
}
