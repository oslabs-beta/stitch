import { useDispatch } from 'react-redux';
import { deleteEndpoint } from '../store/slices/dataSlice';

function EndpointDeleteButton({ endpointURL }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(deleteEndpoint(endpointURL));
  };
  return (
    <div className='basis-1/3'>
      <button
        className='bg-colorHunt-quatrinary hover:bg-colorHunt-quatrinaryDark px-2 h-10 rounded-md mr-5 mb-5 first:mt-5'
        onClick={handleClick}
      >
        <span>delete</span>
      </button>
    </div>
  );
}

export default EndpointDeleteButton;
