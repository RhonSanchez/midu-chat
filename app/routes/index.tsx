import { Form, useLoaderData } from "@remix-run/react";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { createSupabaseServerClient } from "~/utils/supabase.server";
import { Login } from "~/components/Login";
import { json } from "@remix-run/node";
import { RealTimeMessages } from "~/components/RealTimeMessages";

// loader de datos en el SERVER
export const loader = async ({ request }: LoaderArgs) => {
  const response = new Response();
  const supabase = createSupabaseServerClient({ request, response });
  const { data } = await supabase.from("messages").select();
  console.log(data);
  return json({ messages: data ?? [] }, { headers: response.headers });
};

export const action = async ({ request }: ActionArgs) => {
  const response = new Response();
  const supabase = createSupabaseServerClient({ request, response });

  const formData = await request.formData();
  const { message } = Object.fromEntries(formData);
  await supabase.from("messages").insert({ content: String(message) });
  return json({ message: "ok" }, { headers: response.headers });
};

export default function Index() {
  const { messages } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>Midu Chat</h1>
      <Login />
      <Form method="post">
        <input type="text" name="message" />
        <button type="submit">Enviar mensaje</button>
      </Form>
      <RealTimeMessages serverMessages={messages} />
    </div>
  );
}
