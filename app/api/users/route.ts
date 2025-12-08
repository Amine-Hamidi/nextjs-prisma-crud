import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/users -> liste tous les users
export async function GET() {
  const users = await prisma.user.findMany();
  return Response.json(users);
}

// POST /api/users -> crée un user
export async function POST(req: Request) {
  const body = await req.json();

  if (!body.name || !body.email) {
    return new Response(
      JSON.stringify({ message: "name et email sont obligatoires" }),
      { status: 400 }
    );
  }

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
    },
  });

  return Response.json(user, { status: 201 });
}
