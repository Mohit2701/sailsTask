const requests = require('requests');
module.exports = {
    getCR: async function (type,cb) {
        requests(`https://free.currconv.com/api/v7/convert?q=USD_${type}&compact=ultra&apiKey=d0c789121af438bd4864`)
            .on('data', async function (data) {
                if (data) {
                    data = JSON.parse(data);
                    
                    /* for (const key in data) {
                        if (Object.hasOwnProperty.call(data, key)) {
                            var res = key.split("_");
                            await ConversionRate.create({
                                FromCurr: res[0],
                                ToCurr: res[1],
                                Rate: data[key].toFixed(2),
                                Date: moment().format("YYYY-MM-DD")
                            });
                            count = count + 1;
                        }
                    } */
                    return cb(undefined, data);
                }
            });
    }
}
