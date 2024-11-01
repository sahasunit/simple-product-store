import { Box, Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, {useState} from 'react';
import { useProductStore } from '../../store/product';
import { toaster, Toaster } from "../ui/toaster";

const CreatePage = () => {

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: ""
  })

  //Use Product Store
  const {createProduct} = useProductStore();


  const handleAddProduct = async() => {
    const {success, message} = await createProduct(newProduct);
    console.log("success:", success);
    console.log("message:", message);
    if (!success) {
      toaster.create({
        title: "Error",
        type:"error",
        description: message,
      })
    } else {
      toaster.create({
        title: "Success",
        type:"success",
        description: message,
      })
    }
    setNewProduct({name: "", price: "", image: ""});
  }

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>
        <Box 
          w={"full"} p={6} rouded={"lg"} shadow={"md"}
          bg={{ base: "white", _dark: "gray.800" }}
        >
          <VStack spacing={4}>
            <Input
              placeholder='Product Name'
              name="name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value})}
            />
            <Input
              placeholder='Product Price'
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value})}
            />
            <Input
              placeholder='Image URL'
              name="image"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value})}
            />
            <Button colorScheme={'Blue'} onClick={handleAddProduct} w="full">
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
      <Toaster />
    </Container>
  )
}

export default CreatePage