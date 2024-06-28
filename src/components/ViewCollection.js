
import './ViewCollection.css';
import React, { useEffect, useState} from 'react';
import { format } from 'date-fns';
function ViewCollection()
{
  const [includeFatSnf, setIncludeFatSnf] = useState(false);
 
  const [data, SetData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await fetch(`http://localhost:8080/api/getcollection?chekbox=${includeFatSnf}`);
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const result = await response.json();
          SetData(result);
      
        
      } catch (error) {
          console.error('Error fetching data:', error);
         // setError('Error fetching data. Please try again later.');
        
      }
    };
    fetchData();
  }, [includeFatSnf]);
    

const handleCheckboxChange = async () => {
  setIncludeFatSnf(!includeFatSnf);   
};
   return(
    <div className="scrollable-container">
      <div style={{backgroundColor:'pink'}}>
       <label > 
        <input type="checkbox" checked={includeFatSnf}    onChange={handleCheckboxChange} />
      check box for view  Milk Collection without fat and Snf
       {/* {includeFatSnf ? 'true' : 'false'} */}
      
        </label>
        </div>
    <h2>View Milk Collection </h2>
  
      <table className="farmer-table">

        <thead>
          <tr>
     
            <th>Farmer Name</th>
            <th>Mobile No</th>
            <th>Date</th>
            <th>Section</th>
            <th>Quantity</th>
            <th>Rate</th>
            <th>fatContent</th>
            <th>Snf</th>
            <th>Amount</th>
           
            
          </tr>
        </thead>
        <tbody>
          {
            data.map((record, item) => (
            
              <tr key={item}>
           
                <td>{record.farm.farmName}</td>
                <td>{record.farm.contactInfo}</td>
           
                <td>{ format(new Date(record.date), 'EEE MMM dd  zzz yyyy')}</td>
                <td>{record.section}</td>
                <td>{record.quantity}</td>
                <td>{record.rate}</td>
                <td>{record.fatContent}</td>
                <td>{record.snf}</td>
                <td>{record.amount}</td>
                
              </tr>
            ))}

        </tbody>
      </table>
   </div>
   )

}
export default ViewCollection;