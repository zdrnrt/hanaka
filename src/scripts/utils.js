export function throttle(fn, time) {
    let inProgress;
    
    return function(...args) {
        if (!inProgress) {
            fn.apply(this, args);
            inProgress = true;
            setTimeout(() => inProgress = false, time);
        }
    };
}