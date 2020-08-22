
export const isAlpha = ch => {
    return /^[A-Za-z]{1,1}$/.test(ch);
}

export const validateName = (Name, isAlpha) => {
    const name = Name.trim().split(/[ ]+/).filter(Boolean).join(' ');
    if (name.length === 0) {
    return "Name is required";
    } else if (name.length < 3) {
        for (let item of name){
            if (!isAlpha(item) && item !== ' '){
                return "Name must contain only letters"
            }
        }
    return "Name must be at least 3 characters long";
    }
    for (let item of name){
        if (!isAlpha(item) && item !== ' '){
            return "Name must only contain letters"
        }
    }
}

export const formatName = name => {
    const nameList = name.split(' ').map(item => item ? (item[0].toUpperCase() + (item[1] ? item.slice(1).toLowerCase(): "")) : "");
    const res = nameList.filter(item => item !== '');
    return res.join(' ');
};