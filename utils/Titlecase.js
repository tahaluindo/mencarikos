function Titlecase(str, splitBy='-') {
    str = str.toLowerCase().split(splitBy);
    for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
}
export default Titlecase