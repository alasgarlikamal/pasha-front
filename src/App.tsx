import { useEffect, useState } from "react";
import getItems from "./api/getRequest";
import {
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
  InputRightElement,
  Spacer,
  Spinner,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import umicoSVG from "./../public/umico.svg";
import umicol from "./../public/umicol.png";
import { SearchIcon } from "@chakra-ui/icons";
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

  return (
    // <div>
    //   {items.map((item) => (
    //     <>
    //       <div key={item.id}>{item.name}</div>
    //       <img key={item.id} src={item.img_url_thumbnail}></img>
    //     </>
    //   ))}
    // </div>
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
        rowSpan={15}
        colSpan={6}
        bg="gray.300"
        ml={10}
        p={5}
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
          Products
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
            <Grid templateColumns={"repeat(3,1fr)"} gap={7} overflow={"scroll"}>
              {items &&
                items.map((item, index) => {
                  return <ProductCard key={index} product={item} />;
                })}
              {items.length === 0 && "Not found..."}
            </Grid>
          )}
        </Box>
      </GridItem>
      <GridItem rowSpan={15} colSpan={4} bg="#7c62e2" mr={10} borderRadius={6}>
        <Center>
          <Heading color={"white"} p={5}>
            Your collection
          </Heading>
        </Center>
      </GridItem>
    </Grid>
  );
}

export default App;
