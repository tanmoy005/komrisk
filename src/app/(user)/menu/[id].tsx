import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import { useState } from 'react'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import products from '@/assets/data/products'
import Button from '@/src/components/Button';
import { PizzaSize } from '@/src/types';
 import { useCartContext } from '@/src/provider/CartProvider';



const sizes: PizzaSize[] = ['Reguler', 'Medium', 'Large'];

const ProductDetailsView = () => {
  const { addItem } = useCartContext();
  const defaultImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';
  const { id } = useLocalSearchParams();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('Medium');
  const productDetails = products.find((product) => product.id.toString() === id);
  
  const addToCart = () => {
    if (!productDetails) return;
     addItem(productDetails, selectedSize);
     router.push("/cart");
    // console.log(productDetails);
    
  };


  if (!productDetails) {
    return (
      <View>
        <Stack.Screen options={{ title: "Details" }} />
        <Text>No Product Found</Text>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: productDetails.name }} />
      <Image source={{ uri: productDetails.image || defaultImage }}
        style={styles.image} resizeMode="contain" />
      <Text style={styles.sizeText} >Select size </Text>
      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable key={size}
            onPress={() => { setSelectedSize(size) }}
            style={[
              styles.size,
              {
                backgroundColor: size === selectedSize ? 'lightgray' : 'white',
              },
            ]}>
            <Text style={[styles.sizeText,
            {
              color: size === selectedSize ? 'black' : 'lightgray',
            },]}>
              {size}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.price} >Price : Rs. {productDetails.price.toFixed(2)} </Text>
      <Button onPress={addToCart} text="Add to cart" />
    </View>
  )
}

export default ProductDetailsView


const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    flex: 1,
  },
  image: {
    width: "100%",
    // height:100,
    aspectRatio: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 'auto',
  },
  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  size: {
    // backgroundColor: "lightgray",
    width: 75,
    aspectRatio: 1,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",

  },
  sizeText: {
    fontSize: 15,
    fontWeight: "500",
    color: 'black',
  }
});
