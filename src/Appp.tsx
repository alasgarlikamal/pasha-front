import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import getItems from "./api/getRequest";
import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import ProductCard from "./components/ProductCard";

function App() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getItems("apple");
        setItems(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const onSearch = async () => {
    setLoading(true);
    const data = await getItems(searchQuery);
    setItems(data);
    setLoading(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSearch();
    }
  };

  const handleAddToCollection = (product) => {
    setSelectedItems((prevItems) => [...prevItems, product]);
  };

  const handleRemoveFromCollection = (productToRemove) => {
    setSelectedItems((prevItems) =>
      prevItems.filter((item) => item.id !== productToRemove.id)
    );
  };

  return (
    <Grid
      templateRows="repeat(20, 1fr)"
      templateColumns="repeat(10, 1fr)"
      gap={10}
    >
      {/* ... (Your existing layout code) */}

      <GridItem rowSpan={15} colSpan={4} bg="#7c62e2" mr={10} borderRadius={6}>
        <Center>
          <Heading color={"white"} p={5}>
            Your collection
          </Heading>
        </Center>
        {selectedItems.length === 0 && (
          <Center h={"450px"}>
            <Text fontWeight={"bold"} fontSize={"l"} color={"white"}>
              Collection is empty
            </Text>
          </Center>
        )}
        {selectedItems.length > 0 && (
          <Flex flexDir={"column"}>
            {selectedItems.map((item, index) => (
              <Flex
                key={index}
                alignItems="center"
                justifyContent="space-between"
                padding={3}
                bg="white"
                borderRadius={4}
                mt={2}
              >
                <Image
                  src={item.img_url_thumbnail}
                  alt={item.name}
                  height={20}
                  width={20}
                  objectFit="cover"
                  borderRadius="lg"
                />
                <Flex flexDir="column" alignItems="center">
                  <Text fontSize="sm" fontWeight="bold">
                    {item.name}
                  </Text>
                  <Text fontSize="sm">{item.retail_price} ₼</Text>
                </Flex>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleRemoveFromCollection(item)}
                >
                  Remove
                </Button>
              </Flex>
            ))}
          </Flex>
        )}
      </GridItem>
    </Grid>
  );
}

export default App;
