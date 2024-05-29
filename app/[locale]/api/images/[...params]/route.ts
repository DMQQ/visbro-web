import { NextRequest } from "next/server";

const API = process.env.BASE_API_URL;

const TOKEN = process.env.AUTH_TOKEN;

export const GET = async (
  req: NextRequest,
  {
    params,
  }: {
    params: { params: [number, string] };
  }
) => {
  let [recordId, url] = params.params;

  if (url === undefined || url === "" || recordId === undefined)
    return Response.json({}, { status: 404 });

  try {
    const res = await fetch(
      API + `/JobOffers/records/${recordId}/files/${url}`,
      {
        headers: {
          Authorization: "Bearer " + TOKEN,
        },
        cache: "force-cache",
      }
    );

    if (!res.ok) throw new Error("Response is not ok");

    const blob = await res.blob();

    const headers = new Headers();

    headers.set("Content-Type", "image/*");

    return new Response(blob, { status: 200, statusText: "OK", headers });
  } catch (error) {
    return Response.json("Image not found", { status: 404 });
  }
};
