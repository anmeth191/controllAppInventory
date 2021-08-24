
const fileUpload = require('express-fileupload');
const mysql = require('mysql');
const fs = require('fs');
const e = require('cors');
let image = [];
const connectionDB = mysql.createConnection({
     host:'127.0.0.1',
     user:'root',
     password:'1234',
     database:'myHive'
});


module.exports = (app) => {

    //handling the get request to display the caregories in the db
app.get('/categories' , (request , response )=>{
 connectionDB.query('SELECT * FROM category' , (error , resultsDB )=>{ 
     if(error) throw error;
     else { 
      response.json({
        message:'your request has been completed and good',
        body: JSON.parse(JSON.stringify(resultsDB))
       })
     }
})

})

//handling the request to display the suppliers in the database
app.get('/suppliers' , (request , response )=>{
    connectionDB.query('SELECT * FROM supplier' , (error , resultsDB )=>{ 
        if(error) throw error;
        else { 
response.json({
  message:'Your request has been submited',
  body:JSON.parse(JSON.stringify(resultsDB))
})

        }
   })
   })
   
//handling the get request from the client to display all the products in the database
app.get('/products' , (request , response) =>{
connectionDB.query('select * from product' , (error , result)=>{

    if(error)throw error;
    else{
            
response.json({
    message:'your request has been completed',
    body:JSON.parse(JSON.stringify(result))
      })
    }
})

})//end of the get for the products

//handling the get request to display the product details
app.get('/productdescription' , (request , response )=>{
  const id_product = parseInt(request.query.id);

connectionDB.query(`select * from product where id_product = ${id_product}` , (error , result) =>{ 

  if(error) throw error;
  else{
      response.json({
       message:'your request has been done',
       body: JSON.parse(JSON.stringify(result))
      })
     }

})
})


app.get('/categoryproducts' , (request , response) =>{ 

  const id_category = request.query.category;
  connectionDB.query(`select * from product where id_category = ${id_category}` , (error , result) =>{
    if(error) throw error;
    else{
       response.json({
         message:'your request has been submiteed',
         body: JSON.parse(JSON.stringify(result))
       })
    }
  })

})


//get the product that is going to modify
app.get('/modifyproduct' , (request , response)=>{
  let id_product = request.query.id;

  connectionDB.query(`select * from product where id_product = ${id_product}` , (error , result) =>{
     if(error) throw error;
     else{
       response.json({
         message:'request has been made successfully',
         body: JSON.parse(JSON.stringify(result))
       })
     }

  })
})

}//end of the app