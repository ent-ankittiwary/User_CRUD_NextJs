"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const UserForm = () => {

    const router = useRouter();

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [city, setCity] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        console.log(id);

        const res = await fetch(`/api/users/${id}`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                id,
                name,
                email,
                age,
                city,
                phone
            })
        });

        const data = await res.json();

        console.log(data);

        if (res.ok) {
            router.push("/users");
        }
    };

    return (

        <div className="flex flex-col gap-2 p-2 m-2">

            <p>
                Enter Id:
                <input
                    className="border border-black p-2"
                    type="number"
                    name="id"
                    value={id}
                    placeholder="Enter Id"
                    onChange={(e) => setId(e.target.value)}
                />
            </p>

            <p>
                Name:
                <input
                    className="border border-black p-2"
                    type="text"
                    value={name}
                    placeholder="Enter Name"
                    onChange={(e) => setName(e.target.value)}
                />
            </p>

            <p>
                Email:
                <input
                    className="border border-black p-2"
                    type="text"
                    value={email}
                    placeholder="Enter Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </p>

            <p>
                Age:
                <input
                    className="border border-black p-2"
                    type="number"
                    value={age}
                    placeholder="Enter Age"
                    onChange={(e) => setAge(e.target.value)}
                />
            </p>

            <p>
                City:
                <input
                    className="border border-black p-2"
                    type="text"
                    value={city}
                    placeholder="Enter City"
                    onChange={(e) => setCity(e.target.value)}
                />
            </p>

            <p>
                Phone:
                <input
                    className="border border-black p-2"
                    type="number"
                    value={phone}
                    placeholder="Enter Number"
                    onChange={(e) => setPhone(e.target.value)}
                />
            </p>

            <button
                onClick={handleSubmit}
                className="bg-blue-700 border-2 rounded-2xl p-2 m-2 w-25 h-15"
            >
                Submit
            </button>

        </div>
    );
};

export default UserForm;