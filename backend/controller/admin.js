// import adminModel from "../models/admin.js";

// export const register= async(req, res)=>{
//     try {
//         const data= req.body;
//         const newAdmin= new adminModel({
//             name: data?.name,
//             username: data?.username,
//             password: data?.password,
//             user: "admin"
//         })
//         const adminData= await newAdmin.save();
//         if(adminData.length!==0){
//             res.status(200).json(adminData);
//         }else{
//             res.status(500).json({message: "admin not registerd"});
//         }

//     } catch (error) {
//         res.status(500).json({message : "Bad Request"});
//     }
// }
// export const login= async(req, res)=>{
//     try {
//         const data= req.body;
//         const adminInDB= await adminModel.find({"username": data.username});
//         if(adminInDB[0].password === data.password){
//             res.status(200).json(adminInDB[0]);
//         }else{
//             res.status(400).json({message: "Password not matched"});
//         }
//     } catch (error) {
//         res.status(500).json({message : "Bad Request"});
//     }
// }