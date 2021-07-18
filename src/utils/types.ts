export namespace gcs {
  export interface CredentialsInterface {
    username: string;
    password: string;
  }

  export interface TokensInterface {
    userId: string;
    access_token: string;
  }

  export interface UserProfileInterface {
    id: string;
    username: string;
    isManager: boolean;
    store?: {
      id: string;
      name: string;
    };
  }
}
