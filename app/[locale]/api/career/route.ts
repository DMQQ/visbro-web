import { redirect } from "@/navigation";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

import * as zfd from "zod-form-data";
import * as z from "zod";

import { limiter } from "../config/limiter";

type Tables =
  | "collaboration"
  | "JobOffers"
  | "OfferApplication"
  | "services"
  | "Career";

async function postData<T>(
  data: T,
  destination: {
    table: Tables;
  }
) {
  const res = await axios.post(
    process.env.BASE_API_URL + `/${destination.table}/records`,
    [
      {
        fields: data,
      },
    ],
    {
      headers: {
        Authorization: "Bearer " + process.env.AUTH_TOKEN,
      },
    }
  );

  const recordId = res.data[0].id as number;

  return recordId;
}

async function uploadFile(
  file: any,
  destination: {
    table: Tables;
    recordId: string | number;
  }
): Promise<boolean> {
  const formdata = new FormData();
  formdata.append("file", file);

  try {
    const res = await axios.post(
      process.env.BASE_API_URL +
        `/${destination.table}/records/${destination.recordId}/files`,
      formdata,
      {
        headers: {
          Authorization: "Bearer " + process.env.AUTH_TOKEN,
        },
      }
    );

    return res.status === 201 || res.status === 200;
  } catch (error) {
    throw new Error("Image not uploaded");
  }
}

// const careerSchema = zfd.formData({
//   name: zfd.text(z.string().max(100)),
//   surname: zfd.text(z.string().max(100)),
//   email: zfd.text(z.string().email()),
//   education: zfd.text(z.string()),
//   gender: zfd.text(z.string()),
//   languages: zfd.text(z.string()),
//   hasDriverLicenseCatB: zfd.text(z.string()),
//   civilState: zfd.text(z.string()),
//   additionalInfo: zfd.text(z.string().min(200).max(1000)),
//   cv: zfd.file().optional(),
// });

const careerSchema = z.object({
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

  const file = res.data.cv as any;

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
