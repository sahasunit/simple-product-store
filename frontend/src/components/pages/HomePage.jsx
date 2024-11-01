import React, { useEffect } from 'react'
import { Box, Container, VStack, Text, SimpleGrid } from '@chakra-ui/react';
import { Link } from 'react-router-dom'
import { useProductStore } from '../../store/product';
import ProductCard from '../custom_ui/ProductCard';

const HomePage = () => {

  const {fetchProducts, products} = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log("Products:", products);

  return (
    <Container maxW={'container.xl'} py={12}>
      <VStack gap={8}>
      <Text
          fontSize={"30"}
          fontWeight={"bold"}
          textAlign={"center"}
          bgClip={"text"}
          color={{ base: "black", _dark: "white" }}
        >
          Current Products 🚀
      </Text>

      <SimpleGrid
        columns={{
          base: 1,
          md: 2,
          lg: 3,
        }}
        gap={10}
        w={"full"}
      >
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </SimpleGrid>
      {products.length === 0 && (
					<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
						No products found 😢{" "}
						<Link to={"/create"}>
							<Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
								Create a product
							</Text>
						</Link>
					</Text>
				)}
      </VStack>
    </Container>
  )
}

export default HomePage