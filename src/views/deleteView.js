import { dataService } from "../service/dataService.js";

export async function deleteItem(ctx) {
    if(confirm('Are you sure you want to delete?')){
        const id = ctx.params.id;
        await dataService.delFurniture(id);

        ctx.goTo('/dashboard');
    }
}