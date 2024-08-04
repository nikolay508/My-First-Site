import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataService } from "../service/dataService.js";

const temp = (error, oldInput) => html`
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Edit Furniture</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${onSubmit}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-make">Make</label>
                        <input class="form-control ${findHasError(error, 'make')}" id="new-make" type="text" name="make" value=${oldInput.make}>
                    </div>
                    <div class="form-group has-success">
                        <label class="form-control-label" for="new-model">Model</label>
                        <input class="form-control ${findHasError(error, 'model')}" id="new-model" type="text" name="model" value=${oldInput.model}>
                    </div>
                    <div class="form-group has-danger">
                        <label class="form-control-label" for="new-year">Year</label>
                        <input class="form-control ${findHasError(error, 'year')}" id="new-year" type="number" name="year" value=${oldInput.year}>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-description">Description</label>
                        <input class="form-control ${findHasError(error, 'description')}" id="new-description" type="text" name="description" value=${oldInput.description}>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="new-price">Price</label>
                        <input class="form-control ${findHasError(error, 'price')}" id="new-price" type="number" name="price" value=${oldInput.price}>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-image">Image</label>
                        <input class="form-control ${findHasError(error, 'img')}" id="new-image" type="text" name="img" value=${oldInput.img}>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="new-material">Material (optional)</label>
                        <input class="form-control" id="new-material" type="text" name="material" value=${oldInput.material}>
                    </div>
                    <input type="submit" class="btn btn-info" value="Edit" />
                </div>
            </div>
        </form>
`

let context = null;
export async function editItem(ctx) {
    context = ctx;
    const id = ctx.params.id;
    const oldInput = await dataService.getDetailsFurniture(id);

    ctx.render(temp({}, oldInput))
}

function findHasError(error, prop) {
    if(!error){ return }

    return error[prop] ? 'is-invalid': 'is-valid';
}

async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    let { make, model, year, description, price, img, material } = Object.fromEntries(formData);
    year = Number(year); price = Number(price);

    let error = { };
    let hasError = false;

    if(make.length < 4){
        error.make = true;
        hasError = true;
    }
    if(model.length < 4){
        error.model = true;
        hasError = true;
    }
    if(year < 1950 || year > 2050){
        error.year = true;
        hasError = true;
    }
    if(description.length <= 10){
        error.description = true;
        hasError = true;
    }
    if(price < 0 || !price){
        error.price = true;
        hasError = true;
    }
    if(!img){
        error.img = true;
        hasError = true;
    }

    if(hasError){
        return context.render(temp(error));
    }

    const id = context.params.id;
    await dataService.updateFurniture(id, {make, model, year, description, price, img, material});
    context.goTo('/dashboard');
}