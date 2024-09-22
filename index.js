document.getElementById("pokemon-form").addEventListener('submit',function(event){
    event.preventDefault()
     const num=document.getElementById('num-cards').value
     const category=document.getElementById('category').value

    const cardContainer= document.getElementById('pokemon-cards')
    cardContainer.innerHTML=""
    
    fetchCards(num,category)
})
 
 async function fetchCards(num,category){
    const base_Url='https://pokeapi.co/api/v2/type/'
    try{
        const response= await axios.get(`${base_Url}${category.toLowerCase()}`)
        const pokemonList= response.data.pokemon

        const selectedPokemon=pokemonList.slice(0,num)
        for(let i=0;i<=selectedPokemon.length;i++){
            const pokemonURL=selectedPokemon[i].pokemon.url
            const pokemonData= await axios.get(pokemonURL)
            displayCard(pokemonData.data)
        }
    }catch(error){
        // console.log('error in fetching the card',error)
    }
}
function displayCard(pokemon) {
    const cardsContainer = document.getElementById('pokemon-cards');
    const card = document.createElement('div');
    card.classList.add('pokemon-card');

    // Gather types
    const types = pokemon.types.map(typeInfo => typeInfo.type.name).join(', ');
    
    // Gather abilities
    const abilities = pokemon.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ');

    // Gather base stats
    const baseStats = pokemon.stats.map(statInfo => {
        return `<p>${statInfo.stat.name}: ${statInfo.base_stat}</p>`;
    }).join('');

    // Set a background color based on the first type
    const primaryType = pokemon.types[0].type.name;
    const backgroundColor = getTypeColor(primaryType); // Custom function to get color based on type
    card.style.backgroundColor = backgroundColor;

    // Build the card HTML
    card.innerHTML = `
        <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p><strong>Types:</strong> ${types}</p>
        
        <h3>Base Stats:</h3>
        ${baseStats}
    `;

    cardsContainer.appendChild(card);
}

// Helper function to get background color based on Pokémon type
function getTypeColor(type) {
    const typeColors = {
        normal: '#A8A77A',
        fire: '#EE8130',
        water: '#6390F0',
        grass: '#7AC74C',
        electric: '#F7D02C',
        ice: '#96D9D6',
        fighting: '#C22E28',
        poison: '#A33EA1',
        ground: '#E2BF65',
        flying: '#A98FF3',
        psychic: '#F95587',
        bug: '#A6B91A',
        rock: '#B6A136',
        ghost: '#735797',
        dragon: '#6F35FC',
        dark: '#705746',
        steel: '#B7B7CE',
        fairy: '#D685AD',
    };

    return typeColors[type] || '#FFFFFF'; // Default to white if type not found
}
