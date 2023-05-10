function isGameFinished(PM:any[]):boolean{
    for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
            if(PM[i][j].length) return false
        }
    }
    return true
}
export{isGameFinished}