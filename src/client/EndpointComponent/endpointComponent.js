// Header bar components
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addDataCard, saveGithubView, storeGithubUserView, loadSavedGithubView } from '../store/slices/dataSlice';
import { useCookies } from 'react-cookie';
import axios from 'axios';

export default function EndpointComponent() {
  const [cookies, setCookie, removeCookie] = useCookies([
    'ghInfoUser',
    'ghInfoID',
    'ghToken',
  ]);

  const [savedViews, setSavedViews] = useState({
    views: [
      <option value='' disabled selected hidden>
        {'Load View'}
      </option>,
    ],
  });
  const githubSavedViews = useSelector(
    (state) => state.responseData.githubUserSavedViews.views
  );

  const dispatch = useDispatch();
  // Using react state management for Input field text.  No need to store globally in store.
  let inputText = '';
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
  }

  // Create async function to retreive saved state if user is logged in
  const getSavedViews = async () => {
    await setTimeout(null, 100);
    if (!cookies.ghInfoID) {
      return;
    } else {
      // Send call to Express to get user data based on github ID
      const request = await axios.get('/api/githubdata', {
        headers: { Accept: 'application/json' },
        params: { id: cookies.ghInfoID },
      });
      // Pre-save views to state
      // Update Load View component with saved views
      const temp = [];
      request.data.forEach((obj) => {
        let viewName = obj.snapshot.viewName;
        dispatch(storeGithubUserView(viewName));
      });

      setSavedViews({
        views: [...savedViews.views, ...temp],
      });
    }
  };

  useEffect(() => {
    getSavedViews();
  }, []);

  const gitHubViewComponents = [
    <option value='' disabled selected hidden>
      {'Load View'}
    </option>,
  ];
  githubSavedViews.forEach((view) => {
    gitHubViewComponents.push(<option value={view}>{view}</option>);
  });

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
              className='bg-midnight-fuchsia hover:bg-midnight-rose h-12 focus:ring-1 ring-colorHunt-tertiary w-24 rounded-md text-white mx-2'
              onClick={() =>
                dispatch(saveGithubView({ viewName, id: cookies.ghInfoID }))
              }
            >
              Save
            </button>
            <select
              className='bg-midnight-fuchsia hover:bg-midnight-rose h-12 focus:ring-1 ring-colorHunt-tertiary w-24 rounded-md text-white mx-2 text-sm'
              onChange={() =>
                dispatch(
                  loadSavedGithubView({
                    viewName: event.target.value,
                    id: cookies.ghInfoID,
                  })
                )
              }
            >
              {gitHubViewComponents}
            </select>
            <button
              className='flex bg-midnight-fuchsia hover:bg-midnight-rose h-12 focus:ring-1 ring-colorHunt-tertiary w-24 rounded-md text-white text-s text-center py-2.5 px-2'
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
              className='flex bg-midnight-fuchsia hover:bg-midnight-rose h-12 focus:ring-1 ring-colorHunt-tertiary w-24 rounded-md text-white text-center py-3 px-5 mx-5'
              href='/auth/github'
            >
              {'Login'}{' '}
              <img
                className='mx-1'
                src='https://drive.google.com/uc?export=view&id=1oGENGZkqpg-IW9LVeok96jJ0GxksqP0t'
              />
            </a>
          </div>
        )}
      </div>
      <div></div>
    </>
  );
}
