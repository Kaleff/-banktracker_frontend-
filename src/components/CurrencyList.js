import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

function CurrencyList() {
    // Set states
    const [rates, setRates] = useState('');
    const [offSet, setOffset] = useState(0);

    let params = useParams();
    // Map the currencies on table rows
    const listItems = Object.entries(rates).slice(offSet, offSet+10).map(([currency, rate], key) => 
        <tr key={key}>
            <td>{key+1+offSet}</td>
            <td>{currency}</td>
            <td>{(Math.round(rate * 100) / 100).toFixed(2)}</td>
        </tr>
    );

    useEffect(() => {
        fetch('http://localhost/banktracker/public/api/rates')
        .then(response => response.json())
        .then(data => setRates(data));
        if(params.pageId) {
            setOffset((params.pageId-1)*10);
        }
    }, []);
    return (
        <table>
            <thead>            
                <tr>
                    <th>Nr.</th>
                    <th>Currency</th>
                    <th>Rate</th>
                </tr>
            </thead>
            <tbody>{listItems}</tbody>
        </table>
    )
}

export default CurrencyList