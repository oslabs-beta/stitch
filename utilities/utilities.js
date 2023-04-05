const utilityFunctions = {
  scalarParser: (string) => {
    function helper(string) {
      if (Array.isArray(string)) {
        // const type = utilityFunctions.scalarParser(string[0]);
        return 'Array';
      }
      if (string[0] === '{' || typeof string === 'object') return 'Object';
      // if (string[0] === '[') return 'Array';
      if (string === 'true' || string === 'false') return 'Boolean';
      if (parseFloat(string));
      if (string.includes('.')) {
        const isDecimal = string.replace('.', '');
        if (Number(isDecimal)) return 'Float';
      }
      if (Number(string)) return 'Int';
      if (string.includes('ID')) return 'ID';
      else return 'String';
    }

    const value = helper(string);
    console.log(value);
    const object = { isArray: false, isObject: false, value: value };
    if (value === 'Array') {
      return Object.assign({}, object, { isArray: true });
    }
    if (value === 'Object') {
      return Object.assign({}, object, { isObject: true });
    } else return object;
  },

  snakeToCamel: (snakeStr) => {
    const components = snakeStr.split('_');
    // Capitalize the first letter of each component except the first one
    return (
      components[0] +
      components
        .slice(1)
        .map((c) => c.charAt(0).toUpperCase() + c.slice(1))
        .join('')
    );
  },
};

console.log(utilityFunctions.scalarParser({}));

export default utilityFunctions;
