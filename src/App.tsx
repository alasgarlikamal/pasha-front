import { useEffect, useState } from "react";
import { AiOutlineShoppingCart, AiOutlineDelete } from "react-icons/ai";
import { FaMoneyBillWave } from "react-icons/fa";
import getItems from "./api/getRequest";
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spacer,
  Spinner,
  Stack,
  Text,
  Tooltip,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import umicoSVG from "./umico.svg";
import umicol from "./../public/umicol.png";
import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import ProductCard from "./components/ProductCard";

function App() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);

  //0502632344
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
  }, []); // Empty dependency array to run the effect only once

  const onSearch = async () => {
    console.log("submitted");
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
    const indexToDelete = selectedItems.indexOf(productToRemove);

    setSelectedItems(
      selectedItems.filter((item, index) => index != indexToDelete)
    );
  };

  const calculateTotalCost = () => {
    return selectedItems.reduce((total, item) => total + item.retail_price, 0);
  };

  const handleClearCollection = () => {
    setSelectedItems([]); // Clear the selectedItems array
  };

  return (
    // <div>
    //   {items.map((item) => (
    //     <>
    //       <div key={item.id}>{item.name}</div>
    //       <img key={item.id} src={item.img_url_thumbnail}></img>
    //     </>
    //   ))}
    // </div>
    <>
      <Grid
        templateRows="repeat(20, 1fr)"
        templateColumns="repeat(10, 1fr)"
        gap={10}
      >
        <GridItem
          rowSpan={5}
          colSpan={10}
          bg="#232B58"
          p={5}
          gap={1}
          display={"flex"}
          alignItems={"center"}
          alignContent={"center"}
        >
          <Image src={umicol} height={"4rem"} />
          <Spacer />
          {/* <Text color={"white"} fontWeight={"500"} fontSize={"5xl"}>
          Create your group
        </Text> */}
          <Spacer />
          <Spacer />
          <Spacer />
        </GridItem>

        <GridItem
          rowSpan={16}
          colSpan={7}
          bg="gray.300"
          ml={10}
          p={5}
          boxShadow={"base"}
          borderRadius={6}
        >
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Search for products"
              bg={"white"}
              onChange={(e) => setSearchQuery(e.target.value)}
              onSubmit={() => onSearch()}
              onKeyDown={handleKeyDown}
            />
          </InputGroup>
          <Text fontWeight={"500"} fontSize={"3xl"}>
            Products &nbsp;
            <Badge
              ml="1"
              colorScheme="green"
              fontWeight="bold"
              fontSize="0.45em"
            >
              {" "}
              {items.length} results
            </Badge>
          </Text>
          <Box overflow={"scroll"} maxHeight={"450px"} p={4} borderRadius={4}>
            {isLoading && (
              <Center m="auto" h={"450px"}>
                <Spinner
                  thickness="4px"
                  // speed="0.65s"
                  // emptyColor="gray.200"
                  // color="blue.500"
                  size="xl"
                />
              </Center>
            )}
            {!isLoading && (
              <Grid
                templateColumns={"repeat(3,1fr)"}
                gap={7}
                overflow={"scroll"}
              >
                {items &&
                  items.map((item, index) => {
                    return (
                      <ProductCard
                        key={index}
                        product={item}
                        items={items}
                        setItems={setSelectedItems}
                      />
                    );
                  })}
                {items.length === 0 && "Not found..."}
              </Grid>
            )}
          </Box>
        </GridItem>
        <GridItem
          rowSpan={16}
          colSpan={3}
          bg="#7c62e2"
          mr={10}
          boxShadow={"base"}
          borderRadius={6}
        >
          <Flex
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Heading color={"white"} p={5} fontSize={"lg"}>
              Your collection
            </Heading>
            <Text fontSize="lg" fontWeight="bold" color="white">
              Total Cost: {calculateTotalCost()} ₼
            </Text>

            <IconButton
              colorScheme="red"
              aria-label="Clear Collection"
              onClick={handleClearCollection}
              icon={<AiOutlineDelete />}
              ml={4}
            >
              Clear Collection
            </IconButton>
          </Flex>
          {selectedItems.length === 0 && (
            <Center h={"450px"}>
              <Text fontWeight={"bold"} fontSize={"l"} color={"white"}>
                Collection is empty
              </Text>
            </Center>
          )}
          {selectedItems.length > 0 && (
            <Flex flexDir={"column"} overflow={"scroll"} h={"450px"}>
              {selectedItems.map((item, index) => (
                <Flex
                  key={index}
                  alignItems="center"
                  justifyContent="space-between"
                  padding={3}
                  bg="white"
                  borderRadius={4}
                  mt={2}
                  mx={2}
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
                  <Tooltip label="Remove" fontSize="md" hasArrow>
                    <IconButton
                      colorScheme="red"
                      size={"xs"}
                      onClick={() => handleRemoveFromCollection(item)}
                      aria-label="close"
                      icon={<CloseIcon />}
                    />
                  </Tooltip>
                </Flex>
              ))}
            </Flex>
          )}
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
