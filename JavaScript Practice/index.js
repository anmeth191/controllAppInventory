
// function myScope(){
// var hello = 'Hello world'
// //let  hello = 'Hello world'
// //const hello = 'Hello world'

// console.log(hello);
// }


 
// myScope();
// console.log(hello);

//hosting 
// number = 5;
// let number;
// console.log(number);

// const myFunction = ()=>{

// var myName ;
// let total = myName + 1
// //document.querySelector('#title').innerHTML = myName;
// myName=1;
// console.log(total)

// }

//document.querySelector('#title2').innerHTML = myName;

// myFunction();



// // const human = {
// //     name:'Angel',
// //     age:29,
// //     activities: function(){
// //         return `${this.name} is ${this.age} years old`
// //     }
// // }

// // console.log(human.activities());


// // const myFunction = ()=>{

// // let number = 10;
// // let total = number + 5;
// // //number = 5;

// // console.log(total)
// // }

// // myFunction();


// // class UserApp {

// // constructor(username , lastname , age){

// //     this.user = username;
// //     this.lastname = lastname;
// //     this.edad = age;

// // }

// // displayUser(city){
// //     this.ciudad = city;
// //     return ` ${this.user } asking for the age of ${this.edad} and he lives in ${this.ciudad}`
// // }
// // }

// // let showUser = new UserApp('Angel' , 'Rivera' , 29);
// // console.log(showUser.displayUser('Fleetwood'));

// // const callbackMessage = (wave)=>{

// //  document.querySelector('#title').innerHTML = wave;

// // }



// // const sayHello = ()=>{
// //     callbackMessage('HELLOOOOOOOO');
// // }

// // const sayGoodbye = ()=>{
// //     callbackMessage('GOODBYE');
// // }

// // sayGoodbye();
// // sayHello();

// // const myDisplayerCallback =  (result)=>{
// //     document.querySelector('#title').innerHTML = result; 
// // }


// // const createProcess = (number1 , number2 , showResult)=>{

// //      let total = number1 + number2;
// //      showResult(total)
// // }


// // createProcess(2 , 3 , myDisplayerCallback);

// const displayUsers = (users)=>{
    
//   let ulList = document.querySelector('#ulList');
//   let usersLoop = users;


//    usersLoop.map (element =>{ 
//     let li = document.createElement('li');
//     let textNode = document.createTextNode(element.name)
//     li.appendChild(textNode);
//     ulList.appendChild(li)
//    })
// }

//   const createRequest = async (display)=>{

//     await fetch('https://jsonplaceholder.typicode.com/users')
//     .then( response =>{ return response.json()})
//     .then( data =>{ display(data)})
   
// }


//   createRequest(displayUsers);


//   const form = document.querySelector('#form');
//   let name = document.querySelector('#name');
//   const username = document.querySelector('#username');
// let nameTyped , usernameTyped = '';

//   form.addEventListener('submit' , (event)=>{ 
//       event.preventDefault();
//       const sendPost = new CreatePost(nameTyped , usernameTyped)
//       sendPost.fetchPost();
//       sendPost.showUsers();
//     });


// name.addEventListener('keyup', (event)=>{ nameTyped = event.target.value;})  
// username.addEventListener('keyup', (event)=>{ usernameTyped = event.target.value;})  

// class CreatePost{
// constructor(name,username){
// this.name = name;
// this.username = username;
// }


// async fetchPost(){
//     const data = {
//         name: this.name,
//         username:this.username
//     }
// await fetch('https://jsonplaceholder.typicode.com/users' ,{ 
//     method:'POST',
//     headers:{'Content-Type':'application/json', 
//     body:JSON.stringify(data) 
// }
// }).then( response =>{ return response.json()}).then( data =>{ console.log( data)}).catch(error =>{ console.log(error)});
// }
// async showUsers(){
// await fetch('https://jsonplaceholder.typicode.com/users').then( response =>{ return response.json()}).then( newUsers =>{ console.log(newUsers)})
// }


// }


// const sumFunction = (...arguments)=>{
//     let total = 0;
//     const arg = arguments;
//     arg.forEach( number =>{ 
//        total += number;
//     })

//     console.log(total)
// }



// console.log('total')
// sumFunction(10,10,10,10,10)


// const getValue =(array)=>{

//     const element = array.filter( element =>{
//         return element.name
//     })

//     element.forEach(element => {
//         console.log(element.name)
//     });

// }

// getValue([{name:'Angel'} , {id:'1'} , {name:'Elyin'} , {name:'Tina'} , {city:'Boaco'}])


//grab the eleme
const titlePost = document.querySelector('#title');
const bodyPost = document.querySelector('#body');
const form = document.querySelector('#form');
const dataPost = {
    userId:2,
    title:'',
    body:''
}

titlePost.addEventListener('keyup' , (event)=>{
    dataPost.title = event.target.value
})


bodyPost.addEventListener('keyup' , (event)=>{
    dataPost.body = event.target.value
})

// //create a event for the form when the button is clicked
form.addEventListener('submit' , (event)=>{
    event.preventDefault();
    submitPost();   
})

const submitPost = ()=>{
    fetch("https://jsonplaceholder.typicode.com/posts",{
        method:"POST",
        headers:{
         "Accept":"application/json , text/plain, */*",   
         "Content-Type":"application/json"
        },
        body:JSON.stringify(dataPost)
    }).then( response => { return response.json()}).then( data =>{ console.log(data)})
}



// const submitPost = ()=>{
//      fetch("https://jsonplaceholder.typicode.com/posts",{
//         method:"POST",
//         headers:{
//             "Accept":"application/json, text/plain, */*",
//             "Content-Type":"application/json"
//         },
//         body: JSON.stringify({
//             title:'hello',
//             body:'body'
//         })
//     }).then( response =>{ return response.json()}).then( data =>{ console.log(data)})
// }

// fetch("https://jsonplaceholder.typicode.com/posts",{
//     method:"POST",
//     headers:{ 
//         "Accept":"application/json , text/plain , */*",
//         "Content-Type":"application/json"
//     },
//     body:JSON.stringify({  title:"created a new Title" })
// }).then( response =>{ return response.json()}).then( data =>{ console.log(data)})
