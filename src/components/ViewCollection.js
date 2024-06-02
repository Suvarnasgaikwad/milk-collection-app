import React from 'react';
import './ViewCollection.css';
function ViewCollection()
{
   return(
    <div className="scrollable-container">
    <h2>View Milk Collection </h2>
   
      <button style={{ backgroundColor: "red", marginTop: "5px" }}
        // onClick={()=>AddFarm()}
        className="button muted-button" >
        Add Collection
      </button>
      <table className="farmer-table">

        <thead>
          <tr>
            <th>Farmer Id</th>
            <th>Farmer Name</th>
            <th>Collection Id</th>
            <th>Quantity</th>
            <th>Rate</th>
            <th>Snf</th>
            <th>Amount</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        {/* <tbody>
          { */}
            {/* // data.map((data, item) => (
            //   <tr key={item}>
            //     <td>{data.farmId}</td>
            //     <td>{data.farmName}</td>
            //     <td>{data.contactInfo}</td>
            //     <td className="text-right">
            //       <button
            //         onClick={()=>formedit(data.farmId)}
            //         className="button muted-button"
            //       >
            //         Edit
            //       </button>
             
            //     </td>
            //     <td className="text-left">
            //       <button
            //         onClick={() => deletefarm(data.farmId)}
            //         className="button muted-button"
            //       >
            //         Delete
            //       </button>

            //     </td>
            //   </tr> */}
          {/* </table>  ))} */}

        {/* </tbody> */}
      </table>
   </div>
   )

}
export default ViewCollection;