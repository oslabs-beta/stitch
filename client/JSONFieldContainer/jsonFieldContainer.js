// container for json response componenets and all associated functionality
import JsonFieldComponent from './jsonFieldComponent';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function JSONFieldContainer() {
  const [jsonObject, setJsonObject] = useState({});

  useEffect(() => {
    fetchData();
  });

  async function fetchData() {
    await axios
      .get('/one')
      .then((response) => response.data)
      .then((object) => {
        setJsonObject(object);
      })
      .catch((err) => {
        console.log({ err });
      });
  }

  const arrayOfComponents = [];
  for (const key in jsonObject) {
    arrayOfComponents.push(
      <JsonFieldComponent
        className='jsonFieldComponent'
        objectKey={key}
        objectValue={jsonObject[key]}
      />
    );
  }

  return (
    <div>
      <h1>JSON Response</h1>
      <p>{'{'}</p>
      {arrayOfComponents}
      <p>{'}'}</p>
    </div>
  );
}
