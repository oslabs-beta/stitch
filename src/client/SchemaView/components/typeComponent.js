// component for changing schema type and name
import { useSelector, useDispatch } from 'react-redux';
import { setTypeName } from '../../store/slices/schemaSlice';

export default function TypeComponent() {
  const typeName = useSelector((state) => state.schemaSlice.typeName);
  const dispatch = useDispatch();
  let currName = '';

  const handleChange = (e) => {
    currName = e.target.value;
  };

  return (
    <div className='pl-8'>
      <span className='pr-4'>Type:</span>
      <input
        className=' decoration-desert-ash rounded-md bg-colorHunt-tertiary pl-4 placeholder:italic focus:outline-none'
        type='text'
        onChange={handleChange}
      ></input>
      <button
        className='rounded-md bg-midnight-fuchsia hover:bg-midnight-rose ml-2 pl-3 pr-3 h-full'
        type='button'
        onClick={() => {
          dispatch(setTypeName(currName));
        }}
      >
        Submit
      </button>
    </div>
  );
}
