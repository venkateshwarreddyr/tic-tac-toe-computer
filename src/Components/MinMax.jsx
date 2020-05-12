export class Board {
  constructor(tic, firstPlayer, level) {
    this.tic = tic;
    this.flink = null;
    this.dlink = null;
    this.ulink = null;
    this.val = 0;
    // this.cb = 0;
    this.level = 0;
    this.firstPlayer = firstPlayer;
  }
}
export class MinMax {
  constructor() {
    this.flag = 0;
  }

  maketree1 = board => {
    // const t1;
    // console.log(board.tic);
    this.maketree(board);
    // console.log("board", board);
    // process.emit(0);
    if (board.flink == null && board.dlink == null) {
      return;
    }
    // console.log("board", board);
    var t1 = board.dlink;
    do {
      // console.log("t11111111111111111111111111 before", t1);
      this.maketree1(t1);
      // return;
      // console.log("t11111111111111111111111111 after", t1);
      // break;
      t1 = t1.flink;
    } while (t1 != null);
  };

  maketree = board => {
    var i, w;
    var fresh = null,
      temp;
    if (!this.checkIfAnyEmpty(board) || board.val !== 0) {
      // console.log("1234567890-123456567890-1234567890-");
      board.dlink = board.flink = null;
    } else {
      for (i = 0; i < 9; i++) {
        if (board.tic[Math.floor(i / 3)][i % 3] === -1) {
          if (!fresh) {
            if (board.firstPlayer) w = 0;
            else w = 1;
          }
          temp = new Board(
            board.tic.map(function(arr) {
              return arr.slice();
            }),
            !board.firstPlayer
          );

          // temp.firstPlayer = !board.firstPlayer;
          temp.tic[Math.floor(i / 3)][i % 3] = w;
          // temp.tic[Math.floor(i / 3)][i % 3] = temp.firstPlayer ? 1 : 0;

          temp.level = board.level + 1;
          this.checkStatus(temp);

          if (temp.val > 0) board.val = temp.val - 1;
          if (temp.val < 0) board.val = temp.val + 1;

          if (!board.dlink && this.flag === 0) {
            this.flag = 1;
            board.dlink = temp;
          } else {
            fresh.flink = temp;
          }
          fresh = temp;
        }
      }
    }
    // return;
    this.flag = 0;
  };

  minmax = board => {
    var t1;
    var min, max;
    if (board.dlink == null) {
      return;
    }
    t1 = board.dlink;
    min = max = t1.val;
    do {
      this.minmax(t1);
      if (t1.val > max) {
        max = t1.val;
      }
      if (t1.val < min) {
        min = t1.val;
      }
      t1 = t1.flink;
    } while (t1 != null);
    if (board.level % 2 === 0) {
      board.val = max;
    } else {
      board.val = min;
    }
  };

  checkIfAnyEmpty = board => {
    const { tic } = board;
    for (var i = 0; i < 9; i++) {
      if (tic[Math.floor(i / 3)][i % 3] === -1) return true;
    }
    return false;
  };
  subCheck = (board, one, two, three) => {
    const tic = board.tic;
    if (
      tic[Math.floor(one / 3)][one % 3] === -1 ||
      tic[Math.floor(two / 3)][two % 3] === -1 ||
      tic[Math.floor(three / 3)][three % 3] === -1
    ) {
      return false;
    }
    if (
      tic[Math.floor(one / 3)][one % 3] === tic[Math.floor(two / 3)][two % 3] &&
      tic[Math.floor(one / 3)][one % 3] ===
        tic[Math.floor(three / 3)][three % 3] &&
      tic[Math.floor(two / 3)][two % 3] ===
        tic[Math.floor(three / 3)][three % 3]
    )
      return true;
    else return false;
  };
  checkStatus = board => {
    if (
      this.subCheck(board, 0, 1, 2) ||
      this.subCheck(board, 3, 4, 5) ||
      this.subCheck(board, 6, 7, 8) ||
      this.subCheck(board, 0, 3, 6) ||
      this.subCheck(board, 1, 4, 7) ||
      this.subCheck(board, 2, 5, 8) ||
      this.subCheck(board, 0, 4, 8) ||
      this.subCheck(board, 2, 4, 6)
    ) {
      if (!board.firstPlayer) {
        board.val = 10;
      } else {
        board.val = -10;
      }
    } else {
      board.val = 0;
    }
  };
  whoWins = board => {
    if (
      this.subCheck(board, 0, 1, 2) ||
      this.subCheck(board, 3, 4, 5) ||
      this.subCheck(board, 6, 7, 8) ||
      this.subCheck(board, 0, 3, 6) ||
      this.subCheck(board, 1, 4, 7) ||
      this.subCheck(board, 2, 5, 8) ||
      this.subCheck(board, 0, 4, 8) ||
      this.subCheck(board, 2, 4, 6)
    ) {
      if (board.firstPlayer) {
        return true;
      } else {
        return false;
      }
    } else {
      return undefined;
    }
  };
}
