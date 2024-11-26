const mongoose = require('mongoose');

const AsignUserSchema = new mongoose.Schema({
    asign_user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    host: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Asign_User = mongoose.model('Asign_User', AsignUserSchema);
module.exports = Asign_User;



// {
//     "_id": {
//       "$oid": "674608ec2af161106a11ff89"
//     },
//     "host":"",
//     "asign_user":["6731b727edb86c521da2290c","6731b727edb86c521da2290c"]
//   }