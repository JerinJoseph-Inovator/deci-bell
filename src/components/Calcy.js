function calculateTimes(dtc) {
    // Parse dtc to get hours, minutes, and seconds
    const [dtcHours, dtcMinutes, dtcSeconds] = dtc.split(':').map(Number);

    // Convert dtc to total seconds
    const dtcTotalSeconds = dtcHours * 3600 + dtcMinutes * 60 + dtcSeconds;

    // Define constants for time intervals
    const FIVE_MINUTES = 5 * 60;
    const FIFTEEN_MINUTES = 15 * 60;
    const TWO_HOURS_FIVE_MINUTES = 2 * 3600 + 5 * 60;
    const TWO_HOURS_FIFTEEN_MINUTES = 2 * 3600 + 15 * 60;

    // Calculate rt, wt, btb, ftb in seconds
    const rtTotalSeconds = dtcTotalSeconds + FIVE_MINUTES;
    const wtTotalSeconds = dtcTotalSeconds + FIFTEEN_MINUTES;
    const btbTotalSeconds = dtcTotalSeconds + TWO_HOURS_FIVE_MINUTES;
    const ftbTotalSeconds = dtcTotalSeconds + TWO_HOURS_FIFTEEN_MINUTES;

    // Convert calculated times back to hh:mm:ss format
    const formatTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // Format the calculated times
    const rt = formatTime(rtTotalSeconds);
    const wt = formatTime(wtTotalSeconds);
    const btb = formatTime(btbTotalSeconds);
    const ftb = formatTime(ftbTotalSeconds);
    
    // Format dtc1
    const dtc1 = dtc;

    return { dtc1, rt, wt, btb, ftb };
}

// Example usage
const dtc = '10:00:00';
const { dtc1, rt, wt, btb, ftb } = calculateTimes(dtc);

console.log('Door Closing Time (dtc1):', dtc1);
console.log('Reading Time (rt):', rt);
console.log('Writing Time (wt):', wt);
console.log('Buffer Time Bell (btb):', btb);
console.log('Final Time Bell (ftb):', ftb);

