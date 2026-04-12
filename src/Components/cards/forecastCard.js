import { Text, HStack, Box } from "@chakra-ui/react";
import GlassCard from "../ui/glassCard";

function getWeatherEmoji(id) {
  if (id >= 200 && id < 300) return "⛈️";
  if (id >= 300 && id < 400) return "🌦️";
  if (id >= 500 && id < 600) return "🌧️";
  if (id >= 600 && id < 700) return "❄️";
  if (id >= 700 && id < 800) return "🌫️";
  if (id === 800) return "☀️";
  if (id === 801) return "🌤️";
  if (id === 802) return "⛅";
  if (id >= 803) return "☁️";
  return "🌡️";
}

function ForecastCard({ forecast, unit }) {
  if (!forecast?.list) {
    return (
      <GlassCard h="100%">
        <Text>No forecast data</Text>
      </GlassCard>
    );
  }

  const toUnit = (tempC) =>
    unit === "C" ? Math.round(tempC) : Math.round((tempC * 9) / 5 + 32);

  const dailyMap = {};

  forecast.list.forEach((item) => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!dailyMap[date]) dailyMap[date] = item;
  });

  const daily = Object.values(dailyMap).slice(0, 7);

  return (
    <GlassCard mt="0" h="100%" display="flex" flexDirection="column">
      
      <Text
        fontSize="sm"
        fontWeight="semibold"
        opacity={0.6}
        mb="4"
        textTransform="uppercase"
        letterSpacing="wider"
      >
        7-Day Forecast
      </Text>

      {/*centering container */}
      <Box
        flex="1"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <HStack
          spacing={{ base: 2, md: 3 }}
          justify="center"
          w="100%"
          flexWrap="wrap"
        >
          {daily.map((item, i) => {
            const lo = toUnit(item.main.temp_min);
            const hi = toUnit(item.main.temp_max);
            const weatherId = item.weather[0].id;

            const label = new Date(item.dt * 1000).toLocaleDateString(
              "en-US",
              { weekday: "short" }
            );

            return (
              <Box
                key={i}
                flex="1"
                maxW="90px"
                minW="70px"
                p={{ base: "2", md: "3" }}
                borderRadius="16px"
                bg="rgba(255,255,255,0.15)"
                backdropFilter="blur(10px)"
                border="1px solid rgba(255,255,255,0.2)"
                textAlign="center"
                transition="0.2s"
                _hover={{
                  transform: "translateY(-3px)",
                  bg: "rgba(255,255,255,0.22)",
                }}
              >
                <Text fontSize="sm" fontWeight="medium" mb="1">
                  {label}
                </Text>

                <Text fontSize="xl" mb="1">
                  {getWeatherEmoji(weatherId)}
                </Text>

                <Text fontSize="sm" fontWeight="bold">
                  {hi}°
                </Text>

                <Text fontSize="xs" opacity={0.6}>
                  {lo}°
                </Text>
              </Box>
            );
          })}
        </HStack>
      </Box>
    </GlassCard>
  );
}

export default ForecastCard;