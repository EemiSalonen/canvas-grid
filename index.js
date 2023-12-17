import { drawField } from "./lib/init.js";

const c = document.querySelector("canvas");
c.width = 1900;
c.height = 500;

const corr = drawField(c, c.getContext("2d"), 10);
