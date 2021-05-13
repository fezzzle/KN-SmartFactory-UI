import axios from 'axios';

export default function machineStatus(){

    const fetchData = async () => {

      
        const result = await axios.get('http://localhost:7100/smart-factory/machines')
        .then((response) => {
          console.log(response.data)
        return response.data
        }
        ).catch(error => {
          console.log(error)
          return {
              "error":error.message
          }
      });;    
      };
    return fetchData;
   }
   