export const hashFunction = (str: string): number => {
  var hash = 0;
  if (str.length == 0) return hash;

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash >>> 0;
};

export function getObjectHash(obj: object) {
  const jsonString = JSON.stringify(obj);
  return hashFunction(jsonString);
}
