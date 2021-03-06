const joi = require('joi');
const ApiError = require('../domain/ApiError');

//Constructor
class Voice{
    constructor(sender, receiver, body, language, token) {
        try {
            if (receiver === undefined) {
                console.log('The receiver is undefined!');
            }else if(sender === undefined){
                console.log('The sender is undefined!');
            }

            const { error } = validate(sender, sender, receiver, receiver, body, language, token);

            if(error) throw error;


            this.sender = sender;
            this.receiver = receiver;
            this.body = body;
            this.language = language;
            this.token = token;

        } catch (e) {
            throw (new ApiError(e.details[0].message, 400));
        }

    }

}

//Validate function for a voice object
function validate(sender, senderToInt, receiver, receiverToInt, body, language, token){
    //Voice object, used for checking if the object matches the schema
    const voiceObject = {
        sender: sender,
        senderToInt: senderToInt,
        receiver: receiver,
        receiverToInt: receiverToInt,
        body: body,
        language: language,
        token: token
    };

    //Schema for a voice message, this defines what a voice message should look like
    const regex = new RegExp('([+]?[0-9]+)$');
    const schema = {
        sender: joi.string().required(),
        senderToInt: joi.number(),
        receiver: joi.string().regex(regex).required(),
        receiverToInt: joi.number(),
        body: joi.string().max(500).required(),
        language: joi.string().required(),
        token: joi.string().required()
    };

    //Validate voice message and return result
    return joi.validate(voiceObject,schema);
}
module.exports = Voice;








