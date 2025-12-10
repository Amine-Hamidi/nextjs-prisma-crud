import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/users -> liste tous les users
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return Response.json(users, { status: 200 });
  } catch (error) {
    console.error("Erreur GET /api/users :", error);
    return Response.json(
      { message: "Erreur interne serveur" },
      { status: 500 }
    );
  }
}

// POST /api/users -> crée un user
export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name || !body.email) {
      return Response.json(
        { message: "name et email sont obligatoires" },
        { status: 400 }
      );
    }

    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        age: body.age ?? null, // <-- au cas où age soit undefined
      },
    });

    return Response.json(user, { status: 201 });
  } catch (error) {
    console.error("Erreur POST /api/users :", error);
    return Response.json(
      { message: "Erreur interne serveur" },
      { status: 500 }
    );
  }
}
