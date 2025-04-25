import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import { connectToSupabaseDB } from "./supabaseClient";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

let supabase: any;
(async () => {
  supabase = await connectToSupabaseDB();
})();

app.get("/users", async (req: Request, res: Response): Promise<any> => {
  const { data: users, error } = await supabase.from("users").select("*");

  if (error) return res.status(500).json({ error: error.message });
  res.json(users);
});

app.post("/users", async (req: Request, res: Response): Promise<any> => {
  const { email, name } = req.body;

  const { data, error } = await supabase
    .from("users")
    .insert([{ email: email, name: name }])
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
