import { createContext, ReactNode, useContext , useState} from "react";
import ShoppingCart from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartProviderProps ={
    children : ReactNode
}

type ShoppingCartContext = {
 openCart:() => void
 closeCart:() => void
 getItemQuantity: (id:number) => number
 increaseCartQuantity: (id:number) => void
 decreaseCartQuantity: (id:number) => void
 removeFromCart: (id:number) => void
 cartQuantity: number
 cartItems: CartItems[]
}

type CartItems ={
    id: number
    quantity: number
}
const ShoppingCartContext = createContext({} as 
    ShoppingCartContext)

export function useShoppingCart(){
    return useContext(ShoppingCartContext)
}


export function ShoppingCartProvider ({children}: ShoppingCartProviderProps){
    const [cartItems, setcartItems] = useLocalStorage<CartItems[]>("shopping-cart",[])
    const [isOpen, setIsOpen] = useState(false)

    const cartQuantity = cartItems.reduce((quantity,item)=> item.quantity + quantity,0)

    const openCart = () => setIsOpen((previousVal)=>previousVal=true) 
    const closeCart = () => setIsOpen((previousVal)=>previousVal=false) 
    function getItemQuantity (id:number){
        return cartItems.find(item=>item.id=== id)?.quantity || 0
    }
    function increaseCartQuantity (id:number){
        setcartItems(currentItem =>{
            if (currentItem.find(item=>item.id === id) == null){
                return [...currentItem,{id,quantity:1}]
            }else
            {
                return currentItem.map(item=>{
                    if (item.id === id ){
                        return {...item, quantity: item.quantity + 1}
                    }else
                    {
                        return item
                    }
                })
            }
        })
    }
    function decreaseCartQuantity (id:number){
        setcartItems(currentItem =>{
            if (currentItem.find(item=>item.id === id)?.quantity === 1){
                return currentItem.filter(item => item.id !== id)
            }else
            {
                return currentItem.map(item=>{
                    if (item.id === id ){
                        return {...item, quantity: item.quantity - 1}
                    }else
                    {
                        return item
                    }
                })
            }
        })
    }
    function removeFromCart (id:number){
        setcartItems(currentItems=>{
            return currentItems.filter(items => items.id !== id)
        }
            )
    }
    return <ShoppingCartContext.Provider value={
        {getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        openCart,
        closeCart}}>
        {children}
        <ShoppingCart isOpen={isOpen}/>
    </ShoppingCartContext.Provider>
}