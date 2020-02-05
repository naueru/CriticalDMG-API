<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest
  
  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" /></a>
<a href="https://gitter.im/nestjs/nestjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge"><img src="https://badges.gitter.im/nestjs/nestjs.svg" alt="Gitter" /></a>
<a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## Client

Chat log must beui

```
// Core
import React, { Component } from 'react';
// POC code only
import socketIOClient from "socket.io-client";

// Styles
import styles from './ChatLog.module.css';

const ENDPOINT = 'localhost:3000';
const RANDOM_NAMES = ['federico', 'nahuel', 'lucas', 'mauricio', 'julieta', 'victora', 'victorp', 'jhon', 'gustavo', 'ryan']
class ChatLog extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      socket: socketIOClient(ENDPOINT),
      name: RANDOM_NAMES[Math.floor(Math.random() * 10)]
    }
  }

  componentDidMount() {
    this.state.socket.emit('getMessages', null, (data) => {
      this.setState({ messages: data })
    });
    this.state.socket.on("messageCreated", (data) => {
      this.setState({ messages: [...this.state.messages, data] })
    });
  }

  handleChange = event => this.setState({text: event.target.value})

  handleSubmit = (event) => {
    event.preventDefault();
    this.state.socket.emit('createMessage', {user: this.state.name, text: this.state.text})
    this.setState({text: ''})
  }

  deleteMessages = () => {
    console.log('Not Implemented')
  }

  render = () => {
    return (
      <React.Fragment>
        <div className={styles.chat}>Chat</div>
        <ul>
          {this.state.messages ? this.state.messages.map(m => <li key={m.id}>{`Mensaje de ${m.user}: ${m.text}`}</li>) : null}
        </ul>

        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.text} onChange={this.handleChange} /> 
        </form>
        <button  onClick={this.deleteMessages}>
          Eliminar todos los mensajes
        </button>
      </React.Fragment>
    );
  };
}

export default ChatLog;

```