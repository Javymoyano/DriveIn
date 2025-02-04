import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postComment } from "../../redux/actions/actions";
import StarRating from "../Star/Star_rating";
import swal from "sweetalert";

export default function CommentsForm({
  id,
  vehicleId,
  visible,
  onClose,
  exist,
}) {
  const dispatch = useDispatch();
  const starRating = (name, data) => {
    setInput({ ...input, [name]: data });
  };
  const [input, setInput] = useState({
    id: id,
    confort: 0,
    performance: 0,
    security: 0,
    priceQuality: 0,
    recommended: 0,
    description: "",
    vehicleId: vehicleId,
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postComment(input));

    setInput({
      id: "",
      confort: 0,
      performance: 0,
      security: 0,
      priceQuality: 0,
      recommended: 0,
      description: "",
      vehicleId: "",
    });

    swal({
      title: "Gracias por dejarnos tu comentario",
      timer: 2000,
      icon: "success",
      buttons: false,
    });
    onClose();
  };

  const handleOnClose = (e) => {
    if (e.target.id === "container") onClose();
  };
  if (!visible) {
    return null;
  } else {
    if (exist) {
      swal({
        title: "Error",
        text: "Ya realizaste una review para este Vehiculo",
        icon: "error",
        buttons: false,
        timer: 2000,
      });
    } else {
      return (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
          id="container"
          onClick={handleOnClose}
        >
          <div className="w-[630px] h-[300px] bg-slate-600 rounded-lg">
            <button
              onClick={onClose}
              className="self-end w-[25px] bg-[#2E3A46] text-white rounded-full hover:bg-red-600 ml-[580px] mt-2"
            >
              x
            </button>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-row justify-around">
                <div className="flex flex-row m-auto">
                  <div className="flex flex-col">
                    <label className="w-[120px] m-2 text-m text-[#009A88] font-bold">
                      Puntuaciones:{" "}
                    </label>
                    <label className="w-[120px] m-2 text-sm text-white font-semibold">
                      Comodidad:{" "}
                    </label>
                    <label className="w-[120px] m-2 text-sm text-white font-semibold">
                      Desempeño:{" "}
                    </label>
                    <label className="w-[120px] m-2 text-sm text-white font-semibold">
                      Seguridad:{" "}
                    </label>
                    <label className="w-[120px] m-2 text-sm text-white font-semibold">
                      Recomendado:{" "}
                    </label>
                    <label className="w-[120px] m-2 text-sm text-white font-semibold">
                      Relacion precio calidad:{" "}
                    </label>
                  </div>
                  <div className="flex flex-col">
                    <div className="p-2 mt-[40px]">
                      <StarRating name="confort" starRating={starRating} />
                    </div>
                    <div className="p-2 -mt-[5px]">
                      <StarRating name="performance" starRating={starRating} />
                    </div>
                    <div className="p-2 -mt-[5px]">
                      <StarRating name="security" starRating={starRating} />
                    </div>
                    <div className="p-2 -mt-[4px]">
                      <StarRating name="recommended" starRating={starRating} />
                    </div>
                    <div className="p-2 -mt-[4px]">
                      <StarRating name="priceQuality" starRating={starRating} />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="mt-4 ml-2 text-start text-m text-white font-bold">
                    Deja tu comentario:{" "}
                  </label>
                  <br />
                  <textarea
                    name="description"
                    rows="5"
                    cols="40"
                    value={input.description}
                    onChange={handleChange}
                    className="border-[#009A88] border-2 ounline-none rounded-lg m-2 -mt-2"
                  ></textarea>

                  <br />
                  <button className="py-0 px-3 bg-[#009A88] rounded-lg text-white w-[100px] h-[30px] m-auto mt-2">
                    Enviar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
}
