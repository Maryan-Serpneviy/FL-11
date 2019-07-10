function formatTime(mins) {
    const days = Math.floor(mins / 60 / 60);
    const hours = Math.floor(mins / 60 % 60);
    const minutes = Math.floor(mins % 60);
    return `${days} day(s) ${hours} hour(s) ${minutes} minute(s)`;
}

formatTime(120)
formatTime(59);
formatTime(3601);