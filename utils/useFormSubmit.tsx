import axios from "axios";
import { useState } from "react";

export default function useFormSubmit() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async function <T extends {}>(props: T): Promise<void> {
    // try {
    //   setLoading(true);
    //   const response = await axios.post("", props, {});
    //   setMessage(response.data.message);
    // } catch (error) {
    //   setError(error.message);
    // } finally {
    //   setLoading(false);
    // }
  };

  return { handleSubmit, state: { loading, error, message } };
}
