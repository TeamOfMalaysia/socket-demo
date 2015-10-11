var $ = function(id){return document.getElementById(id) || null;}

var wsServer = 'ws://192.168.0.6:8080';
var ws = new WebSocket(wsServer);

var isConnect = false;

ws.onopen = function (evt) {
    console.log("ws链接成功");
    isConnect = true;
};

ws.onclose = function (evt) {
    console.log("ws链接关闭");
};

/**
 * {type: "text", msg: {}}
 * {type: "num", msg: {}}
 */

ws.onerror = function (evt) {
    console.log('ws链接失败: ' + evt.data);
};




var ChatHead = React.createClass({

	render: function(){
		return <h3>CHAT</h3>;
	}

});

//chat person count
var ChatPersonCount = React.createClass({

	render: function(){
		return <p id='personCount'>Socket在线人数{this.props.onlineCount}</p>;
	}

});

var ChatCommentOther = React.createClass({

	render: function(){
		return (
			<div className='chat-comment_other'>
				<span className='chat-comment_author'></span>
				<span className='chat-comment_content'></span>
			</div>
		);
	}

});

var ChatCommentMine = React.createClass({

	render: function(){
		return (
			<div className='chat-comment_mine'>
				<span>{this.props.comment.text}</span>
			</div>
		);
	}

});

var ChatList = React.createClass({
	
	render: function(){

		var commentNode = this.props.items.map(function(item, i){
			//return <div key={i}>{comment}</div>;
			return (
				<ChatCommentMine comment={item} key={i+item.text}/>
			);
		});

		//调整滚屏
		//var dChatList = React.findDOMNode(this.refs.chatList);
		//dChatList.scrollTop = dChatList.scrollHeight;

		return (
			<div className='chat-list' rel='chatList'>
				{commentNode}
			</div>
		);
	}

});

var ChatForm = React.createClass({

	commentSubmit: function(e){
		//阻止页面刷新
		e.preventDefault();
		//comment
		var commentContent = ReactDOM.findDOMNode(this.refs.commentInput).value.trim();

		if (!commentContent) {
			return;
		};
		//pass to handle
		this.props.onHandleSubmit({user: "Young", text: commentContent});

		//ws handle
		if (isConnect) {
			ws.send(commentContent);
		};

		//clear input
		ReactDOM.findDOMNode(this.refs.commentInput).value = "";
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

	//load socket
	loadInfoFromServer: function(){

		var that = this;
		ws.onmessage = function (info) {

		    var msg = JSON.parse(info.data);
		    console.log(msg);
		    switch (msg.type) {
		        case 'text':
		            //addMsg(data.msg);
		            //that.setState({ comment: data.msg });
		            break;
		        case 'onlineCount' :
		        	that.setState({ onlineCount: msg.msg });
		            //updataUserNum(data.msg);
		            break;
		    }

		    //console.log('从Socket服务器获取消息: ' + evt.data);
		};
	},

	getInitialState: function(){
		return {
			items: [],
			comment: { 
				user: "",
				text: ""
			},
			onlineCount: 0
		}
	},

	componentDidMount: function(){
		this.loadInfoFromServer();
	},

	handleSubmit: function(data){
		//拼接字符串
		var nextItems = this.state.items.concat([data]);
		//清空comment
		var nextComment = {};
		this.setState({ items: nextItems, comment: nextComment });
	},

	render: function(){
		return (
			<div>
				<ChatHead />
				<ChatPersonCount onlineCount={this.state.onlineCount} />
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