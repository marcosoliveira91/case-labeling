export interface IConfig {
  env: string;
  port: number;
  cors: {
    originRegex: string;
    credentials: boolean;
  },
  auth: {
    jwt: {
      secret: string;
    }
  },
  db: {
    connection: {
      uri: string;
    }
  }
}
