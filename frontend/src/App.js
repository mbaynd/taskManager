import './App.css';
import { Header } from './components/Header';
import { Todos } from './components/Todos';
import { Box, Flex, Center, Square, Text} from '@chakra-ui/react';

function App() {
  return (
    <div>
      <Header />
      <Todos />
      <Flex
        justify="space-between"
        align="center"
        color="white"
        bg="yellow"
        fontWeight="bold"
        textAlign="center"
        marginBottom="20px"
      >
        <Box
          bg="green"
          w="200px"
          h="200px"
          _hover={{ bg: "#33f2f5", color: "black" }}
        >
          item 1
        </Box>
        <Box
          bg="blue"
          w="200px"
          h="200px"
          _hover={{ bg: "#22f2f5", color: "black" }}
        >
          item 2
        </Box>
        <Box
          bg="red"
          w="200px"
          h="100px"
          _hover={{ bg: "#11f2f5", color: "black" }}
        >
          item 3
        </Box>
        <Box
          bg="tomato"
          w="200px"
          h="200px"
          _hover={{ bg: "#00f2f5", color: "black" }}
        >
          item 4
        </Box>
      </Flex>
      <Flex color="white" marginBottom="10px">
        <Center w="100px" bg="green.500">
          <Text>Box 1</Text>
        </Center>
        <Square bg="blue.500" size="150px">
          <Text>Box 2</Text>
        </Square>
        <Box flex="1" bg="orange">
          <Text>Box 3</Text>
        </Box>
      </Flex>
    </div>
  );
}

export default App;
