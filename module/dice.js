export async function SkillCheck({
    skillName = null,
    actorData = null,
    advantage = 0
}){
    console.log('s', skillName);
    console.log('a', actorData);
    let attributeValue = 2;
    let trainmentBonus = 5;
    let otherBonuses = 0;
    //Debug all this function
    let loadDisavantage = calculateLoadDisavantage(actorData);

    let finalDiceNumber = attributeValue + advantage;
    let finalBonus = trainmentBonus + otherBonuses + loadDisavantage;
    let rollForumula = `${finalDiceNumber}d20kh + ${finalBonus}`;
    
    
    let r = new Roll(rollForumula);
    
    await r.evaluate({async: true});
    
    let messageData = {
        speaker: ChatMessage.getSpeaker()
    }

    console.log(r.total, r.result);
}

function calculateLoadDisavantage(actorData){
    let loadDisavantage = 0;
    if (actorData.load.value < 0) actorData.load.value = 0;
        if (actorData.type == "PC"){

            if (actorData.load.value > 0){
                let loadDisavantageValue = Math.floor(actorData.load.max / 2);

                if (actorData.load.value > loadDisavantageValue){
                    loadDisavantage = -5;
                }
            }
        }
    return loadDisavantage;
}