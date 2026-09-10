import users from "@/data/users";


export async function GET(request, { params }) {

  const { id } = await params;

  const user = users.find(
    (user) => user.id === Number(id)
  );

  if (!user) {

    return Response.json(
      {
        message: "User not found",
      },
      {
        status: 404,
      }
    );

  }

  return Response.json(user);
}


export async function POST(request) {

  const body = await request.json();

  const { id, name, email, age, city, phone } = body;

  const newData = {
    id: Number(id),
    name,
    email,
    age: Number(age),
    city,
    phone,
  };

  users.push(newData);

  console.log(users);

  return Response.json(
    {
      success: true,

      message: "Data Created Successfully",

      data: newData,
    },
    {
      status: 201,
    }
  );

}
export async function PUT(request, { params }) {

  const { id } = await params;

  const body = await request.json();

  const userIndex = users.findIndex(
    (user) => user.id === Number(id)
  );


  if (userIndex === -1) {

    return Response.json(
      {
        message: "User not found",
      },
      {
        status: 404,
      }
    );

  }


  users[userIndex] = {
    ...users[userIndex],
    ...body,
  };


  return Response.json(
    {
      success: true,
      message: "User updated successfully",
      data: users[userIndex],
    }
  );
}

export async function DELETE(request, { params }) {

  const { id } = await params;

  const userIndex = users.findIndex(
    (user) => user.id === Number(id)
  );


  if (userIndex === -1) {

    return Response.json(
      {
        success: false,
        message: "User not found",
      },
      {
        status: 404,
      }
    );

  }


  const deletedUser = users[userIndex];


  users.splice(userIndex, 1);


  return Response.json(
    {
      success: true,
      message: "User deleted successfully",
      data: deletedUser,
    }
  );

}