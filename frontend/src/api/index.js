import axios from "axios";

const API= axios.create({baseURL: "http://localhost:5000"})

 
// Authentication routes
export const login=async (data)=>{
    const authData= await API.post("/auth/login", data);
    // console.log(authData.data);
    return authData.data;
}
export const signup= async (data)=>{
    const authData= await API.post("/auth/register", data);
    // console.log(authData.data);
    return authData.data;
}

//Student Data routes
export const fetch_all_student_data= async()=>{
    const data= await API.get("/student/get");
    // console.log(data.data);
    return data.data;
}

export const fetch_student_data= async(id)=>{
    const dataToSend= await API.get(`/student/get/${id}`);
    // console.log(dataToSend.data);
    return dataToSend.data;
}

export const filter_student_data= async(data)=>{
    const dataToSend= await API.post("/student/filter", data);
    // console.log(dataToSend.data);
    return dataToSend.data;
}

export const update_student_data= async(id,data)=>{
    const dataToSend= await API.patch(`/student/update/${id}`, data);
    // console.log(dataToSend.data);
    return dataToSend.data;
}
export const delete_student_data= async(id)=>{
    const data= await API.delete(`/student/delete/${id}`);
    // console.log(data.data);
    return data.data;
}