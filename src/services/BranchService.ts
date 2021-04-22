import Sequelize from 'sequelize';
import CoreService from '../core/CoreService';
const db: any = require('../db/models');
const { Op } = Sequelize;
import Distace from '../helpers/Distance'

class BranchService extends CoreService {
 
    public findAll = async (): Promise<object[]>  => {
        const where: object = this.filter();
        const whereChild: object = this.filterChild();
        const customField: any = this.customFields();
        
        const branches = await db.branch.findAll({
            attributes: Object.keys(db.branch.rawAttributes).concat(customField),
            where,
            include: [
                {
                    model: db.meal,
                    as: "meals",
                    where: whereChild,
                    attributes: ["mealPlanName", "maximumCapacity", "price", "day", "startTime", "endTime"]
                }
            ]
        });
        return branches;
    }

    findOne = async (): Promise<object> => {
        const branch = await db.branch.findOne({
            where: { id: this.params.id },
            attributes: ["id","name", "latitude", "longitude"],
            include: [
                {
                    model: db.meal,
                    as: "meals",
                    attributes: ["mealPlanName", "maximumCapacity", "price", "day", "startTime", "endTime"],
                }
            ]
        });
        return branch;
    }

    create = async (): Promise<object> => {
        let { name, latitude, longitude } = this.body;
        const branch = await db.branch.create(this.body,{
            include: [
                {
                    model: db.meal,
                    as: "meals"
                }
            ]
        });
        return branch;
    }

    update = async (): Promise<boolean> => {
        let { name, latitude, longitude } = this.body;
        const branch = await db.branch.update(this.body,{
            where: {
                id: this.params.id
            }
        });
        return branch;
    }

    delete = async (): Promise<boolean> => {
        const branch = await db.branch.destroy({
            where: {
                id: this.params.id
            }
        });
        return branch;
    }

    filter = (): object => {
        let {
            name,
            latitude,
            longitude,
            distance,
        } = this.query;

        const where: object = {};

        if (name) {
            Object.assign(where, {
                name
            });
        }

        if(latitude && longitude && distance){
            const queryLatitude = `(SELECT CAST(COALESCE(NULLIF((SELECT "branch"."latitude"), 0), 0) AS NUMERIC) AS "latitude")`;
            const queryLongitude = `(SELECT CAST(COALESCE(NULLIF((SELECT "branch"."longitude"), 0), 0) AS NUMERIC) AS "longitude")`;
            const calDistance = Distace(
                latitude,
                longitude,
                queryLatitude,
                queryLongitude
            );
            const distances = db.sequelize.literal(calDistance);
            Object.assign(where, {
                [Op.and]: [db.sequelize.where(distances, { [Op.lte]: distance })]
            });
        }
       
        return where;
    }

    filterChild = (): object => {
        let {
            price,
            date,
            time
        } = this.query;

        const where: object = {};

        if (price) {
            Object.assign(where, {
                price
            });
        }
        
        if (date) {
            let start: any = new Date(date.toString());
            start.setHours(0,0,0,0);
            if(time){
                let hours: string[] = time.toString().split(":");
                start.setHours(hours[0],0,0,0);
            }

            let end: any = new Date(date.toString());
            end.setHours(23,59,59,999);
            if(time){
                let hours: string[] = time.toString().split(":");
                end.setHours(hours[0],0,0,0);
            }

            Object.assign(where, {
                [Op.or]: [
                    {
                        startTime: {
                            [Op.gte]: start
                        }
                    },
                    {
                        endTime: {
                            [Op.lte]: end
                        }
                    }
                ]
            });
        }
       
        return where;
    }

    customFields = (): [] => {
        const fields: any = [];
        fields.push([
            db.sequelize.literal(
                `(
                    SELECT distinct on (m."brachId") price FROM 
                    meals m 
                    where m."brachId" = "branch"."id"
                    order by m."brachId" , m.price  
                )`
            ),
            'startingFrom'
          ]);
        return fields;
    }
}

export default BranchService;