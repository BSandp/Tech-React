import { useState } from "react";
import { useLoginMutation, useUpdateUserMutation } from "../../features/api/apiSlice";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function changePassword() {


    const [newPassword, setNewPassword] = useState("")
    const [notEqualPassword, setNotEqualPassword] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleChangeNewPassword = (e) => {
        setNewPassword(e.target.value)
    }
    const handleChangeRepeatNewPassword = (e) => {
        setNotEqualPassword(!(newPassword === e.target.value))
    }
    
  const user = useSelector((state) => state.auth.user);
  const [login] = useLoginMutation();
  const [updateUser] = useUpdateUserMutation()




    const handleSubmit = async (e) => {
        e.preventDefault();     
        setIsError(false)
        const userValidate = {
            email: user.email,
            password: e.target.password.value,
        }
        const response = await login(userValidate)
        if(response.error && response.error.data.status == "error"){
            setIsError(true)
        }else{
            if(!notEqualPassword){
                const newUser = {
                    _id: user._id,
                    password: e.target["new-password"].value
                }
                console.log(newUser)
                const response = await updateUser(newUser)
                if(response.data.status == "error"){
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Error actualizando la contraseña",
                        showConfirmButton: false,
                        timer: 1500
                      })
                }else{                     
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Contraseña actualizada Correctamente",
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            }
        }        
    }

    return (
        <div className="max-w-lg w-full mx-auto px-5 py-5">

            <form onSubmit={handleSubmit} className=" shadow-md rounded pt-6 pb-10 mb-4 px-10">
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="password">passord</label>
                    <input type="password"
                        required
                        name="password"
                        placeholder="password"
                        className="shadow appearance-none border rounded w-full focus:shadow-outline disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" 

                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="password">Password</label>
                    <input type="password"
                        required
                        minLength="3"
                        name="new-password"
                        placeholder=" New Password"
                        className="shadow appearance-none border rounded w-full focus:shadow-outline disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" 
                        onChange={handleChangeNewPassword}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor=" new password">repeat new Password</label>
                    <input type="password"
                        required
                        minLength="3"
                        name="repeat new password"
                        placeholder=" new Password"
                        className="shadow appearance-none border rounded w-full focus:shadow-outline disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500" 
                        
                        onChange={handleChangeRepeatNewPassword} />
                    {notEqualPassword ?
                        <span className="text-red-600"> Las contraseñas no coinciden</span>
                        : null
                    }

                </div>
                <div className="flex justify-center">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 rounded text-blue-50 font-bold py-2 px-4">Iniciar Sesion</button>
                </div>
            </form>
        </div>
    )
}