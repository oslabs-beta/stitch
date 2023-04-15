// tray containing all endpoints queried
import EndpointIcon from './endpointIcon';
import { useSelector } from 'react-redux';

export default function IconTrayContainer() {
  // Pulling in global endpoint state object
  const jsonObject = useSelector((state) => state.responseData.endpointData);

  // Unpacking state object and prop drilling
  const arrayOfComponents = [];
  for (const key in jsonObject) {
    arrayOfComponents.push(
      <EndpointIcon
        key={`tray-component-${key}`}
        className='trayComponent'
        endpointURL={key}
      />
    );
  }

  return (
    <div className='bg-colorHunt-secondary basis-1/5 flex flex-col grow-0 border-r-2 border-r-colorHunt-primary col-span-1 '>
      <h1 className='text-center text-3xl pb-4 pt-5'>Endpoints</h1>
      {arrayOfComponents}
    </div>
  );
}
