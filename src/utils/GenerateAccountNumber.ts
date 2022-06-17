const GenerateAccountNumber = () => {
  const number = Math.random().toString().substring(2, 8);
  const digit = Math.random().toString().substring(2, 3);

  const accountNumber = number + '-' + digit;

  return accountNumber;
};
export default GenerateAccountNumber;
