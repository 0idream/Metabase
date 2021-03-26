const { exec } = require('child_process');

/* --------------------------------- exec 示例 -------------------------------- */

// exec('dir', (err, stdout, stderr) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log(`stdout: ${stdout}`);
//   console.log(`stderr: ${stderr}`);
// })

/* ------------------------------- 执行 psql 命令 ------------------------------- */

var code = 'pgsql2shp -u postgres -f "./test/my.shp" pgAdminTest public.building'// "./test/my.shp" 代表在test目录下生成文件，执行该命令之前，需要手动创建 test 目录

exec(code, (err, stdout, stderr) => {
  if (err) {
    console.log('err', err);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
})

/* --------------------------------- 使用spawn 示例 -------------------------------- */

// var spawn = require("child_process").spawn;
// function myTest() {
//   return new Promise(function (resolve, reject) {
//     var cmd = "ipconfig";
//     var result = spawn('cmd.exe', ['/s', '/c', 'ipconfig']);
//     result.on('close', function (code) {
//       console.log('child process exited with code :' + code);
//     });
//     result.stdout.on('data', function (data) {
//       console.log('stdout: ' + data);
//     });
//     result.stderr.on('data', function (data) {
//       console.log('stderr: ' + data);
//       reject(new Error(stderr.toString()));
//     });
//     resolve();

//   });
// };
// myTest();

// /* ----------------------------- 使用 spawn 的示例2 ---------------------------- */
// const { spawn } = require('child_process');
// const fs = require('fs');
// // const spawnObj = spawn('pgsql2shp', ['127.0.0.1'], { encoding: 'utf-8' });
// const spawnObj = spawn('pgsql2shp -u postgres -f my.shp  pgAdminTest public.building');

// spawnObj.stdout.on('data', function (chunk) {
//   console.log('stdout11', chunk.toString());
// });
// spawnObj.stderr.on('data', (data) => {
//   console.log('stderr', data);
// });
// spawnObj.on('close', function (code) {
//   console.log('close code : ' + code);
// })
// spawnObj.on('exit', (code) => {
//   console.log('exit code : ' + code);
//   // fs.close(fd, function (err) {
//   //   if (err) {
//   //     console.error(err);
//   //   }
//   // });
// });
