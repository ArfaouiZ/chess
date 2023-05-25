function isGameFinished(PM:any[]):boolean{
    for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
            if(PM[i][j].length) return false
        }
    }
    return true
}

function threefoldrep(previous:any,current:string):boolean{
    if (!previous[current]) {previous[current]=1; console.log("position has been reached ",previous[current]);return false }
    
    previous[current]+=1
    console.log("position has been reached ",previous[current])
    if (previous[current]===3) return true 
    return false  } 


export{isGameFinished,threefoldrep}