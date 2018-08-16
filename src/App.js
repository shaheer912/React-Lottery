import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";

class App extends Component {
  state = {
    manager: "",
    totalPlayers: "",
    balance: "",
    ticketPrice: "",
    value: ""
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const totalPlayers = await lottery.methods.getTotalPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    const ticketPrice = await lottery.methods.ticketPrice().call();

    this.setState({ manager, totalPlayers, balance, ticketPrice });
  }

  onSubmit = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: "Purchasing your ticket, please wait" });
    try {
      await lottery.methods
        .buyTicket()
        .send({ from: accounts[0], value: this.state.ticketPrice });

      this.setState({ message: "Ticket purchased, congrats" });

      const lotteryBalance = await web3.eth.getBalance(lottery.options.address);
      const totalPlayers = await lottery.methods.getTotalPlayers().call();

      this.setState({ balance: lotteryBalance, totalPlayers: totalPlayers });
    } catch (e) {
      if (e.message.indexOf("User denied transaction signature") > -1) {
        this.setState({ message: "You have denied the transaction :(" });
      } else {
        this.setState({ message: e.message });
      }
    }
  };

  pickWinner = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: "Attempting to pick a winner" });
    try {
      await lottery.methods.chooseWinner().send({ from: accounts[0] });
      const lotteryBalance = await web3.eth.getBalance(lottery.options.address);
      const totalPlayers = await lottery.methods.getTotalPlayers().call();

      this.setState({
        message: "A winner has been picked",
        balance: lotteryBalance,
        totalPlayers: totalPlayers
      });
    } catch (e) {
      if (e.message.indexOf("User denied transaction signature") > -1) {
        this.setState({ message: "You have denied the transaction :(" });
      } else {
        this.setState({ message: e.message });
      }
    }
  };

  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>Welcome to Lottery</p>

        <p>This contract is managed by {this.state.manager}</p>
        <p>
          There are currently {this.state.totalPlayers} people playing the
          lottery competing to win{" "}
          {web3.utils.fromWei(this.state.balance, "ether")} ether!
        </p>
        <hr />
        <form onSubmit={this.onSubmit}>
          <p>
            Purchase a ticket to enter<br />Ticket Price:{" "}
            {web3.utils.fromWei(this.state.ticketPrice, "ether")} ether{" "}
            <button>Purchase Ticket</button>
          </p>
        </form>

        <hr />
        <h2>Ready to pick a winner?</h2>
        <button onClick={this.pickWinner}>Choose Winner</button>
        <hr />
        <h4>{this.state.message}</h4>
      </div>
    );
  }
}
export default App;
