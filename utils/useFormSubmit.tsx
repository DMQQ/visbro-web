import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { useRouter } from "@/navigation";

export default function useFormSubmit(
  fetcher: <T>(data: any) => Promise<AxiosResponse<any, T>>
) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const router = useRouter();

  function reset() {
    setError("");
    setLoading(false);
    setMessage("");
    setIsSuccess(false);
  }

  const handleSubmit = async function <T extends {}>(data: T): Promise<void> {
    try {
      setIsSuccess(false);
      setError("");
      setLoading(true);
      const response = await fetcher(data);

      setIsSuccess(true);
      setMessage(response.data.message);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, reset, state: { loading, error, message, isSuccess } };
}
