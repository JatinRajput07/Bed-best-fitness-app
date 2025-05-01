const { date } = require('joi');
const mongoose = require('mongoose');
const dynamicSchema = new mongoose.Schema({
    data: { type: mongoose.Schema.Types.Mixed }
}, { strict: false });

const mealSchema = new mongoose.Schema({
    status: {
        type: String,
        // enum: ['take', 'skip']
    },
    note: { type: String },
    image: { type: String },
    image_uploaded_at: { type: Date },
    imageHistory: [{
        url: { type: String },
        uploaded_at: { type: Date }
    }],
    items: [String]
}, { strict: false });

const nutritionSchema = new mongoose.Schema({
    status: { type: String },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Nutrition' }]
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
    nutrition: {
        "pre breakfast":nutritionSchema,
        "post breakfast":nutritionSchema,
        "pre lunch":nutritionSchema,
        "post lunch":nutritionSchema,
        "pre dinner":nutritionSchema,
        "post dinner":nutritionSchema,
        "before sleep at night":nutritionSchema,
        "morning": nutritionSchema,
        "lunch": nutritionSchema,
        "evening": nutritionSchema,
        "dinner": nutritionSchema,
        "In Every 2-3 hours":nutritionSchema
    },
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
        cut_blue_screen_time: { type: Boolean,default: null  },
        meditation: { type: Boolean,default: null  },
        go_to_nature: { type: Boolean,default: null  },
        read_book: { type: Boolean,default: null  },
        spend_time_family: { type: Boolean,default: null  },
        loop_with_friends: { type: Boolean,default: null  },
        spend_time_hobby: { type: Boolean,default: null  }
    },
    hygiene: {
        bathing: { type: Boolean,default: null  },
        hand_wash: { type: Boolean,default: null  },
        teeth_clean: { type: Boolean,default: null  },
        nail_cut: { type: Boolean,default: null  }
    },
    holistic_wellness: {
        hot_water_wash: { type: Boolean,default: null  },
        cold_water_wash: { type: Boolean,default: null  },
        abhyanga: { type: Boolean,default: null  },
        neti: { type: Boolean,default: null  },
        palm_rubbing: { type: Boolean,default: null  },
        foot_massage: { type: Boolean,default: null  },
        head_massage: { type: Boolean,default: null  },
        oil_pulling: { type: Boolean,default: null  }
    },
    what_new_today: {
        learn_new_language: { type: Boolean,default: null  },
        learn_sports_skill: { type: Boolean,default: null  },
        play_music_today: { type: Boolean,default: null  },
        travel_fun_today: { type: Boolean,default: null  }
    }
});

routineSchema.index({ userId: 1, date: 1 }, { unique: true });

routineSchema.pre('save', function (next) {
    const meals = this.meal;
    const mealKeys = [
        'wake_up_food',
        'breakfast',
        'morning_snacks',
        'lunch',
        'evening_snacks',
        'dinner'
    ];

    mealKeys.forEach((key) => {
        const meal = meals[key];
        if (meal && this.isModified(`meal.${key}.image`)) {
            meal.image_uploaded_at = new Date();
        }
    });

    next();
});


module.exports = mongoose.model('Routine', routineSchema);




