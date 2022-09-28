import { op_rpg } from "./module/config.js"
import OPItemSheet from "./module/sheets/OPItemSheet.js";
import OPActorSheet from "./module/sheets/OPActorSheet.js";
import OPActor from "./module/OPActor.js";
import OPItem from "./module/OPItem.js";

Hooks.once("init", function(){
    console.log("OP-RPG | Initializing Ordem Paranormal System");

    CONFIG.op_rpg = op_rpg;
    CONFIG.Item.entityClass = OPItem;
    CONFIG.Actor.entityClass = OPActor;

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("op-rpg", OPItemSheet, { makeDefault: true });

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("op-rpg", OPActorSheet, { makeDefault: true });
    
});