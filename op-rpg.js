import { op_rpg } from "./module/config.js"
import OPItemSheet from "./module/sheets/OPItemSheet.js";

Hooks.once("init", function(){
    console.log("OP-RPG | Initializing Ordem Paranormal System");

    CONFIG.op_rpg = op_rpg;

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("op-rpg", OPItemSheet, { makeDefault: true });
});