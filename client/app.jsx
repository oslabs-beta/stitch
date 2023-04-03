import EndpointComponent from './EndpointComponent/endpointComponent';
import IconTrayContainer from './EndpointTrayContainer/iconTrayContainer';
import JSONFieldContainer from './JSONFieldContainer/jsonFieldContainer';
import AllSchemasContainer from './SchemaView/containers/allSchemasContainer';
// import './assets/css';

export default function App() {
  return (
    <div>
    <div className='headerContainer'>
      <EndpointComponent />
      </div>
    <div className='bodyContainer'>
        <IconTrayContainer />
        <JSONFieldContainer />
        <AllSchemasContainer />
    </div>
    </div>
  );
}