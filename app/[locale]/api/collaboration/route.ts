import { redirect } from "@/navigation";
import axios from "axios";
import { NextRequest } from "next/server";

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

  try {
    await axios.post(
      process.env.BASE_API_URL + "/collaboration/records",
      [{ fields: data }],
      {
        headers: {
          Authorization: "Bearer " + process.env.AUTH_TOKEN,
        },
      }
    );
  } catch (error) {
    return Response.json(
      {
        message: "Could not proceed request",
      },
      { status: 400 }
    );
  }

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

/// DZIAŁA
