export default class OPActor extends Actor {
    /** @override */
    prepareData() {
        console.log('aaa');
        super.prepareData();
        console.log('this', this);
        
        let actorData = this.data;
        let data = actorData.data;


        if (data.load.value < 0) data.load.value = 0;
        if (actorData.type == "PC"){
            data.loadDisavantage = false;

            if (data.load.value > 0){
                let loadDisavantageValue = Math.floor(data.load.max / 2);

                if (data.load.value > loadDisavantageValue){
                    data.loadDisavantage = true;
                }
            }
        }
    }
}