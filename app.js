
import { renderMushroom, renderFriend } from './render-utils.js';

const friendsEl = document.querySelector('.friends');
const friendInputEl = document.getElementById('friend-input');
const mushroomsEl = document.querySelector('.mushrooms');
const addMushroomButton = document.getElementById('add-mushroom-button');
const addFriendButton = document.getElementById('add-friend-button');

let mushroomCount = 3;
//let truffleCount = 0;

const nameArray = [
    'David',
    'Kat',
    'Brien',
    'Mariah',
    'Indio',
    'Kashi'
];
const friendData = [
    {
        name: 'Erich',
        satisfaction: 2,
    },
    {
        name: 'Sarah',
        satisfaction: 3,
    },
    {
        name: 'Missael',
        satisfaction: 1,
    },
    {
        name: 'Soraya',
        satisfaction: 2,
    },
];

addMushroomButton.addEventListener('click', () => {
    if (Math.random() > 0.5) {
        alert('found a mushroom!');
        mushroomCount++;
        renderMushroom();
        displayMushrooms();
    }
//    if (Math.random() > 0.9) {
//        alert('You found a truffle! How lucky!');
//        truffleCount++;
    else {
        alert('no luck!');
        renderMushroom();
    }
    
});

addFriendButton.addEventListener('click', () => {
    let name = friendInputEl.value;
    let newFriend = { name: name.value || `${nameArray[Math.floor(Math.random() * 6)]}`, satisfaction: 1 };
    friendData.push(newFriend);
    friendInputEl.value = '';
    displayFriends();
});

function displayFriends() {
    friendsEl.textContent = '';
    for (let friend of friendData) {
        const friendEl = renderFriend(friend);
        friendEl.addEventListener('click', () => {
            const friendInState = findFriendByName(friend.name, friendData);
            if (mushroomCount === 0) {
                alert ('No more mushies to give! Time to go forage for more, friend!');
            }
            if (mushroomCount > 0 && friend.satisfaction < 3) {
                friendInState.satisfaction++;
                mushroomCount--;
                displayFriends();
                displayMushrooms();
            }
            
        });
        friendsEl.append(friendEl);
    }

}

function displayMushrooms() {
    mushroomsEl.textContent = '';
    for (let i = 0; i < mushroomCount; i++) {
        const mushroomEl = renderMushroom();
        mushroomsEl.append(mushroomEl);
    }
}

function findFriendByName(name, friends) {
    for (let friend of friends) {
        if (friend.name === name) {
            return friend;
        }
    }
}

displayMushrooms();
displayFriends();