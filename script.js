let hasClicked = false;
let finalRarity = "Rare";
let selectedReward = "";
let isBrawlerReward = false;
const rarityImages = {
    "Rare": "starr-drop-rare.png",
    "Super Rare": "starr-drop-super-rare.png",
    "Epic": "starr-drop-epic.png",
    "Mythic": "starr-drop-mythic.png",
    "Legendary": "starr-drop-legendary.png"
};

const brawlers = {
    "Rare": ["Rosa", "Poco", "El Primo", "Nita", "Barley", "Brock", "Bull", "Colt"],
    "Super Rare": ["Gus", "Jacky", "8-Bit", "Carl", "Tick", "Penny", "Darryl", "Dynamike", "Jessie", "Rico"],
    "Epic": ["Shade", "Berry", "Angelo", "Larry & Lawrie", "Pearl", "Hank", "Maisie", "Mandy", "Sam", "Bonnie", "Lola", "Ash", "Griff", "Grom", "Belle", "Stu", "Edgar", "Colette", "Nani", "Gale", "Emz", "Bea", "Bibi", "Frank", "Pam", "Piper", "Bo", "Meeple"],
    "Mythic": ["Juju", "Moe", "Clancy", "Lily", "Melodie", "Mico", "Charlie", "Chuck", "Doug", "Willow", "R-T", "Gray", "Buster", "Otis", "Janet", "Eve", "Fang", "Buzz", "Squeak", "Ruffs", "Byron", "Lou", "Sprout", "Max", "Mr. P", "Gene", "Tara", "Mortis", "Ollie"],
    "Legendary": ["Kenji", "Draco", "Kit", "Cordelius", "Chester", "Meg", "Amber", "Surge", "Sandy", "Leon", "Crow", "Spike"]
};

const rewards = {
    "Rare": [
        { item: "50 Coins", chance: 41.9 },
        { item: "25 Power Points", chance: 32.6 },
        { item: "100 XP Doublers", chance: 20.9 },
        { item: "20 Bling", chance: 2.3 },
        { item: "10 Credits", chance: 2.3 },
        { item: "Rare Brawler", chance: 5 }
    ],
    "Super Rare": [
        { item: "100 Coins", chance: 42.38 },
        { item: "50 Power Points", chance: 33.11 },
        { item: "200 XP Doublers", chance: 13.25 },
        { item: "50 Bling", chance: 3.31 },
        { item: "30 Credits", chance: 3.31 },
        { item: "Common Pin", chance: 3.31 },
        { item: "Spray", chance: 1.32 },
        { item: "Super Rare Brawler", chance: 5 }
    ],
    "Epic": [
        { item: "200 Coins", chance: 21.05 },
        { item: "100 Power Points", chance: 21.05 },
        { item: "Common Pin", chance: 15.79 },
        { item: "Spray", chance: 15.79 },
        { item: "500 XP Doublers", chance: 10.53 },
        { item: "Rare Brawler", chance: 5.26 },
        { item: "Rare Pin", chance: 5.26 },
        { item: "Rare skin", chance: 5.26 },
        { item: "Epic Brawler", chance: 2 }
    ],
    "Mythic": [
        { item: "200 Power Points", chance: 18.99 },
        { item: "Gadget", chance: 15.82 },
        { item: "Rare skin", chance: 15.82 },
        { item: "500 Coins", chance: 9.49 },
        { item: "Super Rare Brawler", chance: 9.49 },
        { item: "Epic Brawler", chance: 6.33 },
        { item: "Profile Icon", chance: 6.33 },
        { item: "Rare Pin", chance: 6.33 },
        { item: "Spray", chance: 6.33 },
        { item: "Epic Pin", chance: 3.16 },
        { item: "Mythic Brawler", chance: 1.90 }
    ],
    "Legendary": [
        { item: "Super Rare skin", chance: 35.87 },
        { item: "Star Power", chance: 27.17 },
        { item: "Hypercharge", chance: 16.3 },
        { item: "Epic Brawler", chance: 10.87 },
        { item: "Mythic Brawler", chance: 5.43 },
        { item: "Epic skin", chance: 2.17 },
        { item: "Legendary Brawler", chance: 2.17 }
    ]
};

function handleStarrDropClick() {
    if (hasClicked) return;
    hasClicked = true;

    finalRarity = determineRarity();
    document.getElementById("rarityDisplay").innerText = `Current Rarity: ${finalRarity}`;
    document.getElementById("starrDrop").src = rarityImages[finalRarity];
    document.getElementById("revealButton").disabled = false;
    document.getElementById("revealBrawlerButton").disabled = true;
}

function determineRarity() {
    const rand = Math.random();
    if (rand < 0.02) return "Legendary";
    if (rand < 0.07) return "Mythic";
    if (rand < 0.22) return "Epic";
    if (rand < 0.50) return "Super Rare";
    return "Rare";
}

function revealReward() {
    if (!hasClicked) return;

    const reward = getReward(finalRarity);
    document.getElementById("rewardDisplay").innerText = `Reward: ${reward}`;

    if (reward.includes("Brawler")) {
        selectedReward = reward;
        isBrawlerReward = true;
        document.getElementById("revealBrawlerButton").disabled = false;
    } else {
        isBrawlerReward = false;
        document.getElementById("revealBrawlerButton").disabled = true;
    }

    hasClicked = false;
    document.getElementById("starrDrop").src = rarityImages["Rare"];
    document.getElementById("rarityDisplay").innerText = "Current Rarity: Rare";
    document.getElementById("revealButton").disabled = true;
}

function getReward(rarity) {
    const items = rewards[rarity];
    let cumulativeChance = 0;
    const rand = Math.random() * 100;

    for (const item of items) {
        cumulativeChance += item.chance;
        if (rand < cumulativeChance) {
            return item.item;
        }
    }
    return items[items.length - 1].item;
}

function revealBrawler() {
    if (!isBrawlerReward) return;

    // Extract brawler rarity from reward text
    const parts = selectedReward.split(' ');
    let brawlerRarity;
    if (parts[0] === 'Super' && parts[1] === 'Rare') {
        brawlerRarity = 'Super Rare';
    } else {
        brawlerRarity = parts[0];
    }

    const brawlerList = brawlers[brawlerRarity];
    const randomBrawler = brawlerList[Math.floor(Math.random() * brawlerList.length)];
    document.getElementById("brawlerDisplay").innerText = `You got a ${brawlerRarity} Brawler: ${randomBrawler}`;
    document.getElementById("revealBrawlerButton").disabled = true;
}