import React, { useState, useEffect, useRef } from 'react';
import './milk.css';
import styles from './HoverEffectList.module.css';
import { format } from 'date-fns';
import { fetchSettings } from '../utils/Settings';
import ViewCollection  from './ViewCollection'

const AddMilkCollection = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState('');
  const inputRef = useRef(null);
  const resultRefs = useRef([]);
  const quantityRef = useRef(null);
  const fatRef = useRef(null);
  const snfRef = useRef(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [enableFatSnf, setEnableFatSnf] = useState(false);
  const [fixedRate, setFixedRate] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [section, setsection] = useState('');
  const [quantity, setQuantity] = useState('');
  const [snf, setSnf] = useState('');
  const [fatContent, setfatContent] = useState('');
  const [milktype, setmilktype] = useState('cow');
  const [query, setQuery] = useState('');
  const [farmers, setFarmers] = useState([]);
  const [farm, setFarm] = useState([]);
  const [isDivVisible, setIsDivVisible] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(()=>{
    fetchSettings().then(settings => {
      setEnableFatSnf(settings.enableFatSnf);
      setFixedRate(settings.fixedRate);
      console.log(settings);
    });
  },[]);
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
  useEffect(() => {
   
    if (inputRef.current) {
      inputRef.current.focus();
    }
  },[]);
  const validateFat = (value) => {
    
    const fatValue = parseFloat(value);
    if (isNaN(fatValue)) {
      return 'FAT must be a required';
    } else if (fatValue < 3.2 || fatValue > 5.0) {
      return 'FAT must be between 3.2 and 5.0';
    }
 
    return null;
  };

  const validateSnf = (value) => {
  
    const snfValue = parseFloat(value);
    if (isNaN(snfValue)) {
      return 'SNF must be a required';
    }
    else if (snfValue < 8.3 || snfValue > 8.7) {
      return 'SNF must be between 8.3 and 8.7';
    }

    return null;
  };
  const validateQuantity = (value) => {
    const quantityValue = parseFloat(value);
    if (isNaN(quantityValue)) {
      return 'quantity must be a required';
    } 
    return null;
  }

  const handleSubmit = async (e) => {
  
    setShowSuccessMessage(true);
    const fatError = validateFat(fatContent);
    const snfError = validateSnf(snf);
    const quantityError=validateQuantity(quantity);
    
    if (fatError || snfError || quantityError) {
      setErrors({ fatContent: fatError, snf: snfError,quantity:quantityError });
      
    
    } else {
      setErrors({});

      const milkData = {
        farm: farm,
        milkType: milktype,
        date: format(date, 'yyyy-MM-dd HH:mm:ss'),
        section: section,
        quantity: quantity,
        rate: fixedRate,
        chekbox: enableFatSnf,
        ...(!enableFatSnf && { fatContent: fatContent, snf: snf })

      };

      try {
        const response = await fetch('http://localhost:8080/api/milkcollection', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(milkData)
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');

        }
        const data = await response.json();
        console.log('Fetched data:', data);
        
        setQuery('');
        setQuantity('');
        setSnf('');
        setfatContent('');
        setIsPressed(true);
        setTimeout(() => setIsPressed(false), 1000);
      setShowSuccessMessage("Form submitted successfully");
        setTimeout(() => {
          setShowSuccessMessage('');
        }, 3000);
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
      catch (error) {
        console.error('Error:', error);

      }
    }
  }
  const handleInputChange = (e) => {
 
    setQuery(e.target.value);
    setIsDivVisible(true);
  };
  const handleSelectFarmer = (farmer) => {
    setQuery(farmer.farmName);
    setFarm(farmer);
    setIsDivVisible(false);
    console.log(farm);
  };
  const handleChange = (event) => {
    setmilktype(event.target.value);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowDown' && focusedIndex < farmers.length - 1) {
        setFocusedIndex((prevIndex) => prevIndex + 1);
      } else if (event.key === 'ArrowUp' && focusedIndex > 0) {
        setFocusedIndex((prevIndex) => prevIndex - 1);
      }
      else if (event.key === 'Enter' && focusedIndex >= 0) {

        setQuery(farmers[focusedIndex].farmName);
        // setFarmers([]);
        setFarm(farmers[focusedIndex]);
        setFocusedIndex(-1);
        setIsDivVisible(false);

        console.log(farm)
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [focusedIndex, farmers, farm]);

  useEffect(() => {
    if (focusedIndex >= 0 && resultRefs.current[focusedIndex]) {
      resultRefs.current[focusedIndex].focus();
    }
  }, [focusedIndex]);

  const handleKeyDown = (e, nextRef) => {
    if (e.key === 'Enter') {
      e.preventDefault();
     //   nextRef.current.focus();
      if (nextRef) {
        nextRef.current.focus();
      } 
      else {
        handleSubmit(e);
       
      }
    }
    

  };
  return (
    <>
   <div className="scrollable-container">
      <form onSubmit={handleSubmit} >
        <div className="container">
          <div className="column">
            <div className="live-search-container">
              <label>Search farmer </label>
              <input
                type="text"
                ref={inputRef}

                value={query}
                onChange={handleInputChange}
                placeholder="Search farmers..."
              required/>
              {isDivVisible && (
                <div style={{ backgroundColor: 'white' }}>

                  {farmers.map((farmer, index) => (
                    <div
                      ref={(el) => (resultRefs.current[index] = el)}
                      onKeyDown={(e) => handleKeyDown(e, quantityRef)}
                      tabIndex="0"
                      style={{
                        // padding: '8px',
                        // border: '1px solid black',
                        // margin: '4px 0',
                        backgroundColor: focusedIndex === index ? 'lightblue' : 'white',
                      }}
                      className={styles.hoverEffect}
                      onClick={() => handleSelectFarmer(farmer)}
                      key={index}
                    >
                      {farmer.farmName}
                    </div>
                  ))}
                </div>
              )}
            </div>
             <div>
            <label>Quantity</label><input type='text'
              ref={quantityRef}
              onKeyDown={(e) => handleKeyDown(e, fatRef)}
              value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
              {errors.quantity && <div style={{ color: 'red' }}>{errors.quantity}</div>}
              </div>
            {!enableFatSnf && (
              <div>
                <label>  Fat  </label>
                <input type="number"
               
                  ref={fatRef}
                  onKeyDown={(e) => handleKeyDown(e, snfRef)}
                  value={fatContent} onChange={(e) => setfatContent(e.target.value)} required />

                {errors.fatContent && <div style={{ color: 'red' }}>{errors.fatContent}</div>}
              </div>
            )}
            {!enableFatSnf && (
              <div>
                <label> SNF  </label>
                <input type="number"
                  onKeyDown={(e) => handleKeyDown(e, null)}
                  ref={snfRef}
                  value={snf} onChange={(e) => setSnf(e.target.value)} required />
                {errors.snf && <div style={{ color: 'red' }}>{errors.snf}</div>}
              </div>
            )}
            <button 
             className={isPressed ? 'pressed' : ''}
            //  onKeyDown={handleKeyDown}
            type="submit" >Submit</button>
            {showSuccessMessage && <p style={{ color: 'black',backgroundColor:'white',font:'bold' }}>{showSuccessMessage}</p>}
        
          </div>


          <div className="box">
            <label> Date </label>
            <input type='Date' value={date} onChange={(e) => setDate(e.target.value)} />
            <label>Time Section </label>
            <input type="text" value={section} onChange={(e) => setsection(e.target.value)} />
            <label>Milk Type</label>
            <select value={milktype} onChange={handleChange}>
              <option value="">--Please choose an option--</option>
              <option value="cow">Cow</option>
              <option value="Buffelo">Buffelo</option>
            </select>
            <p>Selected value: {milktype}</p>
          </div>

        </div>
      </form>
      <ViewCollection/>
      </div>

    </>
  );
};
export default AddMilkCollection;