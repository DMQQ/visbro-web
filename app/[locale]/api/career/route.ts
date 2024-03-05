import { redirect } from "@/navigation";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

import * as zfd from "zod-form-data";
import * as z from "zod";

import { limiter } from "../config/limiter";
import { postData, uploadFile } from "@/utils/ninox";

const careerSchema = zfd.formData({
  name: zfd.text(z.string().max(100)),
  surname: zfd.text(z.string().max(100)),
  email: zfd.text(z.string().email()),
  education: zfd.text(z.string()),
  gender: zfd.text(z.string()),
  languages: zfd.text(z.string()),
  hasDriverLicenseCatB: zfd.text(z.string()),
  civilState: zfd.text(z.string()),
  additionalInfo: zfd.text(z.string().min(200).max(1000)),
  cv: zfd.file().optional(),
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

  const formData = await req.formData();

  const res = careerSchema.safeParse(formData) as {
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

  if (!res.success) {
    return Response.json(
      {
        message: "Invalid data",
        error: res.error.issues.map((issue: any) => ({
          message: issue.message,
          field: issue.path,
        })),
      },
      { status: 400 }
    );
  }

  try {
    const recordId = await postData(
      {
        ...data,
        hasDriverLicenseCatB: data.hasDriverLicenseCatB ? "Yes" : "No",
      },
      { table: "Career" }
    );

    await uploadFile(file, { recordId, table: "Career" });
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
