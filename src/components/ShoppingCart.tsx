import React from 'react'
import { Offcanvas, Stack } from 'react-bootstrap'
import { useShoppingCart } from '../context/ShoppingCartContext'
import { formatCurrency } from '../utilities/formatCurrency'
import CartItem from './CartItem'
import storeItems from "../data/items.json"

type ShoppingCartProps = {
    isOpen : boolean
}

const ShoppingCart = ({isOpen}: ShoppingCartProps) => {
    const {closeCart,cartItems}=useShoppingCart()
  return (
    <>
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <Stack gap={3}>
            {
              cartItems.map(items=>(
                <CartItem key={items.id} {...items} />
              )
              )
            }
            <div className="ms-auto fw-bold fs-5">
              Total {formatCurrency(
                cartItems.reduce((total,currentItem)=>{
                  const item = storeItems.find(i => i.id === currentItem.id)
                  return total + (item?.price || 0)* currentItem.quantity
              },0)
              )}
            </div>
            </Stack>
        </Offcanvas.Body>
    </Offcanvas>
    </>
  )
}

export default ShoppingCart