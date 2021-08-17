
// //RENDERS POST WHEN USER CLICKS BUTTON GETS USER 
// function RenderUsers({usersGet}){
//   return(
//   <div>
//     {  usersGet.map( user =>{ 
//          return(
//            <ul key={user.id}>
//              <li>{user.name}</li>
//             </ul>
//               )
//           })
//         }
//     </div>
// )
// }




// //create POST send a new user to my API
// function CreatePost({ users }){
//   const userApp = users;
//   const [user , setUser ] = useState('');
//   const [ username , setUsername ] = useState('')


//    //control when the for is submitted
//   const submitHandler =(event)=>{
//     //prevents default behavior
//   event.preventDefault();
//   //create the post to the API
//   sendPost();
//  }
  
//  const sendPost = async ()=>{

//    await fetch('https://jsonplaceholder.typicode.com/users' , {
//      method:'POST',//end of my method
//      headers:{ 
//        "Accept":"application/json , text/plain , */*",
//        "Content-Type":"application/json"
//      },//end of my headers
//      body:JSON.stringify({ 
//        username:username,
//        user:user
//      })//end of my body
//    }).then( response =>{ return response.json()}).then( data =>{ 
//   }) 

//  }//end of my send post 

//   //return statment 
//   return(
//     <div>
//       <form onSubmit={ submitHandler}>
//         <div>
//         <label htmlFor="name">Name:</label>
//         <input type="text"  name="name" value={ user } onChange={(event)=>{
//               setUser(event.target.value);
//         }}/>
//         </div>
//         <div>
//         <label htmlFor="username">Username:</label>
//         <input type="text"  name="username" value={ username } onChange={(event)=>{
//         setUsername(event.target.value);
//         }}/>
//         </div>
//          <button type="submit">Post User</button>
//         </form>
//    </div>
//   )
// }

// //mainFunction where create the call to the API and sends as props to component RenderUsers
// function App(){
// const [users , setUsers] = useState([]);
// const getUsers = async ()=>{
//  await fetch('https://jsonplaceholder.typicode.com/users').then( response =>{ return response.json()}).then( data =>{ setUsers(data)})
// }

// return(
//   <div>
//    <button onClick={ getUsers }>Get Users</button>
//     <RenderUsers  usersGet={ users }/>
//     <CreatePost users={ users }/>
//     </div>
// )


// }

// export default App;

import React from 'react';
import { useState  , useEffect } from 'react';
import axios from 'axios';


function DisplayContent({information , users}){
  const userSearch =  users.find( user =>{ return user.id === parseInt(information)})
  console.log(userSearch)
  return(
    <div>
     <h2>Name:{userSearch.name}</h2> 
    <h4>Email:{userSearch.email}</h4>
    </div>
  )
}

function CreateList({ usersGot }){
  const users = usersGot;
 const [userSelected , setUserSelected ] = useState(1); 

  return(
    <div>
      <select value={ userSelected } onChange={ (event)=>{ 
        setUserSelected(parseInt(event.target.value))
         }}>
        { usersGot.map( user =>{
           return(
           <option key={user.id} value={user.id}>{user.username}</option>
           )//end of the return
        })}
      </select>
      <DisplayContent information = { userSelected }  users={ users}/>
      </div>
  )
}


function App(){
const [users  , setUsers ] = useState([]);
const getUsers = async ()=>{
await fetch('https://jsonplaceholder.typicode.com/users').then( response =>{ return response.json()}).then( data =>{ setUsers(data)})

}

useEffect(() => {
  getUsers();
}, []);


return(
  <div>
    <CreateList usersGot = { users }/>
    </div>
)
}

export default App;