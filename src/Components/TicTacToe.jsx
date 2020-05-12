import React, { Component } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import "./styles.css";
import Square from "./Square";
import { calculation } from "./Calculation";
class TicTacToe extends Component {
  state = {
    startByFirstPlayer: true,
    firstPlayer: true,
    tic: [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]],
    completed: false,
    points: {
      player1: 0,
      player2: 0,
      computer: 0,
      you: 0
    },
    computer: true
  };

  componentDidUpdate() {
    const { completed, firstPlayer, tic, computer } = this.state;

    if (computer && firstPlayer) {
      this.compute();
    }
  }

  subCheck(one, two, three) {
    const { tic } = this.state;
    if (
      tic[Math.floor(one / 3)][one % 3] == -1 &&
      tic[Math.floor(two / 3)][two % 3] == -1 &&
      tic[Math.floor(three / 3)][three % 3] == -1
    ) {
      return false;
    }
    if (
      tic[Math.floor(one / 3)][one % 3] == tic[Math.floor(two / 3)][two % 3] &&
      tic[Math.floor(two / 3)][two % 3] == tic[Math.floor(three / 3)][three % 3]
    )
      return true;
    else return false;
  }

  checkIfDraw() {
    const { tic } = this.state;
    for (var i = 0; i < 9; i++) {
      if (tic[Math.floor(i / 3)][i % 3] == -1) return false;
    }
    return true;
  }

  checkStatus = firstPlayer => {
    console.log("this.checkIfDraw(): ", this.checkIfDraw());
    if (
      this.subCheck(0, 1, 2) ||
      this.subCheck(3, 4, 5) ||
      this.subCheck(6, 7, 8) ||
      this.subCheck(0, 3, 6) ||
      this.subCheck(1, 4, 7) ||
      this.subCheck(2, 5, 8) ||
      this.subCheck(0, 4, 8) ||
      this.subCheck(2, 4, 6)
    ) {
      const { points, computer } = this.state;
      if (computer) {
        points.computer += 1;
      } else if (!firstPlayer) {
        points.player1 += 1;
      } else {
        points.player2 += 1;
      }
      this.setState({ completed: true, points });
    } else if (this.checkIfDraw()) {
      this.setState({ completed: true, firstPlayer: undefined });
    }
  };

  setBoxes = id => {
    const row = Math.floor(id / 3);
    const col = id % 3;
    const { tic } = this.state;
    if (tic[row][col] == -1) {
      var { firstPlayer, computer } = this.state;
      if (firstPlayer) tic[row][col] = 0;
      else tic[row][col] = 1;

      firstPlayer = !firstPlayer;
      this.setState({ tic, firstPlayer }, () => {
        console.log("new state", this.state);
      });

      this.checkStatus(firstPlayer);
      return true;
    }
    return false;
  };
  reSetGame = () => {
    console.log("reset");
    const { startByFirstPlayer } = this.state;
    this.setState({
      firstPlayer: startByFirstPlayer,
      tic: [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]],
      completed: false
    });
  };
  setComputer = () => {
    const { startByFirstPlayer } = this.state;

    this.setState({
      firstPlayer: startByFirstPlayer,
      tic: [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]],
      completed: false,
      computer: true
    });
  };
  setPlayer = () => {
    console.log("reset");
    this.setState({
      firstPlayer: false,
      tic: [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]],
      completed: false,
      computer: false
    });
  };
  resetScores = () => {
    console.log("reset");
    const { points } = this.state;
    points.player1 = 0;
    points.player2 = 0;
    points.computer = 0;
    points.you = 0;
    this.setState({
      points
    });
  };

  setPlayerTurnFirst = () => {
    this.setState({
      startByFirstPlayer: false,
      firstPlayer: false,
      tic: [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]],
      completed: false
    });
  };

  setPlayerTurnSecond = () => {
    this.setState({
      firstPlayer: true,
      startByFirstPlayer: true,
      tic: [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]],
      completed: false
    });
  };

  compute = () => {
    const { firstPlayer, tic, computer } = this.state;

    var newTic = calculation(tic, firstPlayer);
    console.log(
      "new-----------------------------------------------------------------------Tic: ",
      computer,
      firstPlayer
    );
    this.setState({ tic: newTic, firstPlayer: !firstPlayer }, () => {
      console.log("new state", this.state);
      this.checkStatus(firstPlayer);
    });
  };
  render() {
    const { completed, firstPlayer, tic, computer } = this.state;

    // if (computer && firstPlayer) {
    //   this.compute();
    // }

    console.log(this.state);
    return (
      <React.Fragment>
        <Row>
          <Col md={8} sm={6} xs={12} className="main-div">
            <Container
              className={
                completed ? "completed container-div" : "container-div "
              }
            >
              <div className="box">
                <Row>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(item => {
                    return (
                      <Square
                        key={item}
                        id={item}
                        setBoxes={this.setBoxes}
                        firstPlayer={firstPlayer}
                        compute={this.compute}
                        // reset={completed}
                        reset={tic[Math.floor(item / 3)][item % 3]}
                      />
                    );
                  })}
                </Row>
              </div>
            </Container>
            <Row className={completed ? "show-button" : "hide-button"}>
              <Col md={12}>
                <p>
                  {firstPlayer == undefined ? "Draw Match!" : ""}
                  {firstPlayer == false
                    ? computer
                      ? "Computer wins"
                      : "Player 2 Wins!"
                    : ""}
                  {firstPlayer == true ? "Player 1 Wins!" : ""}
                </p>
              </Col>
              <Col>
                <button
                  className="restart-button"
                  onClick={() => this.reSetGame()}
                >
                  Restart
                </button>
              </Col>
            </Row>
          </Col>
          <Col md={3} sm={6} xs={12} className="button-div">
            <Row>
              <button
                className="restart-button"
                onClick={() => this.reSetGame()}
              >
                Restart
              </button>
              <button
                className="restart-button"
                onClick={() => this.setComputer()}
              >
                Player vs Computer
              </button>
              <button
                className="restart-button"
                onClick={() => this.setPlayerTurnSecond()}
                disabled={!computer}
              >
                Play as second
              </button>
              <button
                className="restart-button"
                onClick={() => this.setPlayerTurnFirst()}
                disabled={!computer}
              >
                Play as first
              </button>
              <button
                className="restart-button"
                onClick={() => this.setPlayer()}
              >
                Player vs Player
              </button>
              <button
                className="restart-button"
                onClick={() => this.resetScores()}
              >
                Reset scores
              </button>
            </Row>
            <Row>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    {computer ? (
                      <th key="you">You</th>
                    ) : (
                      <th key="player1">1st Player</th>
                    )}
                    {computer ? (
                      <th key="comp">Computer</th>
                    ) : (
                      <th key="player2">2nd Player</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  <tr key="you">
                    {computer ? (
                      <td>{this.state.points.you}</td>
                    ) : (
                      <td>{this.state.points.player1}</td>
                    )}

                    {computer ? (
                      <td>{this.state.points.computer}</td>
                    ) : (
                      <td>{this.state.points.player2}</td>
                    )}
                  </tr>
                </tbody>
              </Table>
            </Row>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default TicTacToe;
