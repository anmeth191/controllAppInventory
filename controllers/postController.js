const e = require("cors");
const multer = require("multer");
//this dependency allow us to encrypt the password when the user register into the system
const bcrypt = require("bcrypt");
//declare the saltrounds to use with bcrypt
const saltRound = 10;
const bodyParser = require('body-parser');
const parserEncoded = bodyParser.urlencoded({extended:true})




const upload = multer({Storage:multer.memoryStorage()});

const mysql = require('mysql');
const connectionDB = mysql.createConnection({
    user:'root',
    password:'1234',
    host:'127.0.0.1',
    database:'myHive'
})

module.exports = (app)=>{


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//CREATE A ADD PRODUCT POST REQUEST 

app.post('/products' , (request , response) => {  

let product_name = request.body.product_name;
let product_description = request.body.product_description;
let product_price = request.body.product_price;
let product_unit = request.body.product_unit;
let product_quantity = request.body.product_quantity;
let product_category = request.body.product_category;
let product_supplier = request.body.product_supplier;
let product_photo = request.files.product_photo.data.toString('base64');


connectionDB.query(`insert into product (productName , productDescription, productPrice, productPhoto, unitProduct, productLevels, id_category, id_supplier) values ("${product_name}" , "${product_description}" , "${product_price}" , "${product_photo}" , "${product_unit}" , "${product_quantity}" , "${product_category}" , "${product_supplier}")` , (error , results ) =>{
    if(error) throw error;
    else{
      
response.json({
    message:'Your product has been has been saved into the database in mysql'
})

}//end of the else
})//end of the query
})//end of the app post


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//CREATE A MODIFY PRODUCT POST REQUEST 

app.post('/modifyproduct' , parserEncoded ,(request , response) =>{ 

    let product_id = request.body.product_id;
    let product_name = request.body.product_name;
    let product_description = request.body.product_description;
    let product_price = request.body.product_price;
    let product_unit = request.body.product_unit;
    let product_quantity = request.body.product_quantity;
    let product_category = request.body.product_category;
    let product_supplier = request.body.product_supplier;


   connectionDB.query(`UPDATE product SET productName = "${product_name}",productDescription = "${product_description}",productPrice = "${product_price}",id_category = "${product_category}",id_supplier = "${product_supplier}",productLevels = " ${product_quantity}",unitProduct = "${product_unit}"  WHERE id_product =  ${product_id}` , 
   (error,results) =>{
                if(error) throw error;
                 else{
                response.json({
                message:'Your product has been updated'
                })//end of the response json
              }//end of the callback function

        })//end of the query
})//end of the post to modify the product


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//CREATE A REGISTER POST REQUEST 

app.post('/register' , (request , response )=>{

    // destructure my information coming from the client
let { userName } = request.body;
let { userEmail } = request.body;
let { userPassword } = request.body;


//create a Promise to validate if the user exist or not into the dataBase
let validateUserInDatabase = new Promise((resolve , reject)=>{

//create the conection into the database and select the user
connectionDB.query(`SELECT user_email FROM appUser` , (error , results) =>{

    //convert the result from the datadate into an arrau and inside an pbject where it can be looped
let usersDatabase = JSON.parse(JSON.stringify(results));

//look for the user thay us coming from the client side if the user exist it is going to return true and it can not be added
let matchUser = usersDatabase.find( user => { return user.user_email === userEmail }) 

if(error) throw error;
if(matchUser){
    reject(true);//return true the user already exist in the database
}else{
    resolve(false); //returns false the user does not exist in the database
}
})//end ot my SQL query
})//end of my promise 

//catch the values of my promise
validateUserInDatabase.then( validateResponse =>{ 

   //if when looped into the reults the user is not found or false, it is going to be saved in the database
    if(validateResponse === false){
    
//before send the password to the data base we need to encrypt the password
bcrypt.hash( userPassword , saltRound , (error , hash)=>{
    if(error){
    console.log(error)
    } 
    connectionDB.query(`INSERT INTO appUser (user_email , user_name , user_password ) VALUES ("${userEmail}" , "${userName}" , "${hash}")`);    
    //send a message to the client that the user has been added    
})
  
    response.json({message:'your user has been added'});    
    response.redirect('/login')
    }//catch the in case my promise rejects
}).catch( error =>{ if(error === true){
    
    //if when looped the user is found then send a reject message that the user exist
    response.json({message:'This user already exist'});
 } 

})//end of the catch
})//end of the post to register a new user

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//CREATE A LOGIN POST REQUEST 

app.post('/login' , async (request, response )=>{ 

    const { email } = request.body;
    const { password } = request.body;
    let parseResults = [];

    connectionDB.query(`SELECT * FROM appUser WHERE user_email = "${ email }"` , (error , results) =>{
     if(error){
     throw error;
     }else 
     {   //if the results wih index 0 is undefined then send the error to the client 
        if(results[0] === undefined ){
         response.json({
             message:'Login Failed. Please check email/password'
         })
        }else 
             {  //transform the array coming from the data base in an  object 
               parseResults = JSON.parse(JSON.stringify(results[0]));


           //with this line we are going to compare if the user sent in the login match the one that is encrypted in the database
           //we pass the password sent in the request body and the password coming from the database
         bcrypt.compare(password, parseResults.user_password , (error, comparePasswords)=>{
              if(comparePasswords === true){
                  response.json({
                      message:'Welcome to the inventory App'
                  })//end of the response when the user and the password match
              }else{
                response.json({
                    message:'Login Failed. Please check email/password'
                })//end of the response when the password does not match
              }//end of the else

          })//end of the bcrypt 
        }        
     
     }//end of the else
    })//end of the query 
})//end of the post   

}//end of the module

