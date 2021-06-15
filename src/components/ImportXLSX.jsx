import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import * as XLSX from 'xlsx';



export const ImportXLSX = () => {

    const [items, setItems] = useState([]);
    const [uploaded, setUploaded] = useState(false)

    const readExcel = (file) => {
      const promise = new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
  
        fileReader.onload = (e) => {
          const bufferArray = e.target.result;
  
          const wb = XLSX.read(bufferArray, { type: "buffer" });
  
          const wsname = wb.SheetNames[0];
  
          const ws = wb.Sheets[wsname];
  
          const data = XLSX.utils.sheet_to_json(ws);
  
          resolve(data);
        };
  
        fileReader.onerror = (error) => {
          reject(error);
        };
      });
  
      promise.then((d) => {
        setItems(d);
      });
    };

const table = (

        <table class="table container">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">login</th>
            <th scope="col">firstName</th>
            <th scope="col">lastname</th>
            <th scope="col">email</th>
            <th scope="col">imageUrl</th>
            <th scope="col">Activated</th>
            <th scope="col">langKey</th>
            <th scope="col">createdBy</th>
            <th scope="col">createdDate</th>
            <th scope="col">lastModified</th>
          </tr>
        </thead>
        <tbody>
          {items.map((d) => (
            <tr key={d.Item}>
              <th>{d.id}</th>
              <td>{d.login}</td>
              <td>{d.firstName}</td>
              <td>{d.lastName}</td>
              <td>{d.email}</td>
              <td>{d.imageUrl}</td>
              <td>{d.activated}</td>
              <td>{d.langKey}</td>
              <td>{d.createdBy}</td>
              <td>{d.createdDate}</td>
              <td>{d.lastModified}</td>
            </tr>
          ))}
        </tbody>
      </table>

)



    return (
        <div>
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            readExcel(file);
            setUploaded(true);
          }}
        />

        <div>
          {uploaded ? table : table}
        </div>
  
       
      </div>
    )
}

export default ImportXLSX;