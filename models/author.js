const { DateTime } = require("luxon");
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
    {
        first_name: { type: String, required: true, maxLength: 100 },
        family_name: { type: String, required: true, maxLength: 100 },
        date_of_birth: { type: Date },
        date_of_death: { type: Date },
    }
);

// Virtual for author's full name
AuthorSchema
    .virtual('name')
    .get(function () {
        return this.family_name + ', ' + this.first_name;
    });

// Virtual for author's lifespan
AuthorSchema
    .virtual('lifespan')
    .get(function () {
        if (this.date_of_birth == undefined && this.date_of_death != undefined) {
            return ' - ' + DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED);
        }
        else if (this.date_of_death == undefined && this.date_of_birth != undefined) {
            return DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) + ' - ';
        }
        else if (this.date_of_birth == undefined && this.date_of_death == undefined) {
            return ' - ';
        }
        else {
            return DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) + ' - ' + DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED);
        }
    });

// Virtual for author's URL
AuthorSchema
    .virtual('url')
    .get(function () {
        return '/catalog/author/' + this._id;
    });

//Export model
module.exports = mongoose.model('Author', AuthorSchema);