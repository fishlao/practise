var express = require('express');
var router = express.Router();
var comment = "";
// 对html进行编码
function encodeHTML(str){
    var res="";
    res+=str.replace(/&/g,"&amp;");
    res=res.replace(/</g,"&lt;");
    res=res.replace(/>/g,"&gt;");
    res=res.replace(/'/g,"&#39");
    res=res.replace(/"/g,"&quot;");
    res=res.replace(/ /g,"&nbsp;");
    console.log(res)
    return res;
}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/comment', function(req, res, next) {
	comment = req.query.comment;
	res.send(encodeHTML(comment));
})

router.get('/getJsonP', function(req, res, next) {
	res.jsonp({status: 'jsonp'})
})
module.exports = router;
