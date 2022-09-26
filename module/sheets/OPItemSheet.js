export default class OPItemSheet extends ItemSheet {
    get template(){
        return `systems/op-rpg/templates/sheets/${this.item.data.type}/${this.item.data.type}-sheet.html`
    }

    getData(){
        const data = super.getData();

        data.config = CONFIG.op_rpg;

        return data;
    }
}