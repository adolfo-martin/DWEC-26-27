'use strict'; // nos obliga a declarar las variables

// 4 formas
//edad1 = 10; // variable global            0%
// const edad4 = 14; // forma moderna ES6    95% Programación funcional

// {
    //     let edad3 = 13; // forma moderna ES6      4%
    //     console.log(edad3);
    
    //     console.log(edad2);
    
    //     {
        //         let edad5 = 15;
        //         console.log(edad5);
        //         console.log(edad3);
        //     }
        
        //     console.log(edad5);
        // }
        
        // console.log(edad3);
        
// var edad2 = 12; // forma antigua          1%

console.clear();

testAmbito();

// test_ambito snakecase
function testAmbito() { // camelcase
    for (let i=1; i<=3; i++) {
        console.log(i, edad);
    }

    var edad = 10; // hoisting
    console.log(edad);
}

