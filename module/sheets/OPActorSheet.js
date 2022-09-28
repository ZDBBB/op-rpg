import * as Dice from "../dice.js";

export default class OPActorSheet extends ActorSheet {
    get template(){
        return `systems/op-rpg/templates/sheets/${this.actor.type}/${this.actor.type}-sheet.hbs`
    }

    getData(){
        const data = super.getData();

        data.config = CONFIG.op_rpg;

        return data;
    }

    activateListeners(html){
        html.find(".rollAttribute").click(this._onAttributeRoll.bind(this));

        super.activateListeners(html);
    }

    async _onAttributeRoll(event){
        event.preventDefault();
        let element = event.currentTarget;

        let skillName = element.dataset.skillName;
        let rollAttribute = element.dataset.attRelated;
        let trainmentBonus = element.dataset.attTbonus;
        let otherBonuses = element.dataset.attOBonus;

        await Dice.SkillCheck({ 
            skillName: skillName, actorData: this.actor.system      
        });
    }
    

}