AFRAME.registerComponent("atoms", {
  init:async function(){
  var compounds = await this.getCompounds()
  var barcodes =object.keys(compounds)
  barcodes.map(barcode=>{
var element = compounds[barcode]
this.createAtoms(element)
  })
  },
  getCompounds:function(){
  return fetch("compoundLIst.json")
  .then(res=>
    res.json()
  )
  .then(data=>data)
  },
  getElementColor:function(){
  return fetch("elementColor.json")
  .then(res=>res.json())
  .then(data=>data)
  },
  createAtoms:async function(element){
   var element_name = element.element_name
   var barcode_value = element.barcode_value
   var number_of_electron = element.number_of_electron
   var color = await this.getElementColor()
   var scene = document.querySelector("a-scene")
   var marker = document.createElement('a-marker')
   marker.setAttribute('id',`marker-${barcode_value}`)
   marker.setAttribute('type','barcode')
   marker.setAttribute('element_name',element_name)
   marker.setAttribute('value',barcode_value)
   scene.appendChild(marker)

   var atom = document.createElement('a-entity')
   atom.setAttribute('id',`${element_name}-${barcode_value}`)
   marker.appendChild(atom)

   var card = document.createElement('a-entity')
   card.setAttribute('id',`card-${element_name}`)
   card.setAttribute('geometry',{
    primitive:"plane",
    width:1,
    height:1,

   })
   card.setAttribute('material',{
    src:`assets/atom_cards/card_${element_name}.png`
   })
   card.setAttribute('position',{
    x:0,
    y:0,
    z:0
   })
   card.setAttribute('rotation',{
    x:-90,
    y:0,
    z:0
   })
   atom.appendChild(card)

   var nucleus_radius = 0.2
   var nucleus = document.createElement('a-entity')
   nucleus.setAttribute('id',`nucleus-${element_name}`)

   nucleus.setAttribute('geometry',{
    primitive:"sphere",
   radius:nucleus_radius

   })
   nucleus.setAttribute('material',
    color[element_name]
   )
   nucleus.setAttribute('position',{
    x:0,
    y:1,
    z:0
   })
   nucleus.setAttribute('rotation',{
    x:0,
    y:0,
    z:0
   })

var nucleus_name = document.createElement('a-entity')

nucleus_name.setAttribute('id',`nucleus_name-${element_name}`)


nucleus_name.setAttribute('position',{
 x:0,
 y:0.21,
 z:-0.06
})
nucleus_name.setAttribute('rotation',{
 x:-90,
 y:0,
 z:0
})

nucleus_name.setAttribute('text',{
    font:"monoide",
    width:3,
    color:"black",
    align:'center',
    value:element_name
})
nucleus.appendChild(nucleus_name)
atom.appendChild(nucleus)
},

  
  
});
