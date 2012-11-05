<html>
<?php
include("simple_html_dom.php");
header('Content-type:text/json; charset=utf-8');
$html = file_get_html('http://widget.weibo.com/weiboshow/index.php?&isWeibo=1&uid=1765106605&verifier=a4b838a0&dpc=1');
$loop = 0;
foreach($html->find('.weiboShow_mainFeed_listContent_txt') as $element){
	$a = $element->innertext;
	$array[$loop]=$a;
	$loop = ($loop==20) ? 0 : $loop+1 ;
}
echo json_encode($array);
$html->clear();
?>
</html>