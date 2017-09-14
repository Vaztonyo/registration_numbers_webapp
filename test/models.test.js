const assert = require('assert');
const Models = require( '../models');
describe('models should be able to', function(){

    var models = Models("mongodb://localhost/registration-test");

    beforeEach(function(done){
        models.Regisnumber.remove({}, function(err){
            done(err);
        })
    })

    it('store Registration Numbers to MongoDB', function(done){

        var regData = { name : 'The test Number'};
        models.Regisnumber
            .create(regData, function(err){

                models.Regisnumber.find({ name : 'The test Number'}, function(err, registrationNum){
                    assert.equal(1, registrationNums.length);
                    done(err);
                });

            });
    });

    it('should not allow duplicate Numbers', function(done){
        var regData = { name : 'The test Number'};
        models.Regisnumber
            .create(regData, function(err){
                var regData = { name : 'The test Number'};
                models.Regisnumber
                    .create(regData, function(err){
                        assert.ok(err, 'Should give an error for duplicate Numbers');
                        done();
                    });
            });
    });
})
