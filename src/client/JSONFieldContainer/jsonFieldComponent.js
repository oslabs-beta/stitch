// renders single line of json response with check box and buttons to add to schema
import { useDispatch } from 'react-redux';
import { addSchemaField } from '../store/slices/schemaSlice';

export default function JsonFieldComponent({ objectKey, objectValue }) {
  const dispatch = useDispatch();

  return (
    <>
      <p className='pl-8 pt-1 pb-1 flex hover:bg-vscode-selection font-monospace'>
        {/* "{objectKey}" : {typeof objectValue === 'object' ? 'object' : objectValue}<button>add</button> */}
        {/* "{objectKey}" : {typeof objectValue}<button>add</button> */}
        <div className='basis-5/6 overflow-auto '>
          <span className='text-vscode-foreground'>"</span>
          <span className='text-vscode-cyan'>{objectKey}</span>
          <span className='text-vscode-foreground'>"</span>
          <span className='pl-2 pr-2 text-vscode-foreground'>:</span>
          <span className='text-vscode-foreground'>"</span>
          <span className='text-vscode-darkOrange'>{objectValue}</span>
          <span className='text-vscode-foreground'>"</span>
        </div>
        <button
          className='basis-1/6 bg-desert-gray hover:bg-space-jet text-vscode-foreground rounded-full h-6'
          onClick={() => dispatch(addSchemaField({ objectKey, objectValue }))}
        >
          add
        </button>
      </p>
    </>
  );
}
