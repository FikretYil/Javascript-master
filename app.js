import data from './dino.json' assert {type:'json'};
    
    // Create Dino Constructor
function Dino(species,weight,height,diet,where,when,facts){
    this.species=species;
    this.weight=weight;
    this.height=height;
    this.diet=diet;
    this.where=where;
    this.when=when;
    this.facts=facts;
    
    
}
    // Create Dino Objects
let dinoObjects = new Dino();

    // Create Human Object

function Human(names,weight,diet,species,feet,inches){
    this.names=names;
    this.weight=weight;
    this.feet=feet;
    this.inches=inches;
    this.diet=diet;
    this.species=species;
    
}
  let humanObject =new Human()

    //Get dinoData from JSON
    const dinoData=data.Dinos
    dinoObjects= dinoData.map(dino => new Dino(dino.species,dino.weight,dino.height,dino.diet,dino.where,dino.when,dino.fact))

    // Use IIFE to get human data from form    
 const getHuman =function(){         
    humanObject.names=document.getElementById('name').value;        
    humanObject.weight=parseInt(document.getElementById('weight').value);
    humanObject.diet=document.getElementById('diet').value;  
    humanObject.species='human'    
    humanObject.feet=parseInt(document.getElementById('feet').value)*12;
    humanObject.inches=parseInt(document.getElementById('inches').value);    
    return humanObject
    
}






    // Create Dino Compare Method 1 
    Dino.prototype.compareWeight= function(userWeight){
        if (userWeight>this.weight) {
            console.log(userWeight, parseInt(this.weight));
            return `You are heavier than ${this.species}`
            
        }else if(userWeight< parseInt(this.weight)){
            return `${this.species} is heavier than you`
        }else{
            console.log(userWeight, this.weight);
            return `You have equal weight  with ${this.species}`
        }
    }
    
    // Create Dino Compare Method 2
    Dino.prototype.compareHeight= function(userHeight){
        if (userHeight>this.height) {
            return `You are taller than ${this.species}`
            
        }else if(userHeight<this.height){
            return `${this.species} is taller than you`
        }else{
            console.log(userHeight, this.height);
            return `You have equal height  with ${this.species}`
        }
    }
    
    // Create Dino Compare Method 3
    Dino.prototype.compareName= function(userName){
        if (userName < this.species) {
            return `You come before than ${this.species} in the alphabet`
            
        }else if(userName>this.species){
            return `${this.species} come before than you in alphabet`
        }else{
            return `Your names have a equal position in alphabet with ${this.species}`
        }
    }

//Randomize before adding human  
dinoObjects.sort(() => Math.random() - 0.5)
//adding human to the dinos
dinoObjects.splice(4,0,getHuman())



function action(){   
 // Remove form from screen 
form.style.display='none'   
//create grid item div and its children
const tiles= dinoObjects.map((dino,index)=>{

const gridItem= document.createElement('div')
gridItem.className='grid-item'

const img = document.createElement('img')
img.src= `images/${dino.species.toLowerCase()}.png`

const title = document.createElement('h2')
const fact = document.createElement('p')

//check the status of human form
if(dino.species==='human'){   
    title.innerHTML=getHuman().names;
    
}else if(dino.species==='Pigeon'){
    fact.innerHTML="All birds are living dinosaurs."
    

}
else{ 
    title.innerHTML=dino.species        
    if(index===2){
        if(!getHuman().inches &&!getHuman().feet){
            alert('Please provide a height in feet or inches');
        }else{  
            if(!getHuman().inches){
                fact.innerHTML=dino.compareHeight(getHuman().feet)
            }else{
                fact.innerHTML=dino.compareHeight(getHuman().inches)     
            }
        }
    }
    else if (index ===3){
        if(!getHuman().weight){
            alert("Please enter a weight")
        }else{
            fact.innerHTML=dino.compareWeight(getHuman().weight) 
        }
    }
    else if (index ===6){
        if(!getHuman().names){
            alert('Please restart the page and enter a name')
        }else{
            fact.innerHTML=dino.compareName(getHuman().names) 
        }        
    }
    else{ 
    fact.innerHTML=dino.facts
    
    }
      
}

// Generate Tiles for each Dino in Array
gridItem.appendChild(title)
gridItem.appendChild(img)
gridItem.appendChild(fact)
return gridItem
  })

// Add tiles to DOM
const grid= document.getElementById('grid')
tiles.map(tile=> grid.appendChild(tile))
}       

//Get form from html
const form =document.getElementById('dino-compare')


// On button click, prepare and display infographic
const button= document.getElementById('btn')
button.addEventListener('click',action)