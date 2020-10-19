/*! File generated by TLObjects' generator. All changes will be ERASED !*/
const { TLObject } = require('../tlobject');
const struct = require('python-struct');
const { readBigIntFromBuffer, 
        readBufferFromBigInt, generateRandomBytes } = require('../../Helpers')


class PhoneCall extends TLObject {
    static CONSTRUCTOR_ID = 0xec82e140;
    static SUBCLASS_OF_ID = 0xd48afe4f;

    /**
    Constructor for phone.PhoneCall: Instance of PhoneCall
    */
    constructor(args) {
        super();
        args = args || {}
        this.CONSTRUCTOR_ID = 0xec82e140;
        this.SUBCLASS_OF_ID = 0xd48afe4f;

        this.phoneCall = args.phoneCall;
        this.users = args.users;
    }
    getBytes() {
        return Buffer.concat([
            Buffer.from("40e182ec","hex"),
            this.phoneCall.getBytes(),
            Buffer.from('15c4b51c', 'hex'),struct.pack('<i', this.users.length),Buffer.concat(this.users.map(x => x.getBytes())),
            ])
        }
    static fromReader(reader) {
        let _phone_call;
        let _users;
        let _x;
        let len;
        _phone_call = reader.tgReadObject();
        reader.readInt();
        _users = [];
        len = reader.readInt();
        for (let i=0;i<len;i++){
            _x = reader.tgReadObject();
            _users.push(_x);
            }
            return new this({phoneCall:_phone_call,
	users:_users})
        }
    }

module.exports = {
    PhoneCall,
};