import { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      employees: [],
      searchField: ''
    };
    console.log('constructor');
  }

  componentDidMount() {
    console.log('componentDidMount');
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users =>
        this.setState(
          () => {
            return { employees: users };
          },
          () => {
            console.log(this.state);
          }
        )
      );
  }

  render() {
    console.log('render');

    const filteredEmployees = this.state.employees.filter(employee => {
      return employee.name.toLowerCase().includes(this.state.searchField);
    });

    return (
      <div className='App'>
        <input
          className='search-box'
          type='search'
          placeholder='search employees'
          onChange={event => {
            console.log(event.target.value);
            const searchField = event.target.value.toLowerCase();

            this.setState(() => {
              return { searchField };
            });
          }}
        />

        {filteredEmployees.map(employee => {
          return (
            <div key={employee.id}>
              <h1>{employee.name}</h1>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
