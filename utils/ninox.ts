"use server";

import axios from "axios";

type Tables =
  | "collaboration"
  | "JobOffers"
  | "OfferApplication"
  | "services"
  | "Career";

export async function uploadFile(
  file: Blob,
  destination: {
    table: Tables;
    recordId: string | number;
  }
): Promise<boolean> {
  "use server";
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

export async function postData<T>(
  data: T,
  destination: {
    table: Tables;
  }
) {
  "use server";
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
