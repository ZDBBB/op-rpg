export async function SkillCheck({
    skillName = null,
    actorData = null
}){
    let messageData = {
        user: game.user._id,
        speaker: ChatMessage.getSpeaker(),
    }
    
    let skill = actorData.system.skills[skillName];
    if (skill.trainedOnly && skill.trainmentBonus == 0){
        messageData.content = `'${actorData.name}' não é treinado em '${skillName}'. Falha automática no teste`;
        ChatMessage.create(messageData);
        return;
    }

    let dice = {value: 0, message: ""};
    let flat = {value: 0, message: ""};

    addDiceModifier(dice, actorData.system.attributes[skill.relatedAttribute], 'Atributo'); //Advantage on attribute.
    addDiceModifier(dice, actorData.system.advantage, 'Vantagens'); //Advantage on sheet.

    addFlatModifier(flat, skill.trainmentBonus, 'Bônus de Treinamento');
    addFlatModifier(flat, skill.otherBonuses, 'Outros Bônus');
    addFlatModifier(flat, calculateLoadDisavantage(actorData.system, skill), 'Desvantagem de carga');

    let rollForumula
    if (dice.value >= 0) rollForumula = `${dice.value}d20kh + ${flat.value}`;
    else rollForumula = "0";
    
    let r = new Roll(rollForumula);
    await r.evaluate({async: false});

    let messageFlavor = '<div>' + dice.message + flat.message + '</div>';

    messageData.content = await r.render({flavor: messageFlavor, template: 'systems/op-rpg/templates/chat/skill-check.hbs'});
    ChatMessage.create(messageData);
}

function calculateLoadDisavantage(actorData, skill){
    if (actorData.load.value < 0) actorData.load.value = 0;
    if (skill.loadPenality == false) return 0;

    let loadDisavantage = 0;
    //if is pc.vv
    if (actorData.skills != undefined) {
            if (actorData.load.value > 0){
                let loadDisavantageValue = Math.floor(actorData.load.max / 2);

                if (actorData.load.value >= loadDisavantageValue){
                    loadDisavantage = -5;
                }
            }
        }
    return loadDisavantage;
}

function addFlatModifier(flat, advantage, type){
    let flatAdvantage = parseInt(advantage);
    if (flatAdvantage == 0) return;

    flat.value += flatAdvantage;
    let signal = (flatAdvantage > 0) ? "+" : "-";

    flat.message += `
    <div style="font-size:12px;float:left;">${type}</div>
    <div style="font-size:12px;float:right;">${signal}${flatAdvantage}</div>
    <br>`;
}

function addDiceModifier(dice, advantage, type){
    let diceAdvantage = parseInt(advantage);
    if (diceAdvantage == 0) return;

    dice.value += diceAdvantage;
    let signal = (diceAdvantage > 0) ? "+" : "-";

    dice.message += `
    <div style="font-size:12px;float:left;">${type}</div>
    <div style="font-size:12px;float:right;">${signal}${diceAdvantage}d20</div>
    <br>`;
}