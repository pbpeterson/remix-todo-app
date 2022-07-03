const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/

export const validateEmail = (email: string) => {
  const isValidEmail = emailRegex.test(email as string)
  if (!isValidEmail) {
    return 'This email is not valid.'
  }
}

export const validateName = (name: string) => {
  if (name.length < 1) {
    return 'Your name needs 1 character at minimum'
  }
}

export const validatePassword = (password: string) => {
  if (password.length < 6) {
    return 'Your password should have 6 characters at least.'
  }
}
export const validatePasswords = (
  password: string,
  confirmPassword: string
) => {
  if (password !== confirmPassword) {
    return 'Your password and password confirmation does not match'
  }

  if (password.length === 0 || confirmPassword.length === 0) {
    return 'Your password/password confirmation needs 1 character at minimum'
  }
}
