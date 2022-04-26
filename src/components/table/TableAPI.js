import {useState} from "react";


const TableAPI = async () =>{
    const [transData, setTransData] = useState(null);
    

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    const resp = await fetch("https://house-stock-watcher-data.s2-us-west-2.amazonaws.com/data/all_transactions.json", requestOptions)
        .then(response => response.json())
        .then(result => setTransData(result.slice(-1, 10)))
        .catch(error => console.log('error', error));

    
    
    return transData();
    };

export default TableAPI;