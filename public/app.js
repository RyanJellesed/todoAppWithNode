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
		// alert("Is this your id? " + id);
	},




	componentDidMount: function () {
		this.loadTodosFromServer();
	},

	render: function() { 
		return (
			<div>
				<h3> Hello World! </h3>
				<TodoList handleDelete= { this.handleDelete } todos={ this.state.lions } />
			</div>
			)
	}
});

React.render(<App/>, document.getElementById('app'));

