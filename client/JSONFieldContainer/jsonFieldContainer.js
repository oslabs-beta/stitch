// container for json response componenets and all associated functionality
import JsonFieldComponent from './jsonFieldComponent';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { dataSlice } from '../store/slices/dataSlice'
import axios from 'axios';

export default function JSONFieldContainer() {
  // const [jsonObject, setJsonObject] = useState({});
  const jsonObject = useSelector((state) => state.responseData.activeEndpoint.responseBody);
  const url = useSelector((state) => state.responseData.activeEndpoint.url)
  // console.log('printing json object', jsonObject);
  // const dispatch = useDispatch();

  // useEffect(() => {
    // fetchData();
  // },[]);

  // async function fetchData() {
  //   await axios
  //     .get('/one')
  //     .then((response) => response.data)
  //     .then((object) => {
  //       setJsonObject(object);
  //     })
  //     .catch((err) => {
  //       console.log({ err });
  //     });
  // }

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
