// import fs from "node:fs/promises";
// import path from "node:path";
// import { getPlaiceholder } from "plaiceholder";

// export const getBase64 = async (imgPath: string) => {
//   try {
//     const file = await fs.readFile(path.join(__dirname + `/public/${imgPath}`));
//     const { base64 } = await getPlaiceholder(file);
//     return base64;
//   } catch (error: unknown) {
//     //error handling
//     if (error instanceof Error) return error.message;
//     else if (error && typeof error === "object" && "message" in error)
//       return error.message as string;
//     else if (typeof error === "string") return error;
//     else return "Unexpected error!";
//   }
// };
