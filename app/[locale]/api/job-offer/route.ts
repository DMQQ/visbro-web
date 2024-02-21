import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, { params }: any) => {
  const data = await req.formData();

  const finalData = {} as any;

  data.forEach((value, key) => {
    finalData[key] = value;
  });

  return Response.json(
    {
      message: "Application submited",
    },
    { status: 201 }
  );
};
