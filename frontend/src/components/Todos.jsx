import React, {useState, useEffect} from 'react'
import {
    Box, Button, Flex,  Input, InputGroup, Modal, ModalBody, ModalCloseButton, ModalContent,
    ModalHeader, ModalFooter, ModalOverlay, Stack, Text, useDisclosure, InputLeftElement, VStack, Table
} from '@chakra-ui/react'

const TodosContext = React.createContext({
    todos: [], fetchTodos: ()=> {}
})

function AddTodos() {
    const [item, setItem] = useState("");
    const { todos, fetchTodos } = React.useContext(TodosContext)
    
    const handleInput = event => {
        setItem(event.target.value)
    }

    const handleSubmit = event => {
        const newTodo = {
            "id": todos.length + 1,
            "item": item
        }
       
   
        fetch("http://192.168.1.10:8990/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTodo),
        }).then(fetchTodos);
    }

     return (
        <form onSubmit={handleSubmit}>
             <InputGroup size="md">
                <Input
                    pr="4.5rem"
                    type="text"
                    placeholder='Add a todo item'
                    aria-label='Add a too item'
                    onChange={handleInput}
                /> 
            </InputGroup>
        </form>
    )
}

export const Todos = () => {
    const [todos, setTodos] = useState([]);

    const fetchTodos = async() => {
        const response = await fetch('http://localhost:8990/todos')
        const todos = await response.json()
        setTodos(todos.data)
        setTimeout(console.log(todos.data), 2000);
    }

    useEffect(() => {
        fetchTodos()
    }, []);
    
  return (
      <TodosContext.Provider value={{ todos, fetchTodos }}>
        <AddTodos />
        <Stack spacing={1}>
            {todos.map((todo) => {
                return (
                    <Box key={todo.id}
                    bg="gray"
                    w="300px"
                    h="25px"
                    fontWeight="bold"
                    color="white"    
                    _hover={{ bg: "green", color: "blue" }}
                    >
                        {todo.item}
                    </Box>
                )  
             })}
      </Stack>
    </TodosContext.Provider>
  );
}

export default Todos;