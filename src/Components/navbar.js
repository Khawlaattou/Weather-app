import {
  Box,
  Text,
  Image,
  Input,
  InputGroup,
  Button,
  HStack,
} from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import weatherLogo from "../Assets/weatherlogo.png";

function Navbar({ city, setCity, onSearch, unit, setUnit }) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      px="20px"
      py="12px"
    >
      {/* LEFT: Logo */}
      <Box display="flex" alignItems="center" gap="8px">
        <Image src={weatherLogo} height="40px" />
        <Text fontWeight="bold">Weather</Text>
      </Box>

      {/* RIGHT: Search + Buttons */}
      <HStack spacing="10px">
        {/* Search Input */}
        <InputGroup width={{ base: "140px", sm: "200px", md: "260px" }} 
        startElement={<LuSearch color="#587f99ff"/>}>
          <Input
            placeholder="City..."
            bg="rgb(255, 255, 255)"
            border="1.5px solid"
            borderColor="rgb(233, 247, 255)"
            borderRadius="xl"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch(city)}
          />
        </InputGroup>


        {/* C / F toggle */}
        <Button
          size="sm"
          variant="outline"
          borderRadius="full"
          onClick={() => setUnit(unit === "C" ? "F" : "C")}
        >
          °{unit}
        </Button>
      </HStack>
    </Box>
  );
}

export default Navbar;
