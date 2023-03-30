// field and button to perform get request and add url card to endpointTray
import { useState } from 'react';
import EndpointIcon from '../EndpointTrayContainer/endpointIcon';
// this component will create an EndpointIcon component and then render it on the iconTryContainer componenet

export default function EndpointComponent() {
  const [data, setData] = useState('');

  function handleChange(event) {
    setData(event.target.value);
  }

  function generateIcon() {
    return <EndpointIcon textData={data} />
  }

  return (
    <div>
      <input name='EnpointComponent' type='text' onChange={handleChange} placeholder='enter enpoint' />
      <button onClick={generateIcon} name='submit'>add enpoint</button>
    </div>
  );
}
/*
  const toRender = urls.map((url) => {
    return <ImageComponent key={Math.random() + Date.now()} imgUrl={url} />;
  });

  return <div className="galleryContainer">{toRender}</div>;
  */