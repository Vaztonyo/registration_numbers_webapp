module.exports = function(models) {
    'use strict';
    const index = function(req, res, next) {

        models.Regisnumber.find({}, function(err, registrationNum) {
            if (err) {
                return next(err);
            }
            res.render('registrationNum/index', {
                registrationNum
            });
        });

    };


    const add = function(req, res, next) {

        var regNumber = {
            name: req.body.regNumber
        };

        var addBtn = req.body.addBtn;

        if (addBtn){
        if (!regNumber || !regNumber.name) {
            req.flash('error', 'Text field should not be blank');
            res.redirect('/');
        } else {
            models.Regisnumber.create(regNumber, function(err, results) {
                if (err) {
                    if (err.code === 11000) {
                        req.flash('error', 'Number already exists!');
                    } else {
                        return next(err);
                    }
                } else {
                    req.flash('success', 'Number added!');
                }
                res.redirect('/');
            });
        }
        }
    };

    function filteredPlates(registrationNum, startWithThis){
      var filteredList = registrationNum.filter(function(regNumber){
        var uppercaseRegNr = regNumber.name.toUpperCase();
        return uppercaseRegNr.startsWith(startWithThis);
      })
      return filteredList;
    }

    const filter = function(req, res){
      var selectedTown = req.body.townFilter;
      // var show = req.body.show

      // if(show){

      models.Regisnumber.find({})
        .then((regNumList) => {

        var registrationNum = regNumList;

        if(selectedTown !== 'All'){
          registrationNum = filteredPlates(regNumList, selectedTown)
        }else if(selectedTown !== 'CA', 'CK', 'CY'){

        }

        res.render('registrationNum/index', {
          registrationNum : registrationNum
        });
      })
      .catch(function(err) {
        console.log(err.stack);
      })
    // }
      // res.redirect('/');
    };

    return {
        index,
        add,
        filter
    }

}
