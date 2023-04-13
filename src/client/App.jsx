import EndpointComponent from './EndpointComponent/endpointComponent';
import IconTrayContainer from './EndpointTrayContainer/iconTrayContainer';
import JSONFieldContainer from './JSONFieldContainer/jsonFieldContainer';
import AllSchemasContainer from './SchemaView/containers/allSchemasContainer';

export default function App() {
  return (
    <div className='h-screen'>
      <div className='bg-colorHunt-secondary flex flex-row h-28 border-b-2 border-b-colorHunt-primary'>
        <EndpointComponent />
      </div>
      <div className='flex flex-row h-full'>
        <IconTrayContainer />
        <JSONFieldContainer />
        <AllSchemasContainer />
      </div>
    </div>
  );
}
