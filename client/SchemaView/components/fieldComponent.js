// component reponsible for rendering and modifying each field
// may need a unique ids for all elements
// place
export default function FieldComponent({ objectKey, objectValue }) {

    function snakeToCamel(snakeStr) {
        const components = snakeStr.split('_');
        // Capitalize the first letter of each component except the first one
        return components[0] + components.slice(1).map(c => c.charAt(0).toUpperCase() + c.slice(1)).join('');
      }

    const typesObj = {
        undefined: 'Object',
        object: 'Object',
    }
    const arrayOfOptions = [];
    const types = ['String', 'Int', 'Number', 'Object']
    types.forEach(type => {
        // Logic to set default fault to objectValue's type
        if (type === 'Int') {
            arrayOfOptions.push(<option value={type} selected>{type}</option>)
        } else {
            arrayOfOptions.push(<option value={type}>{type}</option>)
        }
        
    })
  return (
    <div id='fieldbox'>
      {/* <input type='text' id='fieldTextName' value={objectKey} contentEditable="true"></input> */}
      <span contentEditable='true'>{snakeToCamel(objectKey)}</span>:
      <select>
        {arrayOfOptions}
      </select>
      {/* <input type='text' id='fieldTextType' value={typeof objectValue}></input>         */}
      <button id='arrayButton'>[ ]</button>
      <button
        id='requiredButton'
        name='requiredButton'
        onClick={() => console.log('clicked requiredButton')}
      >
        !
      </button>
      <button
        id='deleteField'
        name='deleteField'
        onClick={() => console.log('clicked delete')}
      >
        -
      </button>
    </div>
  );
}
