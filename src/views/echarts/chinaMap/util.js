import axios from "axios";
import { fetchMapJson } from '@i';
import { getRangeInteger } from '@u';
export const mapbgColor = '#87CEEB';
export const scaleThreshold = 5;
export const businessDataRange = [
    0, [1, 10], [11, 50], [51, 120], [121, 300], 301
]
export const colorsRange = [
    ['#0066FF', '#006699'],
    ['#006666', '#006633'],
    ['#006600', '#0033FF'],
    ['#0033CC', '#003399'],
    ['#003366', '#003333'],
    ['#003300', '#0000FF'],
    ['#0000CC', '#000099'],
    ['#000066', '#000033'],
]

// 排除的省份|直辖市|特别行政区
export const excludedProvinces = ['710000', '810000', '820000', '100000_JD'];

export const createPositonsByCount = async (count) => {
    const cache = {};
    const positions = [];
    const chinaMapJson = await fetchMapJson('100000');
    const provinces = chinaMapJson.features.filter(item => {
        const { adcode } = item.properties;
        return !excludedProvinces.includes(String(adcode))
    });

    for (let index = 0; index < count; index++) {
        const randomProvinceNum = getRangeInteger(0, provinces.length - 1);
        const province = provinces[randomProvinceNum];
        const op = {};
        const { name: provinceName, adcode: provinceCode } = province.properties;
        Object.assign(op, { provinceName, provinceCode })
        const citiesList = [];
        if (cache[provinceCode]) {
            citiesList.push(...cache[provinceCode])
        } else {
            const result = await fetchMapJson(provinceCode);
            citiesList.push(...result.features);
            cache[provinceCode] = result.features;
        }
        const randomCityNum = getRangeInteger(0, citiesList.length - 1);
        const city = citiesList[randomCityNum];
        if (city.properties.level === 'district') {
            const { name: countyName, adcode: countyCode } = city.properties;
            Object.assign(op, { cityName: '', cityCode: '', countyName, countyCode })

        } else if (city.properties.level === 'city') {
            const { name: cityName, adcode: cityCode } = city.properties;
            Object.assign(op, { cityName, cityCode });
            const countiesList = [];
            if (cache[cityCode]) {
                countiesList.push(...cache[cityCode])
            } else {
                const result = await Promise.any([fetchMapJson(cityCode), fetchMapJson(cityCode, false)]);
                countiesList.push(...result.features);
                cache[cityCode] = result.features;
            }
            const randomCountyNum = getRangeInteger(0, countiesList.length - 1);
            const county = countiesList[randomCountyNum];
            const { name: countyName, adcode: countyCode } = county.properties;
            Object.assign(op, { countyName, countyCode })
        }
        positions.push(op)
    }
    return positions;
}