import React, { useState, useEffect, useRef} from 'react'
import { useParams } from 'react-router-dom'
import Pagination from './Pagination';
import { Link } from 'react-router-dom';
import { APIURL } from '../constants';

function CurrencyList() {
    // Set states
    const [rates, setRates] = useState('');
    const [offSet, setOffset] = useState(0);
    const [maxPages, setPages] = useState(1);
    const mounted = useRef();

    let params = useParams();
    // Map the currencies on table rows
    let listItems = Object.entries(rates).slice(offSet, offSet+10).map(([currency, rate], key) => 
        <tr key={key}>
            <td>{key+1+offSet}</td>
            <td><Link to={'/money/'+currency}>{currency}</Link></td>
            <td>EUR = {(Math.round(rate * 100) / 100).toFixed(2)} {currency}</td>
        </tr>
    );

    useEffect(() => {
        if (!mounted.current) {
            // do componentDidMount logic, fetch data just once
            fetch(APIURL+'rates')
            .then(response => response.json())
            .then(data => setRates(data));
            mounted.current = true;
        } else {
            setPages(Math.ceil(Object.keys(rates).length / 10));
        }
        // Get the offset of the current page
        if(params.pageId) {
            setOffset((params.pageId-1)*10);
        }
        else {
            params.pageId = 1;
        }
        //Update the component upon fetching data and changing the page
    }, [rates, params.pageId]);
    return (
        <>
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
            <Pagination page={params.pageId} lastpage={maxPages} />
        </>
    )
}

export default CurrencyList