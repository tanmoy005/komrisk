import { View, Text, Platform, FlatList } from 'react-native'
import React, { useContext } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useCartContext } from '@/src/provider/CartProvider';
import CartListItem from '../components/CartListItem';
import Button from '../components/Button';

const CartView = () => {
    const { items ,total} = useCartContext();
    return (
        <View style={{ padding: 10 }}>
            <FlatList
                data={items}
                renderItem={({ item }) => <CartListItem cartItem={item} />}
                contentContainerStyle={{ gap: 10 }}
            />
            <Text>Total Amount : Rs. {total}</Text>
            <Button text='checkout'></Button>
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    )
}

export default CartView