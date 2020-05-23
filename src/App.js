import React, { Component } from 'react';
import { CardList } from './components/card-list/card-list.component'; 
import { SearchBox } from './components/search-box/search-box.component'; 
import './App.css';

class App extends Component {
  constructor(){
    super(); //calls the constructor function on the component class and gives access to state
    this.state = {
      monsters: [], 
      searchField: '' 
    }

    // this.handleChange = this.handleChange.bind(this); 
    /*
    .bind() is a method of a function that returns a NEW function 
    where the context of this is set to whatever is passed to it. 
    */
  }

  componentDidMount(){ //when the component is placed on the DOM, whatever code is in here is called.
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json()) //takes response and converts to JSON
    .then(users => this.setState({monsters: users})); //takes users and sets monsters to that array. 
  }  

  handleChange = (e) => { //arrow functions lets you not use '.bind(this)' in the constructor method 
    this.setState({ searchField:e.target.value })
  };

  render(){

    const { monsters, searchField } = this.state;
    /* Above equivalent to saying:
      const monsters = this.state.monsters; 
      const searchField = this.state.searchField
    */ 
    const filteredMonster = monsters.filter(monster => 
      monster.name.toLowerCase().includes(searchField.toLowerCase())
      )
    //filter() gives you a new array.
    //includes() makes sure that the returning monster has the string - BOOLEAN
    return(
      <div className="App">
        <h1>Monsters Rolodex</h1>
        <SearchBox 
          placeholder='search monsters'
          handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonster}></CardList> 
      </div>
    )
  }
}
export default App;
