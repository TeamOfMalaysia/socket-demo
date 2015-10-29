var React = require('react');
var ReactDOM = require('react-dom');

var data = {
	title: "Notice",
	content: "Some default panel content here. Nulla vitae elit libero, a pharetra augue. Aenean lacinia bibendum nulla sed consectetur."
}
var Notice = React.createClass({
	render: function(){
		return(
			<div className="panel panel-primary">
				<div className="panel-heading">{this.props.data.title}</div>
				<div className="panel-body">
				    <p>{this.props.data.content}</p>
				</div>
			</div>
		);
	}
});

ReactDOM.render(
	<Notice data={data}/>,
	document.getElementById("notice")
);