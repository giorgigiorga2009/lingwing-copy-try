export const updateNestedObject = (keys: any, obj: any, newValue: any) => {
  keys.slice(0, -1).reduce((o: any, k: any) => (o[k] = o[k] || {}), obj)[
    keys.slice(-1)[0]
  ] = newValue
}


