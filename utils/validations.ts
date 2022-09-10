export const getEmailValidation = (email: string): boolean => {
  return new RegExp(
    /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i,
  ).test(email.trim())
}

export const getPasswordValidation = (password: string): boolean => {
  return new RegExp(/^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/i).test(password)
}

export const getIsPasswordSame = (
  password: string,
  repeatPassword: string,
): boolean => {
  return password === repeatPassword
}
