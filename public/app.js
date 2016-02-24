var TodoList = React.createClass({
	render: function() {
		var todosList = this.props.todos.map(function(t) {
			return (
				<div className="panel panel-default">
					<div className="panel-header">
						{ t.name }
					</div>
					<div className="panel-body">
						{ t.age }
					</div>
					<div className="panel-footer">
						{ t.pride }
					</div>
					<div className="panel-footer">
						{ t.gender }
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

	componentDidMount: function () {
		this.loadTodosFromServer();
	},

	render: function() { 
		return (
			<div>
				<h3> Hello World! </h3>
				<TodoList todos={ this.state.lions } />
			</div>
			)
	}
});

React.render(<App/>, document.getElementById('app'));

