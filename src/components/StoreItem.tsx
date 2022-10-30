import {Button, Card} from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utilities/formatCurrency"


type StoreItemProps = {
  id : number 
  name:string
  price: number
  imgURL:string
}

const StoreItem = ({id , name , price , imgURL}: StoreItemProps) => {
  
  const {getItemQuantity,increaseCartQuantity,decreaseCartQuantity,removeFromCart} = useShoppingCart()
  const quantity = getItemQuantity(id)
  return (
    <>
    <Card className="h-100 bg-light">
        <Card.Img variant= "top" src={imgURL} height = "300px" style={{objectFit : "cover"}}/>
        <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span>{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
        {quantity === 0 ?(
          <Button className="w-100" onClick={()=>increaseCartQuantity(id)}>+ Add to cart</Button>
        ): <div className="d-flex flex-column align-items-center" style={{gap:".5rem"}}>
          <div className="d-flex align-item-center justify-content-center" style={{gap:".5rem"}}>
          <Button onClick={()=>decreaseCartQuantity(id)}>-</Button>
          <div>
          <span className="fs-3" onClick={()=>increaseCartQuantity(id)}>{quantity}</span> in Cart 
          </div>
          <Button onClick={()=>increaseCartQuantity(id)}>+</Button>
          </div>
          <Button variant="outline-danger" onClick={()=>removeFromCart(id)}>Remove</Button>
          </div>
          }
        </div>
        </Card.Body>
    </Card>
    </>
  )
}

export default StoreItem