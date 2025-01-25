export type WeatherApiResponse = {
    locationName?: string;
    dateTime?: string;
    conditionText?: string;
    conditionIcon?: string;
    temperature?: string;
    error: boolean;
}

export class WeatherApiClient {
    private readonly apiKey: string;
    private readonly baseUrl = "https://api.weatherapi.com/v1";

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    public async getCurrent(location: string): Promise<WeatherApiResponse> {
        const q = location.replace(/[^a-zA-Z0-9]/g, "");
        const url = `${this.baseUrl}/current.json?key=${this.apiKey}&q=${q}`;

        const response = await fetch(url)
            .then(async (response) => {
                const json = await response.json();
                if (!response.ok)
                    throw new Error(json.error.message);

                return json;
            })
            .then((data) => {
                const weatherApiResponse: WeatherApiResponse = {
                    locationName: data.location.name,
                    dateTime: this.formatDateTimeString(data.location.tz_id),
                    conditionText: data.current.condition.text,
                    conditionIcon: data.current.condition.icon,
                    temperature: this.formatTempString(data.current.temp_c, data.current.temp_f),
                    error: false,
                };
                return weatherApiResponse;
            })
            .catch((error) => {
                console.error("Error fetching current data:", error);
                return {
                    error: true,
                };
            });

        return response;
    }

    private formatDateTimeString(timeZone: string): string {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const localDate = new Date();
        const dateString = localDate.toLocaleDateString("en-US", { timeZone });
        const [M,d] = dateString.split("/");
        const timeString = localDate.toLocaleTimeString("en-US", { timeZone, timeZoneName:"short" });
        const [h,m,_,ampm,tz] = timeString.split(/[: ]/);

        return `${months[parseInt(M)]} ${d}, ${h}:${m} ${ampm} (${tz})`;
    }

    private formatTempString(tempC: string, tempF: string): string {
        return `${tempC}° C | ${tempF}° F`;
    }
}
