// field and button to perform get request and add url card to endpointTray
import { useState } from 'react';
import EndpointIcon from '../EndpointTrayContainer/endpointIcon';
// this component will create an EndpointIcon component and then render it on the iconTryContainer componenet
// Added the 2 below imports and will need to implement logic
import { useDispatch } from 'react-redux';
import { addDataCard } from '../store/slices/dataSlice';

export default function EndpointComponent() {
  const dispatch = useDispatch()
  // Using react state management for Input field text.  No need to store globally in store. 
  const [inputFieldData, setinputFieldData] = useState('enter endpoints');

  function handleChange(event) {
    const value = event.target.value;
    console.log(value);
    setinputFieldData(value);
  }

  // function generateIcon() {
  //   return <EndpointIcon textData={data} />
  // }

  return (
    <div>
      <input name='EndpointComponent' type='text' onChange={handleChange} placeholder={inputFieldData} />
      <button onClick={() => dispatch(addDataCard(inputFieldData))} name='submit'>Add</button>
    </div>
  );
}
/*
  const toRender = urls.map((url) => {
    return <ImageComponent key={Math.random() + Date.now()} imgUrl={url} />;
  });

  return <div className="galleryContainer">{toRender}</div>;
  */