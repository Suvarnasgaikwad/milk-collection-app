import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './milk.css';
import styles from './HoverEffectList.module.css';

import { format } from 'date-fns';
import { fetchSettings } from '../utils/Settings';
const MySwal = withReactContent(Swal);
const AddMilkCollection = () => {

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

  useEffect(() => {

    const currentHour = new Date().getHours();
    const defaultTimeSection = currentHour < 12 ? 'Morning' : 'Evening';
    setsection(defaultTimeSection);

    fetchSettings().then(settings => {
      setEnableFatSnf(settings.enableFatSnf);
      setFixedRate(settings.fixedRate);
      // console.log(settings);
    });
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
    console.log(enableFatSnf);
    const validationError = validateFatSnfValues();
    if (validationError) {
      MySwal.fire({
          title: 'Validation Error!',
          text: validationError,
          icon: 'error',
          confirmButtonText: 'OK'
      });
      return;
  }

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
      if (! response.ok) {
     throw new Error('Network response was not ok');
      
      }
      const data = await response.json();
      console.log('Fetched data:', data);
    }
    catch (error) {
      console.error('Error:', error);
  
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
  };
  const handleChange = (event) => {
    setmilktype(event.target.value);
  };
  const validateFatSnfValues = () => {
    const fat = parseFloat(fatContent);
    const Snf = parseFloat(snf);
    if (fat < 3.2 || fat > 5.1) {
        return 'FAT value must be between 3.0 and 8.0';
    }
    if (Snf < 8.2 || Snf > 8.8) {
        return 'SNF value must be between 7.0 and 12.0';
    }
    return null;
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
                      className={styles.hoverEffect}
                      onClick={() => handleSelectFarmer(farmer)}
                      key={farmer.farmId}
                    >
                      {farmer.farmName}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <label>Quantity</label><input type='text' value={quantity} onChange={(e) => setQuantity(e.target.value)} required />

            {!enableFatSnf && (
              <div>
                <label>Fat  </label>
                <input type="number" value={fatContent} onChange={(e) => setfatContent(e.target.value)} required />

                <label> SNF  </label>
                <input type="number" value={snf} onChange={(e) => setSnf(e.target.value)} required />

              </div>
            )}
            <button onClick={addcollection}>Submit</button>
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

    </>
  );
};
export default AddMilkCollection;