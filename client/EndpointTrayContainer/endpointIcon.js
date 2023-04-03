// icon (clickable) representing json resopnse from endpointComponent
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addDataCard } from '../store/slices/dataSlice';

function EndpointIcon({ endpointURL}) {
    const dispatch = useDispatch()
    // will pass in image link via props to generate a diff image for each component

    return ( 
        <div>
             <button onClick={() => console.log('clicked button')}>{endpointURL}</button>
        </div>
    )
}

export default EndpointIcon;