//chat list
//var $ = function(id){return document.getElementById(id) || null;}

var ChatHead = React.createClass({

	render: function(){
		return <h3>CHAT</h3>;
	}

});

//chat person count
var ChatPersonCount = React.createClass({

	render: function(){
		return <p id='personCount'>Socket在线人数</p>;
	}

});

var ChatList = React.createClass({
	
	render: function(){
		var createItem = function(itemText, index){
			return <li key={index + itemText}>{itemText}</li>;
		};

		//调整滚屏
		//var dChatList = React.findDOMNode(this.refs.chatList);
		//dChatList.scrollTop = dChatList.scrollHeight;

		return <ul className='chat-content' rel='chatList'>{this.props.items.map(createItem)}</ul>;
	}

});

var ChatForm = React.createClass({

	commentSubmit: function(e){
		//阻止页面刷新
		e.preventDefault();
		//comment
		var co = React.findDOMNode(this.refs.commentInput).value.trim();

		if (!co) {
			return;
		};
		//pass to handle
		this.props.onHandleSubmit({comment: co});
		//clear input
		React.findDOMNode(this.refs.commentInput).value = "";
		return;
	},

	render: function(){
		return (
			<form onSubmit={this.commentSubmit}>
				<input type='text' ref="commentInput"/>
				<button type='submit' placeholder='say something'>Submit</button>
			</form>
		);
	}

});

//chat 外皮
var Chat = React.createClass({

	getInitialState: function(){
		return {items: [], comment: ''}
	},

	handleSubmit: function(data){
		//拼接字符串
		var nextItems = this.state.items.concat([data.comment]);
		//清空comment
		var nextText = '';
		this.setState({ items: nextItems, comment: nextText });
	},
	render: function(){
		return (
			<div>
				<ChatHead />
				<ChatPersonCount />
				<ChatList items={this.state.items} />
				<ChatForm onHandleSubmit={this.handleSubmit} />
			</div>
		)
	}

});

ReactDOM.render(
	<Chat />,
	document.getElementById("chat")
);