
import React, { useState, useEffect } from 'react';
import { useHistory,  useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './AddFarmer.css'; 
const MySwal = withReactContent(Swal);
 function Edit() {
  const { id } = useParams();
  const [farmName, setfarmName] = useState('');
  const [contactInfo, setContact] = useState('');
  const history = useHistory();

  
   useEffect(() => {
    fetch(`http://localhost:8080/api/farm/${id}`)
      .then(response => response.json())
      .then(data => {
        setfarmName(data.farmName);
        setContact(data.contactInfo);
        console.log(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [id]);
   
   function updataform()
   {
    const updatedfarm = { farmName, contactInfo };
    fetch(`http://localhost:8080/api/farm/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedfarm)
    }).then((result)=>{
      if (result.ok)
        {
          MySwal.fire({
            title: 'Update!',
            text: 'Data has been Updated successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
            
          });
        }})
    history.push('/farmerslist');
      
  }
  return (
    <div>
    
      <form className="farmer-registration-form">
        <h2>Update Registration Form</h2>
      {/* <h3>Farmer Id {id}</h3> */}
        <div>
          <label>ReEnter Farmer Name:</label>
          <input type="text" name="name" value={farmName}  required onChange={(e) => setfarmName(e.target.value)}/>
        </div>
        <div>
          <label>ReEnter Mobile No:</label>
          <input type="text" name="contact_Info" value={contactInfo} required onChange={(e) => setContact(e.target.value)}/>
        </div>
        <button type="submit" onClick={updataform}>Register</button>
      </form>
    </div>
  );
}
export default Edit;