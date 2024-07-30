'use strict';

const TERMINAL = document.querySelector('#terminal');

const ACTIONS = [
    'Installing Bitcoin miner',
    'Scanning OpenSSH install for vulnerabilities',
    'Installing package manager',
    'Checking package manager for updates',
    'Enabling root access',
    'Encrypting firewall configuration file',
    'Intercepting network requests',
    'Trace detected. Scrambling',
    'Attempting to smash the stack via mail server overflow',
    'Recursively cloning all files to peers over LAN',
    'Spoofing user-agent to appear as administrator to proxy server',
    'Installing rootkit',
    'Installing secondary rootkit',
    'Installing backup rootkit',
    'Core dump in progress',
    'Reticulating splines',
    'TCP connection established to SSH host. Underwritten by a blockchain --- UDP attack initiated.',
    'Proxy engaged via IPX Protocol over VPN (darkweb host) Connecting',
    'Connecting to nearest 5G tower (WARNING: this will increase radiation around the device)',
    'Converting funds into cryptocurrency',
    'Wiring funds to 169.25.68.11:410 (Checking account)',
    'Wiring funds to 169.25.68.11:410 (Savings account)',
    'Overclocking motherboard'
]

const CONDITIONALS = [ // unused, for now
    'if (win32) { eval("powershell exec csharp_vulnerability.ps1") }',
    'if (macos) { eval("sh ./safari_master_password_exploit") }',
    'if (android) { eval("pm install darkweb_universal_root.apk") }',
    'if (ios) { eval("./firewalker_jailbreak_exploit.ipa") }'
]

const WARNINGS = [
    'Open network detected. Attempting to bypass with VPN',
    'Ports misconfigured -- Check for NSA backdoor? Fixing',
    'OS not detected. Restoring from backup [(sda0,1)/root]',
    'Second connection detected. Rerouting connection to force disconnect'
]

// set to 2 to type twice as fast, 1 to type normally, and 0 to type slow
let slow_type_mode = 1;
const slow_type_lookup = [
    100,
    5,
    2
]

// turn off to disable the typing loop
let typing_master_switch = true;

// helper functions
function randInt(max, min) {
    if (!min) { min = 0; }
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

// sleep X ms
const sleep = time => {
    return new Promise (resolve => setTimeout(
        resolve,
        time
    ));
}

// typing functions
async function typeLetter(letter) {
    return new Promise(resolve => {
        setTimeout(() => {
            TERMINAL.textContent += letter;
            TERMINAL.scrollTop = TERMINAL.scrollHeight;
            resolve();
        }, slow_type_lookup[slow_type_mode]);
    });
}

let type_queue = [];

let last_typable = -1;

function request_more_garbage() {
    let current_typable = -1;
    while (current_typable < 0 || current_typable == last_typable) {
        current_typable = randInt(ACTIONS.length); // pick a line
    }
    type("# " + ACTIONS[current_typable] + "... done\n")
    
    last_typable = current_typable;
}

async function type_queue_manager() {
    while (type_queue.length > 0) {
        let letter = type_queue.shift();
        await typeLetter(letter);
    }
    if (typing_master_switch) {
        request_more_garbage();
    }
    setTimeout(type_queue_manager, 50);
}

function type(line) {
    type_queue = type_queue.concat(line.split(""));
}

function start_typing() {
    request_more_garbage();
    type_queue_manager();
}

let items = [
    generate_progress_bar,
    generate_error_message,
    generate_crypto_box,
    generate_network_hacker
]

function get_more_intense() {
    let newItem = items[randInt(0, items.length)];
    newItem();
}

function generate_new_dialogue_box(classname) {
    let element = document.body.appendChild(document.createElement('div'));
    element.className = classname;

    element.style.top = randInt(0, 80) + "%";
    element.style.left = randInt(0, 80) + "%";
    return element
}

async function progresser(element, minmax, database) {
    let progress = 0;
    while (element) {
        while (progress <= 100) {
            if (!element) {
                element = 100;
            }
            else {
                await sleep(randInt(minmax[0], minmax[1]));
                element.querySelector('.insideBar').style.width = progress + "%";
                progress++;
            }
        }
        progress = 0;

        if (database) {
            element.querySelector('p').textContent = database[randInt(database.length)];
        }
        
        element.style.top = randInt(0, 80) + "%";
        element.style.left = randInt(0, 80) + "%";
    }
}

function generate_error_message() {
    let error_box = generate_new_dialogue_box('box errorBox');

    // error msg elements
    error_box.appendChild(document.createElement('h1')).className = 'errorHeader';
    error_box.appendChild(document.createElement('p')).className = 'errorDescription SeveralPeopleAreTyping';

    // error msg
    error_box.querySelector('.errorHeader').textContent = (randInt(0,2) ? 'WARNING' : 'ERROR');
    // i think i wrote my randint wrong and it's using the wrong function so the max
    // is exclusive but now the rest of my code is written around it so i'm stuck like
    // this OOPS
    error_box.querySelector('.errorDescription').textContent = WARNINGS[randInt(WARNINGS.length)];
    
    // loading bar
    error_box.appendChild(document.createElement('div')).className = 'outsideBar';
    error_box.querySelector('.outsideBar').appendChild(document.createElement('div')).className = 'insideBar';

    progresser(error_box, [10,200], WARNINGS);
}

function generate_progress_bar() {
    let progress_bar = generate_new_dialogue_box('box progressBar');

    // loading bar
    progress_bar.appendChild(document.createElement('div')).className = 'outsideBar';
    progress_bar.querySelector('.outsideBar').appendChild(document.createElement('div')).className = 'insideBar';
    progress_bar.appendChild(document.createElement('p')).className = 'barExplanation';

    // loading msg
    progress_bar.querySelector('.barExplanation').textContent = ACTIONS[randInt(ACTIONS.length)];

    progresser(progress_bar, [1, 500], ACTIONS);
}

let characters = "1234567890abcdef".split('');

function generate_crypto_box() {
    let progress_bar = generate_new_dialogue_box('box cryptoBox');
    
    // loading msg
    progress_bar.appendChild(document.createElement('p')).className = 'crypto';

    // loading bar
    progress_bar.appendChild(document.createElement('div')).className = 'outsideBar';
    progress_bar.querySelector('.outsideBar').appendChild(document.createElement('div')).className = 'insideBar';
    
    let crypto = progress_bar.querySelector('.crypto');

    let cryptoGen = () => {
        crypto.textContent = '';

        for (let i=0; i < 50; i++) {
            for(let j=0; j < 2; j++) {
                crypto.textContent += characters[randInt(0, characters.length)];
            }
            crypto.textContent += ' ';
        }
        setTimeout(cryptoGen, 50);
    }

    setTimeout(cryptoGen, 50);

    progresser(progress_bar, [50, 1000]);
}

function generate_network_hacker() {
    if (!playing) { return} // not the worst hack ive ever written
    let box = generate_new_dialogue_box('box flex networkHacker');
    
    // let pcs = [];
    let activepcs = [];

    function makeContainer(infectionRate) {
        let cont = document.createElement('div');
        cont.className = 'flex column';

        if (box.childElementCount != 0) {
            let filler = document.createElement('div');
            filler.className = 'flex column';
            let fillers = infectionRate - 1;
            for (let i = 0; i < fillers; i++) {
                let el = document.createElement('div');
                el.className = 'connection';
                filler.appendChild(el);
            }
            box.appendChild(filler);
        }

        box.appendChild(cont);
        return cont;
    }

    let container = makeContainer(1);

    function createNewBox() {
        // container
        let pcbox = document.createElement('div');
        container.appendChild(pcbox).className = 'pcBox';

        // loading bar
        let progCircle = document.createElement('div');
        pcbox.appendChild(progCircle).className = 'progCircle';
    
        // computer
        let pc = document.createElement('div');
        let result = ['pc','laptop','phone'][randInt(0,3)];
        pcbox.appendChild(pc).className = result;

        // pcs.push(pcbox);
        activepcs.push(pcbox);

        pcbox.setAttribute('data-progress', '0');

        return pcbox
    }
    
    let infectionRate = 1;

    createNewBox();
    function progress() {
        if (!box) { return } // Get Out Of Jail Free clause

        let index = randInt(0, activepcs.length);

        let element = activepcs[index];
        let loadingBar = element.querySelector('.progCircle');

        let prog = parseInt(activepcs[index].getAttribute('data-progress'));

        prog = Math.min(100, prog + randInt(6,32));

        loadingBar.style.width = prog + '%';
        loadingBar.style.height = prog + '%';

        if(prog === 100) {
            element.classList.add('complete');
            activepcs.splice(index, 1);
        } else {
            index++;
        }

        element.setAttribute('data-progress', prog);

        if (activepcs.length == 0) {
            infectionRate++;

            container = makeContainer(infectionRate);

            for(let i = 0; i < infectionRate; i++) {
                if (!box) { return } // help
                createNewBox();
            }
        }

        if (infectionRate >= 5) {
            box.remove();
            generate_network_hacker();
        } else {
            setTimeout(progress, randInt(60,450));
        }
    }

    setTimeout(progress, 100);
}

async function chill_out() {
    typing_master_switch = false;
    // clear out all the popup bars
    while (document.querySelector(".box")) {
        document.querySelector(".box").remove();
        type('#\n');
        await sleep(100);
    }
    type('# ');
    await sleep(500); // dramatic pause
    slow_type_mode = 0;
    // type all letters
    type("./hack_the_planet.sh");
}

async function go_all_out() {
    slow_type_mode = 2;
    typing_master_switch = true;
    type("\n");
    start_typing();
    // spawn a bunch of random bars
    for (let i=0; i < 25; i++) { get_more_intense(); }
    document.body.className = "flushed";
}

function blackout() {
    document.querySelector("#terminal").remove();
    while (document.querySelector(".box")) {
        document.querySelector(".box").remove();
    }
    let terminate = document.body.appendChild(document.createElement('div'));
    terminate.id = 'terminated';
    terminate.textContent = "Connection terminated.\nConnection forcibly closed by host.";
    document.body.className = "";
    playing = false;
}
