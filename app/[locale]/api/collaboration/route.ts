import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, { params }: any) => {
  const data = req.json();

  return Response.json(
    {
      message: "Application submited",
    },
    { status: 201 }
  );
};
