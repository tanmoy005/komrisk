import { CartItem, Product } from '@/src/types';
import { PropsWithChildren, createContext, useContext, useEffect, useRef, useState } from 'react'
import { randomUUID } from 'expo-crypto'

type CartType = {
    items: CartItem[];
    addItem: (product: Product, size: CartItem['size']) => void;
    updateQuantity: (itemId: string, amount: 1 | -1) => void;
    total:number;
}

const CartContext = createContext<CartType>({
    items: [],
    addItem: () => { },
    updateQuantity: () => { },
    total:0,
});


const CartProvider = ({ children }: PropsWithChildren) => {

    const [items, setItems] = useState<CartItem[]>([]);
    const addItem = (product: Product, size: CartItem['size']) => {
        // //console.log(product,size);
        const existingItem = items.find(item => item.product === product && item.size === size);
        if (existingItem) {
            updateQuantity(existingItem.id, 1);
            return;
        }
        const quantity = 1;
        const newCartItem: CartItem = {
            id: randomUUID(),
            product,
            product_id: product.id,
            size,
            quantity: quantity
        }
        setItems([newCartItem, ...items]);

    };
    const updateQuantity = (itemId: string, amount: 1 | -1) => {
        setItems((
            items.map((item) => item.id === itemId ? { ...item, quantity: item.quantity + amount } : item)
        ).filter((item) => item.quantity > 0
        ));
    };
    const total=items.reduce((total, item) => total + item.product.price * item.quantity, 0);
    // //console.log(items);
    return (
        <CartContext.Provider value={{ items, addItem, updateQuantity,total }}>
            {children}

        </CartContext.Provider>
    )

}

export default CartProvider;
export const useCartContext = () => useContext(CartContext);