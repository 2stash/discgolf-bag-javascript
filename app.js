// Storage Controller
const StorageCtrl = (()=>{
  console.log('StorageCtrl Ran')
  // Public Methods
  return {
    storeDisc: (disc)=>{
      let discs;
      if(localStorage.getItem('discs') === null){
        discs = [];
        discs.push(disc)
        localStorage.setItem('discs',JSON.stringify(discs));
      } else {
        discs = JSON.parse(localStorage.getItem('discs'));
        discs.push(disc)
        localStorage.setItem('discs',JSON.stringify(discs));
      }
    },
    getDiscsFromLocalStorage: ()=>{
      let discs;
      if(localStorage.getItem('discs')===null){
        discs = [];
      } else {
        discs = JSON.parse(localStorage.getItem('discs'))
      }
      return discs;
    },
    updateDiscStorage: (updatedDisc)=>{
      let discs = JSON.parse(localStorage.getItem('discs'));
      discs.forEach((disc,index)=>{
        if(updatedDisc.id === disc.id){
          discs.splice(index, 1, updatedDisc)
        }
      })
      localStorage.setItem('discs',JSON.stringify(discs));
    },
    deleteDiscsFromStorage: (id)=>{
      let discs = JSON.parse(localStorage.getItem('discs'));
      discs.forEach((disc,index)=>{
        if(id === disc.id){
          discs.splice(index, 1)
        }
      })
      localStorage.setItem('discs',JSON.stringify(discs));
    },
    clearDiscsFromStorage: ()=>{
      localStorage.removeItem('discs')
    }
  }
})();


// Item Controller
const ItemCtrl = (()=>{
  console.log("ItemCtrl Ran")
  // Item Constructor
  const Item = function(id, name, manufacturer, type, speed, glide, turn, fade, img){
    this.id = id;
    this.name = name;
    this.manufacturer = manufacturer;
    this.type = type;
    this.speed = speed;
    this.glide = glide;
    this.turn = turn;
    this.fade = fade;
    this.img = img;
}
  // Data Structure / State
  const data = {
  //   items: [
  // //     {id: 0, name: "Nuke", manufacturer:"Discraft",type:"Distance Driver", speed:12,glide:5,turn:-1,fade:1,img:"./assets/images/tizone_max-dk_1.jpg"
  // //     },
  // //     {id: 1, name: "Nukes", manufacturer:"Discraft",type:"Distance Driver", speed:12,glide:5,turn:-1,fade:1,img:"./assets/images/tizone_max-dk_1.jpg"
  // //   },
  // //   {id: 2, name: "Nuker", manufacturer:"Discraft",type:"Distance Driver", speed:12,glide:5,turn:-1,fade:1,img:"./assets/images/tizone_max-dk_1.jpg"
  // // },
  //   ],
    items: StorageCtrl.getDiscsFromLocalStorage(),
    currentDisc: null,
    totalDiscs:0,

  }
  return {
    getItems:()=>{
      return data.items
    },
    addItem: (input)=>{
      let ID;
      if(data.items.length > 0){
        ID = data.items[data.items.length-1].id +1;
      } else {
        ID = 0;
      }
      // speed, glice, turn, fade to Number
      let speed = parseInt(input.speed)
      let glide = parseInt(input.glide)
      let turn = parseInt(input.turn)
      let fade = parseInt(input.fade)
     
      // Create new item
      const newItem = new Item(ID, input.name, input.manufacturer, input.type, speed, glide, turn, fade, input.img)

      // push to data array
      data.items.push(newItem);
      return newItem;
    },
    getTotalDiscs: ()=>{
      let total = data.items.length;
      data.totalDiscs = total;
      return data.totalDiscs;
    },
    getDiscById: (id)=>{
      let found;
      // Loop through items
      data.items.forEach((disc)=>{
        if(disc.id === id){
          found = disc;
          
        }
      });
      return found;
    },
    updateDisc: (updatedDisc)=>{
      // change inputs to numbers
      let speed = parseInt(updatedDisc.speed)
      let glide = parseInt(updatedDisc.glide)
      let turn = parseInt(updatedDisc.turn)
      let fade = parseInt(updatedDisc.fade)

      let found;
      data.items.forEach((disc)=>{
        if(disc.id === data.currentDisc.id){
          disc.name = updatedDisc.name;
          disc.manufacturer = updatedDisc.manufacturer;
          disc.type = updatedDisc.type;
          disc.speed = speed;
          disc.glide = glide;
          disc.turn = turn;
          disc.fade = fade;
          disc.img = updatedDisc.img;

          found = disc;
        }
      })
      return found;
    },
    setCurrentDisc: (disc)=>{
      data.currentDisc = disc;
    },
    getCurrentDisc: ()=>{
      return data.currentDisc;
    },
    deleteDisc: (id)=>{
      // Get IDs
      ids = data.items.map((disc)=>{
        return disc.id;
      })
      // Get index
      const index = ids.indexOf(id)
      // Remove disc
      data.items.splice(index,1);
    },
    clearAllDiscs: ()=>{
      data.items =[];
    },
    logData: ()=>{
      return data;
    },


  }
})();

// UI Controller
const UICtrl = (() => {
  console.log("UICtrl Ran")
  const UISelectors = {
    tbody: '#tbody',
    trList: '#tbody tr',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    clearBtn: '.clear-btn',
    discNameInput:'#disc-name',
    discManufacturerInput:'#disc-manufacturer',
    discTypeInput:'#disc-type',
    discSpeedInput:'#disc-speed',
    discGlideInput:'#disc-glide',
    discTurnInput:'#disc-turn',
    discFadeInput:'#disc-fade',
    discImgInput:'#disc-img',
    totalDiscs: '.total-discs',
    modalBody: '.modal-body',
    modalBtn: '#imgModal'

  }

  // Public Methods
  return {
    populateTable: (items)=>{
      let html;

      items.forEach((item)=>{
        html = `
        <tr id="disc-${item.id}">
          <td>${item.name}</td>
          <td>${item.manufacturer}</td>
          <td>${item.type}</td>
          <td>${item.speed}</td>
          <td>${item.glide}</td>
          <td>${item.turn}</td>
          <td>${item.fade}</td>
          <td>
            <img src="${item.img}" width="50" />
          </td>
          <td>
            <a href="#" class="secondary-content">
              <i class="edit-disc fa fa-pencil"></i>
            </a>
          </td>
        </tr>
        `
        // Insert list items
        document.querySelector(UISelectors.tbody).insertAdjacentHTML('beforeend',html)

      })


    },
    getDiscInput: ()=> {
      return {
        name: document.querySelector(UISelectors.discNameInput).value,
        manufacturer: document.querySelector(UISelectors.discManufacturerInput).value,
        type: document.querySelector(UISelectors.discTypeInput).value,
        speed: document.querySelector(UISelectors.discSpeedInput).value,
        glide: document.querySelector(UISelectors.discGlideInput).value,
        turn: document.querySelector(UISelectors.discTurnInput).value,
        fade: document.querySelector(UISelectors.discFadeInput).value,
        img: document.querySelector(UISelectors.discImgInput).getAttribute('src'),
      }
    },
    addListItem: (item)=>{
      // Create
      // const 
      let html = `
      <tr id="disc-${item.id}">
        <td>${item.name}</td>
        <td>${item.manufacturer}</td>
        <td>${item.type}</td>
        <td>${item.speed}</td>
        <td>${item.glide}</td>
        <td>${item.turn}</td>
        <td>${item.fade}</td>
        <td>
          <img src="${item.img}" width="50" />
        </td>
        <td>
          <a href="#" class="secondary-content">
            <i class="edit-disc fa fa-pencil"></i>
          </a>
        </td>
      </tr>
      `
      document.querySelector(UISelectors.tbody).insertAdjacentHTML('beforeend',html)
    },
    clearInput: ()=>{
      document.querySelector(UISelectors.discNameInput).value ='';
      document.querySelector(UISelectors.discManufacturerInput).value ='';
      document.querySelector(UISelectors.discTypeInput).value ='Distance Driver';
      document.querySelector(UISelectors.discSpeedInput).value ='';
      document.querySelector(UISelectors.discGlideInput).value ='';
      document.querySelector(UISelectors.discTurnInput).value ='';
      document.querySelector(UISelectors.discFadeInput).value ='';
      // ACTION: update with resetting img selector
      // document.querySelector(UISelectors.discNameInput).value ='';
    },
    showTotalDiscs: (total)=>{
      document.querySelector(UISelectors.totalDiscs).innerHTML = total
    },
    clearEditState: ()=>{
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'block';
    },
    showEditState: ()=>{
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
    },
    addDiscToForm: ()=>{
      document.querySelector(UISelectors.discNameInput).value = ItemCtrl.getCurrentDisc().name;
      document.querySelector(UISelectors.discManufacturerInput).value =ItemCtrl.getCurrentDisc().manufacturer;
      document.querySelector(UISelectors.discTypeInput).value =ItemCtrl.getCurrentDisc().type;
      document.querySelector(UISelectors.discSpeedInput).value =ItemCtrl.getCurrentDisc().speed;
      document.querySelector(UISelectors.discGlideInput).value =ItemCtrl.getCurrentDisc().glide;
      document.querySelector(UISelectors.discTurnInput).value =ItemCtrl.getCurrentDisc().turn;
      document.querySelector(UISelectors.discFadeInput).value =ItemCtrl.getCurrentDisc().fade;
      // ACTION: update with resetting img selector
      // document.querySelector(UISelectors.discNameInput).value ='';
      UICtrl.showEditState();
    },
    updateDiscItem: (disc)=>{
      let discItems = document.querySelectorAll(UISelectors.trList);
      // Turn node list into array
      discItems = Array.from(discItems);
      discItems.forEach((discItem)=>{
        const discID = discItem.getAttribute('id');
        if(discID === `disc-${disc.id}`){
          document.querySelector(`#${discID}`).innerHTML = `
          <td>${disc.name}</td>
          <td>${disc.manufacturer}</td>
          <td>${disc.type}</td>
          <td>${disc.speed}</td>
          <td>${disc.glide}</td>
          <td>${disc.turn}</td>
          <td>${disc.fade}</td>
          <td>
            <img src="${disc.img}" width="50" />
          </td>
          <td>
            <a href="#" class="secondary-content">
              <i class="edit-disc fa fa-pencil"></i>
            </a>
          </td>
          `
        }
      })
    },
    deleteDisc: (id)=>{
      const discID = `#disc-${id}`
      const disc = document.querySelector(discID);
      disc.remove();

    },
    removeDiscs: ()=>{
      let discItems = document.querySelectorAll(UISelectors.trList);
      // Turn node list into array
      discItems = Array.from(discItems);
      discItems.forEach((disc)=>{
        disc.remove();
      })
    },
    getSelectors: ()=>{
      return UISelectors;
    },
  }
})();


// App Control
const App = ((ItemCtrl, UICtrl, StorageCtrl)=>{
  console.log("App Ran")
  // Load event listeners
  const loadEventListeners = () => {
    // Get UI Selectors
    const UISelectors = UICtrl.getSelectors();
    // Add disc event on add disc button
    document.querySelector(UISelectors.addBtn).addEventListener('click',discAddSubmit)

    // Edit Icon click event
    document.querySelector(UISelectors.tbody).addEventListener('click', discEditClick)

    // Update disc event
    document.querySelector(UISelectors.updateBtn).addEventListener('click',discUpdateSubmit);

    // Delete disc event
    document.querySelector(UISelectors.deleteBtn).addEventListener('click',discDeleteSubmit);

    
    // Clear disc event
    document.querySelector(UISelectors.clearBtn).addEventListener('click',clearAllDiscClick);

    // Back button event
    document.querySelector(UISelectors.backBtn).addEventListener('click',UICtrl.clearEditState);

    // Modal save button
    // document.querySelector('#modal-save-btn').addEventListener('click', selectImage);

    // Modal parent 
    // document.querySelector('.modal-body').addEventListener('click', selectImage)
    
  };

  // Add disc submit
  const discAddSubmit = (e)=>{
    e.preventDefault();
    let newItem;
    // Get form input from UICtrl
    const input = UICtrl.getDiscInput();
    // Check that input has name 
    if(input.name !== '' && input.speed !== '' && input.glide !== '' && input.turn !== '' && input.fade !== ''  ){
      // Add disc to ItemCtrl
      newItem = ItemCtrl.addItem(input)

      // add new disc to UI list
      UICtrl.addListItem(newItem);
      // get total discs
      const totalDiscs = ItemCtrl.getTotalDiscs();
      // Add total discs to the ui
      UICtrl.showTotalDiscs(totalDiscs);
      // Store in local storage
      StorageCtrl.storeDisc(newItem);
      // Clear fields
      UICtrl.clearInput();
    }
  }
  // Update disc click
  const discEditClick = (e)=>{
    e.preventDefault();
    if(e.target.classList.contains('edit-disc')){
      // Get tr id
      const discId = e.target.parentNode.parentNode.parentNode.id;
      // Split disc-0 into an array to get number only
      const tableIdArr = discId.split('-')

      // Get the actual id
      const id = parseInt(tableIdArr[1])
      // get disc to edit
      const discToEdit = ItemCtrl.getDiscById(id);
      // set disc to current disc
      ItemCtrl.setCurrentDisc(discToEdit);
      // Add disc to form
      UICtrl.addDiscToForm();
      // Disable submit on enter 
      document.addEventListener('keypress', (e)=>{
        if(e.keyCode===13 || e.which ===13){
          e.preventDefault();
          return false;
        }
      })
    }
  }
  // disc update submit
  const discUpdateSubmit = (e)=>{
    e.preventDefault();
    // Get disc input
    const input = UICtrl.getDiscInput();
    // Update disc in data
    const updatedDisc = ItemCtrl.updateDisc(input)
    // Update ui
    UICtrl.updateDiscItem(updatedDisc);
    // get total discs
    const totalDiscs = ItemCtrl.getTotalDiscs();
    // Add total discs to the ui
    UICtrl.showTotalDiscs(totalDiscs);
    // Update local storage
    StorageCtrl.updateDiscStorage(updatedDisc)

    UICtrl.clearEditState();
  }

  // disc delete submit
  const discDeleteSubmit = (e)=>{
    // Get current disc
    const currentDisc = ItemCtrl.getCurrentDisc();
    // Delete from data structure
    ItemCtrl.deleteDisc(currentDisc.id)
    // Delete from UI
    UICtrl.deleteDisc(currentDisc.id)
    // get total discs
    const totalDiscs = ItemCtrl.getTotalDiscs();
    // Add total discs to the ui
    UICtrl.showTotalDiscs(totalDiscs);
    // Delete from local storage
    StorageCtrl.deleteDiscsFromStorage(currentDisc.id);

    UICtrl.clearEditState();

    e.preventDefault();

  }
  
  // Clear Disc bag event
  const clearAllDiscClick = () => {
    // Delete all discs from data structure
    ItemCtrl.clearAllDiscs();
    // Remove from UI
    UICtrl.removeDiscs();
    // get total discs
    const totalDiscs = ItemCtrl.getTotalDiscs();
    // Add total discs to the ui
    UICtrl.showTotalDiscs(totalDiscs);
    // Clear from local storage
    StorageCtrl.clearDiscsFromStorage();


  }

  //save disc selection
  // const selectImage = (e) => {
 
  //   console.log(e.target.id)

  // }
  

  // Public methods
  return {
    init: ()=>{
      console.log("Initializing App...");
      // set initial state
      UICtrl.clearEditState();
      // Fetch items form ItemCtrl
      const items = ItemCtrl.getItems();
      // Populate Table with Items
      UICtrl.populateTable(items);
      // Load event listeners
      loadEventListeners();
      // get total discs
      const totalDiscs = ItemCtrl.getTotalDiscs();
      // Add total discs to the ui
      UICtrl.showTotalDiscs(totalDiscs);

    }
  }

})(ItemCtrl, UICtrl, StorageCtrl);

// Initialize App
App.init();




