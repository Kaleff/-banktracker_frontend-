import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { APIURL, CURRENCYNAMES } from '../constants';

export default function CurrencyInfo() {
    let params = useParams();
    const [info, setInfo] = useState('');
    const [historyLog, setLog] = useState('Loading..');
    const mounted = useRef();

    useEffect(() => {
        if (!mounted.current) {
            //componentDidMount logic, fetch data just once
            fetch(APIURL+'rates/'+params.acronym)
            .then(response => response.json())
            .then(data => setInfo(data))
            .catch(error => console.error(error));
            mounted.current = true;
        } else {
            setLog(Object.entries(info.history).map(([date, rate], key) =>
                <li key={key}>{date}: {rate[params.acronym]}</li>
            ));
        }
        //Update the component upon fetching data and changing the page
    }, [info, params.id]);
    return (
        <>
            <h3>Currency Information</h3>
            <h3><span className={'fi fi-'+params.acronym.slice(0, -1).toLowerCase()}></span> {CURRENCYNAMES[params.acronym]} ({params.acronym})</h3>
            <h4>Last updated at: {Date(info.updated_at)}</h4>
            <ul>{historyLog}</ul>
        </>
    )
}
