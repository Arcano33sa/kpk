'use strict';

// KSA PRÁCTIKA — Firebase real configurado.
// Bloque C / Etapa 5: operación online controlada con Firestore.
// Firestore queda como fuente principal cuando la importación inicial está completada; JSON permanece como respaldo auxiliar.
const firebaseConfig = {
  apiKey: "AIzaSyAqa8_8GtKWKbQMyAOvD7k-1ZMYRAmOR-k",
  authDomain: "ksakpk-ecb6d.firebaseapp.com",
  projectId: "ksakpk-ecb6d",
  storageBucket: "ksakpk-ecb6d.firebasestorage.app",
  messagingSenderId: "89045620739",
  appId: "1:89045620739:web:8ebc92e00b9601a6029636"
};

window.KSA_FIREBASE_CONFIG = Object.freeze({ ...firebaseConfig });
window.KSA_FIREBASE_PROJECT_NAME = 'ksakpk';
window.KSA_FIREBASE_INITIAL_ADMIN = 'atencion@arcano33.com';
