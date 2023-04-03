let startTime = new Date().getTime();

function sendTimeSpent() {
  const endTime = new Date().getTime();
  const timeSpent = endTime - startTime;

  // Envoi du temps passé au serveur
  axios.post('/api/timespent', { timeSpent })
    .then(response => {
      console.log('Temps passé envoyé avec succès');
    })
    .catch(error => {
      console.error('Erreur lors de l\'envoi du temps passé :', error);
    });

  // Réinitialiser le temps de départ
  startTime = endTime;
}

// Envoyer le temps passé toutes les 5 minutes (300 000 millisecondes)
const intervalId = setInterval(sendTimeSpent, 300000);

// Envoyer le temps passé lors de la fermeture de l'onglet ou du navigateur
window.addEventListener('beforeunload', () => {
  clearInterval(intervalId);
  sendTimeSpent();
});

export default sendTimeSpent;