// import users from "@/data/users";

// export async function GET() {
//   return Response.json(users);
// }
import users from "@/data/users";

export async function GET(request) {

  // Get query parameters from the URL
  const searchParams = request.nextUrl.searchParams;

  // Get the value of ?search=
  const search = searchParams.get("search");

  // If there is no search query, return all users
  if (!search) {
    return Response.json(users);
  }

  // Convert search value to lowercase
  const searchValue = search.toLowerCase();

  // Filter users by name OR email
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchValue) ||
    user.email.toLowerCase().includes(searchValue)
  );

  return Response.json(filteredUsers);
}

//==================For Query Params Search through URL========================

// import users from "@/data/users";

// export async function GET(request) {

//   const searchParams = request.nextUrl.searchParams;

//   const name = searchParams.get("name");

//   const email = searchParams.get("email");


//   let filteredUsers = users;


//   if (name) {

//     filteredUsers = filteredUsers.filter((user) =>
//       user.name
//         .toLowerCase()
//         .includes(name.toLowerCase())
//     );

//   }


//   if (email) {

//     filteredUsers = filteredUsers.filter((user) =>
//       user.email
//         .toLowerCase()
//         .includes(email.toLowerCase())
//     );

//   }


//   return Response.json(filteredUsers);
// }