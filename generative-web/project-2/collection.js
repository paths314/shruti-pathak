console.log("collection.js");

const firebaseConfig = {
    apiKey: "AIzaSyBvR9FphB1ns1VShlU98nklEtjxab0X6oo",
    authDomain: "goofy-ahh-face.firebaseapp.com",
    projectId: "goofy-ahh-face",
    storageBucket: "goofy-ahh-face.appspot.com",
    messagingSenderId: "902436933447",
    appId: "1:902436933447:web:1c35fad096eff2180e8662",
    measurementId: "G-Y0S2L9L9L9"
};
firebase.initializeApp(firebaseConfig);
// if(!firebase.apps.length) {
//     firebase.initializeApp({})
// }


// refs the firebase storage
var storage = firebase.storage();

// refs the image folder in storage
var imagesRef = storage.ref().child('images');
var storageRef = firebase.storage().ref();


// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv THINGS YOU CAN CHANGE

// the parent container to put the images in
// rename this to whatever you're putting the images in
let collectionDiv = document.querySelector("#images");

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ THINGS YOU CAN CHANGE

let images = [];

// loops through the images and displays them on my site
storageRef.listAll().then(function(result) {
  // loop through each image
  result.items.forEach(function(imageRef) {
    let fileName = imageRef.name;
    let timestamp = fileName.split('_')[0];
    images.push({
      ref: imageRef,
      timestamp: timestamp
    });
    // sorts the images based on timestamp
    images.sort(function(a, b) {
      return b.timestamp - a.timestamp;
    });
  });

  // retrieve all download URLs
  const promises = images.map((image) => {
    return image.ref.getDownloadURL();
  });
  Promise.all(promises).then((urls) => {
    // create img and div elements for each image
    urls.forEach((url, i) => {

      // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv THINGS YOU CAN CHANGE

      // this is the part that takes the URLs in the firebase storage and then retrieves them

      // make an image to house the image URL from firebase
      const img = document.createElement('img');
      // add a specific class to them so they show up in a certain way
      img.classList.add('face-images');
      // set the image element's src to the firebase url so that the correct image displays
      img.src = url;
      
      // make an element to house the images
      const div = document.createElement('div');
      // add a class to the divs i just made
      div.classList.add('image-container');
      // put the images inside of this div container
      div.appendChild(img);
      
      // add div to the collection grid
      collectionDiv.appendChild(div);
    
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ THINGS YOU CAN CHANGE
    });
  });
}).catch(function(error) {
  console.log(error);
});