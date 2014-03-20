<?php
	error_reporting(0);
	include_once('kvreader.php');
	$reader = new KVReader();

	$data = $reader->read(file_get_contents('Dota2.vdf'));
	// $url = 'http://github.com/SteamDatabase/SteamTracking/blob/598059d79e1bb3ce7cb5d53555878c7d8e96247d/ItemSchema/API/Dota2.vdf?raw=true';
	// $data = file_get_contents($url);
	// $data = $reader->read($data);

	$heroes = array();

	$found = 0;
	foreach($data['items_game']['items'] as $k => $item) {

		if(!isset($item['used_by_heroes'])) continue;
		if($item['prefab'] == 'default_item' ) continue;
		
		$item_name = $item['name'];

		if($item['prefab'] == 'bundle') {
			$item_name = str_replace(' Set', '', $item_name);
			$item['item_slot'] = 'set';
		}

		if(isset($item['tags']['is_weapon']))
			$item['item_slot'] = 'weapon';

		foreach($item['used_by_heroes'] as $k => $v) {
			$heroes[$k][isset($item['item_slot'])? $item['item_slot']: 'General Items'][] =  $item_name;
		}
	}

	foreach($heroes as $name => $hero) {
		file_put_contents('json/v2/'.$name.'.json', json_encode($hero));
	}

?>