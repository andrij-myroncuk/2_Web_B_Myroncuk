function omezenePole(pole, limit) {
    // váš kód
    const Pole = [];
    for(prvek in pole){
        if(prvek<limit){
            Pole.add(prvek);
        }
    }
    return Pole;
    
    
    
}

// jednoduché testy 
console.log (omezenePole([23, -7, 6, 3, 12, 2, 0, 0, 5, 17], 4)) // [-7,3,2,0,0];
console.log (omezenePole([23, -7, 6, 3, 12, 2, 0, 0, 5, 17], -8)) // [];
