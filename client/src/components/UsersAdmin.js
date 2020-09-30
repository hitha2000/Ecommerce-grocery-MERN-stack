import React,{useEffect,useState} from 'react'
import { func } from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Cookie from 'js-cookie'

function UserAdmin()
{
  const[data,setdata]=useState()
    
  const userinform=JSON.parse(Cookie.get('userInfo'))
  const config={
    headers:
    {
        'Content-Type':"application/json",
        
            'Authorization': 'bearer '+ userinform.token
        
    }
  
}

   var data1=0
   
   useEffect(() => {
     const fetchusers=async()=>
     {

    try{
    data1=await axios.get('http://localhost:5000/users/allusers',config)
    var data2=data1.data
    data2=data2.user
    console.log(data2)
    var d3=[]
    var dat=data2.map((item)=>
    {
      var d4={"customerid":item.custId}
     
      d4.name=item.name
      d4.phone=item.phone
      d4.email=item.email
      d4.address=item.address
      d3.push(d4)
    }) 
   setdata(d3)
    }
    catch(error)
    {
      console.log("no users")
    }
     
   }
   fetchusers()
  },[])
if(data)
  { const  getKeys = function(){
        return Object.keys(data[0]);
        }
     
        const getHeader = function(){
            var keys = getKeys();
          
            return keys.map((key)=>{
              
            return <th key={key}>{key.toUpperCase()}</th>
            })
            }
            var x=1
            var k=[]
           const RenderRow = (props) =>{  
             
             k= props.keys.map((key, index)=>{
               
           return <td  key={props.data[key]}>{props.data[key]}</td> })
           return k
         }
           const getRowsData = function(){
            var items = data;
            var keys = getKeys();
            return items.map((row, index)=>{
            return <tr key={index}><RenderRow key={index} data={row} keys={keys}/></tr>
            })
            }
        

        return (
          <>
          
          <nav className="navbar navbar-dark bg-dark mb p-2">

            <div className="container" style={{color:"white"}}>
            <div className="col-3  col-sm-1 nav-item"><a href="/admin" className="text-white"><span className="fa fa-home fa-lg btn-white" style={{cursor:"pointer"}} >Home</span></a></div>
                <div className=" col-9  col-sm-7 nav-item"><h4>Sri Balaji Stores</h4></div>
            </div>
          </nav>
          <div className="bg-primary p-2 mb-4" style={{color:"white"}}>
            <div className="col-12">
           
            <h2 style={{textAlign:"center"}}> <span className="fa fa-users"></span> Users</h2>
            </div>
          </div>


          <div className="table table-striped table-bordered container table-hover table-responsive">
            <table className="m-auto">
            <thead className="thead-dark">
            <tr>{getHeader()}</tr>
            </thead>
            <tbody>
            {getRowsData()}
            </tbody>
            </table>
            </div>

            

            <footer id="main-footer" class="bg-dark text-white mt-5 p-5">
    <div class="container">
      <div class="row">
        <div class="col">
          <p class="lead text-center">
            Copyright &copy;
            <span id="year">2020  </span>
               Sri Balaji Stores
          </p>
        </div>
      </div>
    </div>
  </footer>
            
          </>
            
            );
        }

      else{
        return(
          <div>Loading</div>
        )
      }
       
}
export default UserAdmin