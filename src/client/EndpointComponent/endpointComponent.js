// field and button to perform get request and add url card to endpointTray
import { useState } from 'react';
import EndpointIcon from '../EndpointTrayContainer/endpointIcon';
// this component will create an EndpointIcon component and then render it on the iconTryContainer componenet
// Added the 2 below imports and will need to implement logic
import { useDispatch } from 'react-redux';
import { addDataCard } from '../store/slices/dataSlice';

export default function EndpointComponent() {
  const dispatch = useDispatch();
  // Using react state management for Input field text.  No need to store globally in store.
  // const [inputFieldData, setinputFieldData] = useState('enter endpoints');
  // let inputText = 'enter endpoints';
  let inputText = 'https://swapi.dev/api/vehicles/4/';

  function handleChange(event) {
    inputText = event.target.value;
  }

  return (
    <>
      <div className='flex flex-row gap-6 pt-8 pl-5 w-3/5'>
        <h1 className='font-display text-6xl pt-1 pr-5 text-colorHunt-quatrinary'>
          Stitch
        </h1>
        <input
          className='w-7/12 rounded-full bg-colorHunt-tertiary h-12 pl-6 placeholder:italic focus:outline-none'
          type='text'
          onChange={handleChange}
          placeholder={inputText}
        />
        <button
          className='bg-midnight-fuchsia hover:bg-midnight-rose h-12 focus:ring-1 ring-colorHunt-tertiary w-24 rounded-full text-white'
          onClick={() => dispatch(addDataCard(inputText))}
          name='submit'
        >
          Add
        </button>
        <a className='flex bg-midnight-fuchsia hover:bg-midnight-rose h-12 focus:ring-1 ring-colorHunt-tertiary w-24 rounded-full text-white text-xs text-center py-2'
          href='/auth/github'>Login with Github
        </a>
        {/* <span>https://swapi.dev/api/people/1/</span> */}
        {/* <span>https://swapi.dev/api/people/1/</span>
        <span>https://swapi.dev/api/vehicles/4/</span>
        <span>https://swapi.dev/api/planets/1/</span>
        <span>https://swapi.dev/api/starships/9/</span> */}
      </div>
      <div></div>
    </>
  );
}
/*
  const toRender = urls.map((url) => {
    return <ImageComponent key={Math.random() + Date.now()} imgUrl={url} />;
  });

  return <div className="galleryContainer">{toRender}</div>;
  */
