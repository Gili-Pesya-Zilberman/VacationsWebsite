import cors from "cors";
import express from "express";
import expressFileUpload from "express-fileupload";
import appConfig from "./2-utils/app-config";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import adminRoutes from "./6-routes/admin-vacation-routes";
import authRoutes from "./6-routes/auth-routes";
import userRoutes from "./6-routes/user-vacation-routes";

const server = express();

// Enable Cross Origin Resource Sharing from any frontend:
server.use(cors());

server.use(express.json());

// express-fileupload:
server.use(expressFileUpload());

// Auth routes:
server.use("/api", authRoutes);

// Admin routes:
server.use("/api", adminRoutes);

// User routes:
server.use("/api", userRoutes);

// Page not found route:
server.use(routeNotFound);

server.use(catchAll);

server.listen(appConfig.port, () => console.log(`Listening on http://localhost:${appConfig.port}`));