import React, { useState, useEffect } from 'react';

export default function WeatherWidget() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [locationName, setLocationName] = useState("Locating...");
    const [permissionDenied, setPermissionDenied] = useState(false);

    useEffect(() => {
        const fetchWeather = async (lat, lon, fallbackName = null) => {
            try {
                const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`);
                const data = await res.json();
                
                if (fallbackName) {
                    setLocationName(fallbackName);
                } else {
                    try {
                        const geoRes = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
                        const geoData = await geoRes.json();
                        setLocationName(geoData.city || geoData.locality || "Local Weather");
                    } catch (e) {
                        setLocationName("Local Weather");
                    }
                }

                setWeather(data.current);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch weather", err);
                setLoading(false);
            }
        };

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    fetchWeather(position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                    console.warn("Geolocation denied or failed. Falling back to Kano.");
                    setPermissionDenied(true);
                    fetchWeather(12.0022, 8.592, "Kano Botanical Garden");
                }
            );
        } else {
            fetchWeather(12.0022, 8.592, "Kano Botanical Garden");
        }
    }, []);

    const getWeatherIcon = (code) => {
        if (code <= 3) return '☀️'; // clear/partly cloudy
        if (code <= 48) return '🌫️'; // fog
        if (code <= 67) return '🌧️'; // rain
        if (code <= 77) return '❄️'; // snow
        return '⛈️'; // storm
    };

    const getWeatherDesc = (code) => {
        if (code === 0) return 'Clear sky';
        if (code <= 3) return 'Partly cloudy';
        if (code <= 48) return 'Foggy';
        if (code <= 67) return 'Rainy';
        if (code <= 77) return 'Snow';
        return 'Thunderstorm';
    };

    if (loading) {
        return <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm p-6 text-white h-full flex items-center justify-center animate-pulse min-h-[200px]">Asking for location...</div>;
    }

    if (!weather) return null;

    return (
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm p-6 text-white relative overflow-hidden h-full min-h-[200px]">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 text-9xl opacity-20 pointer-events-none">
                {getWeatherIcon(weather.weather_code)}
            </div>
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-bold opacity-90 truncate pr-2">{locationName}</h3>
                    {permissionDenied && (
                        <span title="Location permission denied. Showing default." className="text-xs bg-black/20 px-2 py-1 rounded-full whitespace-nowrap">
                            Default
                        </span>
                    )}
                </div>
                <p className="text-sm opacity-75 mb-4">Current Weather Conditions</p>
                
                <div className="flex items-center mb-6">
                    <span className="text-5xl font-extrabold tracking-tighter mr-4">{weather.temperature_2m}°C</span>
                    <div className="flex flex-col">
                        <span className="text-2xl">{getWeatherIcon(weather.weather_code)}</span>
                        <span className="text-sm font-medium opacity-90">{getWeatherDesc(weather.weather_code)}</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-blue-400/30 pt-4">
                    <div>
                        <p className="text-xs opacity-75 uppercase tracking-wider mb-1">Humidity</p>
                        <p className="font-semibold text-lg">{weather.relative_humidity_2m}%</p>
                    </div>
                    <div>
                        <p className="text-xs opacity-75 uppercase tracking-wider mb-1">Wind Speed</p>
                        <p className="font-semibold text-lg">{weather.wind_speed_10m} km/h</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
