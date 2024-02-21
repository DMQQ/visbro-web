import { redirect } from "@/navigation";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

import * as z from "zod";

const collabSchema = z.object({
  name: z.string().max(100),
  surname: z.string().max(100),
  companyName: z.string().max(100),
  jobPosition: z.string().max(100),
  email: z.string().email(),
  phoneNumber: z.string().max(15).min(8),
  message: z.string().optional(),
});

export const POST = async (req: NextRequest, { params }: any) => {
  const data = await req.json();

  const res = collabSchema.safeParse(data);

  if (!res.success)
    return Response.json(
      {
        message: "Invalid data",
        error: res.error.issues.map((issue) => ({
          message: issue.message,
          field: issue.path,
        })),
      },
      { status: 400 }
    );

  // send data to ninox and mail it

  return Response.json(
    {
      message: "Application submited",
    },
    { status: 201 }
  );
};
export const GET = (req: NextRequest) => {
  redirect("/");
};
