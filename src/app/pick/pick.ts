export class Pick {

    id: string = "";
    dateModifiedET: string = "2018-01-01T00:00:00.000";
    playerid: number = 0;
    gameid: number = 0;
    winnerID: number = 0;
    rank: number = 0;
    correct: any = null;
    score: number = 0;
    ttlScore: number = 0;
    ttlScoreDiff: number = 0;
    
    constructor(playerid: number, gameid: number) {
        this.playerid = playerid;
        this.gameid = gameid;
    }
}
