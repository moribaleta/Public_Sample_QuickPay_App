export type AuthResponse = {
  status: string;
  message: string;
  data: AuthData;
};

export type AuthData = {
  access_token: string;
  expires_in: number; // 15 minutes
  refresh_token: string;
  user: AuthUser;
};

export type AuthUser = {
  user_id: string;
  full_name: string;
  email: string;
};

export type LoginParams = {
  email: string;
  password: string;
};
