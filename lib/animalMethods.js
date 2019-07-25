var Animal = require("../models/animal");

//gets a record of all animals
const getAll = () =>{
    return Animal.find({}, (err,result) => {
        if(err){
            console.log(err)
        }
        else {
            return result;
        }

    });
}

//get the record of a single animal

const getItem = (animal) =>{
    return Animal.findOne({'name': animal},(err,animal) => {
        if (err) {
            return next(err);
        }
        else{
            return animal;
        }
    });

}

const deleteItem = (animalName) =>{
    let total = Animal.length;
    console.log(total);
    let removed = false;
    return Animal.findOneAndRemove({'name': animalName},(err)=>{
        if(err){
            return {removed, total};
        }
        else{
            removed = true;
            total--;
            return {removed, total};
        }
    });

}

const addItem = (animalNew) =>{
    let total = Animal.length;
    let added = false;
    let item = getItem(animalNew.name);
    Animal.find({'name': item.name}, (err)=>{
        if(err){
            item.save((err)=>{
                if(err){
                    console.log(err);
                }
                console.log("Animal saved");
                total++
                added=true;
            })
        }

    });
    return{added,total};


}

module.exports = {getAll, getItem, deleteItem, addItem }


