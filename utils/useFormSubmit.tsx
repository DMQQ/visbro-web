import axios from "axios";
import { useState } from "react";
import { API } from "./constants";
import { useRouter } from "@/navigation";

export default function useFormSubmit(route: `/${string}`) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const router = useRouter();

  const handleSubmit = async function <T extends {}>(props: T): Promise<void> {
    try {
      setIsSuccess(false);
      setError("");
      setLoading(true);
      const response = await axios.post(API + route, props, {
        headers: {
          locale: "",
        },
      });

      setIsSuccess(true);
      setMessage(response.data.message);
    } catch (error: any) {
      setError(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, state: { loading, error, message, isSuccess } };
}
