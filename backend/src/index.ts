import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: { origin: process.env.CORS_ORIGIN?.split(",") ?? ["*"] }
});

app.use(cors({ origin: process.env.CORS_ORIGIN?.split(",") ?? ["*"] }));
app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
	res.json({ status: "ok", time: Date.now() });
});

type ServerToClientEvents = {};

type ClientToServerEvents = {
	join: (room: string) => void;
};

type InterServerEvents = {};

type SocketData = Record<string, unknown>;

io.on("connection", (socket: Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>) => {
	socket.on("join", (room: string) => socket.join(room));
});

const port = Number(process.env.PORT ?? 3000);
httpServer.listen(port, () => {
	console.log(`API listening on http://localhost:${port}`);
});

