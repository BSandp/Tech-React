import { useState } from "react";
import { decreaseNumber, increaseNumber } from "../features/numberSlice";
import { useSelector, useDispatch } from 'react-redux';

function Profile({ user }) {

  return (
    <>
      <h1>{user.name}</h1>
      <img
        className='avatar'
        src={user.imageUrl}
        alt={"photo of" + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize,
          borderRadius: user.imageSize / 2 + "px"
        }}
      />
    </>
  );

}
function ButtonExample(){

  /** El setState se usa para cambiar estados de variables */
  // const [count, setCount] = useState(0);

  /** Obtiene el valor del estado de la variable */
  const number = useSelector(state => state.number.value);
  /** Cambiar el valor del estado de la variable */
  const dispatch = useDispatch();


  return (
    <>
      <button className="bg-blue-500 hover:bg-blue-700 rounded
                         text-blue-50 font-bold py-2 px-4" 
              onClick={() => dispatch(increaseNumber())}>Sumar</button>
      <button className="bg-red-500 hover:bg-red-700 rounded
                         text-red-50 font-bold py-2 px-4" 
              onClick={() => dispatch(decreaseNumber())}>Restar</button>
      <p> El contador va en: {number}</p>
    </>
  );
}
export default function Example() {
  const saludar = () => {
    alert("Saludar hola")
  }

  const mostrarTexto = (e) => {
    console.log(e.target.value)
  }
  const keyUp = () => {
    console.log("Solto una tecla")
  }

  const users = [{
    name: 'Elvis Presley',
    imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/singer-elvis-presley-news-photo-1590531497.jpg',
    imageSize: 90,
  },
  {
    name: 'Brad Pitt',
    imageUrl: 'https://goldenglobes.com/wp-content/uploads/2023/10/brad-pitt_03_paramount-pictures.jpg',
    imageSize: 90,
  },
  {
    name: 'Madonna',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVATslgVY87n3lp3XHUlxF8Edc6jubIVkmbg&usqp=CAU',
    imageSize: 90,
  }];
  return (
    <div>
    {users.map(user => (
      <Profile key={user.name} user={user}/>
    ))}
    <br/>
    <button onClick={() => saludar()}>Enviar</button>    
    <input type="text" onChange={mostrarTexto} onKeyUp={keyUp} />  
    <br/>
    <ButtonExample/>
    <ButtonExample/>
    <ButtonExample/>
    
  </div>

  )
}


