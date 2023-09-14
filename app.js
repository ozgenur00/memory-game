const gameContainer = document.getElementById("game");


        const COLORS = [
            "red",
            "blue",
            "green",
            "orange",
            "purple",
            "red",
            "blue",
            "green",
            "orange",
            "purple"
        ];
        function shuffle(array) {
            let counter = array.length;
          
            // While there are elements in the array
            while (counter > 0) {
              // Pick a random index
              let index = Math.floor(Math.random() * counter);
          
              // Decrease counter by 1
              counter--;
          
              // And swap the last element with it
              let temp = array[counter];
              array[counter] = array[index];
              array[index] = temp;
            }
          
            return array;
          }

        let shuffledColors = shuffle(COLORS);
        let card1 = null;
        let card2 = null;
        let noClicking = false;
        let cardsFlipped = 0;

        function createDivsForColors(colorArray) {
            for (let color of colorArray) {
                const newDiv = document.createElement("div");
                newDiv.classList.add("memory-card");
                newDiv.classList.add(color);
                newDiv.addEventListener("click", handleCardClick);
                gameContainer.append(newDiv);
            }
        }

        function handleCardClick(e) {
            if (noClicking) return;
            if (e.target.classList.contains("flipped")) return;

            let currentCard = e.target;
            currentCard.style.backgroundColor = currentCard.classList[1];

            if (!card1 || !card2) {
                currentCard.classList.add("flipped");
                card1 = card1 || currentCard;
                card2 = currentCard === card1 ? null : currentCard;
            }

            if (card1 && card2) {
                noClicking = true;
                let gif1 = card1.className;
                let gif2 = card2.className;

                if (gif1 === gif2) {
                    cardsFlipped += 2;
                    card1.removeEventListener("click", handleCardClick);
                    card2.removeEventListener("click", handleCardClick);
                    card1 = null;
                    card2 = null;
                    noClicking = false;
                } else {
                    setTimeout(function() {
                        card1.style.backgroundColor = "";
                        card2.style.backgroundColor = "";
                        card1.classList.remove("flipped");
                        card2.classList.remove("flipped");
                        card1 = null;
                        card2 = null;
                        noClicking = false;
                    }, 1000);
                }
            }

            if (cardsFlipped === COLORS.length) alert("Game over!");
        }

        createDivsForColors(shuffledColors);

//users should only be able to change at most two cards at a time
//clicking on two matching cards should be a 'match'---those cards should stay face up.
//when clicking two cards that are not a match, they should turned over for at least 1 second before they hide the color again. You should make sure to use a so that you can execute code after one second
//setTimeout
//make sure this works only if you click on two different cards - clicking the same card twice shouldn't count as a match!
//make sure that you cannot click too quickly and guess more than two cards at a time.


//add a button that when clicked will start the game
//add a button that when clicked will restart the game once it has ended
//for every guess made, increment a score variable and display the score wile the game is played
//store the lowest-scoring game in local storage, so that player can see a record of the best game played
//allow for any number of cards to appear
//instead of hard-coding color, try something different like random colors or even images.

