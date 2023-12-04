// icon (clickable) representing json response from endpointComponent
import { useDispatch } from 'react-redux';
import { updateActiveEndpoint } from '../store/slices/dataSlice';

function EndpointIcon({ endpointURL }) {
  const dispatch = useDispatch();

  return (
    <div className='basis-2/3'>
      <button
        className='bg-desert-gray hover:bg-space-jet pl-4 pr-4 h-10 w-40 rounded-md ml-5 mb-5 first:mt-5 overflow-hidden text-ellipsis text-left'
        onClick={() => dispatch(updateActiveEndpoint(endpointURL))}
      >
        {endpointURL}
      </button>
    </div>
  );
}

export default EndpointIcon;
