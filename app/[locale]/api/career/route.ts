import { redirect } from "@/navigation";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

import * as z from "zod";
import { limiter } from "../config/limiter";

const collabSchema = z.object({
  name: z.string().max(100),
  surname: z.string().max(100),
  email: z.string().email(),
  education: z.string(),
  gender: z.string(),
  languages: z.string(),
  hasDriverLicenseCatB: z.boolean(),
  civilState: z.string(),
  additionalInfo: z.string().min(200).max(1000),
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

  if (!res.success) {
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
  }

  try {
    const res = await axios.post(
      process.env.BASE_API_URL + "/Career/records",
      [
        {
          fields: {
            ...data,
            hasDriverLicenseCatB: data.hasDriverLicenseCatB ? "Yes" : "No",
          },
        },
      ],
      {
        headers: {
          Authorization: "Bearer " + process.env.AUTH_TOKEN,
        },
      }
    );
  } catch (error) {
    return Response.json({ message: "Error" }, { status: 400 });
  }

  return Response.json(
    {
      message: "Application submited",
    },
    { status: 201 }
  );
};

export const GET = async (req: NextRequest) => {
  redirect("/");
};

// DZIAŁA
