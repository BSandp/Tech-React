import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useState } from 'react';
import { useCreateHouseMutation } from '../../features/api/apiHousesSlice';
import HouseForm from './HouseForm';

export default function HouseFormCreate(){

    const navigate = useNavigate(); // Instanciamos la vaiable de useNavigate
    const [createHouse] = useCreateHouseMutation()
    
    const [file, setFile] = useState(null);
  
    const handleSubmit = async (e) => {
        e.preventDefault();      

            const newHouse = {
                address: e.target.address.value,
                city: e.target.city.value,
                state: e.target.state.value.split("-")[1],
                size: e.target.size.value,
                type: e.target.type.value,
                zip_code: e.target.zip_code.value,
                rooms: e.target.rooms.value,
                bathrooms: e.target.bathrooms.value,       
                parking: e.target.parking.value,
                price: e.target.price.value,
                code: e.target.code.value,
    
                //TODO: Implement other properties
            }
     
       
        try {
            console.log(newHouse)
            const response = await createHouse(newHouse)          
            if(response.data.status == "error"){
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "La casa no pudo ser registrado, por favor verifique los datos",
                    showConfirmButton: false,
                    timer: 1500
                    
                  })
            }else{
                if(file){
                    const formData = new FormData();
                    formData.append("file", file[0])
                    // uploadAvatar({_id: response.data._id, file: formData})
                }
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Casa creada correctamente",
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    navigate('/house') // Hacemos la redireccion
                });
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <HouseForm props={{handleSubmit: handleSubmit, 
                        handleChangeAvatar: null, 
                        house:null}} />
    );
}