import EndpointComponent from './EndpointComponent/endpointComponent';
import JSONFieldContainer from './JSONFieldContainer/jsonFieldContainer';
import EndpointIcon from './EndpointTrayContainer/endpointIcon';
import AllSchemasContainer from './SchemaView/containers/allSchemasContainer';

export default function App() {
  return (
    <div>
      <EndpointComponent />
      <EndpointIcon />
      <div className='bodyContainer'>
        <JSONFieldContainer />
        <AllSchemasContainer />
      </div>
    </div>
  );
}