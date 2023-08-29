// tray containing all endpoints queried
import EndpointDeleteButton from './deleteEndpointButton';
import EndpointIcon from './endpointIcon';
import { useSelector } from 'react-redux';

export default function IconTrayContainer() {
  // Pulling in global endpoint state object
  const jsonObject = useSelector((state) => state.responseData.endpointData);

  // Unpacking state object and prop drilling
  const arrayOfComponents = [];
  for (const key in jsonObject) {
    arrayOfComponents.push([
      <div className='hover:bg-vscode-selection flex flex-row items-center gap-2'>
        <EndpointIcon
          key={`tray-component-${key}-endpointIcon`}
          endpointURL={key}
        />
        <EndpointDeleteButton
          key={`tray-component-${key}-endpointDeleteButton`}
          endpointURL={key}
        />
      </div>,
    ]);
  }

  return (
    <div className='bg-colorHunt-secondary border-r-colorHunt-primary  basis-1/5 flex flex-col grow-0 border-r-2 col-span-1 '>
      <h1 className='text-center text-3xl pb-4 pt-5'>Endpoints</h1>
      {arrayOfComponents}
    </div>
  );
}
