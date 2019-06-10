export declare type MainState = {
    type: string;
};
export declare type hitsResponse = {
    name: string;
    image_url: string;
    brewers_tips: string;
};
export declare type State = {
    status?: "empty" | "loading" | "error" | "loaded";
    error?: string;
    data?: hitsResponse[];
    query?: string;
    numberOfRecords?: any;
    isLoaded?: boolean;
};
export declare type Action = {
    type: "request" | "success" | "failure" | "input" | "recordsToDisplay" | "loadMore";
    error?: string;
    data?: hitsResponse[];
    query?: string;
    numberOfRecords?: any;
    isLoaded?: boolean;
};
//# sourceMappingURL=index.d.ts.map