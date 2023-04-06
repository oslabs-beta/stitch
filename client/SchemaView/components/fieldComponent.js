// component responsible for rendering and modifying each field
// may need a unique ids for all elements
// place
import utilityFunctions from '../../../utilities/utilities';
import { useDispatch } from 'react-redux';
import {
  deleteSchemaField,
  toggleRequired,
  isArrayChange,
} from '../../store/slices/schemaSlice';
import { useState } from 'react';

export default function FieldComponent({ objectKey, objectValue }) {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive(!active);
    dispatch(isArrayChange({ objectKey }));
  };

  const { snakeToCamel } = utilityFunctions;
  // console.log(snakeToCamel(objectKey));
  // console.log(objectValue);
  // console.log('scalarParser', scalarParser(objectValue));

  const arrayOfOptions = [];
  const types = ['String', 'Int', 'Boolean', 'Float', 'Array', 'Object'];
  types.forEach((type) => {
    // Logic to set default fault to objectValue's type
    if (type === objectValue.value) {
      arrayOfOptions.push(
        <option value={type} selected>
          {type}
        </option>
      );
    } else {
      arrayOfOptions.push(<option value={type}>{type}</option>);
    }
  });
  return (
    <div id='fieldbox'>
      {/* <input type='text' id='fieldTextName' value={objectKey} contentEditable="true"></input> */}
      <span contentEditable='true'>{snakeToCamel(objectKey)}</span>:
      {/* {if requiredOption === 1 {'!'}} */}
      <select>{arrayOfOptions}</select>
      {/* <input type='text' id='fieldTextType' value={typeof objectValue}></input>         */}
      <button
        id='arrayButton'
        name='arrayButton'
        onClick={handleClick}
        style={{ backgroundColor: active ? 'green' : 'buttonface' }}
      >
        [ ]
      </button>
      <button
        id='requiredButton'
        name='requiredButton'
        onClick={() => dispatch(toggleRequired(objectKey))}
      >
        !
      </button>
      <button
        id='deleteField'
        name='deleteField'
        onClick={() => dispatch(deleteSchemaField({ objectKey }))}
      >
        -
      </button>
    </div>
  );
}
