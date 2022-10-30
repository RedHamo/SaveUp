const Koa = require('koa');
const router = require('koa-router')();  //注意：引入的方式
const app = new Koa();
const mysql  = require('mysql')
const dayjs  = require('dayjs')
const cors = require("koa2-cors")
const bodyParser = require('koa-bodyparser');
const os = require('os');

const getIPAdress = ()=>{
	let list = [];
	let interfaces = os.networkInterfaces();
	for(let devName in interfaces){
		let iface = interfaces[devName];
		for (const el of iface) {
			if (el.family==='IPv4' && el.address!=='127.0.0.1' && !el.internal) {
				list.push(el.address);
			}
		}
	}
	return list;
}

app.use(bodyParser());
app.use(cors());
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

router.get('/info', async (ctx)=>{
	let currentDate = dayjs().format("YYYY-MM-DD");
	let sql = `SELECT * FROM mu_account WHERE ins_date="${currentDate}" AND state="a"`;
	
	let query = () => {
		return new Promise((resolve)=>{
			pool.getConnection((err, connection)=> {
				connection.query(sql, (error, results) => {
					// 结束会话
					// 如果有错误就抛出
					if (error) throw error;
					resolve(results)
				})
				connection.release();
			})
		})
	};
	let result = await query();
	ctx.body={
		success: true,
		result: result
	}
})

router.post('/submit',async (ctx)=>{
  	let body = ctx.request.body;
	let currentDate = dayjs().format("YYYY-MM-DD");

	let clearSql = `UPDATE mu_account SET state="d" WHERE ins_date="${currentDate}" AND state="a"`;
	let sql = "INSERT INTO mu_account ( item, cost,memo,ins_date,state ) VALUES ";
	for (const obj of body) {
		sql += `("${obj.item}", "${obj.cost}", "${obj.memo}", "${currentDate}", "a"),`;
	}
	sql = sql.replace(/,$/,"");
	pool.getConnection(function (err, connection) {
		connection.query(clearSql);
		connection.query(sql, (error, results) => {
			// 结束会话
			// 如果有错误就抛出
			if (error) throw error;
		})
		connection.release();
	})

  	ctx.body={
		success: true,
		result: "保存成功"
	}
});

app.use(router.routes()); //作用：启动路由
app.use(router.allowedMethods()); // 作用： 这是官方文档的推荐用法,我们可以看到router.allowedMethods()用在了路由匹配router.routes()之后,所以在当所有路由中间件最后调用.此时根据ctx.status设置response响应头

app.listen(3000,()=>{
	let ipList = getIPAdress();
	for (const ip of ipList) {
		console.log(`server in http://${ip}:3000`)
	}
});

