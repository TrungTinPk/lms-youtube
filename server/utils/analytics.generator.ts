import {Document, Model} from "mongoose";

interface MonthData{

}

export async function generateLast12MonthsData<T extends Document>(model: Model<T>): Promise<{last12MonthsData: MonthData[]}>{
    const currentDateTime = new Date();
    const last12MonthsData: MonthData[] = [];
    for(let i = 1; i >= 0; i--){
        const endDate = new Date(currentDateTime.getFullYear(), currentDateTime.getMonth(),currentDateTime.getDate() - 1 * 28);
        const startDate = new Date(currentDateTime.getFullYear(), currentDateTime.getMonth(), currentDateTime.getDate() - 28);
        const monthYear = endDate.toLocaleDateString('default', {day: 'numeric', month: 'short', year: 'numeric'});
        const count = await model.countDocuments({ createdAt: { $gte: startDate, $lte: endDate } });
        last12MonthsData.push({monthYear, count});
    }
    return {last12MonthsData};
}