
import './FarmerList.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const MySwal = withReactContent(Swal);
function FarmerList() {
  const history = useHistory();

 function AddFarm()
 {
  history.push('/farmers');
 }

  const [data, SetData] = useState([]);
  useEffect(() => {
   getlist()

  }, [])
  function getlist()
  {
    fetch("http://localhost:8080/api/farm").then((result) => {
      result.json().then((resp) => {
        console.warn("result", resp);
        SetData(resp)
      })
    })
  }
  function formedit(id){
    
        console.log(id);
   
        history.push(`/update/${id}`);
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
  return (
    <div className="scrollable-container">
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
            <th colSpan={2} className="text-center">
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
              </tr>
            ))}

        </tbody>
      </table>
    </div>
  );
}

export default FarmerList;
