import EndpointComponent from './EndpointComponent/endpointComponent';
import JSONFieldContainer from './JSONFieldContainer/jsonFieldContainer';

export default function App() {
  return (
    <div>
      <EndpointComponent />
      <div className='bodyContainer'>
        <JSONFieldContainer />
      </div>
    </div>
  );
}