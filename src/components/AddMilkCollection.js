import React, { useState,useEffect   } from 'react';
import './AddFarmer.css';
const AddMilkCollection = () => {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [section, setsection] = useState('');
    const [farmers, setFarmers] = useState([]);
    const [selectedFarmer, setSelectedFarmer] = useState('');
   const[quantity,setQuantity]=useState('');
    const[rate,setRate]=useState('');
    const[amount,setAmount]=useState('');
    const[snf,setSnf]=useState('');
    const[fatContent,setfatContent]=useState('');
    const [milktype, setmilktype] = useState('');

     useEffect(() => {
       const currentHour = new Date().getHours();
       console.log(currentHour);
       const defaultTimeSection = currentHour < 12 ? 'morning' : 'evening';
       setsection(defaultTimeSection);
       console.log(defaultTimeSection);
        fetchData();
       }, []);
      const fetchData = async () => {
        try {
        const response =await fetch(`http://localhost:8080/api/farm`);
        if (response.ok) {
         
           const data = await response.json();
           setFarmers(data);
           if (data.length > 0) {
            setSelectedFarmer(data[0].farmId); // Assuming id is the unique identifier
          }
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
      const handleFatChange = (e) => {
        setfatContent(e.target.value);
    };

    const handleSnfChange = (e) => {
        setSnf(e.target.value);
    };
    return (
    <>
        <div className="scrollable-container">
         <form className="farmer-registration-form">
         <h3>Choose a Farmer:</h3>
         <select value={selectedFarmer} onChange={handleFarmerChange}>
        {farmers.map((farmer,item) => (
          <option key={item} value={farmer.farmId}>
            {farmer.farmName}
          </option>
        ))}
      </select>
      <p>Selected Farmer ID: {selectedFarmer}</p>
         <label>Date</label>
         <input type='Date' value={date}   onChange={(e) => setDate(e.target.value)}/>
          <label>Time Section</label>
            <select>as="select"
          value={section}
          onChange={(e) => setsection(e.target.value)}
          <option value="morning">Morning</option>
          <option value="evening">Evening</option></select>

          <label>Milk Type</label>
            <select>as="select"
          value={milktype}
          onChange={(e) => setmilktype(e.target.value)}
          <option value="Cow">Cow</option>
          <option value="Buffalo">Buffalo</option></select>

          <label>Quantity</label><input type='text' value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
          <label>SNF</label><input type='text'value={snf} onChange={handleSnfChange} required />
          <label>Fat</label><input type='text'value={fatContent}   onChange={handleFatChange} required/>
          <label>Rate</label><input type='text'value={rate} onChange={(e) => setRate(e.target.value)}/>
          <label>Amount</label><input type='text'value={amount} onChange={(e) => setAmount(e.target.value)}/>
         <button onClick={addcollection}>Submit</button>
         </form>
        </div>
       </>
    );
};
export default AddMilkCollection;