import { Box } from "@chakra-ui/react";

function GlassCard({ children, maxW = "1100px", ...props }) {
  return (
    <Box
      p={{ base: "5", md: "6" }}
      w="100%"
      maxW={maxW}
      mx="auto"
      borderRadius="2xl"
      bg="rgba(241, 242, 243, 0.35)"
      backdropFilter="blur(12px)"
      border="1.5px solid rgba(255, 255, 255, 0.42)"
      boxShadow="0 10px 40px rgba(0,0,0,0.08)"
      color="rgb(15, 24, 80)"
      {...props}   // allows overrides (mt, minH, etc.)
    >
      {children}
    </Box>
  );
}

export default GlassCard;
