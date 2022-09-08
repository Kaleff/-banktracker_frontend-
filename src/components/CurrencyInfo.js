import React from 'react'
import { useParams } from 'react-router-dom'
import { APIURL, CURRENCYNAMES } from '../constants';

export default function CurrencyInfo() {
    let params = useParams();
    return (
        <>
            <h3>Currency Information</h3>
            <h3><span className={'fi fi-'+params.acronym.slice(0, -1).toLowerCase()}></span> {CURRENCYNAMES[params.acronym]} ({params.acronym})</h3>
        </>
    )
}
