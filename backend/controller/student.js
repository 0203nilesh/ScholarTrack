import studentModel from '../models/student.js';
import authModel from '../models/auth.js';

export const fetch_student_data= async (req, res)=>{
    try {
        const studentsData=await studentModel.find();
        if(studentsData){
            res.status(200).json(studentsData);
        }else{
            res.status(200).json({message:"No Data is present", type: "warning"});
        }
    } catch (error) {
            res.status(200).json({message: "Bad Reqest.", type: "warning"});
    }
}
export const add_student_data= async(req, res)=>{
    // console.log(req.body);
    const data= req.body;
    if(data===null || data===undefined){
        res.status(200).json({message: "Data is incorrect", type: "warning"});
    }else{
        const authData= await new authModel({
            name: data?.name,
            username: data?.username,
            user: data?.user,
            password: data?.password
        })
        if(data.user==='admin'){
            const existingUser= await authModel.find({username: data.username})
            // console.log(existingUser);
            if(existingUser.length===0){
                authData.save()
                .then(()=>{
                    res.status(200).json(authData);
                }).catch((err)=>{
                    res.status(200).json({message: "not saved", type: "warning"});
                })
            }else{
                res.status(200).json({message: "User already exist of this username" , type: "warning"});
            }
        }else{
            const newStudent=await new studentModel({...data})
            const allStudentData= await studentModel.find();
            const existingUser = allStudentData.filter((temp)=>{
                    if(temp?.email===data?.email || temp?.username===data?.username ){
                        return temp;
                    }
                })
            if(existingUser.length!==0){
                res.status(200).json({message: "User already exist with this mail or username. Try another email.", type: "warning"});
            }
            else{
                authData.save()
                newStudent.save()
                .then(()=>{
                    res.status(200).json(newStudent);
                }).catch((err)=>{
                    res.status(200).json({message: "Data not saved", type: "warning"});
                })   
            }
        }
        }
}
export const get_student= async(req, res)=>{
    try {
        const id= req.params.id;
        const studentData= await studentModel.findById(id);
        if(studentData){
            res.status(200).json(studentData);
        }else{
            res.status(200).json({message : "No Data with this id", type: "warning"});
        }
    } catch (error) {
        res.status(200).json({message : "Bad Request", type: "warning"});
    }
}
export const delete_student= async(req, res)=>{
    try {
        const id= req.params.id;
        const studentToDelete= await studentModel.findById(id);
        // console.log(studentToDelete);
        await authModel.findOneAndDelete({username: studentToDelete.username})
        await studentModel.deleteOne({"_id": id})
        .then(async()=>{
                // const newData= await studentModel.find();
                res.status(200).json({message: "Data deleted successfully", type: "success"});
            }).catch((err)=>{
                res.status(200).json({message: "Data not deleted", type: "warning"});
            })
    } catch (error) {
            res.status(200).json({message: "Bad Reqest" ,type: "warning"});
    }
}
export const filter_student= async(req, res)=>{
    try {
        const data= req.body;
        // console.log(req.body);
       const studentsData= await studentModel.find({...data})
    //    console.log(studentsData);
        if(studentsData.length!==0){
            res.status(200).json(studentsData);
        }else{
            res.status(200).json({message: "No Data Found", type: "success"});
        }
    } catch (error) {
        res.status(200).json({message: "Bad Request", type: "warning"});
    }
}
export const update_student = async(req, res)=>{
    // console.log(req.body);
    try {
        const data= req.body;
        const id= req.params.id;
        const studentInDB=await studentModel.findById(id);
        if(studentInDB.password===data.password){
            const {cPassword, ...others}= data;
            const updatedData= {...others, password: data.cPassword};
            await authModel.findOneAndUpdate({username: studentInDB.username}, { $set: {name: updatedData.name, password: updatedData.password }})
            await studentModel.findByIdAndUpdate(id, {...updatedData})
            .then(async()=>{
                const  newData= await studentModel.find();
                res.status(200).json(newData);
            }).catch((err)=>{
                // console.log(err);
                res.status(200).json({message: "Data not updated", type: "warning"});
            })
        }else{
            res.status(200).json({message : "Password not correct", type: "warning"});
        }
    } catch (error) {
        res.status(400).json({message: "Bad Request"});
    }
}