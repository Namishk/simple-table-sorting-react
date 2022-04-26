import {useState} from "react";


const Table = () =>{
    const [transData, setTransData] = useState(null);
    

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    const resp = fetch("https://house-stock-watcher-data.s3-us-west-2.amazonaws.com/data/all_transactions.json", requestOptions)
        .then(response => response.json())
        .then(result => setTransData(result.slice(0, 10)))
        .catch(error => console.log('error', error));

    
    
    
    };

export default Table;