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
    <div className='JSONFieldContainer'>
      <h1>JSON Response</h1>
      <h3>{url}</h3>
      <p>{'{'}</p>
      {arrayOfComponents}
      <p>{'}'}</p>
    </div>
  );
}
