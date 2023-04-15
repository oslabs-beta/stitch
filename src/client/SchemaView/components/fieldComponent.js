// component responsible for rendering and modifying each field
import utilityFunctions from '../../../utilities/utilities';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import {
  deleteSchemaField,
  toggleRequired,
  isArrayChange,
} from '../../store/slices/schemaSlice';

export default function FieldComponent({ objectKey, objectValue }) {
  const dispatch = useDispatch();

  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive(!active);
    dispatch(isArrayChange({ objectKey }));
  };

  const { snakeToCamel } = utilityFunctions;

  const arrayOfOptions = [];
  const types = ['String', 'Int', 'Boolean', 'Float', 'Array', 'Object'];
  types.forEach((type) => {
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
    <div className='pl-8 pt-1 pb-1 font-monospace flex flex-row justify-center'>
      <span className='text-vscode-cyan basis-24' contentEditable='true'>
        {snakeToCamel(objectKey)}
      </span>
      <span className='pr-4'>:</span>
      <select className='text-vscode-green bg-transparent border-b-2 border-desert-ash mr-24'>
        {arrayOfOptions}
      </select>
      <button
        className='bg-midnight-glaucous hover:bg-midnight-glaucousDark rounded-md pl-2 pr-2 mr-2'
        onClick={() => dispatch(toggleRequired(objectKey))}
      >
        required
      </button>
      <button
        className='pl-2 pr-2 rounded-md bg-colorHunt-quatrinary hover:bg-colorHunt-quatrinaryDark'
        onClick={() => dispatch(deleteSchemaField({ objectKey }))}
      >
        delete
      </button>
    </div>
  );
}
