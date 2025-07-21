const cluster = require("cluster")
const os = require("os")
const express = require("express")



const numCPUS = os.cpus().length

if (cluster.isMaster){
    console.log(`👑 Master process running (PID: ${process.pid})`);
    console.log(`⚙️ Spawning ${numCPUS} workers...\n`);

    for (let i = 0; i < numCPUS; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`❌ Worker ${worker.process.pid} died. Restarting...`);
        cluster.fork();
    })
} else {
    const app = express();

    app.get("/",(req,res)=>{
        res.send(`Hello from worker ${process.pid}`)
    })

    function Calculatefibonnaci(n){
        if (n <= 1) return n;
        return Calculatefibonnaci(n - 1) + Calculatefibonnaci(n - 2);
    }

    app.get("/fib",(req,res)=>{
        const number = 48;
        console.log(`🧮 Worker ${process.pid} calculating fib(${number})`)
        const result = Calculatefibonnaci(number);
        res.send(`Worker ${process.pid} -> fib(${number}) = ${result}`);
    })

    app.get('/compute', (req, res) => {
        console.log(`📩 /compute handled by Worker ${process.pid}`);

        // Heavy computation (fake load)
        let count = 0;
        for (let i = 0; i < 1e8; i++) {
            count += i;
        }

        res.send(`Worker ${process.pid} finished computing. Result: ${count}`);
    });


    const PORT = 3001

    app.listen(PORT,()=>{
        console.log(`🚀 Worker ${process.pid} listening on port ${PORT}`);
    })
}

// cluster: Built-in Node.js module to spawn multiple worker processes that can share the same server port.

// os: Built-in module to interact with the operating system — used here to get the number of CPU cores.

// express: Web framework to set up HTTP server

// cluster.isMaster is true only in the master process (initial process).

// The master is responsible for forking worker processes.

// This forks (creates) one child process per core.
// Each forked process becomes a worker (a copy of the main script but now running cluster.isMaster === false).

// If a worker dies (crashes or exits), this restarts it automatically.

// Keeps the app fault-tolerant.

// What is cluster.isMaster?
// In Node.js cluster module, there are two types of processes:

// Master (or Primary) Process – This controls and manages all worker processes.

// Worker Processes – These are the actual instances of your app handling incoming requests.