import { useEffect, useState, useMemo } from "react";
import { useTable } from "react-table";

const Table = () => {
    
    const [transData, setTransData] = useState(null);
    const [sortedField, setSortedField] = useState(null);

    
    useEffect(() => {
        
        const url = `https://house-stock-watcher-data.s3-us-west-2.amazonaws.com/data/all_transactions.json`;
        
        const fetchdata = async () =>{
            try {
                const response = await fetch(url);
                const json = await response.json();
                setTransData(json.slice(0, 10));
            } catch (error) {
                console.log(error);
            }
        };  
        fetchdata();
    }, []);
    
    // console.log(sortedField)
    let sortedData = '';
    if (sortedField !== null) {
        sortedData = [...transData];
        // console.log(transData);
        sortedData.sort((a, b) => {
            if (a[sortedField] < b[sortedField]) {
                return -1;
            }
            if (a[sortedField] > b[sortedField]) {
                return 1;
            }
                return 0;
        });
        setSortedField(null);
        setTransData(sortedData);
    }


    const columns = useMemo(() => (
        [
            {
                Header : "Disclosure Year",
                accessor: "disclosure_year"
            },
            {
                Header : "Ticker",
                accessor : "ticker"
            },
            {
                Header : "Representative",
                accessor : "representative"
            },
            {
                Header : "District",
                accessor : "district"
            },
            {
                Header : "Type",
                accessor : "type"
            }
        ]
    ), []);

    const data = useMemo(() => {
        if(transData == null) return null;
        else{
            return transData.map(
            ({disclosure_year, ticker, representative, district, type}) =>  
            ({disclosure_year, ticker, representative, district, type}))
        }
    }, [transData]);

    
    
    
    //     const {
    //         getTableProps,
    //         getTableBodyProps,
    //         headerGroups,
    //         footerGroups,
    //         rows,
    //         prepareRow
    //     } = useTable({columns, data}, [transData]);

    if(transData === null){
        return(<h1>loading</h1>);
    }

    if(transData !== null) return(

    <table border = {1} className="min-w-full table-auto">
        <thead>
            <tr>
                <th>
                    <button type="button" onClick={() => setSortedField('disclosure_year')}>
                        Disclosure Year
                    </button>
                </th>
                <th>
                    <button type="button" onClick={() => setSortedField('ticker')}>
                        Ticker
                    </button>
                </th>
                <th>
                    <button type="button" onClick={() => setSortedField('representative')}>
                        Representative
                    </button>
                </th>
                <th>
                    <button type="button" onClick={() => setSortedField('district')}>
                        District
                    </button>
                </th>
                <th>
                    <button type="button" onClick={() => setSortedField('type')}>
                        Type
                    </button>
                </th>
            </tr>
        </thead>
        <tbody>
            {transData.map(td => (
                <tr key = {td.ticker} >
                    <td>{td.disclosure_year}</td>
                    <td>{td.ticker}</td>
                    <td>{td.representative}</td>
                    <td>{td.district}</td>
                    <td>{td.type}</td>
                </tr>
            ))}
        </tbody>
    </table>

    );

}

export default Table;