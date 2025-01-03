const { date } = require('joi');
const mongoose = require('mongoose');
const dynamicSchema = new mongoose.Schema({
    data: { type: mongoose.Schema.Types.Mixed }
}, { strict: false });

const mealSchema = new mongoose.Schema({
    status: { type: String, 
        // enum: ['take', 'skip']
     },
    note: { type: String },
    image: { type: String },
    items: [String]
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
        calories: String,
        time: String,
        km: String,
        steps: String
    },
    workout: {
        status: { type: Boolean },
        performance: { type: String }
    },
    join_session: {
        attend: { type: Boolean },
        note: { type: String }
    },
    nutrition: [{
        item: { type: String },
        status: { type: String, enum: ['take', 'skip'] }
    }],
    sleep: {
        wake_up: { type: String },
        bed_at: { type: String }
    },
    body_data: {
        body_fat: String,
        muscle: String,
        bmi: String,
        bmr: String,
        bone_mass: String,
        body_hydration: String,
        metabolic_age: String,
        protein: String,
        skeletal_muscle: String,
        subcutaneous_fat: String,
        visceral_fat: String,
        muscle_mass: String
    },
    body_measurement_parameters: {
        hip: String,
        waist: String,
        right_arm_flexed: String,
        left_arm_flexed: String,
        right_arm_unflexed: String,
        left_arm_unflexed: String,
        chest: String,
        thigh: String,
        calf: String
    },
    health_habits: {
        cut_blue_screen_time: { type: Boolean },
        meditation: { type: Boolean },
        go_to_nature: { type: Boolean },
        read_book: { type: Boolean },
        spend_time_family: { type: Boolean },
        loop_with_friends: { type: Boolean },
        spend_time_hobby: { type: Boolean }
    },
    hygiene: {
        bathing: { type: Boolean },
        hand_wash: { type: Boolean },
        teeth_clean: { type: Boolean },
        nail_cut: { type: Boolean }
    },
    holistic_wellness: {
        hot_water_wash: { type: Boolean },
        cold_water_wash: { type: Boolean },
        abhyanga: { type: Boolean },
        neti: { type: Boolean },
        palm_rubbing: { type: Boolean },
        foot_massage: { type: Boolean },
        head_massage: { type: Boolean },
        oil_pulling: { type: Boolean }
    },
    what_new_today: {
        learn_new_language: { type: Boolean },
        learn_sports_skill: { type: Boolean },
        play_music_today: { type: Boolean },
        travel_fun_today: { type: Boolean }
    }
});

routineSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Routine', routineSchema);




