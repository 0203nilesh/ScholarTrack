import authModel from "../models/auth.js";
import studentModel from "../models/student.js";

export const login= async(req, res)=>{
    try {
        const data= req.body;
        // console.log(data);
        const authData=await authModel.find({username: data?.username});
        if(authData[0].password === data.password){
            if(authData[0].user === 'student'){
                const studentData= await studentModel.find({username: data?.username});
                // console.log(studentData[0]);
                res.status(200).json(studentData[0]);
            }else{
                res.status(200).json(authData[0]);
            }
        }else{
         res.status(200).json({message: "Incorrect Password" , type: "warning"});
        }
    } catch (error) {
        res.status(200).json({message: "Username does not Exist", type: "warning"});
    }
}
