<?php
/**
 * 
 * A Valve VDF/Sourcemod SMC parser for PHP
 * @see https://developer.valvesoftware.com/wiki/KeyValues
 * @author Nikki
 * @author Bradley Brizad Worrell-Smith
 * @author KawMAN
 *
 */
class KVReader {
	
	/**
	 * Quote the tier 0 entry when writing
	 * @var boolean
	 * 		default true, false to not quote the first value
	 */
	public $quoteTier0 = true;
	
	public function __construct() {
		
	}
	
	/**
	 * Write an array to a string
	 * @param array $arr
	 * 			The array to convert
	 */
	public function write($arr) {
		$str = "";
		$this->writeSegment($str, $arr);
		return $str;
	}
	
	/**
	 * Write an array to a file
	 * @param string $file
	 * 			The file name to write to
	 * @param array $arr
	 * 			The array to convert and write
	 */
	public function writeFile($file, $arr) {
		$contents = "";
		$this->writeSegment($contents, $arr);
		
		$fh = fopen($file, 'w');
		fwrite($fh, $contents);
		fclose($fh);
	}
	
	/**
	 * Read from a string and convert it to an array
	 * @param string $contents
	 * 			The VDF/SMC contents to convert to an array
	 */
	public function read($contents) {
		$out = array();
		$lines = explode("\n", $contents);
		$idx = 0;
		$this->readSegment($lines, $idx, count($lines), $out);
		return $out;
	}
	
	/**
	 * 
	 * Read a VDF/SMC file and convert it to an array
	 * @param string $file
	 * 			The file name
	 */
	public function readFile($file) {
		return $this->read(file_get_contents($file));
	}
	
	/**
	 * Write a segment of the array to a file.
	 * @param string $str
	 * 			The output string
	 * @param array $arr
	 * 			The array to read off
	 * @param int $tier
	 * 			The tier number, default 0
	 */
	private function writeSegment(&$str, $arr, $tier = 0) {
		$indent = str_repeat(chr(9), $tier);
		foreach ($arr as $key => $value) {
			if (is_array($value)) {
				if($this->quoteTier0 && $tier == 0 || $tier > 0) {
					$key = '"' . $key . '"';
				}
				$str .= $indent . $key  . "\n" . $indent. "{\n";
				
				$this->writeSegment($str, $value, $tier+1);
				
				$str .= $indent . "}\n";
			} else {
				$str .= $indent . '"' . $key . '"' . chr(9) . '"' . $value . "\"\n";
			}
		}
		return $str;
	}
	
	/**
	 * Read a segment of a VDF/SMC array
	 * @param array $lines
	 * 			The lines to parse
	 * @param int $index
	 * 			The current line index
	 * @param int $linecount
	 * 			The line count
	 * @param array $output
	 * 			The array to output to
	 */
	private function readSegment($lines, &$index, $linecount, &$output) {
		$key = false;
		while ($index <= $linecount) {
			$pos = 0;
			$line = $lines[$index++];
			$len = strlen($line);
			while ($pos < $len) {
				if($turnoffcomment == true) {
					$comment = false;
					$turnoffcomment = false;
				}
				$char = substr($line , $pos, 1);
				if ($char == " " || $char == "\t" || $char == "\r" || $char == "\n" ) {
					$pos++;
					continue;
				}
				if ($char == "/") {
					$char2 = substr($line, $pos, 2);
					if ($char2 == "/*") {
						$comment = true;
					} else if ($char2 == '//') {
						//Stop parsing, the rest of this line is a comment
						break;
					}
					$char2 = substr($line, $pos-1, 2);
					if ($char2 == "*/" && $comment == true ) {
						$turnoffcomment = true;
					}
				}
				if($comment) {
					$pos++;
					continue;
				}
				
				switch($char) {
					case "{":
						if ($key !== false) {
							//Parse the next level
							$arr = array();
							$this->readSegment($lines, $index, $linecount, $arr);
							$output[$key] = $arr;
							$key = false;
						}
						break;
					case "}":
						//Stop parsing this section
						return;
					case "\"":
						//Parse a key/value
						$pos2 = strpos($line , "\"", $pos+1);
						$val = substr($line, $pos+1, (($pos2-1)-($pos)));
						$pos = $pos2;
						
						if ($key === false) {
							$key = $val;
						} else {
							$output[$key] = $val;
							$key = false;
						}
						break;
				}
				$pos++;
			}
		}
	}
}
?>