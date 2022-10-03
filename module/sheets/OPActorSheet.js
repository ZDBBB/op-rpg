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
        html.find(".advantageMinus").click(this._changeAdvantageModifierMinus.bind(this));
        html.find(".advantagePlus").click(this._changeAdvantageModifierPlus.bind(this));
        html.find(".attribute-inline-edit").change(this._onattributeEdit.bind(this));

        super.activateListeners(html);
    }

    async _onAttributeRoll(event){
        event.preventDefault();
        let element = event.currentTarget;

        await Dice.SkillCheck({ 
            skillName: element.dataset.skillName, actorData: this.actor.system      
        });

        this.actor.update({"system.advantage": 0});
    }

    _changeAdvantageModifierMinus(){
        this.actor.system.advantage--;
        this.actor.update({"system.advantage": this.actor.system.advantage});
    }

    _changeAdvantageModifierPlus(){
        this.actor.system.advantage++;
        this.actor.update({"system.advantage": this.actor.system.advantage});
    }

    _onattributeEdit(event){
        event.preventDefault();
        let element = event.currentTarget;
        let skillName = element.dataset.skillName;
        let field = element.dataset.field;

        console.log(event.target.value);

        if (field == 'trainmentType') {
            let auxTrainment = event.target.value;
            this.actor.system.skills[skillName].trainmentType = auxTrainment;

            if (auxTrainment == 'untrained') this.actor.system.skills[skillName].trainmentBonus = 0;
            else if (auxTrainment == 'trained') this.actor.system.skills[skillName].trainmentBonus = 5;
            else if (auxTrainment == 'veteran') this.actor.system.skills[skillName].trainmentBonus = 10;
            else if (auxTrainment == 'expert') this.actor.system.skills[skillName].trainmentBonus = 15;
        }
        else if(field == 'otherBonuses') {
            this.actor.system.skills[skillName].otherBonuses = event.target.value;
        }

        this.actor.update({ "system.skills": this.actor.system.skills });
    }
}