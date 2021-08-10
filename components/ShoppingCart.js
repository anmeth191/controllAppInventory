import React from 'react';
import { connect } from 'react-redux';

class ShoppingCart extends React.Component{
constructor(props){
    super(props)
    this.state = {
       itemsCart : this.props.items,
       payment:0, 
       refreshQuantity:0
    }
}

calculatePayment = ()=>{
    let totalPay = 0;
    this.state.itemsCart.forEach( element =>{ //
    totalPay += element.items.productPrice * element.quantity;
    })
      
    this.setState({payment:  totalPay} , ()=>{ return this.state.payment})


}
//increment or decrement the quantity



componentDidMount(){
this.calculatePayment();

}
render(){
    console.log(this.state.payment)
    console.log(this.state.itemsCart)
    return( 
        <div> 
            <h1>Total: {`${this.state.payment}.00 $`}</h1>
           { 
            this.state.itemsCart.map( (element , index) =>{
                       return(
                   <div key={Math.floor(Math.random() * 1000000) + 1}>
                    <h3>{element.items.productName}</h3>
                    <h3>{element.items.productPrice}</h3>
                    <div>
                    <span>{element.quantity}</span>
                    </div>
                    
                    </div>    
               )
            })
           }
            </div>
        )
    }
}

const showItemsFromProps = (state)=>{
return { items: state.itemsCart }
}


// const updateItemsProps = (dispatch)=>{

// return {  updateItem: (updatequantity , itemIndex)=>{ dispatch({ type:'UPDATE_ITEM' , updatequantity , itemIndex})}}
// }
export default connect(showItemsFromProps)(ShoppingCart);