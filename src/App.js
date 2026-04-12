import { useState, useEffect, useCallback } from "react";
import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import Navbar from "./Components/navbar";
import WeatherCard from "./Components/cards/weatherCard";
import ForecastCard from "./Components/cards/forecastCard";
import AirQualityCard from "./Components/cards/airQualityCard";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unit, setUnit] = useState("C");

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  const fetchExtraData = useCallback(async (lat, lon) => {
    try {
      const [forecastRes, airRes] = await Promise.all([
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        ),
        fetch(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        ),
      ]);

      const forecastData = await forecastRes.json();
      const airData = await airRes.json();

      if (forecastRes.ok && forecastData.list) setForecast(forecastData);
      if (airRes.ok) setAirQuality(airData);
    } catch { }
  }, [API_KEY]);

  const fetchWeatherByCity = useCallback(async (cityName) => {
    const cityy = cityName?.trim();
    if (!cityy) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          cityy
        )}&units=metric&appid=${API_KEY}`
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setWeather(data);
      setCity(data.name);

      await fetchExtraData(data.coord.lat, data.coord.lon);
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast(null);
      setAirQuality(null);
    } finally {
      setLoading(false);
    }
  }, [API_KEY, fetchExtraData]);

  const fetchWeatherByCoords = useCallback(async (pos) => {
    const { latitude, longitude } = pos.coords;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
      );

      const data = await res.json();
      if (!res.ok) throw new Error();

      setWeather(data);
      setCity(data.name);

      await fetchExtraData(latitude, longitude);
    } catch (err) {
      setError("Failed to load weather");
    } finally {
      setLoading(false);
    }
  }, [API_KEY, fetchExtraData]);

  const fetchWeatherByIP = useCallback(async () => {
    try {
      const res = await fetch(
        `https://ipinfo.io/json?token=${process.env.REACT_APP_IPINFO_TOKEN}`
      );
      const ipData = await res.json();

      if (ipData.city) await fetchWeatherByCity(ipData.city);
    } catch { }
  }, [fetchWeatherByCity]);

  const detectLocation = useCallback(() => {
    if (!navigator.geolocation) return fetchWeatherByIP();

    navigator.geolocation.getCurrentPosition(
      fetchWeatherByCoords,
      fetchWeatherByIP
    );
  }, [fetchWeatherByCoords, fetchWeatherByIP]);

  useEffect(() => {
    detectLocation();
  }, [detectLocation]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        background: "linear-gradient(to bottom, #ffffff, #41b1f7)",
      }}
    >
      <Navbar
        city={city}
        setCity={setCity}
        unit={unit}
        setUnit={setUnit}
        onSearch={fetchWeatherByCity}
      />
      {loading && <Text>Loading...</Text>}

      {error && (
        <Text color="red.500" fontWeight="bold">
          {error}
        </Text>
      )}

      {weather && (
        <Box
          px={{ base: "4", md: "6" }}
          pb="8"
          maxW="1100px"
          mx="auto"
          flex="1"
          w="100%"
        >
          <WeatherCard weather={weather} unit={unit} />

          {/* 🔥 FIX HERE */}
          <Grid
            templateColumns={{ base: "1fr", md: "1.5fr 1fr" }}
            gap="4"
            mt="4"
            alignItems="stretch"
          >
            <GridItem>
              <Box h="100%">
                <ForecastCard forecast={forecast} unit={unit} />
              </Box>
            </GridItem>

            <GridItem>
              <Box h="100%">
                <AirQualityCard airQuality={airQuality} />
              </Box>
            </GridItem>
          </Grid>

        </Box>
      )}
    </div>
  );
}

export default App;