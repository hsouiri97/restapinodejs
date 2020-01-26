import express from "express";
import Server from "./server";

const server = new Server(1234);
server.start();
