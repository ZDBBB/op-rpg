export default class OPActorSheet extends ActorSheet {
    get template(){
        return `systems/op-rpg/templates/sheets/${this.actor.type}/${this.actor.type}-sheet.hbs`
    }

    getData(){
        const data = super.getData();

        data.config = CONFIG.op_rpg;

        return data;
    }
}