const { Model } = require('objection');

class User extends Model {
    static get tableName() {
        return 'users';
    };

    static get relationsMappings() {
        const Email = require('./Email');
        return {
            emails: {
                relation: Model.HasManyRelation,
                modelClass: Email,
                join: {
                    from: 'users.id',
                    to: 'emails.userId'
                }
            }
        }
    }

};

module.exports = User;