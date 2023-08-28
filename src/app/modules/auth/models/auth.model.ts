export class AuthModel {
  authToken: string;
  refreshToken: string;
  expiresIn: Date;

  setAuth(auth: AuthModel) {
    this.authToken = auth.authToken;
    this.refreshToken = auth.refreshToken;
    this.expiresIn = auth.expiresIn;
  }
}

export class LoginResponse extends AuthModel{
  empName: string;
  empLabel: string;
  windowsID: string;

  setAuth(auth: LoginResponse) {
    this.empName = auth.empName;
    this.empLabel = auth.empLabel;
    this.windowsID = auth.windowsID;
  }
}
