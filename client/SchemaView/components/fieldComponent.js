// component reponsible for rendering and modifying each field
// may need a unique ids for all elements
// place
export default function FieldComponent () {
return (
    <div id='fieldbox'>
        <input type='text' id='fieldTextName' name='fieldTextName' placeholder="placeholder"></input>
        <input type='text' id='fieldTextType' name='fieldTextType' placeholder="placeholder2"></input>        
        <button id='requiredButton' name='requiredButton' onClick={() => console.log('clicked requiredButton')}>!</button>
        <button id='deleteField' name='deleteField' onClick={() => console.log('clicked delete')}>-</button>
    </div>
)
}