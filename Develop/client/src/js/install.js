let deferredPrompt;


window.addEventListener('beforeinstallprompt', (event) => {
  
  event.preventDefault();
 
  deferredPrompt = event;
 
  butInstall.style.display = 'block';
});


butInstall.addEventListener('click', async () => {
 
  butInstall.style.display = 'none';
  
  deferredPrompt.prompt();
  
  const { outcome } = await deferredPrompt.userChoice;
  
  if (outcome === 'accepted') {
    console.log('PWA installation accepted by user');
  } else {
    console.log('PWA installation canceled by user');
  }
});


window.addEventListener('appinstalled', (event) => {
  console.log('PWA installed successfully');
});
