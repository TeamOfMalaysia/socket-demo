var ChatList = React.createClass({
	
	render: function(){
		var createItem = function(itemText, index){
			return <li key={index + itemText}>{itemText}</li>;
		};

		return <ul className='chat-content'>{this.props.items.map(createItem)}</ul>;
	}

});

var Chat = React.createClass({

	getInitialState: function(){
		return {items: [], text: ''}
	},

	onChange: function(e){
		this.setState({ text: e.target.value });
	},

	handleSubmit: function(e){
		e.preventDefault();
		var nextItems = this.state.items.concat([this.state.text]);
		var nextText = '';
		this.setState({ items: nextItems, text: nextText });
	},

	render: function(){
		return (
			<div>
				<h3>CHAT</h3>
				<ChatList items={this.state.items} />
				<form onSubmit={this.handleSubmit}>
					<input onChange={this.onChange} value={this.state.text} />
					<button>{'Add #' + (this.state.items.length + 1)}</button>
				</form>
			</div>
		)
	}

});

ReactDOM.render(
	<Chat />,
	document.getElementById("chat")
);