const Distace = (latitude: any, longitude: any, queryLatitude: any, queryLongitude: any) => {
    return `(SELECT (((acos(sin((pi() * ${latitude} / 180)) * sin((pi() * ${queryLatitude} / 180)) + cos((pi() * ${latitude} / 180)) * cos((pi() * ${queryLatitude} / 180)) * cos((pi() * (${longitude} - ${queryLongitude}) / 180))) * 180 / pi()) * 60 * 1.1515) * 1.609344))`;
}

export default Distace;