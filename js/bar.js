var BarMenu = React.createClass({

	handleClick: function(){
		//this.setState({ active: !this.props.active})
		this.props.onHandleSwitch();
	},

	render: function(){
		return (
			<div className="v-bar-memu">
				<ul className="v-bar-list">
					<li title="login"><span className="glyphicon glyphicon-user"></span></li>
					<li title="focus"><span className="glyphicon glyphicon-star"></span></li>
					<li title="message" onClick={this.handleClick}><span className="glyphicon glyphicon-envelope"></span></li>
				</ul>
			</div>
		);
	}

});

var BarBM = React.createClass({

	render: function(){
		//不可在此获取refs
		//this.refs.vBm = this.props.active ? "v-bm active" : "v-bm";
		return (
			<div className={this.props.barState} ref="vBm">
				<div className="v-bm-wrap">
					<h2>Message</h2>
					<p>This is a message1</p>
					<p>This is a message2</p>
					<p>This is a message3</p>
				</div>
			</div>
		);
	}

});

var Bar = React.createClass({

	getInitialState: function(){
		return { active: false };
	},

	handleSwitch: function(){
		this.setState({ active: !this.state.active});
	},

	render: function(){
		var state = this.state.active ? "v-bm active" : "v-bm";

		return (
			<div className="v-bar-wrap">
				<BarMenu onHandleSwitch={this.handleSwitch}/>
				<BarBM barState={state}/>
			</div>
		);
	}
});

ReactDOM.render(
	<Bar />,
	document.getElementById("bar")
);