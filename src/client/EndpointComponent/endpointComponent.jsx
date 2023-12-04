// Header bar components
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  addDataCard,
  saveGithubView,
  storeGithubUserView,
  loadSavedGithubView,
} from '../store/slices/dataSlice';
import { useCookies } from 'react-cookie';
import axios from 'axios';

export default function EndpointComponent() {
  const [cookies, setCookie, removeCookie] = useCookies([
    'ghInfoUser',
    'ghInfoID',
    'ghToken',
    'ghIcon',
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
    removeCookie('ghIcon');
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
      <div className='flex flex-row justify-between pt-8 pl-5 w-full'>
        <div className='flex flex-row gap-6 basis-3/5'>
          <h1 className='font-display text-6xl pt-1 pr-5 text-colorHunt-quatrinary'>
            Stitch
          </h1>
          <input
            className='bg-colorHunt-tertiary text-sm rounded-md w-1/2 h-8 mt-3 pl-4 placeholder:italic focus:outline-desert-ash focus:outline-1'
            onChange={handleChange}
            placeholder={inputText}
          />
          <button
            className='bg-midnight-fuchsia hover:bg-midnight-rose h-8 mt-3 ml-5 focus:ring-1 ring-vscode-foreground w-24 rounded-md text-white'
            onClick={() => dispatch(addDataCard(inputText))}
            name='submit'
          >
            Add
          </button>
        </div>
        {cookies.ghInfoID ? (
          // Render this if a user is already logged in
          <div className='flex basis-2/5 gap-4'>
            <input
              className='w-7/12 rounded-md bg-colorHunt-tertiary h-8 mt-3 pl-2 placeholder:italic focus:outline-none mx-2 text-sm'
              type='text'
              onChange={handleSaveInputChange}
              placeholder={viewName}
            />
            <button
              className='bg-cp-dustyGray-light hover:bg-cp-dustyGray h-8 mt-3 focus:ring-1 ring-colorHunt-tertiary w-24 rounded-md text-slate-800 test-sm'
              onClick={() =>
                dispatch(saveGithubView({ viewName, id: cookies.ghInfoID }))
              }
            >
              Save
            </button>
            <select
              className='bg-cp-dustyGray-light hover:bg-cp-dustyGray h-8 mt-3 w-max focus:ring-1 ring-colorHunt-tertiary rounded-md text-slate-800 text-sm'
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
              className='bg-cp-dustyGray-light hover:bg-cp-dustyGray h-8 mt-3 focus:ring-1 ring-colorHunt-tertiary w-28 rounded-md text-slate-800 text-sm'
              onClick={handleLogout}
            >
              {'Logout'}
            </button>
            <div className='w-12 pt-3'>
              <img className='rounded-full w-8 h-8' src={cookies.ghIcon}></img>
            </div>
          </div>
        ) : (
          // If not render login button
          <div className='flex flex-row justify-end mr-4 basis-1/5'>
            <button className='bg-cp-dustyGray-light hover:bg-cp-dustyGray rounded-md h-8 mt-3 w-24 relative'>
              <a className='' href='/auth/github'>
                <svg
                  className='fill-slate mr-0 pl-2'
                  width='30%'
                  height='auto'
                  viewBox='0 0 100 100'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z'
                  />
                </svg>
                <span className='text-slate-800 absolute inset-y-0 top-1 right-4'>
                  Login
                </span>
              </a>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
