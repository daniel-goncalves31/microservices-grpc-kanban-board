/**
 * Convert a enum to a array for the Select options
 * @param en enum
 */
export const enumToArray = (en: any) =>
  Object.values(en).map((val) => ({ value: val, label: val }));
