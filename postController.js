const e = require("cors");
const multer = require("multer");
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

app.post('/modifyproduct' , (request , response) =>{ 
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
    
        connectionDB.query(`INSERT INTO appUser (user_email , user_name , user_password ) VALUES ("${userEmail}" , "${userName}" , "${userPassword}")`);    
    //send a message to the client that the user has been added
    
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
    let verifyUser = null;
     
    //try the resolve of the promise when the user is found 
    try{ 
     verifyUser = await checkUserLogin(email , password);
     }catch(error){
     //send the error to the client when the user is not found in the system
    response.json({
        userFound:error
    })//end of the response
  }//end of the catch
})

}//end of the module

//this promise return the email and the user form the login component is sended to the server to log in
const checkUserLogin = (emailCheck, emailPassword) =>{ 
return new Promise((resolve , reject) =>{
let parseResults = [];
connectionDB.query(`SELECT user_email , user_password FROM appUser WHERE user_email = "${ emailCheck }"` , (error , results)=>{ 

parseResults = JSON.parse(JSON.stringify(results[0]));
if(parseResults.length === 0 || parseResults.user_password !== emailPassword){

    reject({ foundUser:false})
} else{

    resolve({ foundUser:true , credentials: parseResults.user_email})
}  




})//end of the query
})//end of the promise
}//end of the function