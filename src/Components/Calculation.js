import { Board, MinMax } from "./MinMax";
import { First } from "react-bootstrap/PageItem";

export function calculation(tic, firstPlayer) {
  // console.log(tic);
  var board = new Board(
    tic.map(arr => {
      return arr.slice();
    }),
    firstPlayer
  );
  var min = new MinMax();
  min.maketree1(board);
  min.minmax(board);
  // var pu = board.dl;
  // while (pu != null) {
  //   if (board.val == pu.val) {
  //     console.log(pu);
  //     if (min.whoWins(pu) == undefined) {
  //       console.log("draw");
  //       break;
  //     } else if (min.whoWins) {
  //       console.log("first player");
  //       break;
  //     } else if (!min.whoWins) {
  //       console.log("second player");
  //       break;
  //     }
  //   }
  //   pu = pu.fl;
  // }
  // board = pu;
  var pu = board.dlink;
  do {
    if (board.val == pu.val) {
      break;
    }
    pu = pu.flink;
  } while (pu.flink != null);
  // console.log("puuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu", board, pu);
  return pu.tic;
}
