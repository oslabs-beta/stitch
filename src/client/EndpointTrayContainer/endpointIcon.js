// icon (clickable) representing json resopnse from endpointComponent
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateActiveEndpoint } from '../store/slices/dataSlice';

function EndpointIcon({ endpointURL }) {
  const dispatch = useDispatch();
  // will pass in image link via props to generate a diff image for each component

  return (
    <>
      <button
        className='bg-space-jet h-10 rounded ml-5 mr-5 mb-5 first:mt-5'
        onClick={() => dispatch(updateActiveEndpoint(endpointURL))}
      >
        {endpointURL}
      </button>
      {/* <button onClick={() => console.log('clicked button', endpointURL)}>{endpointURL}</button> */}
    </>
  );
}

export default EndpointIcon;
