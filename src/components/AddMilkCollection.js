import React, { useState,useEffect   } from 'react';
import './AddFarmer.css';
const AddMilkCollection = () => {
 
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [timeSection, setTimeSection] = useState('');
    const [farmers, setFarmers] = useState([]);
    const [selectedFarmer, setSelectedFarmer] = useState('');
    const[quantity,setQuantity]=useState('');
    const[rate,setRate]=useState('');
    const[amount,setAmount]=useState('');
    const[snf,setSnf]=useState('');

    useEffect(() => {
    
        const currentHour = new Date().getHours();
        const defaultTimeSection = currentHour < 12 ? 'morning' : 'evening';
        setTimeSection(defaultTimeSection);
        fetchData();
      }, []);
      const fetchData = async () => {
        try {
        const response =await fetch(`http://localhost:8080/api/farm`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const data = await response.json();
          setFarmers(data);
          if (data.length > 0) {
            setSelectedFarmer(data[0].farmId); // Assuming id is the unique identifier
          }
        }
        catch (error) {
            console.error('Error fetching data:', error);
          }
      };
      const handleFarmerChange = (event) => {
        setSelectedFarmer(event.target.value);

      };
      const addcollection =()=>{
        
      }
    return (
    
        <div className="scrollable-container">
         <form className="farmer-registration-form">
         <h3>Choose a Farmer:</h3>
         <select value={selectedFarmer} onChange={handleFarmerChange}>
        {farmers.map((farmer) => (
          <option key={farmer.id} value={farmer.farmId}>
            {farmer.farmName}
          </option>
        ))}
      </select>
      <p>Selected Farmer ID: {selectedFarmer}</p>
         <label>Date</label>
         <input type='Date' value={date}   onChange={(e) => setDate(e.target.value)}/>
        
          <label>Time Section</label>
    
            <select>as="select"
          value={timeSection}
          onChange={(e) => setTimeSection(e.target.value)}
          <option value="morning">Morning</option>
          <option value="evening">Evening</option></select>
          <label>Quantity</label><input type='text' value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
          <label>SNF</label><input type='text'value={snf} onChange={(e) => setSnf(e.target.value)}/>
          <label>Rate</label><input type='text'value={rate} onChange={(e) => setRate(e.target.value)}/>
          <label>Amount</label><input type='text'value={amount} onChange={(e) => setAmount(e.target.value)}/>
         <button onClick={addcollection}>Submit</button>
         </form>
        </div>
       
    );
};
export default AddMilkCollection;