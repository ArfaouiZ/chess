import { Square } from "../square/Square";

export interface Lastmove {
    from?:number[],
    to?:number[],
    type?:Square
}