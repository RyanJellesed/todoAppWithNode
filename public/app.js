var TodoList = React.createClass({
	render: function() {
		var self = this;
		// the t represents each object in the array						
		var todosList = this.props.todos.map(function(t) {
			return (
				<div className="panel panel-default">
					<div className="panel-header">
						{ t.name }
					</div>
					<div className="panel-body">
						{ t.age }
					</div>
					<div className="panel-body">
						{ t.pride }
					</div>
					<div className="panel-body">
						{ t.gender }
						<br/>
						<button className="btn btn-warning" 
						onClick =  { self.props.handleDelete.bind(this, t._id)}> 
						delete 
						</button>
					</div>
				</div>
				)
		})
		return (
			<div>
				<p> { todosList} </p>
			</div>
		)
	}
});

var TodoForm = React.createClass({
	getInitialState: function() {
		return {
			name: '',
			age: '',
			pride: '',
			gender: '',
		}
	},
	handleNameChange: function(e) {
		this.setState({
			name: e.target.value
		})
	},

	handleAgeChange: function(e) {
		this.setState({
			age: e.target.value
		})
	},

	handlePrideChange: function(e) {
		this.setState({
			pride: e.target.value
		})
	},

	handleGenderChange: function(e) {
		this.setState({
			gender: e.target.value
		})
	},

	handleForm: function(e){
		e.preventDefault();
		var name = this.state.name;
		var age = this.state.age;
		var pride = this.state.pride;
		var gender = this.state.gender;
		this.props.handleSubmit({
			name: name,
			age: age,
			pride: pride,
			gender: gender,
		})
	},

	render: function() {
		var self = this;
		// the t represents each object in the array						
			return (
					<form onSubmit={this.handleForm} action="" role="form">
						<legend>Form title</legend>

						<div className="form-group">
							<label for="">Name</label>
							<input onChange={this.handleNameChange} value={this.state.name} type="text" className="form-control" id="" placeholder="Name"/>
						</div>

						<div className="form-group">
							<label for="">Age</label>
							<input onChange={this.handleAgeChange} value={this.state.age} type="text" className="form-control" id="" placeholder="Age"/>
						</div>

						<div className="form-group">
							<label for="">Pride</label>
							<input onChange={this.handlePrideChange} value={this.state.pride} type="text" className="form-control" id="" placeholder="Pride"/>
						</div>

						<div className="form-group">
							<label for="">Gender</label>
							<input onChange={this.handleGenderChange} value={this.state.gender} type="text" className="form-control" id="" placeholder="Gender"/>
						</div>

						<button type="submit" className="btn btn-primary">Submit</button>
					</form>
				)
	}
});

var App = React.createClass({
	
	// get initial state is a react object
	getInitialState: function() {
		return {
			lions: []
		}
	},




	loadTodosFromServer: function () {
		var self = this;

		$.ajax({
			url: '/api/lions',
			method: 'GET'
		}).done(function (data) {
			self.setState({
				lions: data
			})
		});
	},

	handleSubmit: function (todo) {
		var self = this;
		console.log(todo);
		$.ajax({
			url: '/api/lions',
			method: 'POST',
			data: todo
		}).done(function(data){
			console.log(data)
			self.loadTodosFromServer();
			console.log('posted');
		})
	},

	handleDelete: function(id) {
		var id = id;
		var self = this;
		$.ajax({
			url: '/api/lions/' + id,
			method: 'DELETE'
		}).done(function(){
			console.log('deleted todo');
			self.loadTodosFromServer();
		})

	},

	componentDidMount: function () {
		this.loadTodosFromServer();
	},

	render: function() { 
		return (
			<div>
				<h3> Hello World! </h3>
				<TodoList handleDelete= { this.handleDelete } todos={ this.state.lions } />
				<TodoForm handleSubmit= {this.handleSubmit} />
			</div>
			)
	}
});

React.render(<App/>, document.getElementById('app'));

