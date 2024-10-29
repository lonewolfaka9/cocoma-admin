export const generatevalidationCode = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';

  // Generate first three characters
  for (let i = 0; i < 3; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  // Add hyphen
  code += '-';

  // Generate last three characters
  for (let i = 0; i < 3; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return code;
};
