import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import { connectToSupabaseDB } from "./supabaseClient";
import { createUser, getAllUsers } from "./services/userService";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

let supabase: any;
(async () => {
  supabase = await connectToSupabaseDB();
})();



// v1 with very basic route to supabase 


// v1: to get all users from supabase
app.get("/v1/users", async (req: Request, res: Response): Promise<any> => {
  const { data: users, error } = await supabase.from("users").select("*");

  if (error) return res.status(500).json({ error: error.message });
  res.json(users);
});



// v1: to create a user in supabase
app.post("/v1/users", async (req: Request, res: Response): Promise<any> => {
  const { email, name } = req.body;

  const { data, error } = await supabase
    .from("users")
    .insert([{ email: email, name: name }])
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});



// v2 with routes with service layer

app.get('/v2/users', async (req : Request, res : Response) => {
  try {
    const data = await getAllUsers();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

app.post('/v2/users', async (req : Request, res : Response) => {
  try {
    const data = await createUser(req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});



// MCP-style Handler
app.post('/mcp', async (req: Request, res: Response): Promise<any> => {
  const { tool, function: func, data } = req.body;

  try {

    // here tool can be anything from market place [ binance , coinbase, etc ]
    // and function can be anything from the tool [ getAllMarkets, getTicker, etc ]
    // mostly what tool/service has written their own function , and we just call it 



    if (tool === 'userService') {
      if (func === 'createUser') {
        const result = await createUser(data);
        return res.json(result);
      }

      if (func === 'getAllUsers') {
        const result = await getAllUsers();
        return res.json(result);
      }
    }


    res.status(400).json({ error: 'Unknown tool or function' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
