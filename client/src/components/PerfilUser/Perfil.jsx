import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRents, userUpdate } from "../../redux/actions/actions";
import axios from "axios";
import Navbar from "../NavBar/Navbar";
import Rent from "../ModalRent/Rent";

export default function Perfil() {
  const usuario = JSON.parse(localStorage.getItem("UserLogin"));
  // const usuario = useSelector((state) => state.user);

  // const [user, setUser] = useState(usuario);
  const [modal, setModal] = useState(false);
  const [input, setInput] = useState({
    name: usuario.name,
    lastName: usuario.lastName,
    phone: usuario.phone,
    password: usuario.password,
  });
  console.log(usuario.photo);
  const [ImageCloud, setImageCloud] = useState("");
  const [image, setImage] = useState({ photo: usuario.photo });
  const handleOnCloseModal = () => setModal(false);

  const { id } = useParams();

  const rents = useSelector((state) => state.rents);
  console.log(rents);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getRents(usuario.id));
  }, [dispatch]);
  // useEffect(() => {
  //   dispatch(userUpdate(usuario.id));
  // }, [dispatch]);

  const imageCloudChangeHandler = (event) => {
    const imageData = new FormData();
    imageData.append("file", event.target.files[0]);
    imageData.append("upload_preset", "DriveIn_upload");
    axios
      .post("https://api.cloudinary.com/v1_1/dcr28dyuq/upload", imageData)
      .then((response) => {
        setImageCloud(response.data.secure_url);
      });
  };

  const handleOpenModal = (e) => {
    e.preventDefault();
    setModal(true);
  };

  function handleInputChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }
  function handlePhotoChange(e) {
    setImage({
      ...image,
      [e.target.name]: e.target.value,
    });
  }

  console.log("SOY EL INPUT", input);

  async function handleUserData(e) {
    e.preventDefault();
    // await axios.get(`http://localhost:3001/user?id=${usuario.id}`);
    dispatch(userUpdate(usuario.id));
    alert("Cambios realizados con éxito");
    // navigate("/login");
  }
  async function handleUserPhoto(e) {
    e.preventDefault();
    // await axios.get(`http://localhost:3001/user?id=${usuario.id}`);
    dispatch(userUpdate(usuario.id));
    alert("Foto cambiada con éxito");
    // navigate("/login");
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto my-5 p-5">
        <div className="md:flex no-wrap md:-mx-2 ">
          <div className="w-full md:w-3/12 md:mx-2">
            <div className="flex flex-col bg-[#2E3A46] text-white rounded p-2">
              <div className="image overflow-hidden self-center ">
                {/* <img src={usuario.photo} alt="yo" className="rounded" /> */}
                <img
                  name="photo"
                  value={usuario.photo}
                  onChange={(e) => handlePhotoChange(e)}
                  src={ImageCloud ? ImageCloud : usuario.photo}
                  className="rounded"
                  alt="yo"
                />
              </div>
              <div>
                <form onSubmit={(e) => handleUserPhoto(e)}>
                  <input
                    type="file"
                    onChange={imageCloudChangeHandler}
                    className="Creation_Image_input"
                  ></input>
                  <button type="submit">Cambiar Foto</button>
                </form>
              </div>
              <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                Hola, {usuario.name}!
              </h1>
              <ul className="bg-[#e0dfdf] text-[#2E3A46] hover:text-gray-800 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li className="flex items-center py-3">
                  <span>Estado</span>
                  <span className="ml-auto">
                    {usuario.active === true ? (
                      <span className="bg-emerald-600 py-1 px-2 rounded text-white text-sm">
                        Activo
                      </span>
                    ) : (
                      <span className="bg-red-500 py-1 px-2 rounded text-white text-sm">
                        Inactivo
                      </span>
                    )}
                  </span>
                </li>
                <li className="flex items-center py-3">
                  <span>Miembro desde</span>
                  <span className="ml-auto">
                    {usuario.createdAt.slice(0, 10)}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full md:w-9/12 mx-2 h-64">
            <div className="  p-3 shadow-sm rounded-sm bg-[#f5f4f4]">
              <div className="bg-[#2E3A46] text-white rounded py-2">
                <div className="flex justify-center space-x-2 font-semibold text-gray-900 leading-8 ">
                  <span clas="text-green-500 ">
                    <svg
                      className="h-5 mt-1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  <span className="tracking-wide ">
                    Información <button className=" bg-gray">Editar</button>
                  </span>
                </div>
              </div>
              <div className="bg-white ">
                <div className="grid md:grid-cols-2 text-sm">
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold flex items-start bg-slate-100">
                      Nombre
                    </div>
                    <div className="px-4 py-2 flex items-start ">
                      {usuario.name}
                    </div>
                  </div>
                  <div className="grid grid-cols-2  ">
                    <div className="px-4 py-2 font-semibold flex items-start bg-slate-100">
                      Apellido
                    </div>
                    <div className="px-4 py-2 flex items-start">
                      {usuario.lastName}
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold flex items-start bg-slate-100">
                      Email
                    </div>
                    <div className="px-4 py-2 flex items-start ">
                      {usuario.email}
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold flex items-start bg-slate-100">
                      Teléfono
                    </div>
                    <div className="px-4 py-2 flex items-start ">
                      {usuario.phone}
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold flex items-start bg-slate-100">
                      Contraseña
                    </div>
                    <div className="px-4 py-2 flex items-start">
                      {usuario.password ? <h5>******</h5> : null}
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold flex items-start bg-slate-100">
                      {" "}
                    </div>
                    <div className="px-4 py-2 flex items-start "></div>
                  </div>
                </div>
              </div>
              <button className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                Mas Información
              </button>
              <div className="bg-white p-3 shadow-sm rounded-sm">
                <div className="grid">
                  <div>
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                      <span clas="text-green-500">
                        <svg
                          className="h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </span>
                      <span className="tracking-wide">Alquilados</span>
                    </div>
                    <ul className="list-inside space-y-2">
                      {rents.length ? (
                        rents.map((e) => {
                          return (
                            <Rent
                            img={e.vehicle.photo}
                            brand={e.vehicle.brand}
                            model={e.vehicle.model}
                            fi={e.dateInit}
                            ff={e.dateFinish}
                            tp={e.totalPrice}
                            city={e.vehicle.city.name}
                            country={e.vehicle.city.country}
                            />
                          );
                        })
                      ) : (
                        <div className="text-gray-500 text-xs flex items-start">
                          {" "}
                          No hay autos alquilados
                        </div>
                      )}
                    </ul>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                      {/* <span clas="text-green-500">
                        <svg
                          className="h-5"
                          xmlns=""
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path
                            fill="#fff"
                            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                          />
                        </svg>
                      </span> */}
                      {/* <span className="tracking-wide">Devuelto</span> */}
                    </div>
                    <ul className="list-inside space-y-2">
                      {/* <li>
                        <div className="text-teal-600 flex items-start">
                          Auto 1
                        </div>
                        <div className="text-gray-500 text-xs flex items-start">
                          Fecha de devolución tal vez
                        </div>
                      </li>
                      <li>
                        <div className="text-teal-600 flex items-start">
                          Auto 1
                        </div>
                        <div className="text-gray-500 text-xs flex items-start">
                          Fecha de devolución tal vez
                        </div>
                      </li> */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <h1>Cambiar datos personales</h1>
            <form
              onSubmit={(e) => {
                handleUserData(e);
              }}
            >
              <input
                type="text"
                name="name"
                placeholder=" nuevo nombre"
                value={input.name}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
              <input
                type="text"
                name="lastName"
                placeholder=" nuevo apellido"
                value={input.lastName}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
              <input
                type="text"
                name="phone"
                placeholder="nuevo telefono"
                value={input.phone}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
              <input
                type="text"
                name="password"
                placeholder="nuevo password"
                value={input.password}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
              <button
                type="submit"
                className="border-green border-2 bg-green text-white"
              >
                Modificar Datos
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
