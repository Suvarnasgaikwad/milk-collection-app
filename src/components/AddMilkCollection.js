import React, { useState,useEffect   } from 'react';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
import { useParams  } from 'react-router-dom';
import './AddMilkCollection.css';
// const MySwal = withReactContent(Swal);

const AddMilkCollection = () => {
    
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [section, setsection] = useState('');
    const { farmId } = useParams();
    const [farmName, setfarmName] = useState('');
    const [contactInfo, setContact] = useState('');
     const[quantity,setQuantity]=useState('');
    const[snf,setSnf]=useState('');
    const[fatContent,setfatContent]=useState('');
    const [milktype, setmilktype] = useState('');

     useEffect(() => {
      fetch(`http://localhost:8080/api/farm/${farmId}`)
      .then(response => response.json())
      .then(data => {
        setfarmName(data.farmName);
       setContact(data.contactInfo);
        console.log(data.farmId);
      }).catch(error => console.error('Error fetching data:', error));
       const currentHour = new Date().getHours();
       const defaultTimeSection = currentHour < 12 ? 'Morning' : 'Evening';
       setsection(defaultTimeSection);
     
      }, [farmId]);
    
      const addcollection = async (e) => {
        let farm=({farmId,farmName,contactInfo})
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
          console.log('Success:', data);
        } catch (error) {
          console.error('Error:', error);
        }
      }
    return (
    <>
      <form className="bg">  
       <div className="milk-addition-form">
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
          </div>
          <div className="milk-addition-form">
          <label> Farmer Name:</label>
          <input type="text" name="name" value={farmName} />
          <h3>Farmer Id: {farmId} </h3>
          
          <label>Quantity</label><input type='text' value={quantity} onChange={(e) => setQuantity(e.target.value)} required/>
          <label>SNF</label><input type='text'value={snf}onChange={(e) => setSnf(e.target.value)} required />
          <label>Fat</label><input type='text'value={fatContent}   onChange={(e) => setfatContent(e.target.value)} required/>
         </div>
         <button onClick={addcollection}>Submit</button>
         </form>
       
       </>
    );
};
export default AddMilkCollection;