// ProductCard.js
import { useState } from "react";
import {
  Card,
  CardBody,
  Stack,
  Heading,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Image,
  Text,
  Flex,
  Center,
  Skeleton,
  Icon,
} from "@chakra-ui/react";
import { AiOutlineShoppingCart } from "react-icons/ai";

export default function ProductCard({ product, items, setItems }) {
  const [isLoaded, setLoaded] = useState(false);

  const handleAddToCollection = () => {
    setItems((prevItems) => [...prevItems, product]);
  };

  return (
    <Card minW="15rem">
      <CardBody>
        <Skeleton isLoaded={isLoaded}>
          <Center>
            <Image
              src={product.img_url_thumbnail}
              alt="Green double couch with wooden legs"
              borderRadius="lg"
              h={"10rem"}
              objectFit={"contain"}
              onLoad={() => setLoaded(true)}
            />
          </Center>
        </Skeleton>
        <Flex flexDir={"column"} mt="6" gap="3" justify={"space-between"}>
          <Heading size="sm" height={"5rem"}>
            {product.name}
          </Heading>
          <Flex align={"center"} justify={"space-between"}>
            <Text
              color="blue.600"
              fontSize="l"
              fontWeight={"bold"}
              textColor={"#ff4b81"}
              overflow={"hidden"}
            >
              {product.retail_price} ₼
            </Text>
            <Button
              bgColor={"#ffd63f"}
              _hover={{ bgColor: "#FBCD28" }}
              fontSize={"l"}
              onClick={handleAddToCollection} // Call the function to add to collection
              leftIcon={<Icon as={AiOutlineShoppingCart} />}
            >
              Add
            </Button>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
}
