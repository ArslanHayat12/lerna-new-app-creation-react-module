import axios from "axios";
export const fetchData = (query: any = "", per_page?: any) => {
  let api: string = query?`https://api.punkapi.com/v2/beers?beer_name=${query}`:`https://api.punkapi.com/v2/beers`;
  if (per_page) {
    let loadRecords = per_page % 80 === 0 ? 80 : per_page % 80;
    let page = per_page % 80;
    page = page === 0 ? per_page / 80 : Math.ceil(per_page / 80);
    api = query
      ? `https://api.punkapi.com/v2/beers?beer_name=${query}&page=${page}&per_page=${loadRecords}`
      : `https://api.punkapi.com/v2/beers?page=${page}&per_page=${loadRecords}`;
  }
  return axios(api);
};
