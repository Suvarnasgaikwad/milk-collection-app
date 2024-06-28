import React, { useState,useEffect   } from 'react';
import styles from './HoverEffectList.module.css';
import './milk.css';

const SearchFarmer = (props) => {
    const [query, setQuery] = useState('');
    const [farm, setFarm] = useState([]);
    const [farmers, setFarmers] = useState([]);
    const [isDivVisible, setIsDivVisible] = useState(true);
    useEffect(() => {
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
    
    return(
  <>
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
  </>
    )
}
export default SearchFarmer;