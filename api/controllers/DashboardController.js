const moment = require('moment');
module.exports = {
    show: async function (req, res) {
        try {
            if ((req.param('id') && (req.param('currency')))) {
                var product = await products.find({ id: req.param('id'), active: true });
                if (product) {
                    var pro = product[0];
                     await products.update({ id: req.param('id') })
                        .set({
                            view: (pro.view + 1)
                        });
                    product[0].view = pro.view + 1;
                }
                
            } else if ((req.param('currency'))){
                var product = await products.find({ active: true});
            }else{
                res.send(500, { error: 'something blew up' });
            }
            let type = req.param('currency');
            let key = 'USD_' +type;

            async.each(product, function (element,cb) {
                
                ConversionRateServices.getCR(type, async function (err, data) {
                    if (err) {
                        res.send(500, { error: 'something blew up' });
                    } else {
                        element.ConversionPrice = data[key] * element.price;
                        element.ConversionPrice = element.ConversionPrice.toFixed(2);
                        cb();
                    }
                });
               
            }, function (er) {
                if (er) {
                    res.send(500, { error: 'something blew up' });
                }
                return res.status(200).json({ result: product });
            });
            
        } catch (err) {
            return res.send(500, { error: 'something blew up' });;
        }
    },

    mostView: async function (req, res) {
        try {
            let type = req.param('currency');
            let key = 'USD_' + type;
            var product = await products.find({ view: { '>': 0 }, active: true})
                .limit(5)
                .sort({ view: 'desc' });

            async.each(product, function (element, cb) {

                ConversionRateServices.getCR(type, async function (err, data) {
                    if (err) {
                        res.send(500, { error: 'something blew up' });
                    } else {
                        element.ConversionPrice = data[key] * element.price;
                        element.ConversionPrice = element.ConversionPrice.toFixed(2);
                        cb();
                    }
                });

            }, function (er) {
                if (er) {
                    res.send(500, { error: 'something blew up' });
                }
                return res.status(200).json({ result: product });
            });

        } catch (err) {
            return res.status(201).json({ error: "data nOT FOUND", err });
        }
    },

    create: async function (req, res) {
        try {
            var data = req.body;
            data.view = 0;
            if (data) {
             
                if (data.name && data.price ) {
                    let newdata = await products.create(data);

                    return res.status(200).json({ result: newdata });
                }else{
                    
                    return res.status(201).json({ error: "name and price are required fields"  });
                }
                
           } else {
                return res.status(201).json({ error: "Please send data" });
           }
        } catch (err) {
            return res.status(201).json({ error: "data nOT FOUND", err });
        }
    },

    delete: async function (req, res) {
        try {
            var data = req.body;
            if (data) {
                if (data.id) {
                    await products.update({ id: data.id})
                        .set({
                            active: false
                        });;
                    return res.status(200).json({ result: "deleted" });
                } else {
                    return res.status(201).json({ error: "plz send product id" });
                }

            } else {
                return res.status(201).json({ error: "Please send data" });
            }
        } catch (err) {
            return res.status(201).json({ error: "data nOT FOUND", err });
        }
    },
}