import { redirect } from "@/navigation";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";
import { limiter } from "../config/limiter";
import axios from "axios";

type Tables =
  | "collaboration"
  | "JobOffers"
  | "OfferApplication"
  | "services"
  | "Career";

const API = process.env.BASE_API_URL;

const TOKEN = process.env.AUTH_TOKEN;

async function uploadFile(
  file: Blob,
  destination: {
    table: Tables;
    recordId: string | number;
  }
): Promise<boolean> {
  const formdata = new FormData();
  formdata.append("file", file);

  try {
    const res = await axios.post(
      API + `/${destination.table}/records/${destination.recordId}/files`,
      formdata,
      {
        headers: {
          Authorization: "Bearer " + TOKEN,
        },
      }
    );

    return res.status === 201 || res.status === 200;
  } catch (error) {
    throw new Error("Image not uploaded");
  }
}

async function postData<T>(
  data: T,
  destination: {
    table: Tables;
  }
) {
  console.log("where log");

  const res = await axios.post(
    API + `/${destination.table}/records`,
    [
      {
        fields: data,
      },
    ],
    {
      headers: {
        Authorization: "Bearer " + TOKEN,
      },
    }
  );

  const recordId = res.data[0].id as number;

  return recordId;
}

const collabSchema = z.object({
  name: z.string().max(100),
  surname: z.string().max(100),
  phoneNumber: z.string().max(15).min(8),
  dateOfBirth: z.string(),
  lastJobPosition: z.string().max(100),
  education: z.string().max(15),
  gender: z.string().max(15),
  hasOwnCar: z.boolean(),
  civilState: z.string().max(25),
  workStart: z.string().max(100),
  bankName: z.string().max(50),
  bankNumber: z.string().max(20),
  bankCode: z.string().max(10),
  address: z.string().max(100),
  mailAddress: z.string().max(100),
  currentAddress: z.string().max(100),
  emergencyContact: z.string().max(100),

  offerId: z.string(),
});

const fileKeys = [
  "idFileFront",
  "idFileBack",
  "driverLicenseFileFront",
  "driverLicenseFileBack",
  "CVFile",
  "Selfie",
];

const keysToOmit = [...fileKeys, "age", "dataProcessingConsent"];

async function postFilesAsync(files: Blob[], recordId: number) {
  const promises = await Promise.all(
    files.map((file) =>
      uploadFile(file, {
        recordId,
        table: "OfferApplication",
      })
    )
  );

  return promises.every((status) => status);
}

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
  const data = await req.formData();

  const finalData = {} as any;

  data.forEach((value, key) => {
    if (keysToOmit.includes(key)) return;

    let finalV = value.toString() as string | boolean;
    if (value === "true" || value === "false") finalV = Boolean(value);
    finalData[key] = finalV;
  });

  const res = collabSchema.safeParse(finalData) as any;

  const offerId = finalData.offerId;

  if (!data.get("dataProcessingConsent"))
    return Response.json({ error: "Consent not permited" }, { status: 400 });

  if (!res.success)
    return Response.json(
      {
        message: "Invalid data",
        error: res?.error?.issues?.map((issue) => ({
          message: issue.message,
          field: issue.path,
        })),
      },
      { status: 400 }
    );

  try {
    const recordId = await postData(
      {
        ...finalData,
        offerId,
      },
      { table: "OfferApplication" }
    );

    const files: Blob[] = fileKeys.map((key) => data.get(key) as Blob);
    await postFilesAsync(files, recordId);
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
      message: "Application submited for offer: ",
    },
    { status: 201 }
  );
};

export const GET = (req: NextRequest) => {
  redirect("/");
};
