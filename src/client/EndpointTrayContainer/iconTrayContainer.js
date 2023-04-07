// tray containing all endpoints queried
import EndpointIcon from './endpointIcon';
import { useSelector, useDispatch } from 'react-redux';
import { dataSlice } from '../store/slices/dataSlice';

export default function IconTrayContainer() {
  // Pulling in global endpoint state object
  const jsonObject = useSelector((state) => state.responseData.endpointData);

  // Unpacking state object and prop drilling
  const arrayOfComponents = [];
  for (const key in jsonObject) {
    // console.log('in for loop', jsonObject)
    // console.log('jsonObject keys', key)
    arrayOfComponents.push(
      <EndpointIcon
        key={`tray-component-${key}`}
        className='trayComponent'
        endpointURL={key}
      />
    );
  }

  return (
    <div className='iconTrayContainer'>
      {/* <EndpointIcon /> */}
      {arrayOfComponents}
    </div>
  );
}
