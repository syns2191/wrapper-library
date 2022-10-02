import {
    GetAllByRange,
    Lists,
    GetMaxPrice
} from '../interfaces/Icomodity.js';
import moment from 'moment';


export const rangeFilter = (params: GetAllByRange, response: Lists[]):Lists[] => {
    let data = response.filter((item) => {
        const price = parseInt(item.price, 10);
        const size = parseInt(item.size, 10);
        const date = new Date(item.tgl_parsed).getTime();
        if (params.rangeDate && params.rangePrice && params.rangeSize) {
            return (
                size >= params.rangeSize.min 
                && size <= params.rangeSize.max
                && price >= params.rangePrice.min
                && price <= params.rangePrice.max
                && date >= new Date(params.rangeDate.min).getTime()
                && date <= new Date(params.rangeDate.max).getTime())
        }

        if (params.rangeDate && params.rangePrice) {
            return (
                price >= params.rangePrice.min
                && price <= params.rangePrice.max
                && date >= new Date(params.rangeDate.min).getTime()
                && date <= new Date(params.rangeDate.max).getTime())
        }

        if (params.rangePrice && params.rangeSize) {
            return (
                size >= params.rangeSize.min 
                && size <= params.rangeSize.max
                && price >= params.rangePrice.min
                && price <= params.rangePrice.max)
        }

        if (params.rangeDate && params.rangeSize) {
            return (
                size >= params.rangeSize.min 
                && size <= params.rangeSize.max
                && date >= new Date(params.rangeDate.min).getTime()
                && date <= new Date(params.rangeDate.max).getTime())
        }

        if (params.rangeDate) {
            return (
                date >= new Date(params.rangeDate.min).getTime()
                && date <= new Date(params.rangeDate.max).getTime())
        }

        if (params.rangePrice) {
            return (
                price >= params.rangePrice.min
                && price <= params.rangePrice.max)
        }

        if (params.rangeSize) {
            return (
                size >= params.rangeSize.min 
                && size <= params.rangeSize.max
                )
        }
    })

    if (params.limit && !params.offset) {
        data = data.slice(0, params.limit - 1);
        return data;
    }

    if (params.limit && params.offset) {
        data = data.slice(params.offset, (params.offset + params.limit - 1));
        return data;
    }

    console.log('lalala')

    return data;
}

const getWeek = (date: string) => {
    return moment(date).weeks();
}

export const maxRecord = (response: Lists[], params: GetMaxPrice): {
    commodity?: string,
    price: number,
    week?: number
}[] => {
    if (params.types === 'by week') {
        const data: {
            commodity?: string,
            price: number,
            week?: number
        }[] = [];
        for (let i = 0; i< response.length; i++) {
            const week = getWeek(response[i].tgl_parsed);
            const idxExists = data.findIndex((x) => x.week == week);
            if (idxExists > -1) {
                if (Number(data[idxExists].price) < Number(response[i].price)) {
                    data[idxExists].price = Number(response[i].price);
                }
            } else {
                data.push({
                    week,
                    price: Number(response[i].price)
                })
            }
        }

        return data;
    }
    
    if (params.types === 'by commodity') {
        const data: {
            commodity?: string,
            price: number,
            week?: number
        }[] = [];
        for (let i = 0; i< response.length; i++) {
            const commodity = response[i].komoditas;
            const idxExists = data.findIndex((x) => x.commodity == commodity);
            if (idxExists > -1) {
                if (Number(data[idxExists].price) < Number(response[i].price)) {
                    data[idxExists].price = Number(response[i].price);
                }
            } else {
                data.push({
                    commodity,
                    price: Number(response[i].price)
                })
            }
        }

        return data;
    }

    return []
}


export const addUsdInfo = (response: Lists[], currency: any) => {
    return response.map((item) => {
        item.price_usd = (Number(item.price) * currency.info.rate).toString();
        return item;
    })
}