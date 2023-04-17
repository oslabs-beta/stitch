// icon (clickable) representing json resopnse from endpointComponent
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateActiveEndpoint } from '../store/slices/dataSlice';

function EndpointIcon({ endpointURL }) {
  const dispatch = useDispatch();

  return (
    <>
      <button
        className=' bg-desert-gray hover:bg-space-jet h-10 rounded-md ml-5 mr-5 mb-5 first:mt-5'
        onClick={() => dispatch(updateActiveEndpoint(endpointURL))}
      >
        {endpointURL}
      </button>
    </>
  );
}

export default EndpointIcon;
