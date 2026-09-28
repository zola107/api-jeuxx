const express = require("express");
const app = express();

app.use(express.json()); // permet de lire req.body en JSON

let jeux = [
  { id: 1, nom: "Valorant", anticheat: "Riot Vanguard" , plateforme: "riot-games" },
  { id: 2, nom: "Counter Strike 2", anticheat: "VAC", plateforme: "steam" },
  { id: 3, nom: "Fortnite", anticheat: "EAC", plateforme: "epic-games" }, 
  { id: 1, nom: "Apex Legends", anticheat: "EAC", plateforme: "steam", genre: "battle royal", note: "14/20" },
  { id: 2, nom: "Call of Duty: Warzone", anticheat: "Ricochet", plateforme: "battle-net", genre: "battle royal", note: "12/20" },
  { id: 3, nom: "Rainbow Six Siege", anticheat: "BattlEye", plateforme: "ubisoft-connect", genre: "fps tactique", note: "15/20" },
  { id: 4, nom: "PUBG: Battlegrounds", anticheat: "BattlEye", plateforme: "steam", genre: "battle royal", note: "13/20" },
  { id: 5, nom: "Overwatch 2", anticheat: "Blizzard Anti-Cheat", plateforme: "battle-net", genre: "hero shooter", note: "11/20" },
  { id: 6, nom: "Escape from Tarkov", anticheat: "BattlEye", plateforme: "battlestate-launcher", genre: "extraction shooter", note: "14/20" },
  { id: 7, nom: "Destiny 2", anticheat: "BattlEye", plateforme: "steam", genre: "looter shooter", note: "15/20" },
  { id: 8, nom: "Fall Guys", anticheat: "EAC", plateforme: "epic-games", genre: "party game", note: "13/20" },
  { id: 9, nom: "Rust", anticheat: "EAC", plateforme: "steam", genre: "survie", note: "15/20" },
  { id: 10, nom: "DayZ", anticheat: "BattlEye", plateforme: "steam", genre: "survie", note: "13/20" },
  { id: 11, nom: "Rocket League", anticheat: "EAC", plateforme: "epic-games", genre: "sport", note: "16/20" },
  { id: 12, nom: "Battlefield 2042", anticheat: "Javelin", plateforme: "ea-app", genre: "fps", note: "10/20" },
  { id: 13, nom: "Splitgate 2", anticheat: "EAC", plateforme: "steam", genre: "fps arène", note: "12/20" },
  { id: 14, nom: "The Finals", anticheat: "EAC", plateforme: "steam", genre: "fps destructible", note: "15/20" },
  { id: 15, nom: "Halo Infinite", anticheat: "EAC", plateforme: "steam", genre: "fps arène", note: "13/20" },
  { id: 16, nom: "Paladins", anticheat: "EAC", plateforme: "epic-games", genre: "hero shooter", note: "11/20" },
  { id: 17, nom: "Lost Ark", anticheat: "EAC", plateforme: "steam", genre: "mmorpg", note: "12/20" },
  { id: 18, nom: "Dead by Daylight", anticheat: "EAC", plateforme: "steam", genre: "horreur asymétrique", note: "14/20" },
  { id: 19, nom: "Naraka: Bladepoint", anticheat: "EAC", plateforme: "steam", genre: "battle royal", note: "13/20" },
  { id: 20, nom: "Team Fortress 2", anticheat: "VAC", plateforme: "steam", genre: "fps", note: "16/20" }
];

// GET /jeux -> renvoie tout le tableau
app.get("/jeux", (req, res) => {
  if(req.query.nom){
    const nom = req.query.nom;

    if (nom) {
      const resultats = jeux.filter((p) => p.nom === nom);
      return res.json(resultats);
    }
  }else{
    res.json(jeux);
  }
});
  




// Route de test : GET /
app.get("/", (req, res) => {
  res.json({ message: "Mon API fonctionne" });
});

// On demarre le serveur sur le port 3000
app.listen(3000, () => {
  console.log("Serveur sur http://localhost:3000");
});


// GET /jeux/2 -> renvoie le produit dont l id vaut 2
app.get("/jeux/:id", (req, res) => {
  const id = Number(req.params.id);            // ":id" arrive en texte -> on convertit
  const produit = jeux.find((p) => p.id === id);
  if (!produit) {                              // rien trouve
    return res.status(404).json({ erreur: "Produit introuvable" });
  }
  res.json(produit);
});





// POST /jeux -> ajoute un produit envoye dans le corps de la requete
app.post("/jeux", (req, res) => {
  if (!req.body.nom) {                          // donnee obligatoire manquante
    return res.status(400).json({ erreur: "Le nom est obligatoire" });
  }
  const nouveau = {
    id: jeux.length + 1,
    nom: req.body.nom,
    anticheat: req.body.anticheat
  };
  jeux.push(nouveau);                       // on ajoute au tableau
  res.status(201).json(nouveau);                // 201 = cree
});



// DELETE /jeux/2 -> supprime le produit n 2
app.delete("/jeux/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = jeux.findIndex((p) => p.id === id);
  if (index === -1) {                           // -1 = pas trouve
    return res.status(404).json({ erreur: "Produit introuvable" });
  }
  jeux.splice(index, 1);                    // retire 1 element a cette position
  res.status(200).json({ message: "Produit supprime" });
});