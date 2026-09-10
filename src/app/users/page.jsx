"use client"
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
const users = () => {

    const router = useRouter();
      const searchParams = useSearchParams();

  const name = searchParams.get("name");

  const email = searchParams.get("email");
    

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchBarText,setSearchBarText] = useState("");


  //======= For Normal UserData Fetch to map it and show all users on /users route
  // const getUsers = async () => {
  //   const response = await fetch("/api/userData");

  //   const userData = await response.json();

  //   setUsers(userData);
  // };
const getUsers = async (searchValue = "") => {

  const response = await fetch(
    `/api/userData?search=${encodeURIComponent(searchValue)}`
  );

  const userData = await response.json();

  setUsers(userData);
};

//=============For Query Params Search Through URL=============
// const getUsers = async () => {

//   const params = new URLSearchParams();

//   if (name) {
//     params.set("name", name);
//   }

//   if (email) {
//     params.set("email", email);
//   }

//   const response = await fetch(
//     `/api/userData?${params.toString()}`
//   );

//   const userData = await response.json();

//   setUsers(userData);
// };

  useEffect(() => {
    getUsers();
  }, []);

  const viewUserDetails = async (id) => {
    const response = await fetch(`/api/users/${id}`);

    const userData = await response.json();

    setSelectedUser(userData);
  };


  const deleteUser = async (id) => {

  const response = await fetch(`/api/users/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {

    setUsers(
      users.filter((user) => user.id !== id)
    );

    setSelectedUser(null);
  }
};

  return (
    <div className="hero min-h-screen p-10">
         <div>
      <h1 className="signature text-2xl">
        This is satisfy Font
      </h1>

      <p className="caacupe-one-regular text-2xl">
        Next.js Google Fonts Test
      </p>
        
      <Image src="https://images.livemint.com/img/2021/08/14/1600x900/Screenshot_(457)_1628938755455_1628938766128.png" alt="xuv-700" height={500} width={500} className="rounded-4xl"/>
          


    </div>
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl font-bold mb-8">Users</h1>
        <div>
            
        <input className="border-2 border-black rounded-2xl px-2 py-2 mx-3 my-2"
        type="text"
        name="SearchBar"
        placeholder="Search by any attribute"
        value={searchBarText}
        onChange={(e)=>{
            const value = e.target.value;
            setSearchBarText(value);
            getUsers(value);
            }} />
        <button className="bg-amber-500 border-blue border-2 rounded-2xl px-2 py-2 mx-3 my-2">Search</button>
        </div>

        <Link href="/userForm">
          <button className="bg-amber-500 border-blue border-2 rounded-2xl w-25 h-15">
            Add New User
          </button>
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {users.map((user) => (
          <div key={user.id} className="border p-5 rounded-lg">
            <h2 className="text-xl font-bold">{user.name}</h2>

            <p>{user.email}</p>

            <button
              onClick={() => viewUserDetails(user.id)}
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
            >
              View User Details
            </button>
            <button
              onClick={() => router.push(`/users/${user.id}/edit`)}
              className="mt-3 ml-3 bg-green-600 text-white px-4 py-2 rounded"
            >
              Edit User
            </button>
            <button onClick={()=>deleteUser(user.id)} 
                className="mt-3 ml-3 bg-red-600 text-white border-2 px-2 py-2 rounded">
                    Delete User
            </button >
          </div>
        ))}
      </div>

      {selectedUser && (
        <div className="mt-10 border p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">User Details</h2>

          <p>
            <strong>Name:</strong> {selectedUser.name}
          </p>

          <p>
            <strong>Email:</strong> {selectedUser.email}
          </p>

          <p>
            <strong>Age:</strong> {selectedUser.age}
          </p>

          <p>
            <strong>City:</strong> {selectedUser.city}
          </p>

          <p>
            <strong>Phone:</strong> {selectedUser.phone}
          </p>
        </div>
      )}
    </div>
  );
};

export default users;
