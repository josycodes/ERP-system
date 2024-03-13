export interface IAuthLoginRequest {
  email: string;
  password: string;
}
export interface IAuthCompleteRegisterRequest {
  name: string;
  password: string;
}

export interface IAuthResetPasswordRequest {
  email: string;
}

export interface IAuthCompleteResetPasswordRequest {
  password: string;
}

export interface IJWTPayload {
  i: number,
  type: 'customer' | 'rider',
  scope?: string[]
}