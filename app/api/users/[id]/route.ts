import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// PUT /api/users/:id -> update user
export async function PUT(req: Request) {
  const url = new URL(req.url);
  const segments = url.pathname.split("/");
  const last = segments[segments.length - 1];
  const id = Number(last);

  if (Number.isNaN(id)) {
    return new Response(
      JSON.stringify({
        message: "Paramètre id invalide",
        path: url.pathname,
        lastSegment: last,
      }),
      { status: 400 }
    );
  }

  const body = await req.json();

  const user = await prisma.user.update({
    where: { id },
    data: {
      name: body.name,
      email: body.email,
    },
  });

  return Response.json(user);
}

// DELETE /api/users/:id -> delete user
export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const segments = url.pathname.split("/");
  const last = segments[segments.length - 1];
  const id = Number(last);

  if (Number.isNaN(id)) {
    return new Response(
      JSON.stringify({
        message: "Paramètre id invalide",
        path: url.pathname,
        lastSegment: last,
      }),
      { status: 400 }
    );
  }

  await prisma.user.delete({
    where: { id },
  });

  return Response.json({ message: "User deleted" });
}
