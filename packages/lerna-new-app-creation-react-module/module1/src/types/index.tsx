export type MainState = {
  type: string;
};

export type hitsResponse = {
  name: string;
  image_url: string;
  brewers_tips:string;

};

export type State = {
  status?: "empty" | "loading" | "error" | "loaded";
  error?: string;
  data?: hitsResponse[];
  query?:string;
  numberOfRecords?:any;
  isLoaded?:boolean;
};

export type Action = {
  type: "request" | "success" | "failure" | "input" | "recordsToDisplay" | "loadMore" ;
  error?: string;
  data?: hitsResponse[];
  query?:string;
  numberOfRecords?:any;
  isLoaded?:boolean;
};
