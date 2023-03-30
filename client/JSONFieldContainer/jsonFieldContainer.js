// container for json response componenets and all associated functionality
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function JSONFieldContainer() {
  const [jsonObject, setJsonObject] = useState('hi');

  useEffect(() => {
    axios
      .get('/one')
      .then((response) => setJsonObject(response.data))
      .catch((err) => {
        console.log({ err });
      });
  }, []);

  return <div>{jsonObject}</div>;
}
