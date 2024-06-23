import React, { useState,useEffect   } from 'react';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';

import './milk.css';
// const MySwal = withReactContent(Swal);

const AddMilkCollection = () => {
  const [checkboxes, setCheckboxes] = useState({col1row1: false})
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [section, setsection] = useState('');
     const[quantity,setQuantity]=useState('');
    const[snf,setSnf]=useState('');
    const[fatContent,setfatContent]=useState('');
    const [milktype, setmilktype] = useState('');
    const [query, setQuery] = useState('');
    const [farmers, setFarmers] = useState([]);
    const [farm, setFarm] = useState([]);
    const [isDivVisible, setIsDivVisible] = useState(true);

 
     useEffect(() => {
     
       const currentHour = new Date().getHours();
       const defaultTimeSection = currentHour < 12 ? 'Morning' : 'Evening';
       setsection(defaultTimeSection);
       const fetchFarmers = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/farmers/search?query=${query}`);
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const data = await response.json();
          setFarmers(data);
        } catch (error) {
         // setError('Error fetching farmers');
          console.error('Error fetching farmers:', error);
        }
      };
  
      if (query.trim() !== '') {
        fetchFarmers();
      } else {
        setFarmers([]);
      }
    }, [query]);
   
    
       const addcollection = async (e) => {
       
         console.log(farm,date,section,quantity,milktype,fatContent,snf);
       let milkCollection=({farm,date,section,quantity,milktype,fatContent,snf})
        try {
          const response = await fetch('http://localhost:8080/api/milkcollection', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(milkCollection)
          });
          if (!response.ok) {
            
            throw new Error('Network response was not ok');
          }
    
          const data = await response.json();
        //  console.warn('Success:', data);
          console.log('Fetched data:', data);
          
        } 
        catch (error) {
          console.error('Error:', error);
        }
       }
      const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckboxes({
          ...checkboxes,
          [name]: checked,
        });
      };
      const handleInputChange = (e) => {
        setQuery(e.target.value);
        setIsDivVisible(true);
   
      };
    
      const handleSelectFarmer = (farmer) => {
    
       setQuery(farmer.farmName);
      setFarm(farmer);
       setIsDivVisible(false);

      };
   
     
    return (
    <>
      <form > 
      <div className="container">
          <div className="column">
          <div className="live-search-container">
            <label>Search farmer </label>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search farmers..."
      />
     
     {isDivVisible && (
  <div style={{ backgroundColor: 'white' }}>
    {/* Render your search results here */}
    {farmers.map(farmer => (
      <div
        style={{ cursor: 'pointer', pointerEvents: 'all' }}
        onClick={() => handleSelectFarmer(farmer)}
        key={farmer.farmId}
      >
        {farmer.farmName}
      </div>
    ))}
  </div>
)}

      
      </div>
     
          <label>Quantity</label><input type='text' value={quantity} onChange={(e) => setQuantity(e.target.value)} required/>
          <label>SNF</label><input type='text'value={snf} disabled={checkboxes.col1row1} onChange={(e) => setSnf(e.target.value)} required />
          <label>Fat</label><input type='text'value={fatContent}  disabled={checkboxes.col1row1} onChange={(e) => setfatContent(e.target.value)} required/>
          <button onClick={addcollection}>Submit</button>
         </div>
         <div className="box">
         <label> Date </label>
         <input type='Date' value={date}   onChange={(e) => setDate(e.target.value)}/>
          <label>Time Section </label>
          <input type="text" value={section}   onChange={(e) => setDate(e.target.value)}/>
          <label>Milk Type</label>
            <select>as="select"
          value={milktype}
          onChange={(e) => setmilktype(e.target.value)}
          <option value="Cow">Cow</option>
          <option value="Buffalo">Buffalo</option></select>
         
          <label>
            <input
              type="checkbox"
              name="col1row1"
              checked={checkboxes.col1row1}
              onChange={handleCheckboxChange}
            />
            Check box if Calculate Amount without Fat/SNF
          </label>
          </div>
       
         </div>
         </form>
       
       </>
    );
};
export default AddMilkCollection;