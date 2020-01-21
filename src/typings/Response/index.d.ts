export interface Response {
  status: number;
  statusText: string;
  data: object;
}

export interface PromiseResponses {
  [key: string]: Promise<Response>;
}

export interface Responses {
  [key: string]: Response;
}
