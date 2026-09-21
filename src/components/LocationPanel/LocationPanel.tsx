import * as React from "react";
import { Temp } from "~pages/MultiWeather/useMultiWeather";
import "./LocationPanel.css";

export type LocationPanelProps = {
    locationName: string;
    dateTime: string;
    conditionText: string;
    conditionIcon: string;
    currentTemp: Temp;
    feelsLike: string;
    maxTemp: string;
    minTemp: string;
    willItRain: boolean;
    chanceOfRain: string;
    totalPrecip: string;
    willItSnow: boolean;
    chanceOfSnow: string;
    totalSnow: string;
}

const LocationPanel = (props: LocationPanelProps) => {
    return (
        <div className="location-panel">
            <h2 className="location-name">{props.locationName}</h2>
            <p className="location-time">{props.dateTime}</p>
            <div className="current">
                <img className="condition-icon" src={props.conditionIcon} />
                <div className="current-details">
                    <p className="condition-text">{props.conditionText}</p>
                    <div className="location-temp-container">
                        <p className="location-temp">{props.currentTemp.C}</p>
                        <p className="location-temp">{props.currentTemp.F}</p>
                    </div>
                </div>
            </div>
            <div className="more-details">
                <p className="detail-label">Feels like</p>
                <p className="detail-text">{props.feelsLike}</p>
            </div>
            <div className="more-details">
                <p className="detail-label">High</p>
                <p className="detail-text">{props.maxTemp}</p>
            </div>
            <div className="more-details">
                <p className="detail-label">Low</p>
                <p className="detail-text">{props.minTemp}</p>
            </div>
            {props.willItRain && <>
                <div className="more-details">
                    <p className="detail-label">Rain</p>
                    <p className="detail-text">{props.chanceOfRain}  |  {props.totalPrecip}</p>
                </div>
            </>}
            {props.willItSnow && <>
                <div className="more-details">
                    <p className="detail-label">Snow</p>
                    <p className="detail-text">{props.chanceOfSnow}  |  {props.totalSnow}</p>
                </div>
            </>}
            {!props.willItRain && !props.willItSnow && <p className="more-details detail-label">No precipitation</p>}
        </div>
    );
};

const LocationPanelPlaceholder = () => {
    return (
        <div className="location-panel">
            <div className="icon-placeholder placeholder" />
            <div className="name-placeholder placeholder" />
            <div className="text-placeholder placeholder" />
            <div className="text-placeholder placeholder" />
            <div className="text-placeholder placeholder" />
            <div className="text-placeholder placeholder" />
            <div className="text-placeholder placeholder" />
        </div>
    );
};

export { LocationPanel, LocationPanelPlaceholder };
