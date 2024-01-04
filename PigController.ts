import Pig from './pig'

interface PigServices{
    add(pig:Pig): void
    showAll(): Pig[]
    delete(pigName:string): void
    loadPigs(): void
    savePigs(): void
}

class PigController implements PigServices{
    pigs: Pig[]

    constructor(){
        this.pigs =[]
    }
    add(pig:Pig){
        this.pigs.push(pig)
        this.savePigs()
        
    }

    showAll(): Pig[] {
        
        return this.pigs
    }

    delete(pigName:string){
        const p = this.pigs.findIndex((pig) => pig.name === pigName)
        if(p!==-1){
            this.pigs.splice(p,1);
            this.savePigs();
        }
    }

    loadPigs(){
        const allPigs = localStorage.getItem('pigs')
        if (allPigs){
            this.pigs = JSON.parse(allPigs)
        }
    }

    savePigs(){
        localStorage.setItem('pigs', JSON.stringify(this.pigs))
    }

    
}
export default PigController