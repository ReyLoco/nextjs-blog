import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useState } from "react";

export default function Form({ formData, forNewArticulo = true }) {
  console.log("forNew: " + forNewArticulo);
  const router = useRouter();

  const [form, setForm] = useState({
    title: formData.title,
    texto: formData.texto,
  });
  const [message, setMenssage] = useState([]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (forNewArticulo) {
      postData(form);
    } else {
      putData(form);
    }
  };

  const putData = async (f) => {
    const settings = getSettings(f);

    const { id } = router.query;

    try {
      const res = await fetch(`/api/articulo/${id}`, settings);

      const data = await res.json();

      if (!data.success) {
        for (const key in data.error.errors) {
          let error = data.error.errors[key];
          setMenssage((oldMenssage) => [...oldMenssage, { message: error.message }]);
        }
      } else {
        setMenssage([]);
        router.push("/blog");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postData = async (f) => {
    const settings = getSettings(f);

    try {
      const res = await fetch("/api/articulo", settings);

      const data = await res.json();

      if (!data.success) {
        for (const key in data.error.errors) {
          let error = data.error.errors[key];
          setMenssage((oldMenssage) => [...oldMenssage, { message: error.message }]);
        }
      } else {
        setMenssage([]);
        router.push("/blog");
      }
    } catch (error) {
      console.log(error);
    }
  };

  function getSettings(f) {
    setMenssage([]);
    return {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(f),
    };
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control my-2"
        placeholder="Title"
        autoComplete="off"
        name="title"
        value={form.title}
        onChange={handleChange}
      />
      <textarea
        type="text"
        className="form-control my-2"
        placeholder="Texto"
        autoComplete="off"
        name="texto"
        value={form.texto}
        onChange={handleChange}
        rows="7"
      />

      <div className="d-grid gap-1 d-md-flex justify-content-md-end pb-2">
        <button className="btn btn-primary btn-sm m-1" type="submit">
          {forNewArticulo ? "Agregar" : "Editar"}
        </button>

        <Link href="/blog">
          <a className="btn btn-warning btn-sm m-1">Volver...</a>
        </Link>
      </div>

      <div className="errores">
        {message.map(({ message }, i) => (
          <p key={i}>{message}</p>
        ))}
      </div>
    </form>
  );
}
