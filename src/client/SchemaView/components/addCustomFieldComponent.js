// component for adding custom fields
export default function AddCustomFieldComponent() {
  const closeBracket = '}'
  return (
    <div>
      <p>⬇️ Add custom fields below ⬇️</p>
        <input type='text' id='fieldTextName' name='fieldTextName' value={'placeholder1'}></input>
        <input type='text' id='customizedFieldTextType' name='customizedFieldTextType' value={'customized'}></input>    
        <button id='requiredButton' name='requiredButton' onClick={() => console.log('clicked requiredButton')}>!</button>    
        <button id='addField' name='addField' onClick={() => console.log('clicked add')}>+</button>
        <br/>{closeBracket}
    </div>
  )
}