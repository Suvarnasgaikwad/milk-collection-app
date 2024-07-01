
import React, { useState } from 'react';
import './AddFarmer.css'; // Assuming you'll add some CSS for styling
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
//import { useHistory } from 'react-router-dom';

const MySwal = withReactContent(Swal);

 function AddFarmer () {
    const [formData, setFormData] = useState({
      farmName: '',
      contactInfo: ''
    });
    const [errors, setErrors] = useState({});
    const validate = () => {
      const errors = {};
  
      if (!formData.farmName.trim()) {
        errors.farmName = 'Name is required';
      } else if (formData.farmName.length < 5) {
        errors.farmName = 'Name must be at least 5 characters';
      } else if (formData.farmName.length > 50) {
        errors.farmName = 'Name must be 50 characters or less';
      }
  
      if (!formData.contactInfo.trim()) {
        errors.contactInfo = 'Phone number is required';
      } else if (!/^[0-9]+$/.test(formData.contactInfo)) {
        errors.contactInfo = 'Phone number is invalid';
      } else if (formData.contactInfo.length < 10 || formData.contactInfo.length > 10) {
        errors.contactInfo = 'Phone number must be  10  digits';
      }
  
      return errors;
    };
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

     function sendData ()
    {     
  
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log('Form Data:', formData);
      fetch("http://localhost:8080/api/farm", {
        method: 'POST',
        headers: {
     
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( formData ),
      }).then((result)=>{
        if (result.ok)
          {
            MySwal.fire({
              title: 'Success!',
              text: 'Data has been submitted successfully.',
              icon: 'success',
              confirmButtonText: 'OK',
 
            });
            setFormData({ farmName: '',contactInfo: '' });
         //   history.push('/farmerslist');
         
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

    //  setFormData({ farmName: '',contactInfo: '' });
    }

    }
  
  return (
    <form  className="farmer-registration-form">
      <div>
        <h2> Registration Form</h2>
        {/* <label htmlFor="farmId">Farmer Id:</label>
        <input type="number" value={farmId}  onChange={e => setFarmId(e.target.value)}/> */}
      </div>
      <div>
        <label htmlFor="farmName">Farmer Name:</label>
        <input type="text" name='farmName' value={formData.farmName}  onChange={handleChange}  />
        {errors.farmName && <div style={{ color: 'red' }}>{errors.farmName}</div>}
      </div>
      <div>
        <label htmlFor="contactInfo">Mobile Number:</label>
        <input type="text" name='contactInfo'  value={formData.contactInfo}  onChange={handleChange}  />
        {errors.contactInfo && <div style={{ color: 'red' }}>{errors.contactInfo}</div>}
      </div>
      
      
      <button type="button" onClick={sendData} >Register</button>
    </form>
  );

}
export default AddFarmer;


