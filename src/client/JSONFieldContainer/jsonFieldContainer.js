// container for json response componets and all associated functionality
import JsonFieldComponent from './jsonFieldComponent';
import { useSelector } from 'react-redux';

export default function JSONFieldContainer() {
  const jsonObject = useSelector(
    (state) => state.responseData.activeEndpoint.responseBody
  );
  const url = useSelector((state) => state.responseData.activeEndpoint.url);
  // console.log('printing json object', jsonObject);

  const arrayOfComponents = [];
  for (const key in jsonObject) {
    // console.log('in for loop', jsonObject)
    // console.log('jsonObject keys', key)
    arrayOfComponents.push(
      <JsonFieldComponent
        key={`field-component-${key}`}
        className='jsonFieldComponent'
        objectKey={key}
        objectValue={jsonObject[key]}
      />
    );
  }

  return (
    <div className='bg-colorHunt-secondary border-r-2 border-r-colorHunt-primary basis-2/5 flex flex-col col-span-2 min-w-0'>
      <h1 className='text-center text-3xl pb-4'>JSON Response</h1>
      <h3 className='pb-4 pl-4 italic text-vscode-comment'>{url}</h3>
      <p className='text-vscode-yellow'>{jsonObject.url ? '{' : ''}</p>
      {arrayOfComponents}
      <p className='text-vscode-yellow'>{jsonObject.url ? '}' : ''}</p>
    </div>
  );
}
