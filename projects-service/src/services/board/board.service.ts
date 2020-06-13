import { Board } from "../../entities/Board";
import { BoardService } from "./board.interfaces";

export const boardService: BoardService = {
  getAllBoards: async (_, callback) => {
    try {
      const boards = await Board.find();
      console.log(boards);
      callback(null, { boards } as any);
    } catch (error) {
      console.error(error);
      callback(error);
    }
  },
};
