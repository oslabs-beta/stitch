import { useDispatch } from 'react-redux';
import { deleteEndpoint } from '../store/slices/dataSlice'

function EndpointDeleteButton({endpointURL}) {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(deleteEndpoint(endpointURL))
    }
    return (
      <>
        <button
          className='pl-2 pr-2 h-10 rounded-md bg-colorHunt-quatrinary hover:bg-colorHunt-quatrinaryDark ml-5 mr-5 mb-5 first:mt-5'
          onClick={handleClick}
        >
          delete
        </button>
      </>
    );
  }
  
  export default EndpointDeleteButton;