// field and button to perform get request and add url card to endpointTray
import { useState } from 'react';
import EndpointIcon from '../EndpointTrayContainer/endpointIcon';
// this component will create an EndpointIcon component and then render it on the iconTryContainer componenet
// Added the 2 below imports and will need to implement logic
import { useDispatch } from 'react-redux';
import { addDataCard, saveGithubView } from '../store/slices/dataSlice';
// Import react-cookie to check for github and local storage cookies
import { useCookies } from 'react-cookie';
import axios from 'axios';

export default function EndpointComponent() {
  const [cookies, setCookie, removeCookie] = useCookies([
    'ghInfoUser',
    'ghInfoID',
    'ghToken',
  ]);

  const dispatch = useDispatch();
  // Using react state management for Input field text.  No need to store globally in store.
  // const [inputFieldData, setinputFieldData] = useState('enter endpoints');
  // let inputText = 'enter endpoints';
  let inputText = 'https://swapi.dev/api/vehicles/4/';
  let viewName = 'Save Current View';

  function handleChange(event) {
    inputText = event.target.value;
  }

  function handleSaveInputChange(event) {
    viewName = event.target.value;
  }

  function handleLogout(event) {
    removeCookie('ghInfoUser');
    removeCookie('ghInfoID');
    removeCookie('ghToken');
    window.location.reload();
    removeCookie('ghInfoUser');
    removeCookie('ghInfoID');
    removeCookie('ghToken');
    window.location.reload();
  }

  const savedViews = [];
  // Create async function to retreive saved state if user is logged in
  const getSavedViews = async () => {
    if (!cookies.ghInfoID) {
      return;
    } else {
      // Send call to Express to get user data based on
      const request = await axios.get('/api/githubdata', {
        headers: { Accept: 'application/json' },
        params: { id: cookies.ghInfoID },
      });
    }
  };

  return (
    <>
      <div className='flex flex-row gap-6 pt-8 pl-5 w-full'>
        <h1 className='font-display text-6xl pt-1 pr-5 text-colorHunt-quatrinary'>
          Stitch
        </h1>
        <input
          className='w-7/12 rounded-md bg-colorHunt-tertiary h-12 pl-6 placeholder:italic focus:outline-none'
          type='text'
          onChange={handleChange}
          placeholder={inputText}
        />
        <button
          className='bg-midnight-fuchsia hover:bg-midnight-rose h-12 focus:ring-1 ring-vscode-foreground w-24 rounded-md text-white'
          onClick={() => dispatch(addDataCard(inputText))}
          name='submit'
        >
          Add
        </button>
        {cookies.ghInfoID ? (
          // Render this if a user is already logged in
          <div className='flex'>
            <input
              className='w-7/12 rounded-full bg-colorHunt-tertiary h-12 pl-2 placeholder:italic focus:outline-none mx-2 text-sm'
              type='text'
              onChange={handleSaveInputChange}
              placeholder={viewName}
            />
            <button
              className='bg-midnight-fuchsia hover:bg-midnight-rose h-12 focus:ring-1 ring-colorHunt-tertiary w-24 rounded-full text-white mx-2'
              onClick={() => dispatch(saveGithubView({viewName, id: cookies.ghInfoID}))}
              // onClick={() => console.log('clicked save button')}
              // name='submit'
            >
              Save
            </button>
            <select className='bg-midnight-fuchsia hover:bg-midnight-rose h-12 focus:ring-1 ring-colorHunt-tertiary w-24 rounded-full text-white mx-2 text-sm'>
              {/* {arrayOfOptions} */}
              <option value={'Load View'} selected>
                {'Load View'}
              </option>
              <option value={'Test 1'}>{'Test 1'}</option>
              <option value={'Test 2'}>{'Test 2'}</option>
            </select>
            <button
              className='flex bg-midnight-fuchsia hover:bg-midnight-rose h-12 focus:ring-1 ring-colorHunt-tertiary w-24 rounded-full text-white text-s text-center py-2.5 px-2'
              onClick={handleLogout}
            >
              {'Logout'}
            </button>
            <span className='mx-3'>{`Welcome, ${cookies.ghInfoUser}`} </span>
          </div>
        ) : (
          // If not render login button
          <div>
            <a
              className='flex bg-midnight-fuchsia hover:bg-midnight-rose h-12 focus:ring-1 ring-colorHunt-tertiary w-24 rounded-full text-white text-center py-3 px-2 mx-2'
              href='/auth/github'
            >
              {'Login'}{' '}
              <img src='https://drive.google.com/uc?export=view&id=1oGENGZkqpg-IW9LVeok96jJ0GxksqP0t' />
              {'Login'}{' '}
              <img src='https://drive.google.com/uc?export=view&id=1oGENGZkqpg-IW9LVeok96jJ0GxksqP0t' />
            </a>
          </div>
        )}
      </div>
      <div></div>
    </>
  );
}
