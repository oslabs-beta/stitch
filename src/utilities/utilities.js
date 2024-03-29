const utilityFunctions = {
  scalarParser: (string) => {
    const newString = string.toString();
    // eslint-disable-next-line no-shadow
    function parser(string) {
      if (Array.isArray(string)) {
        return 'Array';
      }
      if (string[0] === '{' || typeof string === 'object') return 'Object';
      if (string === 'true' || string === 'false') return 'Boolean';
      if (string.includes('.')) {
        const isDecimal = string.replace('.', '');
        if (Number(isDecimal)) return 'Float';
      }
      if (Number(string)) return 'Int';
      if (string.includes('ID')) return 'ID';
      return 'String';
    }

    const value = parser(newString);
    // create array of options corresponding to 'required state' of Arrays ie: [[], [!], []!, [!]!].
    const object = {
      isArray: false,
      isObject: false,
      graphQL: '',
      requiredOption: false,
      value,
    };

    if (value === 'Array') {
      object.isArray = true;
    }
    if (value === 'Object') {
      object.isObject = true;
    }
    return object;
  },

  snakeToCamel: (snakeStr) => {
    const components = snakeStr.split('_');
    // Capitalize the first letter of each component except the first one
    return (
      // eslint-disable-next-line
      components[0] +
      components
        .slice(1)
        .map((c) => c.charAt(0).toUpperCase() + c.slice(1))
        .join('')
    );
  },
};

export default utilityFunctions;
