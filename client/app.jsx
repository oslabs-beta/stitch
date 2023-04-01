import EndpointComponent from './EndpointComponent/endpointComponent';
import IconTrayContainer from './EndpointTrayContainer/iconTrayContainer';
import JSONFieldContainer from './JSONFieldContainer/jsonFieldContainer';
import AllSchemasContainer from './SchemaView/containers/allSchemasContainer';

export default function App() {
  return (
    <div>
      <EndpointComponent />
      <IconTrayContainer />
      <div className='bodyContainer'>
        <JSONFieldContainer />
        <AllSchemasContainer />
      </div>
    </div>
  );
}