import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {
  //declaracion de estados
  // espacio de memoria, la funcion que actualiza elvalor inicial
  const [dato, setDatos] = useState(""); //1. creamos un estado del input email
  const [save, setSave] = useState([]); // guarda la lista de tareas
  // const [todoservidor, setTodoservidor] = useState([]);
  //funciones ---------------------------------

  function enviarDatos(e) {
    if (e.key === 'Enter') {
      setSave(current => [...current, {label: dato, done: false}]);   
      setDatos("");
    }
     // detenemos el comportamiento predeterminado para procesar nuestro codigo
    
    // { label: "Make the bed", done: false },
  }


  function eliminarDatos(eliminarli) {
    const nuevasTareas = save.filter(function (item, index) {
      return index !== eliminarli;
    });
    console.log(eliminarli);
    console.log(nuevasTareas);
    setSave(nuevasTareas);
  }

  //FETCH------------------------------------------------------------------------------------------------
  function crearUsuario() {
    //codigo a ejecutar
    // console.log("La pagina se ha cargado exitosamente");
    fetch(`https://assets.breatheco.de/apis/fake/todos/user/agustinaf18`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([]),
    })
      //1.ir a buscar info en la url
      .then((response) => response.json()) //2.Convierte la respuesta en un json
      .then((data) => console.log(data)); //3. GUarda el json en un objeto data sin results porque el api que nos dieron ya venia directp
  }

  function obtenerTodoList() {
    //codigo a ejecutar
    // console.log("La pagina se ha cargado exitosamente");
    fetch(`https://assets.breatheco.de/apis/fake/todos/user/agustinaf18`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }) //1.ir a buscar info en la url
      .then((response) => response.json()) //2.Convierte la respuesta en un json
      .then((data) => setSave(data)); //3. GUarda el json en un objeto data sin results porque el api que nos dieron ya venia directp
  }

  function actualizarLista() {
    console.log(save);
    //codigo a ejecutar
    // console.log("La pagina se ha cargado exitosamente");
    fetch(`https://assets.breatheco.de/apis/fake/todos/user/agustinaf18`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(save), //donde esta la lista de tareas actualizada
    }) //1.ir a buscar info en la url
      .then((response) => response.json()) //2.Convierte la respuesta en un json
      .then((data) => console.log(data)); //3. GUarda el json en un objeto data sin results porque el api que nos dieron ya venia directp
      obtenerTodoList()
  }

  function eliminarLista() {
    //codigo a ejecutar
    // console.log("La pagina se ha cargado exitosamente");
    fetch(`https://assets.breatheco.de/apis/fake/todos/user/agustinaf18`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }) //1.ir a buscar info en la url
      .then((response) => response.json()) //2.Convierte la respuesta en un json
      .then((data) => console.log(data)); //3. GUarda el json en un objeto data sin results porque el api que nos dieron ya venia directp
  }

  //USEFFECT------------------------------------------------------------------------------------------------
  useEffect(() => {
    // crearUsuario();
    obtenerTodoList();

    //  eliminarLista();
  }, []);
  // useEffect(() => {
  //   actualizarLista();
  //   //  eliminarLista();
  // }, [save]); //cuando el array está vacio el va a cargar el codigo a ejecutar UNA vez cargada la pagina

  //RETURN--------------------------------------------------------------------------------------------------
  return (
    <>
      <div className="container col-md-4 offset-md-4 mt-4 ">
        <div>
          <h1 className=" container display-1 fw-light d-flex justify-content-center text-secondary text-opacity-50 my-6">
            todos
          </h1>
        </div>

        
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
              id="bckinput"
              onChange={(e) => {
                setDatos(e.target.value);
              }}
              value={dato}
              onKeyDown={(e) => enviarDatos(e)}
            />

            <button onClick={actualizarLista} className="" >Actualizar Lista</button>
          </div>
        

        {/* DIBUJAR LISTA */}
        <div className=" container">
          <div className="container rounded" id="hola">
            <ul>
              {save.map(
                (
                  item,
                  index //array de objetos
                ) => (
                  <li key={index}>
                    {item.label}{" "}
                    {/*porque queremos acceder al valor de label del array de objetos */}
                    <button
                      className="btn btn-secondary rounded opacity-10 mx-0"
                      type="button"
                      id="eliminar"
                      onClick={() => eliminarDatos(index)}
                    >
                      x
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* <ul>
{
todoservidor.map((item, index)=>{
return (<li key={index}>{item.label}</li>)
})
}
</ul> */}
      </div>
    </>
  );
};

export default Home;

// objetivo: sirve para cuando actualizemos la pagina la lista no se borre, y para que se borre la lista todo de una CON boton
