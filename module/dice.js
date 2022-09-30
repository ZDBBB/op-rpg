export async function SkillCheck({
    skillName = null,
    actorData = null,
    advantage = 0
}){
    let messageData = {
        user: game.user._id,
        speaker: ChatMessage.getSpeaker()
    }
    
    let skill = actorData.skills[skillName];
    
    if (skill.trainedOnly && skill.trainmentBonus == 0){
        messageData.content = `'${actorData.subNome}' não é treinado em '${skillName}'. Falha automática no teste`;
        ChatMessage.create(messageData);
        return;
    }

    let attributeValue = parseInt(actorData.attributes[skill.relatedAttribute]);
    let trainmentBonus = parseInt(skill.trainmentBonus);
    let otherBonuses = parseInt(skill.otherBonuses);
    let loadDisavantage = calculateLoadDisavantage(actorData, skill);
    let finalDiceNumber = attributeValue + advantage;
    let finalBonus = trainmentBonus + otherBonuses + loadDisavantage;
    let rollForumula = `${finalDiceNumber}d20kh + ${finalBonus}`;
    
    let r = new Roll(rollForumula);
    await r.evaluate({async: false});

    await r.toMessage(messageData);
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