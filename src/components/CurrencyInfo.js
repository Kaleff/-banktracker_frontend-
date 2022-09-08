import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { APIURL, CURRENCYNAMES } from '../constants'
import Moment from 'moment'

export default function CurrencyInfo() {
    let params = useParams();
    const [info, setInfo] = useState('');
    const [historyLog, setLog] = useState('Loading');
    const mounted = useRef();

    useEffect(() => {
        if (!mounted.current) {
            //componentDidMount logic, fetch data just once
            fetch(APIURL + 'rates/' + params.acronym)
                .then(response => response.json())
                .then(data => setInfo(data))
                .catch(error => console.error(error));
            mounted.current = true;
        } else {
            //componentDidUpdate logic, map the data
            setLog(Object.entries(info.history).map(([date, rate], key) =>
                <tr key={key}>
                    <td>{Moment(date).format("MMM Do YYYY, HH:mm")}</td>
                    <td className='currencyColumn'>
                        <span className='fi fi-eu'></span>&nbsp;
                        1 EUR = {rate[params.acronym]} {params.acronym}
                        &nbsp; <span className={'fi fi-' + params.acronym.slice(0, -1).toLowerCase()}></span>
                    </td>
                    <td className='currencyColumn'>
                        <span className={'fi fi-' + params.acronym.slice(0, -1).toLowerCase()}></span>&nbsp;
                        1 {params.acronym} = {(1 / rate[params.acronym]).toFixed(6)} EUR
                        &nbsp;<span className='fi fi-eu'></span>
                    </td>
                </tr>
            ));
        }
        //Update the component upon fetching data and changing the page
    }, [info, params.id]);
    return (
        <>
            <h3>Currency Information</h3>
            <h3><span className={'fi fi-' + params.acronym.slice(0, -1).toLowerCase()}></span> {CURRENCYNAMES[params.acronym]} ({params.acronym})</h3>
            <h4>Last updated at: {Moment(info.updated_at).format("MMM Do YYYY, HH:mm")}</h4>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Value</th>
                        <th>Reverse value</th>
                    </tr>
                </thead>
                <tbody>
                    {historyLog}
                </tbody>
            </table>
        </>
    )
}
