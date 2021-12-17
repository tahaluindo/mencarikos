const Generateslug = (text) => {
    let result = ""
    text.split(" ").map(item => { 
        if(item !== "-"){result += item+"-"} 
    })  
    return result.slice(0,-1).toLowerCase()
};
export default Generateslug