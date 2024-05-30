
import React, { useState } from 'react';
import './AddFarmer.css'; // Assuming you'll add some CSS for styling
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useHistory } from 'react-router-dom';

const MySwal = withReactContent(Swal);
 function AddFarmer () {
  const history = useHistory();

  const [farmId,setFarmId]=useState("")
    const [farmName,setFarmName]=useState("")
    const[contactInfo,setContactInfo]=useState("")
  

     function sendData ()
    {     
     console.warn({farmId,farmName,contactInfo})
      let farm={farmId,farmName,contactInfo}

       fetch("http://localhost:8080/api/farm", {
        method: 'POST',
        headers: {
     
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( farm ),
      }).then((result)=>{
        if (result.ok)
          {
            MySwal.fire({
              title: 'Success!',
              text: 'Data has been submitted successfully.',
              icon: 'success',
              confirmButtonText: 'OK',
              
            });
            setFarmId("");
            setFarmName("");
            setContactInfo("");
            history.push('/farmerslist');
          }
            else{
              MySwal.fire({
                title: 'Fill Form!',
                text: 'Write information. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK',
              });
          }
       
       console.warn(result);
       
     });
       
        
    
    }
  return (
    <form  className="farmer-registration-form">
      <div>
        <h2> Registration Form</h2>
        <label htmlFor="farmId">Farmer Id:</label>
        <input type="number" value={farmId}  onChange={e => setFarmId(e.target.value)}/>
      </div>
      <div>
        <label htmlFor="farmName">Farmer Name:</label>
        <input type="text" value={farmName} onChange={e => setFarmName(e.target.value)}  />
      </div>
      <div>
        <label htmlFor="contactInfo">Mobile Number:</label>
        <input type="text" value={contactInfo}  onChange={e => setContactInfo(e.target.value)} />
      </div>
      
      
      <button type="button" onClick={sendData} >Register</button>
    </form>
  );

}
export default AddFarmer;


