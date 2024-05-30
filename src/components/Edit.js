import React from 'react';
import './AddFarmer.css'; 

 function Edit({ title }) {
  return (
    <div>
    
      <form className="farmer-registration-form">
        <h2>Update Registration Form</h2>
      <h3>Farmer Id {title}</h3>
        <div>
          <label>ReEnter Farmer Name:</label>
          <input type="text" name="name" required />
        </div>
        <div>
          <label>ReEnter Mobile No:</label>
          <input type="text" name="location" required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
export default Edit;