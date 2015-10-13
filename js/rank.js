var data = {
	title: "Ranking",
	list: [
		{
			firstName: "Mark",
			lastName: "Otto"
		},
		{
			firstName: "Jacob",
			lastName: "Thornton"
		},
		{
			firstName: "Larry",
			lastName: "the Bird"
		},
	],
}

var RankList = React.createClass({
	render: function(){
		var li = this.props.list.map(function(item, i){
			return (
				<tr key={i}>
					<td>{item.firstName}</td>
					<td>{item.lastName}</td>
				</tr>
			)
		});

		return(
			<tbody>
				{li}
			</tbody>
		);
	}
});

var Rank = React.createClass({

	getInitialState: function(){
		return {
			title: "",
			list: []
		}
	},

	componentDidMount: function(){
		this.setState(data);
	},

	render: function(){
		return(
			<div className="panel panel-primary">
			    <div className="panel-heading">{this.state.title}</div>
		    	<table className="table">
			        <thead>
			        	<tr>
			            	<th>First Name</th>
			            	<th>Last Name</th>
			        	</tr>
			        </thead>
			        <RankList list={this.state.list}/>
		    	</table>
			</div>
		)
	}
});

ReactDOM.render(
	<Rank/>,
	document.getElementById("rank")
);