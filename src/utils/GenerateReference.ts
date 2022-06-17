const GenerateReference = (type: string) => {
  const prefix = type === 'loan' ? 'L' : 'T';

  const number = Math.random().toString().substring(2, 16);

  const reference = `${prefix}_${number}`;

  return reference;
};
export default GenerateReference;
