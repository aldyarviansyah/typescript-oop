import CoreService from '../core/CoreService';
const db: any = require('../db/models');

class MealService extends CoreService {

    findAll = async (): Promise<object[]>  => {
        const meals = await db.meal.findAll({ });
        return meals;
    }

    findOne = async (): Promise<object> => {
        const meal = await db.meal.findOne({
            where: { id: this.params.id },
        });
        return meal;
    }

    create = async (): Promise<object> => {
        let { name, latitude, longitude } = this.body;
        const meal = await db.meal.create(this.body,{});
        return meal;
    }

    update = async (): Promise<boolean> => {
        let { name, latitude, longitude } = this.body;
        const meal = await db.meal.update(this.body,{
            where: {
                id: this.params.id
            }
        });
        return meal;
    }

    delete = async (): Promise<boolean> => {
        const meal = await db.meal.destroy({
            where: {
                id: this.params.id
            }
        });
        return meal;
    }

    
}

export default MealService;