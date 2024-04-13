import axios from "axios";
import { fetchMapJson } from '@i';
import { getRangeInteger } from '@u';
import { getMap, graphic } from 'echarts';
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

export const getColorByData = (qty) => {
    const list = businessDataRange.map((item, index) => {
        return { range: item, colors: colorsRange[index] }
    });
    let colors = colorsRange[0]
    const lastElement = list.at(-1);
    if (qty >= lastElement.range) {
        colors = lastElement.colors
    } else {
        for (let index = 1; index < list.length - 1; index++) {
            const element = list[index];
            const [min, max] = element.range
            if (qty >= min && qty <= max) {
                colors = element.colors;
                break;
            }
        }
    }
    const [colorStart, colorEnd] = colors;
    return new graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: colorStart },
        { offset: 1, color: colorEnd }
    ])
}


/**
 * 
 * @param {Array} data 
 */
export const statsByProvince = (data) => {
    const map = new Map();
    data.forEach(item => {
        const { provinceName } = item;
        const value = map.get(provinceName);
        map.set(provinceName, value ? value + 1 : 1)
    })
    return map;
}
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

/**
 * 
 * @param {String} name 地图名称
 * @returns 全部省份集合
 */
export const getAllProvince = (name = 'china') => {
    const chinaMapJson = getMap(name).geoJson.features;
    const provinces = chinaMapJson.filter(item => item.properties.level === 'province');
    return provinces;
}

/**
 * 
 * @param {String} name 地图名称
 * @returns 全部城市集合
 */
export const getAllCities = (name = 'china') => {
    const chinaMapJson = getMap(name).geoJson.features;
    const cities = chinaMapJson.filter(item => item.properties.level !== 'province');
    return cities;
}

export const getScatterList = (count) => {
    const list = getMap('china');
    console.log(list);
}

const aliasLabels = [
    {
        "name": "北京市",
        "alias": "北京"
    },
    {
        "name": "天津市",
        "alias": "天津"
    },
    {
        "name": "河北省",
        "alias": "河北"
    },
    {
        "name": "山西省",
        "alias": "山西"
    },
    {
        "name": "内蒙古自治区",
        "alias": "内蒙古"
    },
    {
        "name": "辽宁省",
        "alias": "辽宁"
    },
    {
        "name": "吉林省",
        "alias": "吉林"
    },
    {
        "name": "黑龙江省",
        "alias": "黑龙江"
    },
    {
        "name": "上海市",
        "alias": "上海"
    },
    {
        "name": "江苏省",
        "alias": "江苏"
    },
    {
        "name": "浙江省",
        "alias": "浙江"
    },
    {
        "name": "安徽省",
        "alias": "安徽"
    },
    {
        "name": "福建省",
        "alias": "福建"
    },
    {
        "name": "江西省",
        "alias": "江西"
    },
    {
        "name": "山东省",
        "alias": "山东"
    },
    {
        "name": "河南省",
        "alias": "河南"
    },
    {
        "name": "湖北省",
        "alias": "湖北"
    },
    {
        "name": "湖南省",
        "alias": "湖南"
    },
    {
        "name": "广东省",
        "alias": "广东"
    },
    {
        "name": "广西壮族自治区",
        "alias": "广西"
    },
    {
        "name": "海南省",
        "alias": "海南"
    },
    {
        "name": "重庆市",
        "alias": "重庆"
    },
    {
        "name": "四川省",
        "alias": "四川"
    },
    {
        "name": "贵州省",
        "alias": "贵州"
    },
    {
        "name": "云南省",
        "alias": "云南"
    },
    {
        "name": "西藏自治区",
        "alias": "西藏"
    },
    {
        "name": "陕西省",
        "alias": "陕西"
    },
    {
        "name": "甘肃省",
        "alias": "甘肃"
    },
    {
        "name": "青海省",
        "alias": "青海"
    },
    {
        "name": "宁夏回族自治区",
        "alias": "宁夏"
    },
    {
        "name": "新疆维吾尔自治区",
        "alias": "新疆"
    },
    {
        "name": "台湾省",
        "alias": "台湾"
    },
    {
        "name": "香港特别行政区",
        "alias": "香港"
    },
    {
        "name": "澳门特别行政区",
        "alias": "澳门"
    }
]

export const getAliasLabel = label => {
    const [row] = aliasLabels.filter(item => item.name === label);
    if (row) {
        return row.alias;
    }
    return label;
}

/**
 * 
 * @param {String[]} adcodes 
 * @param {import("echarts").EChartsType} instance 
 */
const getCoordsBySameAdcodes = (instance, sameDataCenters) => {
    const option = instance.getOption();
    const showGeo = option.geo?.at(-1);
    const { zoom = 1 } = showGeo;
    const [firstItem] = sameDataCenters;
    const { center } = firstItem;
    const pixel = instance.convertToPixel({ geoName: 'showGeo' }, center);
    const [xCenter, yCenter] = pixel;
    const r = 10 / zoom;
    const dataCenters = sameDataCenters.map((dataCenter, index) => {
        const angle = 360 / sameDataCenters.length * index;
        const offsetX = Math.cos(angle * Math.PI / 180) * r;
        const offsetY = Math.sin(angle * Math.PI / 180) * r;
        const newPixel = [xCenter + offsetX, yCenter + offsetY];
        const _center = instance.convertFromPixel({ geoName: 'showGeo' }, newPixel);
        Object.assign(dataCenter, { _center });
        return dataCenter;
    })
    return dataCenters;
}

/**
 * 根据一个或多个地址码返回相应的geo坐标地址
 * @param {String[]} adcode 
 * @returns { Array }
 */
export const getCoordsByDataCenters = (instance, datacenters) => {
    const datacenterList = datacenters.map(datacenter => {
        if (datacenter?.length === 1) {
            return [datacenter]
        } else {
            return getCoordsBySameAdcodes(instance, datacenter);
        }
    })
    return datacenterList.flat(Infinity);;
}

