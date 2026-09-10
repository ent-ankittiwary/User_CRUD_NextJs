"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const EditUser = () => {

  const params = useParams();
  const router = useRouter();

  const { id } = params;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");


  const getUser = async () => {

    const response = await fetch(`/api/users/${id}`);

    const userData = await response.json();

    setName(userData.name);
    setEmail(userData.email);
    setAge(userData.age);
    setCity(userData.city);
    setPhone(userData.phone);
  };


  useEffect(() => {

    if (id) {
      getUser();
    }

  }, [id]);


  const handleUpdate = async (e) => {

    e.preventDefault();

    const response = await fetch(`/api/users/${id}`, {

      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        email,
        age,
        city,
        phone,
      }),

    });


    if (response.ok) {

      router.push("/users");

    }

  };


  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Edit User
      </h1>


      <form
        onSubmit={handleUpdate}
        className="flex flex-col gap-4 max-w-md"
      >

        <input
          type="text"
          value={name}
          placeholder="Enter Name"
          className="border p-2"
          onChange={(e) => setName(e.target.value)}
        />


        <input
          type="email"
          value={email}
          placeholder="Enter Email"
          className="border p-2"
          onChange={(e) => setEmail(e.target.value)}
        />


        <input
          type="number"
          value={age}
          placeholder="Enter Age"
          className="border p-2"
          onChange={(e) => setAge(e.target.value)}
        />


        <input
          type="text"
          value={city}
          placeholder="Enter City"
          className="border p-2"
          onChange={(e) => setCity(e.target.value)}
        />


        <input
          type="tel"
          value={phone}
          placeholder="Enter Phone"
          className="border p-2"
          onChange={(e) => setPhone(e.target.value)}
        />


        <button
          type="submit"
          className="bg-green-600 text-white p-3 rounded"
        >
          Update User
        </button>

      </form>

    </div>
  );
};

export default EditUser;