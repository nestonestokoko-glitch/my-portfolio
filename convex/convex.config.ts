import { defineApp } from "convex/server";
import messages from "./components/messages/convex.config.js";

const app = defineApp();
app.use(messages);

export default app;
