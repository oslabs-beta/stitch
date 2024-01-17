// component for adding custom fields
export default function AddCustomFieldComponent() {
    var closeBracket = '}';
    return (React.createElement("div", null,
        React.createElement("p", null, "\u2B07\uFE0F Add custom fields below \u2B07\uFE0F"),
        React.createElement("input", { type: 'text', value: 'placeholder1' }),
        React.createElement("input", { type: 'text', value: 'customized' }),
        React.createElement("button", { id: 'requiredButton', onClick: function () { return console.log('clicked requiredButton'); } }, "!"),
        React.createElement("button", { id: 'addField', onClick: function () { return console.log('clicked add'); } }, "+"),
        React.createElement("br", null),
        closeBracket));
}
//# sourceMappingURL=addCustomFieldComponent.js.map