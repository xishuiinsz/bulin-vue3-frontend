import { getRangeInteger } from '@u';
import { fetchMapJson } from '@i';
import uniqueId from 'lodash/uniqueId';
const dataCenterModel =
{
    address: "",
    centerName: "",
    cityCode: "",
    cityName: "",
    countyCode: "",
    countyName: "",
    customerName: "",
    provinceCode: "",
    provinceName: "",
    center: []
}



const createDataCenterList = async (data) => {
    const dataCenterList = [];
    const provincesAndCities = data.geoJson.features;
    const allProvince = provincesAndCities.filter(item => item.properties.level === 'province').slice(0, 30);
    const allCities = provincesAndCities.filter(item => item.properties.level !== 'province');
    const num = 10;
    for (let index = 0; index < num; index++) {
        if (index > num / 4) {
            const historyIndex = getRangeInteger(0, index);
            const element = structuredClone(dataCenterList[historyIndex]);
            if (element) {
                Object.assign(element, {
                    centerName: `数据中心${uniqueId()}号`,
                    customerName: `客户编号${uniqueId()}号`,
                })
                dataCenterList.push(element);
            }
        }
        const dataCenterItem =
        {
            ...dataCenterModel
        }
        const randomIndex = getRangeInteger(0, allProvince.length - 1);
        const province = allProvince[randomIndex];
        const { adcode: provinceCode, name: provinceName } = province.properties;
        const cities = allCities.filter(item => {
            if (typeof item.properties?.parent === 'string') {
                return JSON.parse(item.properties?.parent)?.adcode === provinceCode;
            } else {
                return item.properties?.parent?.adcode === provinceCode;
            }

        });

        const cityIndex = getRangeInteger(0, cities.length - 1);
        const city = cities[cityIndex];
        const { adcode: cityCode, name: cityName, center } = city.properties;
        Object.assign(dataCenterItem, {
            cityCode,
            cityName,
            provinceCode,
            provinceName,
            center
        })
        if (city?.properties?.level === 'city') {
            try {
                const result = await fetchMapJson(cityCode, true);
                const allCounties = result.features;
                const countyIndex = getRangeInteger(0, allCounties.length - 1);
                const county = allCounties[countyIndex];
                const { adcode: countyCode, name: countyName, center } = county.properties;
                Object.assign(dataCenterItem, {
                    countyCode,
                    countyName,
                })
            } catch (error) {
                console.log(error)
            }


        }
        Object.assign(dataCenterItem, {
            centerName: `数据中心${uniqueId()}号`,
            customerName: `客户编号${uniqueId()}号`,
        });
        dataCenterList.push(dataCenterItem)
    }
    return dataCenterList;
};
export default createDataCenterList;