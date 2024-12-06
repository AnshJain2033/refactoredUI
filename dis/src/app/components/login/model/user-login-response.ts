export interface UserLoginResponse {
  username: string;
  authorities: Authority[];
  accessToken: string;
  tokenType: string;
  userType: string;
}

interface Authority {
  authority: string;
}
