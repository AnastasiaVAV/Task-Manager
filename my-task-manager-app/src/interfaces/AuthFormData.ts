interface LoginFormData {
  login: string
  password: string
}

interface SignupFormData extends LoginFormData {
  confirmPassword: string
  username: string
}

export type { LoginFormData, SignupFormData }
