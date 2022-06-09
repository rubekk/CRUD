const express=require("express");
const app=express();
const mysql=require("mysql");
const bodyParser=require("body-parser");

app.set("view engine", "ejs");

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const conn=mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'videodb'
})

conn.connect(err=>{
	if(err) throw err;
	console.log("Connection successful");
})

app.get('/',(req,res)=>{
	let sql1='SELECT * FROM video';
	let sql2='SELECT * FROM videolist';

	conn.query(sql1,(err,videoData)=>{
		conn.query(sql2,(error,listData)=>{
			res.render("index", { videoData, listData });
			console.log(videoData, listData)
		})
	})
})

app.post('/create', async (req,res)=>{
	let data=req.body;
	let sql1=`INSERT INTO video(name, description, active) VALUES('${data.name}', '${data.description}', ${data.active})`;
	let sql2=`INSERT INTO videolist(id, name, link)`

	conn.query(sql1,(err,video)=>{
		if(err) throw err;

		let id=JSON.parse(JSON.stringify(video)).insertId;

		conn.query('SET FOREIGN_KEY_CHECKS=0',(errr,res)=>{
			if(errr) throw errr;
		})

		data.listData.forEach((item,i)=>{
			sql2+=i==0 ? ` VALUES(IDid, '${item.name}', '${item.link}')` : `, (IDid, '${item.name}', '${item.link}')`;
		})

		conn.query(sql2.replaceAll("IDid",id),(error,list)=>{
			if(error) throw error;
		})
	})
})

app.patch('/update/:id/', (req,res)=>{
	console.log("updated")
})

app.delete('/delete/:id',(req,res)=>{
	res.send("Deleted")
})	

app.get('/update/:id/:bd', (req,res)=>{
	console.log(req.params.bd);
})
app.listen(3000, ()=>{
	console.log("App running on port: 3000...")
})