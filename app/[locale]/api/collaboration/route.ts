import { redirect } from "@/navigation";
import { NextRequest, NextResponse } from "next/server";

import * as zfd from "zod-form-data";
import * as z from "zod";
import { limiter } from "../config/limiter";
import { postData, uploadFile } from "@/utils/ninox";

const collabSchema = zfd.formData({
  name: zfd.text(z.string().max(50)),
  surname: zfd.text(z.string().max(50)),
  companyName: zfd.text(z.string().max(50)),
  jobPosition: zfd.text(z.string().max(50)),
  email: zfd.text(z.string().email()),
  phoneNumber: zfd.text(z.string().min(8).max(16)),
  message: zfd.text(z.string().max(500).optional()),
  cv: zfd.file().optional(),
});

export const POST = async (req: NextRequest) => {
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

  const res = collabSchema.safeParse(await req.formData()) as {
    success: boolean;
    error: any;
    data: any;
  };

  let data = {} as {
    [key: string]: string;
  };

  Object.keys(res?.data).forEach((key) => {
    if (key !== "cv") data[key] = res.data[key];
  });

  const file = res.data.cv as Blob;

  if (!res.success || typeof data === undefined)
    return Response.json(
      {
        message: "Invalid data",
        //@ts-ignore
        error: res?.error.issues.map((issue) => ({
          message: issue.message,
          field: issue.path,
        })),
      },
      { status: 400 }
    );

  try {
    const recordId = await postData(data, { table: "collaboration" });

    await uploadFile(file, {
      recordId: recordId,
      table: "collaboration",
    });
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
