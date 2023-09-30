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
} from "@chakra-ui/react";

export default function ProductCard({ product }) {
  return (
    <Card minW="15rem">
      <CardBody>
        <Center>
          <Image
            src={product.img_url_thumbnail}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
            h={"10rem"}
            objectFit={"contain"}
          />
        </Center>
        <Flex flexDir={"column"} mt="6" gap="3" justify={"space-between"}>
          <Heading size="sm" height={"5rem"}>
            {product.name}
          </Heading>
          <Flex align={"center"} justify={"space-between"}>
            <Text
              color="blue.600"
              fontSize="l"
              textColor={"#ff4b81"}
              overflow={"hidden"}
            >
              {product.retail_price} ₼
            </Text>
            <Button colorScheme="yellow" fontSize={"l"}>
              Add to group
            </Button>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
}
