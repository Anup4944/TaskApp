import mongoose from "mongoose";



const mongoClient = async () => { 

const connStr = 
process.env.NODE_ENV === 'production'
? process.env.PROD_MONGO_CLIENT
: process.env.MONGO_CLIENT || "mongodb://localhost/task_lists"
console.log(process.env.MONGO_CLIENT, connStr);

	try {
		const con = await mongoose.connect(connStr, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		});

		if (con) {
			console.log("MongoDB is connected");
		}
	} catch (error) {
		console.log(error);
	}
};

export default mongoClient;
