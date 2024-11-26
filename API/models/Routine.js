const mongoose = require('mongoose');
const dynamicSchema = new mongoose.Schema({
    data: { type: mongoose.Schema.Types.Mixed }
}, { strict: false });

const bodyDataSchema = new mongoose.Schema({
    health_log_parameters: { type: mongoose.Schema.Types.Mixed },
    body_measurement_parameters: { type: mongoose.Schema.Types.Mixed },
    health_habits: dynamicSchema,
    hygiene: dynamicSchema,
    holistic_wellness: dynamicSchema,
    what_new_today: dynamicSchema
});

const mealSchema = new mongoose.Schema({
    status: { type: String, enum: ['take', 'skip'] },
    note: { type: String },
    image: { type: String },
    items: { type: Map, of: { qty: { type: String } } }
}, { strict: false });

const routineSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: String, required: true },
    meal: {
        wake_up_food: mealSchema,
        breakfast: mealSchema,
        morning_snacks: mealSchema,
        lunch: mealSchema,
        evening_snacks: mealSchema,
        dinner: mealSchema
    },
    water: {
        target: { type: String },
        qty: { type: String }
    },
    steps: {
        walking: { type: mongoose.Schema.Types.Mixed },
        jogging: { type: mongoose.Schema.Types.Mixed },
        running: { type: mongoose.Schema.Types.Mixed }
    },
    workout: {
        status: { type: Boolean },
        performance: { type: String }
    },
    join_session: {
        attend: { type: Boolean },
        note: { type: String }
    },
    nutrition: {
        dose1: { type: String, enum: ['take', 'skip'] },
        dose2: { type: String, enum: ['take', 'skip'] },
        dose3: { type: String, enum: ['take', 'skip'] },
        dose4: { type: String, enum: ['take', 'skip'] }
    },
    sleep: {
        wake_up: { type: String },
        bed_at: { type: String }
    },
    body_data: bodyDataSchema
},{
    virtuals: true 
});

routineSchema.index({ userId: 1, createdAt: 1 }, { unique: true });

// routineSchema.virtual('routines', {
//     ref: 'User',
//     localField: 'userId',
//     foreignField: '_id',
//   });



module.exports = mongoose.model('Routine', routineSchema);
