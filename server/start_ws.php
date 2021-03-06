<?php
require('class_ws.php');
$ws = new Ws('10.1.10.99', '8080', 10);
$ws->function['add'] = 'user_add_callback';
$ws->function['send'] = 'send_callback';
$ws->function['close'] = 'close_callback';
$ws->function['count'] = 'count_callback';
$ws->start_server();

//回调函数
function user_add_callback($ws, $index) {
	$count = count($ws->accept);
	$data['count'] = $count;

	$user['uid'] = $index;
	$user['count'] = $count;
	$user['type'] = 'start';
	$user = json_encode($user);
	$res = $ws->frame($user);
	socket_write($ws->accept[$index], $res,strlen($res));

 	send_to_all($data, 'onlineCount', $ws);
}

function close_callback($ws) {
	$data = count($ws->accept);
	send_to_all($data, 'onlineCount', $ws);
}

//心跳
function count_callback($ws) {
	$data = count($ws->accept);
	send_to_all($data, 'onlineCount', $ws);
}

function send_callback($data, $index, $ws) {
	$type = 'text';
	if(strpos($data,':')) {
		$data = explode(':', $data);
		$type = $data[0];
	}
	$data = array(
		'text' => $data,
		'user' => $index,
	);
	send_to_all($data, $type, $ws);
}

function send_to_all($data, $type, $ws){
	$res = array(
		'msg' => $data,
		'type' => $type,
	);
	$res = json_encode($res);
	$res = $ws->frame($res);
	foreach ($ws->accept as $key => $value) {
		socket_write($value, $res, strlen($res));
	}
}
