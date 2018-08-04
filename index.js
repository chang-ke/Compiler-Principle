const {fork, exec} = require('child_process');

let server = fork(__dirname + '/http/bin/www', [], {cwd: __dirname + '/http'});
let dev = exec('cd view && npm start', function(err) {
  console.log(err);
});

server.on('exit', function() {
  //这里需要传入子进程工作目录，否则是以当前目录为工作目录的
  server = fork(__dirname + '/http/bin/www', [], {cwd: __dirname + '/http'});
});
dev.on('exit', function() {
  dev = exec('cd view && npm start', function(err) {
    console.log(err);
  });
});
// 主进程退出，杀死其他两个进程
process.on('exit', function() {
  server.kill();
  dev.kill();
});
