// import React from "react";
import umicol from "./../public/umicol.png";
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

function SavedBundle() {
  return (
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
      </Grid>
    </>
  );
}

export default SavedBundle;
