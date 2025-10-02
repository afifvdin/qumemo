export type TokenInsert = {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
};

export type Token = {
  accessToken: string;
  expiresIn: number;
  scope: string;
  tokenType: string;
};

export type Verifier = { v: string; s: string; n: string };
