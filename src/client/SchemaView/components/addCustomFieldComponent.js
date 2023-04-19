// component for adding custom fields
export default function AddCustomFieldComponent() {
  const closeBracket = '}';
  return (
    <div>
      <p>⬇️ Add custom fields below ⬇️</p>
      <input type='text' value={'placeholder1'}></input>
      <input type='text' value={'customized'}></input>
      <button
        id='requiredButton'
        onClick={() => console.log('clicked requiredButton')}
      >
        !
      </button>
      <button id='addField' onClick={() => console.log('clicked add')}>
        +
      </button>
      <br />
      {closeBracket}
    </div>
  );
}
