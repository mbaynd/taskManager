import React from 'react'
import { Heading, Flex, Divider, Box, HStack, Spacer} from "@chakra-ui/react" 


export const Header = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      paddingX="1rem"
      paddingY="1rem"
      color="white"
      bg="twitter.500"
      boxShadow="0px 2px 4px rgba(0,0,0,0.2)"
      
    >
      <Flex align="center" mr={5}>
        <Heading as="h2" size="lg" fontWeight="bold" mb={5}>
          Tasks Manager
        </Heading>
      </Flex>
      <HStack
        spacing="1px"
        color="white"
        fontWeight="bold"
        textAlign="center"
        direction="row"
      >
        <Box
          bg="green"
          w="100px"
          h="25px"
          _hover={{ bg: "#f0f2f5", color: "black" }}
        >
          Products
        </Box>
        <Box
          bg="blue"
          w="100px"
          h="25px"
          _hover={{ bg: "#f0f2f5", color: "black" }}
        >
          Services
        </Box>
        <Box
          bg="red"
          w="100px"
          h="25px"
          _hover={{ bg: "#f0f2f5", color: "black" }}
        >
          Contacts
        </Box>
        <Box
          bg="tomato"
          w="100px"
          h="25px"
          _hover={{ bg: "#f0f2f5", color: "black" }}
        >
          About
        </Box>
      </HStack>
    </Flex>
  );
}
