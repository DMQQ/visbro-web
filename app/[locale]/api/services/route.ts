import { redirect } from "@/navigation";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

import * as z from "zod";
import { limiter } from "../config/limiter";

const collabSchema = z.object({
  name: z.string().max(100),
  surname: z.string().max(100),
  email: z.string().email(),
  phoneNumber: z.string().min(8).max(15),
  services: z.string().optional(),
  car: z.string().optional(),
  additionalInfo: z.string().max(256),
});

export const POST = async (req: NextRequest, { params }: any) => {
  const remaining = await limiter.removeTokens(1);

  const origin = req.headers.get("origin");

  if (remaining < 0)
    return new NextResponse("Too Many Requests", {
      status: 429,
      statusText: "Too Many Requests",
      headers: {
        "Access-Control-Allow-Origin": origin || "*",
        "Content-type": "text/plain",
      },
    });
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
      process.env.BASE_API_URL + "/Services/records",
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
