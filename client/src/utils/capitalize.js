export const capitalize = (str) => {
    if (str === undefined || str === "") return str;
    const strList = str.split(" ");
    let newStr = "";
    strList.forEach((str, index) => {
        newStr += str[0].toUpperCase() + str.substring(1);
        // If the str is not the last word in the list, add a space.
        if (index !== strList.length - 1) {
            newStr += " ";
        }
    });
    return newStr;
};
