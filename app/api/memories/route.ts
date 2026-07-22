import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { syncUser } from "@/lib/sync-user";
export async function GET() {
  return NextResponse.json({ ok: true });
}

export async function POST(request: Request) {
  console.log("✅ POST /api/memories reached");

  const { userId: clerkId } = await auth();

  if (!clerkId) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { title, description, imageUrl } = body;

    if (typeof title !== "string" || !title.trim()) {
      return NextResponse.json(
        { success: false, message: "Title is required" },
        { status: 400 }
      );
    }

    if (typeof imageUrl !== "string" || !imageUrl.trim()) {
      return NextResponse.json(
        { success: false, message: "An image is required" },
        { status: 400 }
      );
    }

    const user = await syncUser();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const memory = await prisma.memory.create({
      data: {
        title: title.trim(),
        description:
          typeof description === "string" && description.trim()
            ? description.trim()
            : null,
        imageUrl: imageUrl.trim(),
        userId: user.id,
      },
    });

    return NextResponse.json(
      { success: true, memory },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create Memory Error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to create memory" },
      { status: 500 }
    );
  }
}