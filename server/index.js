const Koa = require('koa');
const router = require('koa-router')();  //注意：引入的方式
const app = new Koa();
const mysql  = require('mysql')
const dayjs = require('dayjs')
// 传统方式
{
	// const connection = mysql.createConnection({
	//   host     : '127.0.0.1',		// 数据库地址
	//   user     : 'root',			// 数据库用户
	//   password : '123456',			// 数据库密码
	//   database : 'save_up'			// 选中数据库
	// })
	// connection.query('SELECT * FROM mu_account',  (error, results, fields) => {

	// 	console.log(results)

	// 	// 结束会话
	// 	connection.end();
	// 	// 如果有错误就抛出
	// 	if (error) throw error;
	// })
}
// 创建数据池
const pool  = mysql.createPool({
	host     : '127.0.0.1',   // 数据库地址
	user     : 'root',    // 数据库用户
	password : '123456',   // 数据库密码
	database : 'save_up'  // 选中数据库
})
router.get('/', function (ctx, next) {
	ctx.body="Hello koa";
})

router.get('/submit',(ctx,next)=>{
  	let request = ctx.request;
	// pool.getConnection(function(err, connection) {
   
	// 	connection.query('SELECT * FROM mu_account',  (error, results, fields) => {
	// 		console.log(results)
	// 		console.log(dayjs(results[0].ins_date).format('YYYY-MM-DD'))
	// 		// 结束会话
	// 		connection.release();
	// 		// 如果有错误就抛出
	// 		if (error) throw error;
	// 	})
	// })
  	ctx.body="success";
});

app.use(router.routes()); //作用：启动路由
app.use(router.allowedMethods()); // 作用： 这是官方文档的推荐用法,我们可以看到router.allowedMethods()用在了路由匹配router.routes()之后,所以在当所有路由中间件最后调用.此时根据ctx.status设置response响应头
app.listen(3000,()=>{
	console.log('server in http://127.0.0.1:3000')
});

