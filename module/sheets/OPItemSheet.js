export default class OPItemSheet extends ItemSheet {
    get template(){
        return `systems/op-rpg/templates/sheets/${this.item.type}/${this.item.type}-sheet.hbs`
    }

    getData(){
        const data = super.getData();

        console.log(data);
        data.config = CONFIG.op_rpg;

        return data;
    }
}