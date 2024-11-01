import React, { useState, useEffect } from 'react'
import { Box, Button, Container, Heading, Input, VStack, Text, Grid, GridItem, Image, HStack, IconButton } from '@chakra-ui/react';
import { CgEditMarkup } from "react-icons/cg"
import { MdDelete } from "react-icons/md";
import { useProductStore } from '../../store/product';
import { toaster, Toaster } from "../ui/toaster";
import {
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
    DialogActionTrigger
  } from '../ui/dialog';


const ProductCard = ({product}) => {

    const textcolor = {base: "gray.600", _dark: "gray.200" }
    const bg = {base: "white", _dark: "gray.800" }

    const {deleteProduct, updateProduct} = useProductStore();
    const [open, setOpen] = useState(false);
    const [updatedProduct, setUpdatedProduct] = useState(product);

    const handleDeleteProduct = async (productId) => {
        const {success, message} = await deleteProduct(productId);

        console.log("message:", message);
        if (!success) {
            toaster.create({
                title: "Error",
                type:"error",
                description: message,
                duration: 3000,
                isClosable: true,
            })
        } else {
            toaster.create({
                title: "Success",
                type:"success",
                description: message,
                duration: 3000,
                isClosable: true,
            })
        }
    }

    const handleUpdateProduct = async (productId, updatedProduct) => {
        const {success, message} = await updateProduct(productId, updatedProduct);
        setOpen(false);
        if (!success) {
            toaster.create({
                title: "Error",
                type:"error",
                description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
            })
        } else {
            toaster.create({
                title: "Success",
                type:"success",
                description: "Product updated successfully",
				duration: 3000,
				isClosable: true,
            })
        }
    }

    return (
        <Box
            shadow="lg"
            rounded="lg"
            overflow={"hidden"}
            transition={"all 0.3s"}
            _hover={{transform: "translateY(-10px)", shadow:"xl"}}
            bg={bg}
        >
            <Image 
                src={product.image}
                alt={product.name}
                h={48}
                w="full"
                objectFit="cover"
            />
            <Box p={4}>
                <Heading as="h3" size="mb" mb={2}>
                    {product.name}
                </Heading>
                <Text
                    fontWeight={"bold"}
                    fontSize={"xl"}
                    color={textcolor}
                    mb={4}
                >
                    ${product.price}
                </Text>

                <HStack spacing={2}>
                    <IconButton 
                        colorPalette="blue"
                        onClick={setOpen}
                    >
                        <CgEditMarkup />
                    </IconButton>
                    <IconButton 
                        colorPalette="red" 
                        onClick={() => handleDeleteProduct(product._id)}
                    >
                        <MdDelete />
                    </IconButton>
                </HStack>
            </Box>
            <DialogRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Product</DialogTitle>
                    </DialogHeader>
                    <DialogBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder='Product Name'
                                name="name"
                                value={updatedProduct.name}
                                onChange={(e) => {setUpdatedProduct({...updatedProduct, name: e.target.value})}}
                            />
                            <Input
                                placeholder='Product Price'
                                name="price"
                                type="number"
                                value={updatedProduct.price}
                                onChange={(e) => {setUpdatedProduct({...updatedProduct, price: e.target.value})}}
                            />
                            <Input
                                placeholder='Image URL'
                                name="image"
                                value={updatedProduct.image}
                                onChange={(e) => {setUpdatedProduct=>({...updatedProduct, image: e.target.value})}}
                            />
                        </VStack>
                    </DialogBody>
                    <DialogFooter>
                        <Button onClick={() => handleUpdateProduct(product._id, updatedProduct)}>Update</Button>
                        <DialogActionTrigger asChild>
                            <Button variant="outline" onClick={setOpen}>Cancel</Button>
                        </DialogActionTrigger>
                    </DialogFooter>
                    <DialogCloseTrigger />
                </DialogContent>
            </DialogRoot>
            <Toaster />
        </Box>
    )
}

export default ProductCard