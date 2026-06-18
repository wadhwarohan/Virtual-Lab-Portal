import "dotenv/config";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import bcrypt from 'bcrypt';
 
//temporary password for admin
const temporaryPassword = "admin123";

async function registerAdmin(){
    try {
        const admin_email = process.env.admin_email;
        if(!admin_email){
            console.error("Missing admin email env variable")
            process.exit(1);
        }

        await connectDB()

        const existingAdmin = await User.findOne({email:process.env.admin_email});

        if(existingAdmin){
            console.log("User already exist as role",existingAdmin.role)
            process.exit(0)
        }

        const hashedPassword = await bcrypt.hash(temporaryPassword,10);

        const admin = await User.create({
            email : process.env.admin_email,
            password : hashedPassword,
            role: "ADMIN"
        }) 
        console.log("Admin user created...");
        console.log("\n email:", admin_email);
        console.log("Password:",temporaryPassword);
        process.exit(0)

    } catch (error) {
        console.log("seed failed:",error)
    }
}
registerAdmin()