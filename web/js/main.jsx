var React = require('react');
var ReactDOM = require('react-dom');

//var fs = require("fs");
//var long = require("../lib/lang.js");
//var ByteBuffer = require('../lib/bytebuffer.min.js');
//var ProtoBuf = require('../lib/protobuf.min.js');

var $ = function(id){return document.getElementById(id) || null;}

var wsServer = 'ws://10.1.10.99:8080';

var ws = new WebSocket(wsServer);

var isConnect = false;

var User = {};

User.id = 0;

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
		return <h3>Chat</h3>;
	}

});

//chat person count
var ChatPersonCount = React.createClass({

	render: function(){
		return <p id='personCount'>Socket在线人数{this.props.onlineCount}, id:{this.props.uid}</p>;
	}

});

var ChatCommentOther = React.createClass({

	render: function(){
		return (
			<div className='chat-comment_other'>
				<span className='chat-comment_author'>{this.props.comment.user}</span>说：
				<span className='chat-comment_content'>{this.props.comment.text}</span>
			</div>
		);
	}

});

var ChatCommentMine = React.createClass({

	render: function(){
		return (
			<div className='chat-comment_mine'>
				我说：<span>{this.props.comment.text}</span>
			</div>
		);
	}

});

var ChatList = React.createClass({
	
	render: function(){

		var commentNode = this.props.items.map(function(item, i){
			if (item.user != User.id) {
				return (
					<ChatCommentOther comment={item} key={i+item.text} />
				)
			}else{
				//return <div key={i}>{comment}</div>;
				return (
					<ChatCommentMine comment={item} key={i+item.text} s/>
				);
			}
		});

		//调整滚屏
		//var dChatList = this.refs.chatList;
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
		var commentContent = this.refs.commentInput.value.trim();

		if (!commentContent) {
			return;
		};
		//pass to handle
		//this.props.onHandleSubmit({user: "Young", text: commentContent});

		//ws handle
		if (isConnect) {
			ws.send(commentContent);
		};

		//clear input
		this.refs.commentInput.value = "";
		return;
	},

	render: function(){
		return (
			<form onSubmit={this.commentSubmit}>
				<div className="input-group">
		        	<input type="text" className="form-control" ref="commentInput" placeholder="发送消息" />
					<span className="input-group-btn">
						<button className="btn btn-default" type='submit'>Submit</button>
					</span>
				</div>
			</form>
		)
	}

});

//chat 外皮
var Chat = React.createClass({

	//load socket
	loadInfoFromServer: function(){

		var that = this;
		ws.onmessage = function (info) {
			//对方刷新页面的时候回收到一个空数据
			//todo 以后处理
			if(info.data == ""){
				return;
			}
		    var json = JSON.parse(info.data);
			console.log(json);
		    switch (json.type) {
		        case 'text':
					
					//拼接字符串
					var nextItems = that.state.items.concat([json.msg]);
					//清空comment
					var nextComment = {};
					that.setState({ items: nextItems, comment: nextComment });

		            break;
		        case 'onlineCount':
		        	that.setState({ onlineCount: json.msg.count });
		            break;

		        case 'start':
		        	that.setState({ onlineCount: json.count, uid: json.uid });
		        	User.id = json.uid;
		        	break;
		    }

		};
	},

	getInitialState: function(){
		return {
			items: [],
			comment: { 
				user: "",
				text: ""
			},
			onlineCount: 0,
			uid: 0
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
				<ChatPersonCount onlineCount={this.state.onlineCount} uid={this.state.uid}/>
				<ChatList items={this.state.items} />
				<ChatForm onHandleSubmit={this.handleSubmit} />
			</div>
		)
	}

});

ReactDOM.render(
	<Chat User={User}/>,
	document.getElementById("chat")
);
