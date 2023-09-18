const http = require('http'); // 導入 http 模組

const server = http.createServer(( req, res) => { // 兩個參數 req 為請求物件，res 為響應回覆物件
    console.log('request made');
});

server.listen(3000, 'localhost', () => { // 3000 為 port number 端口號；'localhost' 為預設值可以不填該參數，表示本地主機
    console.log('listening for requests on port 3000')
}); 