export function fractional(num){
    if(Number.isInteger(num)){
        return num.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    }
}

export function dateFormat(date){
    return new Date(date).toLocaleDateString('ru-RU', {
        day: "numeric",
        year: "numeric",
        month: "long"
    })
}

export let selectedAsteroids = new Set(!JSON.parse(localStorage.getItem('forDestruction')) ? [] : [...JSON.parse(localStorage.getItem('forDestruction'))])
