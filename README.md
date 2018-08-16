# React Lottery
**Contributors:** shaheer912  
**Tags:** crypto, ethereum, ether, smart contracts, solidity, lottery
**Requires at least:** Node, React, Metamask

A very simple react frontend for Ethereum Lottery application
see:
https://github.com/shaheer912/Ethereum-Lottery

## Description

A very simple react frontend for Ethereum Lottery application. Relies on Metamask chrome extension to function.

Features:

* Simple.
* One user can buy multiple tickets
* Will automatically reset once a user has won
* Winner is chosen randomly when the manager (the person who deployed the lottery contract) calls the chooseWinner function
* User is awarded the amount equal to the number of lottery tickets sold.
* Provides feedback to the user as he works uses the application.
* Requires no configuration, uses an already deployed instance of Lottery contract.

It requires the user to be connected to Rinkeby network.

## Installation

You are not *required* to configure anything to use this application. 
But if you want, you can go to lottery.js and modify the Lottery Contract ABI and contract address.

And then from command line, just run:
```js
npm start
```

It will automatically open on your browser, at the following URL:
http://localhost:3000/

Done.

### Warning
This application is for demonstration purposes only and is not meant to be used in production. Use it on your own risk!.
