import { Text, Grid, GridItem, VStack, HStack } from "@chakra-ui/react";
import GlassCard from "../ui/glassCard";

function WeatherCard({ weather, unit }) {
  if (!weather) return null;

  const temperature =
    unit === "C"
      ? weather.main.temp
      : (weather.main.temp * 9) / 5 + 32;

  const feelsLike =
    unit === "C"
      ? weather.main.feels_like
      : (weather.main.feels_like * 9) / 5 + 32;

  return (
    <GlassCard mt="6">
      <Grid
        templateColumns={{ base: "1fr", md: "1.2fr 1fr" }}
        gap="6"
        alignItems="center"
      >
        {/* LEFT */}
        <GridItem textAlign="left">
          <VStack align="start" spacing="3">
            <Text fontSize="sm" opacity={0.7} textTransform="uppercase">
              Current Weather
            </Text>

            <Text fontSize="2xl" fontWeight="bold">
              {weather.name}, {weather.sys.country}
            </Text>

            <Text
              fontSize={{ base: "5xl", md: "6xl" }}
              fontWeight="bold"
              lineHeight="1"
            >
              {temperature.toFixed(1)}°{unit}
            </Text>

            <Text fontSize="lg" textTransform="capitalize">
              {weather.weather[0].description}
            </Text>
          </VStack>
        </GridItem>

        {/* RIGHT */}
        <GridItem w="100%" textAlign="left">
          <VStack align="stretch" spacing="3">
            {[
              { label: "Feels like", value: `${feelsLike.toFixed(1)}°${unit}` },
              { label: "Humidity", value: `${weather.main.humidity}%` },
              { label: "Wind", value: `${weather.wind.speed} m/s` },
              { label: "Pressure", value: `${weather.main.pressure} hPa` },
            ].map((item, i) => (
              <HStack key={i} w="100%" justify="space-between">
                <Text opacity={0.7}>{item.label}</Text>
                <Text fontWeight="medium">{item.value}</Text>
              </HStack>
            ))}
          </VStack>
        </GridItem>
      </Grid>
    </GlassCard>
  );
}

export default WeatherCard;
