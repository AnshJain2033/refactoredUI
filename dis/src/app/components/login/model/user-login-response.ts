export interface UserLoginResponse {
  username: string;
  authorities: Authority[];
  accessToken: string;
  tokenType: string;
  userType: string;
  userId: string;
}

interface Authority {
  authority: string;
}
