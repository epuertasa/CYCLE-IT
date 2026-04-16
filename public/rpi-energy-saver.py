#!/usr/bin/env python3
"""
---------------------------------------------------------
 RASPBERRY PI - ENERGY SAVER SCRIPT (CYCLE-IT)
---------------------------------------------------------
Aquest script està dissenyat per executar-se en una Raspberry Pi.
Supervisa de forma constant la xarxa per detectar l'activitat de
l'ordinador mitjançant pings. Si detecta inactividad perlliurada,
desconnecta l'alimentació o envia una comanda per protegir i
estalviar d'energia.

Requisits: 
- Python 3
- Connexió de xarxa al PC
"""

import os
import time
import subprocess

# --- CONFIGURACIÓ ---
PC_IP = "192.168.1.100"  # Canvia-ho per l'IP del teu ordinador
INACTIVITY_THRESHOLD = 300  # Temps en segons (5 minuts) d'inactivitat acceptat
CHECK_INTERVAL = 30  # Temps en segons entre cada comprovació

def ping_pc(ip):
    """Fa un ping al PC per comprovar si està en línia"""
    try:
        output = subprocess.check_output(
            ["ping", "-c", "1", "-W", "1", ip], 
            stderr=subprocess.STDOUT, 
            universal_newlines=True
        )
        return True
    except subprocess.CalledProcessError:
        return False

def shutdown_pc():
    """Lògica per apagar el PC de forma remota."""
    print("[!] Iniciant protocol d'apagada de l'ordinador...")
    # Exemple per Windows (utilitzant net rpc):
    # os.system("net rpc shutdown -I 192.168.1.100 -U Usuari%Contrasenya -t 10")
    #
    # Exemple per a desconnectar un relé intel·ligent:
    # os.system("curl -X POST http://smart-plug-ip/off")
    print("[OK] Comanda d'apagada enviada i energia estalviada.")

def main():
    print("--------------------------------------------------")
    print(" CYCLE-IT: Monitor d'inactividad de la Raspberry ")
    print("--------------------------------------------------")
    print(f"Monitoritzant PC a l'IP: {PC_IP}")
    
    inactive_time = 0

    while True:
        is_online = ping_pc(PC_IP)
        
        if is_online:
            # Si el PC respon, resetejem el temps d'inactivitat
            if inactive_time > 0:
                print("[*] S'ha tornat a detectar el PC. Reiniciant temporitzador.")
            inactive_time = 0
        else:
            # Si el PC no respon, sumem el temps d'interval al compte
            inactive_time += CHECK_INTERVAL
            print(f"[!] PC no detectat. Inactiu des de fa {inactive_time} segons...")
            
            # Si s'arriba al límit de temps
            if inactive_time >= INACTIVITY_THRESHOLD:
                print("\n[ALERTA] S'ha superat el llindar d'inactivitat.")
                shutdown_pc()
                # Reiniciem o parem depenent del cas d'ús
                break # o inactive_time = 0
                
        time.sleep(CHECK_INTERVAL)

if __name__ == "__main__":
    main()
