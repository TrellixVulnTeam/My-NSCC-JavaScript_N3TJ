(function(tests){

    var DATA_URL = "https://prog3012.netlify.app/.netlify/functions/getDNAMap";
    var DNA_SEQUENCE = "GTGCCAATGTTACTGCTAAATCTCTATATACAGTGGCTTAAGGATGGGGGGCCCAGCAGCGGCCGACCCCCCCCCTCAGTGTGGAATCAACCGGAATTGAGG";
    
    // Extract Codons as JavaScript Array from the DNA Sequence String.
    var extractCodonsFromDNA = function(dnaSequence)
    {
      var codons = [];
  
      // TODO: ADD CODE TO COMPLETE THE FUNCTION HERE...

      for(var i=0;i<dnaSequence.length;i+=3)
      {
          var codonSequence=dnaSequence.slice(i,i+3);

          codons.push(codonSequence);

      }
      // you'll get an error notification in the console until the function is completed correctly

      return codons;
    }
    
    // Compare the Codons array with the map of Amino Acids found in the json data.
    // Add any matches to the aminos array.
    var translateCodonsToAminos = function(codons, jsonData) 
    {
      var aminos = [];
      
      // TODO: ADD CODE TO COMPLETE THE FUNCTION HERE...
      codons.forEach(function (codon) {
        var acidsFound=false;
       jsonData.forEach(function (acids)
           {
                acids["codons"].forEach(function (codonName)
                {

                    //console.log(codon);
                    if (codonName===codon)
                    {
                        aminos.push(acids["abbr"]);
                        acidsFound=true;
                    }
                })
           }

       )
    });
      // you'll get an error notification in the console until the function is completed correctly
      
      return aminos;
    }
    
    var runProgram = function () {
      var codons = extractCodonsFromDNA(DNA_SEQUENCE); //DO NOT MODIFY
      var aminos; //DO NOT MODIFY
      
      // TODO: ENTER CODE TO LOAD DATA FROM API HERE.
      fetch(DATA_URL, {
        method: 'GET',
        headers: new Headers({
            'Accept': 'application/json'
        })
    })
        .then((response)=>{
            return response.json()
        })
        .then((response)=>{
            console.log(response);
            aminos = translateCodonsToAminos(codons, response);
            json=response;
            tests.runTests(codons, aminos)
        })

 
      //ONCE YOU HAVE YOUR API CALL WORKING, UNCOMMENT THE LINE ABOVE THE runTests line AND APPLY 
      //BOTH LINES (including the test line) WITHIN THE CODE ABOVE WHERE YOU RECEIVE YOUR JSON DATA FROM YOUR API CALL...
      //DO NOT MODIFY THE LINES EXCEPT FOR UNCOMMENTING THEM AND MOVING THEM TO THE CORRECT LOCATION ABOVE IN CODE

      //aminos = translateCodonsToAminos(codons, json); //DO NOT MODIFY...but you can uncomment and move when ready
      // tests.runTests(codons, aminos) DO NOT MODIFY...but you can move when ready
    }

    runProgram(); // DO NOT MODIFY
  
  })(tests);