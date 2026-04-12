import { Text, HStack, Box, VStack, SimpleGrid } from "@chakra-ui/react";
import GlassCard from "../ui/glassCard";

const AQI_LEVELS = [
  { max: 1, label: "Good", color: "#4ade80" },
  { max: 2, label: "Fair", color: "#a3e635" },
  { max: 3, label: "Moderate", color: "#facc15" },
  { max: 4, label: "Poor", color: "#fb923c" },
  { max: 5, label: "Very Poor", color: "#f87171" },
];

function AirQualityCard({ airQuality }) {
  if (!airQuality?.list?.[0]) {
    return (
      <GlassCard h="100%">
        <Text>No air quality data</Text>
      </GlassCard>
    );
  }

  const aqi = airQuality.list[0].main.aqi;
  const components = airQuality.list[0].components;

  const info =
    AQI_LEVELS.find((l) => aqi <= l.max) || AQI_LEVELS.at(-1);

  const thumbPct = ((aqi - 1) / 4) * 100;

  return (
    <GlassCard h="100%" display="flex" flexDirection="column" p="3">

      {/* Title */}
      <Text
        fontSize="sm"
        fontWeight="semibold"
        opacity={0.6}
        textTransform="uppercase"
        letterSpacing="wider"
        mb="3"
      >
        Air Quality
      </Text>

      {/* Main status */}
      <HStack justify="space-between" mb="5">
        <Text fontSize="3xl" fontWeight="bold" color="rgb(15, 24, 80)">
          {info.label}
        </Text>

        <Text fontSize="xs" opacity={0.5}>
          AQI {aqi}
        </Text>
      </HStack>

      {/* Gradient bar */}
      <Box position="relative" mb="6">
        <Box
          h="6px"
          borderRadius="full"
          background="linear-gradient(to right, #4ade80, #a3e635, #facc15, #fb923c, #f87171)"
        />

        <Box
          position="absolute"
          top="50%"
          left={`${thumbPct}%`}
          transform="translate(-50%, -50%)"
          w="12px"
          h="12px"
          borderRadius="full"
          bg="white"
          boxShadow="0 0 0 2px rgba(0,0,0,0.25)"
        />
      </Box>

      {/* Pollutants */}
      <VStack spacing="2" align="stretch">
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} gap={2}>          <Box
          bg="rgba(78, 196, 255, 0.12)"
          border="1px solid rgba(255, 255, 255, 0.06)"
          p="2.5"
          borderRadius="12px"
          backdropFilter="blur(8px)"
          boxShadow="0 2px 10px rgba(0,0,0,0.05)"
        >
          <HStack justify="space-between">
            <Text fontSize="sm" fontWeight="medium" opacity={0.8}>
              PM2.5
            </Text>
            <Text fontSize="sm" fontWeight="bold">
              {components.pm2_5.toFixed(1)} µg/m³
            </Text>
          </HStack>
        </Box>

          <Box
            bg="rgba(78, 196, 255, 0.12)"
            border="1px solid rgba(255, 255, 255, 0.06)"
            p="2.5"
            borderRadius="12px"
            backdropFilter="blur(8px)"
            boxShadow="0 2px 10px rgba(0,0,0,0.05)"
          >
            <HStack justify="space-between">
              <Text fontSize="sm">PM10</Text>
              <Text fontSize="sm" fontWeight="bold">
                {components.pm10.toFixed(1)} µg/m³
              </Text>
            </HStack>
          </Box>

          <Box
            bg="rgba(78, 196, 255, 0.12)"
            border="1px solid rgba(255, 255, 255, 0.06)"
            p="2.5"
            borderRadius="12px"
            backdropFilter="blur(8px)"
            boxShadow="0 2px 10px rgba(0,0,0,0.05)"
          >
            <HStack justify="space-between">
              <Text fontSize="sm">NO₂</Text>
              <Text fontSize="sm" fontWeight="bold">
                {components.no2.toFixed(1)} µg/m³
              </Text>
            </HStack>
          </Box>

          <Box
            bg="rgba(78, 196, 255, 0.12)"
            border="1px solid rgba(255, 255, 255, 0.06)"
            p="2.5"
            borderRadius="12px"
            backdropFilter="blur(8px)"
            boxShadow="0 2px 10px rgba(0,0,0,0.05)"
          >
            <HStack justify="space-between">
              <Text fontSize="sm">O₃</Text>
              <Text fontSize="sm" fontWeight="bold">
                {components.o3.toFixed(1)} µg/m³
              </Text>
            </HStack>
          </Box>

        </SimpleGrid>
      </VStack>

    </GlassCard>
  );
}

export default AirQualityCard;