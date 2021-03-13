/**
 * Default model configuration
 * (sails.config.models)
 *
 * Unless you override them, the following properties will be included
 * in each of your models.
 *
 * For more info on Sails models, see:
 * http://sailsjs.org/#!/documentation/concepts/ORM
 */

const uuid=require('uuid');


module.exports.models = {

  /***************************************************************************
   *                                                              string            *
   * Your app's default connection. i.e. the name of one of your app's        *
   * connections (see `config/connections.js`)                                *
   *                                                                          *
   ***************************************************************************/
  // connection: 'localDiskDb',

  /***************************************************************************
   *                                                                          *
   * How and whether Sails will attempt to automatically rebuild the          *
   * tables/collections/etc. in your schema.                                  *
   *                                                                          *
   * See http://sailsjs.org/#!/documentation/concepts/ORM/model-settings.html  *
   *                                                                          *
   ***************************************************************************/
  connection:'mysql',
  attributes: {
    createdAt: { type: 'datetime', autoCreatedAt: true},
    updatedAt: { type: 'datetime', autoUpdatedAt: true},
     /* id: { type: 'integer',primaryKey:true,autoIncrement:true}, */
  },
  migrate: 'alter'

};
