import { redirect } from "@/navigation";
import axios from "axios";
import { File } from "buffer";
import { NextRequest } from "next/server";
import * as z from "zod";

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

async function postFile(file: Blob, recordId: number) {
  const formdata = new FormData();
  formdata.append("file", file);
  const response = await fetch(
    process.env.BASE_API_URL + `/OfferApplications/records/${recordId}/files`,
    {
      body: formdata,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}

export const POST = async (req: NextRequest, { params }: any) => {
  const data = await req.formData();

  const finalData = {} as any;

  data.forEach((value, key) => {
    if (key === "idFile" || key === "driverLicenseFile") return;
    if (key === "dataProcessingConsent" || key === "age") return;

    let finalV = value.toString() as string | boolean;
    if (value === "true" || value === "false") finalV = Boolean(value);
    finalData[key] = finalV;
  });

  const res = collabSchema.safeParse(finalData);

  const offerId = finalData.offerId;

  if (!data.get("dataProcessingConsent"))
    return Response.json({ error: "Consent not permited" }, { status: 400 });

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
      process.env.BASE_API_URL + "/OfferApplication/records",
      [
        {
          fields: {
            ...finalData,
            offerId,
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

// export const GET = async () => {
// try {
//   const NINOX_AUTH_TOKEN = process.env.NINOX_AUTH_TOKEN || "";
//   const response = await fetch("NINOX FUTURE API", {
//     headers: {
//       Authorization: "Bearer " + NINOX_AUTH_TOKEN,
//     },
//     next: { revalidate: 1000 * 60 },
//   });

//   //   const data = await response.json();

//   return Response.json({ data }, { status: 200 });
// } catch (error) {
//   return Response.json(
//     { data: [], message: "Network error" },
//     { status: 200 }
//   );
// }

//   return Response.json({
//     data: [1, 2, 3, 4],
//   });
// };

export const GET = (req: NextRequest) => {
  redirect("/");
};
