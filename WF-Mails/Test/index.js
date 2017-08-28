function miguel(x){
    return new Promise((resolve)=>{
        resolve(x)
    })
}

function otra(l){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(l)
        },3000)
    })
}

async function miguel2(){
    let m = await miguel('Chauca Miguel xD');
    console.log(m);
    return otra('Sanchez xD');
}



miguel('Miguel xD')
    .then((res)=>{
        console.log(res)
        return miguel2();
    })
    .then((res2)=>{
        console.log(res2)
    })
    .catch(err => console.log(err));