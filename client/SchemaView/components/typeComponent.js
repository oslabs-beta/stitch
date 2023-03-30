// component for changing schema type and name

export default function TypeComponent() {
  const openBracket = '{'
  return (
    <div>
      <span>type</span>
      <input type="text">
        </input>
        <span>{openBracket}</span>
    </div>
  )
}