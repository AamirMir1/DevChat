const corsOptions = {
  // origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  sameSite: "none",
};

const CHATTU_TOKEN = "chattu-token";

export { corsOptions, CHATTU_TOKEN };
