export interface PunksType {
    name: string;
    image_url?:string;
    brewers_tips?:string;
  }
export interface Punks {
    hits?: PunksType[];
    state?: string;
    status?: string
}