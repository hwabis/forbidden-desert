import React from 'react';
import './board.css';

export class ForbiddenDesertBoard extends React.Component {
    state = {
        assignID: 0,
        digging: false
    }

    assignRoleTo(id, role) {
        this.props.moves.setPlayerRole(id, role);
        this.setState({ assignID: this.state.assignID + 1 });
    }
    onClick(id) {
        if (this.isAdjacentTile(id) || this.isSameTile(id)) {
            if (this.state.digging && this.props.G.tiles[id].sandCount > 0) {
                this.props.moves.dig(id);
                this.setState({ digging: false });
            }
            else if (!this.isSameTile(id) && this.props.G.tiles[id].sandCount < 2 && !this.state.digging) {
                this.props.moves.move(id);
            }
        }
    }
    isAdjacentTile(id) {
        const currentPlayerPos = this.props.G.players[this.props.ctx.currentPlayer].position;
        return (id >= 0 && id <= 24 &&
            (id === currentPlayerPos - 1 || id === currentPlayerPos + 1 ||
                id === currentPlayerPos - 5 || id === currentPlayerPos + 5));
    }
    isSameTile(id) {
        return (id === this.props.G.players[this.props.ctx.currentPlayer].position);
    }

    render() {
        if (this.state.assignID < this.props.ctx.numPlayers) {
            console.log(this.state.assignID);
            return (
                <div className="center">
                    <div id="title">
                        Role Selection
                    </div>
                    <div className="header">
                        Choose role for Player {this.state.assignID}:
                    </div>
                    <p></p>
                    <div>
                        <button onClick={() => { this.assignRoleTo(this.state.assignID, "archeologist"); }}>
                            Archeologist
                        </button>
                        <button onClick={() => { this.assignRoleTo(this.state.assignID, "climber"); }}>
                            Climber
                        </button>
                        <button onClick={() => { this.assignRoleTo(this.state.assignID, "explorer"); }}>
                            Explorer
                        </button>
                        <button onClick={() => { this.assignRoleTo(this.state.assignID, "meteorologist"); }}>
                            Meteorologist
                        </button>
                        <button onClick={() => { this.assignRoleTo(this.state.assignID, "navigator"); }}>
                            Navigator
                        </button>
                        <button onClick={() => { this.assignRoleTo(this.state.assignID, "water-carrier"); }}>
                            Water Carrier
                        </button>
                    </div>
                    <p></p>
                    <div>
                        <div>
                            <p id="header">Archeologist</p>
                            <ul>
                                <li>Removes 2 sand when digging instead of 1.</li>
                                <li>Water capacity: 3</li>
                            </ul>
                        </div>
                        <div>
                            <p id="header">Climber</p>
                            <ul>
                                <li>Carry: moves other players along with Climber. (Cost: free)</li>
                                <li>Can move over tiles with 2 or more sand.</li>
                                <li>Allows all players on Climber's current tile to leave even with 2 or more sand.</li>
                                <li>Water capacity: 3</li>
                            </ul>
                        </div>
                        <div>
                            <p id="header">Explorer</p>
                            <ul>
                                <li>Can move, dig, and use items diagonally.</li>
                                <li>Water capacity: 4</li>
                            </ul>
                        </div>
                        <div>
                            <p id="header">Meteorologist</p>
                            <ul>
                                <li>Mitigate: draw 1 less Storm at the end of the turn. (Cost: 1 action)</li>
                                <li>Water capacity: 4</li>
                            </ul>
                        </div>
                        <div>
                            <p id="header">Navigator</p>
                            <ul>
                                <li>Direct: move another player up to 3 tiles. Climber and Explorer keep their abilities. (Cost: 1 action)</li>
                                <li>Water capacity: 4</li>
                            </ul>
                        </div>
                        <div>
                            <p id="header">Water Carrier</p>
                            <ul>
                                <li>Gather Water: take 2 water from an excavated well. (Cost: 1 action)</li>
                                <li>Give Water: give 1 water to an adjacent player. (Cost: free)</li>
                                <li>Water capacity: 5</li>
                            </ul>
                        </div>
                    </div>
                </div>
            );
        }
        var tiles = [];
        for (var i = 0; i < 5; i++) {
            var row = [];
            for (var j = 0; j < 5; j++) {
                var tile = [];
                const id = 5 * i + j;
                if (this.props.G.tiles[id].isStorm) {
                    row.push(<td key={id} id="storm"></td>);
                }
                else {
                    var players = [];
                    for (var k = 0; k < this.props.G.players.length; k++) {
                        if (this.props.G.players[k].position === id) {
                            players.push(k);
                        }
                    }
                    //eventually push each player marker so their color represents their role
                    tile.push(<div className="player">{players}</div>);
                    if (this.props.G.tiles[id].sandCount !== 0) {
                        var sandIndicator = "";
                        for (var l = 0; l < this.props.G.tiles[id].sandCount; l++) {
                            sandIndicator = sandIndicator.concat("l");
                        }
                        tile.push(<div className={this.props.G.tiles[id].sandCount > 1 ? "sand red" : "sand"}>
                            Sand: {sandIndicator}</div>);
                    }
                    row.push(<td key={id} className="unrevealed" onClick={() => this.onClick(id)}>{tile}</td>);
                }
            }
            tiles.push(<tr key={i}>{row}</tr>);
        }

        return (
            <div className="center">
                <div className="header">
                    <div>
                        Player {this.props.ctx.currentPlayer}'s turn
                    </div>
                    <div>
                        Actions left in turn: {4 - this.props.ctx.numMoves}
                    </div>
                </div>
                <table className="center">
                    <tbody>{tiles}</tbody>
                </table>
                <div>
                    <button onClick={() => { this.setState({ digging: !this.state.digging }); }}>
                        Dig
                    </button>
                    <div>
                        {this.state.digging ? "Choose a tile to dig." : ""}
                    </div>
                </div>
            </div>
        );
    }
}
