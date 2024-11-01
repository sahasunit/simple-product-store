import { Button, Container, Flex, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { CgMathPlus } from "react-icons/cg";
import { ColorModeButton, useColorModeValue } from "../ui/color-mode";

const Navbar = () => {

  return (
    <Container maxw={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base:"column",
          sm:"row"
        }}
      >
        <Text
          fontSize={{base:"xl", sm:"4xl"}}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgClip={"text"}
          color={{ base: "black", _dark: "white" }}
        >
          <Link to={"/"}>
            Product Store 🛒
          </Link>
        </Text>
        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <CgMathPlus fontSize={20}/>
            </Button>
          </Link>
          <ColorModeButton />

        </HStack>
      </Flex>
    </Container>
  )
}

export default Navbar