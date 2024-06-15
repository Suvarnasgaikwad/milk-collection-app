
import './FarmerList.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import React, { useEffect, useState,useCallback } from 'react';
import { useHistory  } from 'react-router-dom';
import Pagination from './Pagination';
import './Pagination.css';
const MySwal = withReactContent(Swal);

function FarmerList() {
  const [currentPage, setCurrentPage] = useState(0);
  const [data, SetData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  let size=5;
  const history = useHistory();

 function AddFarm()
 {
  history.push('/farmers');
 }

  const getlist = useCallback(async () => {
   const response = await fetch(`http://localhost:8080/api/farms?page=${currentPage}&size=${size}&search=${searchTerm}`)

      const result = await response.json();
      SetData(result.content); 
  },[currentPage, size,searchTerm]);

  useEffect(() => {
   
    getlist()
  
    }, [getlist])

  function formedit(id){
    
        console.log(id);
   
        history.push(`/update/${id}`);
    }
    function addCollection(farmId){
    
      console.log(farmId);
 
      history.push(`/addmilk/${farmId}`);
  }

  function deletefarm(id) {
    fetch(`http://localhost:8080/api/farm/${id}`,
    { 
      method:'Delete',
     headers: {
     
        'Content-Type': 'application/json'
      },
   }).then((result)=>{
    if (result.ok)
      {
        MySwal.fire({
          title: 'Delete!',
          text: 'Data has been deleted successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
   })
       getlist()
       
  }
  else{
    MySwal.fire({
      title: 'Error!',
      text: ' Please try again.',
      icon: 'error',
      confirmButtonText: 'OK',
    });
}
})}
const handleNext = () => {
 
    setCurrentPage(currentPage + 1);
    console.log(currentPage);


}
const handlePrevious = () => {
  if (currentPage > 0) {
    setCurrentPage(currentPage - 1);
    console.log(currentPage);
  }
  }
  const inputStyle = {
    padding: '10px',
    width: '200px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '20px'
      
};
const labelStyle = {
  fontWeight: 'bold',
  fontSize: '16px',
  color: '#333'
};

  return (
    <div className="scrollable-container">
      <label style={labelStyle}>Search Farmer By Name:</label>
      <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                style={inputStyle}
            />
            <br/>
      <button style={{ backgroundColor: "red", marginTop: "5px" }}
        onClick={()=>AddFarm()}
        className="button muted-button" >
        Add Farmer
      </button>
     
      <table className="farmer-table">

        <thead>
          <tr>
            {/* <th>Farmer Id</th> */}
            <th>Farmer Name</th>
            <th>Mobile No.</th>
            <th colSpan={3} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((data, item) => (
              <tr key={item}>
                {/* <td>{data.farmId}</td> */}
                <td>{data.farmName}</td>
                <td>{data.contactInfo}</td>
                <td className="text-right">
                  <button
                    onClick={()=>formedit(data.farmId)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
             
                </td>
                <td className="text-left">
                  <button
                    onClick={() => deletefarm(data.farmId)}
                    className="button muted-button"
                  >
                    Delete
                  </button>

                </td>
                <td className="text-left">
                  <button
                    onClick={() => addCollection(data.farmId)}
                    className="button muted-button"
                  >
                    Add Collection
                  </button>

                </td>
              </tr>
            ))}

        </tbody>
      </table>
      
  <Pagination
        currentPage={currentPage}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </div>
  );
}

export default FarmerList;
