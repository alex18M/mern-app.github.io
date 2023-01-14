import React, { Component } from 'react';

class App extends Component {

  constructor() {
    super();//heredamos las propiedades de React.Component
    this.state = {//estado inicial
      name: '',
      APaterno: '',
      AMaterno: '',
      age: '',
      dateN: '',
      maritalStatus: '',
      phoneN: '',
      country: '',
      state: '',
      city: '',
      town: '',
      zipcode: '',
      lenguage: '',
      hobby: '',
      preference: '',
      _id: '',
      users: []
    };
    this.handleChange = this.handleChange.bind(this);//para que el this de handleChange sea el de App
    this.addUser = this.addUser.bind(this);//para que el this de addUser sea el de App
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value//nombre de la propiedad sea el mismo que el del input
    });
  }

  addUser(e) {
    e.preventDefault();//para que no se recargue la pagina
    if(this.state._id) {
      fetch(`/api/user/${this.state._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          name: this.state.name,
          APaterno: this.state.APaterno,
          AMaterno: this.state.AMaterno,
          age: this.state.age,
          dateN: this.state.dateN,
          maritalStatus: this.state.maritalStatus,
          phoneN: this.state.phoneN,
          country: this.state.country,
          state: this.state.state,
          city: this.state.city,
          town: this.state.town,
          zipcode: this.state.zipcode,
          lenguage: this.state.lenguage,
          hobby: this.state.hobby,
          preference: this.state.preference
        }),
        headers: {//infomamos al servidor para que sepa que le estamos enviando datos en formato json
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())//convertimos la respuesta a json
        .then(data => {
          window.M.toast({html: 'User Updated'});//mensaje de que se actualizo el usuario
          this.setState({_id: '', name: '', APaterno: '', AMaterno: '', age: '', dateN: '', maritalStatus: '', phoneN: '', country: '', state: '', city: '', town: '', zipcode: '', lenguage: '', hobby: '', preference: ''});//limpiamos el estado
          this.fetchUsers();
        });
    } else {
      fetch('/api/user', {//ruta donde se va a guardar el usuario
        method: 'POST',
        body: JSON.stringify(this.state),//convertimos el estado a json
        headers: {
          'Accept': 'application/json',//infomamos al servidor para que sepa que le estamos enviando datos en formato json
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          window.M.toast({html: 'User Saved'});
          this.setState({name: '', APaterno: '' , AMaterno: '', age: '', dateN: '', maritalStatus: '', phoneN: '', country: '', state: '', city: '', town: '', zipcode: '', lenguage: '', hobby: '', preference:''});
          this.fetchUsers();//actualizamos la lista de usuarios
        })
        .catch(err => console.error(err));
    }

  }

  deleteUser(id) {
    if(confirm('Are you sure you want to delete it?')) {
      fetch(`/api/user/${id}`, {
        method: 'DELETE',
        headers: {//infomamos al servidor para que sepa que le estamos enviando datos en formato json
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          M.toast({html: 'Users deleted'});
          this.fetchUsers();
        });
    }
  }

  editUser(id) {
    fetch(`/api/user/${id}`)
      .then(res => res.json())
      .then(data => {//actualizamos el estado con los datos del usuario
        console.log(data);
        this.setState({
          name: data.name,
          APaterno: data.APaterno,
          AMaterno: data.AMaterno,
          age: data.age,
          dateN: data.dateN,
          maritalStatus: data.maritalStatus,
          phoneN: data.phoneN,
          country: data.country,
          state: data.state,
          city: data.city,
          town: data.town,
          zipcode: data.zipcode,
          lenguage: data.lenguage,
          hobby: data.hobby,
          preference: data.preference,
          _id: data._id
        });
      });
  }

  componentDidMount() {//se ejecuta cuando el componente se monta
    this.fetchUsers();
  }

  fetchUsers() {//obtenemos los usuarios
    fetch('/api/user')
      .then(res => res.json())
      .then(data => {
        this.setState({users: data});
        console.log(this.state.users);
      });
  }

  render() {//renderizamos el componente
    return (
      <div>
        {/* NAVIGATION */}
        <nav class="nav-wrapper" className="blue-grey">
          <div className="">
            <div className="nav-wrapper">
              <a href="#" className="brand-logo center ">CRUD Users</a>
              <ul id="nav-mobile" class="left hide-on-med-and-down">
                <li><a href="#">Home</a></li>
                <li><a href="#">Components</a></li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="">
          <div className="row">
            <div className="col s12 ">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addUser}>
                    <div className="row">
                      <div className="input-field col s2">
                        <input name="name" onChange={this.handleChange} value={this.state.name} type="text" placeholder="Name" autoFocus required/>
                      </div>
                      <div className="input-field col s2">
                      <input name="APaterno" onChange={this.handleChange} value={this.state.APaterno} type="text" placeholder="Paternal surname" className="materialize-input" required></input>
                      </div>
                      <div className="input-field col s2">
                        <input name="AMaterno" onChange={this.handleChange} value={this.state.AMaterno} type="text"  placeholder="Maternal surname" className="materialize-input" required></input>
                      </div>
                   
                      <div className="input-field col s1">
                        <input name="age" type = "number" onChange={this.handleChange} value={this.state.age}  placeholder="Age" className="materialize-input" required></input>
                      </div>
                    
                      <div className="input-field col s2">
                        <input name="dateN" onChange={this.handleChange} value={this.state.dateN} type="date"  placeholder="Date of birth" className="materialize-input" required></input>
                      </div>
  
                      <div className="input-field col s3">
                        <input name="maritalStatus" type ="text" onChange={this.handleChange} value={this.state.maritalStatus} placeholder="Marital Status" className="materialize-input" required></input>
                      </div>

                     </div>  
                   <div className="row">
                      <div className="input-field col s2">
                        <input name="phoneN"  type = "number" onChange={this.handleChange} value={this.state.phoneN} placeholder="Phone Number" className="materialize-input" required></input>
                      </div>
                   
                   
                      <div className="input-field col s2">
                        <input name="country" type ="text" onChange={this.handleChange} value={this.state.country}  placeholder="Country" className="materialize-input" required></input>
                      </div>
                
                 
                      <div className="input-field col s2">
                        <input name="state" type ="text" onChange={this.handleChange} value={this.state.state}  placeholder="State" className="materialize-input" required></input>
                      </div>
                   
                
                      <div className="input-field col s2">
                        <input name="city" type ="text" onChange={this.handleChange} value={this.state.city}  placeholder="City" className="materialize-input" required></input>
                      </div>
                  
                 
                      <div className="input-field col s2">
                        <input name="town" type ="text" onChange={this.handleChange} value={this.state.town}  placeholder="Town" className="materialize-input" required></input>
                      </div>
                   
                   
                      <div className="input-field col s2">
                        <input name="zipcode" type ="number" onChange={this.handleChange} value={this.state.zipcode}  placeholder="Zipcode" className="materialize-input" required></input>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s4">
                        <input name="lenguage" type ="text" onChange={this.handleChange} value={this.state.lenguage}  placeholder="Lenguage" className="materialize-input" required></input>
                      </div>
                    
                      <div className="input-field col s4">
                        <input name="hobby" type ="text" onChange={this.handleChange} value={this.state.hobby} placeholder="Hobby" className="materialize-input" required></input>
                      </div>
                
                      <div className="input-field col s4">
                        <input name="preference" type ="text" onChange={this.handleChange} value={this.state.preference} placeholder="Preference" className="materialize-input" required></input>
                      </div>
                    </div>

                  <div className="row">
                  <div class="col s2 push-s1 offset-s9">
                    <button type="submit" class="btn waves-effect waves-light" name="action" className="btn grey darken-2 push-2">
                    <i class="material-icons right">send</i>
                      Send 
                    </button>
                   </div> 
                  </div>  
                  </form>
                </div>
              </div>
            </div>
            <div class="container   ">
              <div class="row">
                <div class="col s12 offset-s3 "><span class="flow-text">Users registered in the application</span></div>
              </div>
            </div>
            
            <div className="col s12 ">
              <table class="responsive-table striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Paternal surname</th>
                    <th>Maternal surname</th>
                    <th>Age</th>
                    <th>Date of birth</th>
                    <th>Marital Status</th>
                    <th>Phone Number</th>
                    <th>Country</th>
                    <th>State</th>
                    <th>City</th>
                    <th>Town</th>
                    <th>Zipcode</th>
                    <th>Hobby</th>
                    <th>Preference</th>
                  </tr>
                </thead>
                <tbody>
                  { 
                    this.state.users.map(users => {//recorre el arreglo de usuarios
                      return (
                        <tr key={users._id}>
                          <td>{users.name}</td>
                          <td>{users.APaterno}</td>
                          <td>{users.AMaterno}</td>
                          <td>{users.age}</td>
                          <td>{users.dateN}</td>
                          <td>{users.maritalStatus}</td>
                          <td>{users.phoneN}</td>
                          <td>{users.country}</td>
                          <td>{users.state}</td>
                          <td>{users.city}</td>
                          <td>{users.town}</td>
                          <td>{users.zipcode}</td>
                          <td>{users.hobby}</td>
                          <td>{users.preference}</td>
                          <td>
                            <button onClick={() => this.deleteUser(users._id)} className="btn light-blue darken-4">
                              <i className="material-icons">delete</i> 
                            </button>
                            <button onClick={() => this.editUser(users._id)} className="btn light-blue darken-4" style={{margin: '4px'}}>
                              <i className="material-icons">edit</i>
                            </button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default App;
