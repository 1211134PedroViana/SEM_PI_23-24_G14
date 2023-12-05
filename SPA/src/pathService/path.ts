import Cell from "./cell";

export default interface Path {
    caminho: string[];
    movimentos: Cell[][];
}