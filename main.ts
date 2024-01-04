import Pig from './pig'
import PigController from './PigController'

const farm = new PigController()
const farmPigs = document.getElementById('pigsInv')
const pigform = document.getElementById('addPig')
const nameValue = document.getElementById('pigName') as HTMLInputElement
const categoryValue = document.getElementById('pigCategory') as HTMLInputElement
const heightValue = document.getElementById('pigHeight') as HTMLInputElement
const weightValue = document.getElementById('pigWeight') as HTMLInputElement
const personalityValue = document.getElementById('pigPersonality') as HTMLInputElement
const breedF=  document.getElementById('breedPart') as HTMLInputElement
const breedValue = document.getElementById('pigBreed') as HTMLInputElement
const swimF=  document.getElementById('swimming') as HTMLInputElement
const swimValue = document.getElementById('pigSwim') as HTMLInputElement
const langF=  document.getElementById('lang') as HTMLInputElement
const langValue = document.getElementById('pigLang') as HTMLInputElement
const runF=  document.getElementById('run') as HTMLInputElement
const runValue = document.getElementById('pigRun') as HTMLInputElement
const strengthF=  document.getElementById('strength') as HTMLInputElement
const strengthValue = document.getElementById('pigStrength') as HTMLInputElement
document.getElementById('addBtn')?.addEventListener('click', ()=>{
    
    const addnewpigdet =document.getElementById('addPig')
    if(addnewpigdet){
        if(addnewpigdet.style.display==='none'){
            addnewpigdet.style.display='block'
        }
        else{
            addnewpigdet.style.display ='none'
        }
    }
})

document.getElementById('submitPig')?.addEventListener('click', ()=>{
    
    const pigN = nameValue.value.trim()
    const pigC = categoryValue.value as 'Grey' | 'Chestnut' | 'White' | 'Black'
    const pigH = parseInt(heightValue.value)
    const pigW = parseInt(weightValue.value)
    const pigP = personalityValue.value.trim()
    const pigB = breedValue.value as 'Iberian' | 'Hampshire' | 'Wattle' | 'Tammie' | 'Visayan'
    const pigSw = parseInt(swimValue.value)
    const pigL = langValue.value
    const pigR = parseInt(runValue.value)
    const pigSt = parseInt(strengthValue.value)
    const newPig = new Pig(pigN,pigC,pigH,pigW,pigP,pigB,pigSw,pigL,pigR,pigSt)

    if(!pigN || !pigC || !pigH || !pigW || !pigP){
        alert('Please enter a valid a value for each of the input')
        return
    }
    if(pigSw<0 || pigSw>100 || pigR<0 || pigR>100){
        alert(`Please enter a number between 0-100 for the special ability`)
        return
    }
    if(pigSt<1 || pigSt>10){
        alert(`Please enter a number between 1-10 for the special ability`)
        return
    }

    farm.add(newPig)
    displayPigs()
    nameValue.value= ""
    categoryValue.value= ''
    heightValue.value=''
    weightValue.value=''
    personalityValue.value=''
    breedF.style.display='none'
    breedValue.value=''
    swimF.style.display='none'
    swimValue.value=''
    langF.style.display='none'
    langValue.value=''
    runF.style.display='none'
    runValue.value=''
    strengthF.style.display='none'
    strengthValue.value=''
    if(pigform){
        pigform.style.display = 'none'
    }

})
categoryValue.addEventListener('change', ()=>{
    const pigC = categoryValue.value as 'Grey' | 'Chestnut' | 'White' | 'Black'
    if(pigC ==="Grey" || pigC ==="Chestnut" || pigC ==="White" || pigC ==="Black"){
        breedF.style.display='block'
    }
    else{
        breedF.style.display='none'
    }

    if(pigC==="Grey"){
        swimF.style.display='block'
    }
    else{
        swimF.style.display='none'
    }

    if(pigC==="Chestnut"){
        langF.style.display='block'
    }
    else{
        langF.style.display='none'
    }

    if(pigC==="White"){
        runF.style.display='block'
    }
    else{
        runF.style.display='none'
    }

    if(pigC==="Black"){
        strengthF.style.display='block'
    }
    else{
        strengthF.style.display='none'
    }
})
function displayPigs(){
    
    if(!farmPigs){
        console.error("Element not found")
        return
    }

    farmPigs.innerHTML=''
    const all = farm.showAll();
    const table= document.createElement('table')
    table.classList.add('table')
    const thead=document.createElement('thead')
    const headRow=document.createElement('tr')
    const headers =['Name', 'Category', '', '']
    for(let i=0; i< headers.length; i++){
        const th= document.createElement('th')
        th.scope= 'col'
        th.innerText= headers[i]
        headRow.appendChild(th)
    }

    thead.appendChild(headRow)
    table.appendChild(thead)

    const tbody = document.createElement('tbody')
    const sortByCategory: {[category:string]: Pig[]} ={}
    for(let i=0; i< all.length;i++){
        const sp= all[i]
        if(!sortByCategory[sp.category]){
            sortByCategory[sp.category]=[]
        }
        sortByCategory[sp.category].push(sp)
    }
    for(const category in sortByCategory){
        if(Object.prototype.hasOwnProperty.call(sortByCategory,category)){
            const c= sortByCategory[category]
            c.sort((a,b)=>a.name.localeCompare(b.name))
            const piginC: Pig[] =c

            for(let i=0; i< piginC.length; i++){
                const pigin= piginC[i]
                const pRow = document.createElement('tr')
                const pData: Array<keyof Pig> = ['name', 'category']
                for(let j=0; j < pData.length; j++){
                    const data = document.createElement('td')
                    const property = pData[j]
                    if(property==='breed'){
                        data.innerText=(pigin as any)[property] || 'N/A'
                    }
                    else{
                        data.innerText=(pigin as any)[property]
                    }
                    
                    pRow.appendChild(data)
                }

                const moreInfo= document.createElement('td')
                const infoBtn = document.createElement('button');
                infoBtn.classList.add('btn', 'btn-secondary');
                infoBtn.innerText = 'More Info';
                infoBtn.addEventListener('click', () => showDetails(pigin, pRow));
                moreInfo.appendChild(infoBtn);
                pRow.appendChild(moreInfo);
                const del = document.createElement('td');
                const delBtn = document.createElement('button');
                delBtn.classList.add('btn', 'btn-danger');
                delBtn.innerText = 'Delete';
                delBtn.addEventListener('click', () => deletePig(pigin.name));
                del.appendChild(delBtn);
                pRow.appendChild(del);
b 
                tbody.appendChild(pRow);
            }
        }
    }
    table.appendChild(tbody);
    farmPigs.appendChild(table);
    
}

function showDetails(pig:Pig, pigtableRow:HTMLElement){
    const det= pigtableRow.nextElementSibling
    if(det && det.classList.contains('infodet')){
        det.remove()
        return
    }
    const infotable =document.createElement('table')
    infotable.classList.add('table')
    const tablebody= document.createElement('tbody')
    const infoRow = document.createElement('tr')
    infoRow.classList.add('infodet')
    const infoData = document.createElement('td')
    infoData.colSpan = Object.keys(pig).length
    const relDel = getRelDetails(pig.category,pig)
    for(const key of relDel){
        
        const tr = infotable.insertRow();
        const th = tr.insertCell();
        const td = tr.insertCell();
        th.scope = 'row'
        th.textContent= key
        
        let value: string | number ='N/A'
        switch(key){
            case 'name': value = pig.name
                break
            case 'category': value=pig.category
                break
            case 'height': value=pig.height.toString()
                break
            case 'weight': value=pig.weight.toString()
                break
            case 'personality': value = pig.personality
                break
            case 'breed': value= pig.breed
                break
            case 'swimming': value= pig.swimming.toString()
                break
            case 'language': value= pig.language.toString()
                break
            case 'run': value= pig.run.toString()
                break
            case 'strength': value= pig.strength.toString()
                break
            default:
                break
        }
        td.textContent = value
        
            
    }
    infotable.appendChild(tablebody)
    infoData.appendChild(infotable)
    infoRow.appendChild(infoData)
    pigtableRow.parentNode?.insertBefore(infoRow, pigtableRow.nextSibling)
}

function getRelDetails(category: string, pig: Pig){
    switch(category){
        case 'Grey':
            return ['name', 'category', 'height', 'weight', 'personality', 'breed', 'swimming'];
        case 'Chestnut':
            return ['name', 'category', 'height', 'weight', 'personality', 'breed', 'language'];
        case 'White':
            return ['name', 'category', 'height', 'weight', 'personality', 'breed', 'run'];
        case 'Black':
            return ['name', 'category', 'height', 'weight', 'personality', 'breed', 'strength'];
        default:
            return [];
    }
}

function deletePig(pigName:string){
    if(confirm(`Do you want delete ${pigName}?`)){
        farm.delete(pigName)
        displayPigs()
    }
}

farm.loadPigs();
displayPigs()
