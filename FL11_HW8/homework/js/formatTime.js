function formatTime(mins) {
    const days = Math.trunc(mins / 60 / 60);
    const hours = Math.trunc(mins / 60 % 60);
    const minutes = Math.trunc(mins % 60);
    return `${days} day(s) ${hours} hour(s) ${minutes} minute(s)`;
}

console.log(formatTime(120));
console.log(formatTime(59));
console.log(formatTime(3601));